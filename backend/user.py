from flask import Flask, request, jsonify
from email_validator import validate_email, EmailNotValidError
from setup import app, db, User  # Removed Flask-Login imports
import jwt
import datetime
from functools import wraps

SECRET_KEY = "ROOMIESPROJECTRSSN"

def jwt_required(fn):
    """Custom decorator to check for a valid JWT token."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized - No Token Provided"}), 401
        
        token = auth_header.split(" ")[1]
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user_id = decoded_token["id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired. Please log in again."}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token. Please log in again."}), 401
        
        return fn(*args, **kwargs)
    return wrapper

@app.route('/signup', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user:
            return jsonify({"error": "Username already in use"}), 400

        validate_email(data['email'])
        existing_email = User.query.filter_by(email=data['email']).first()
        if existing_email:
            return jsonify({"error": "Email already in use"}), 400

        new_user = User(username=data['username'], password=data['password'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()

        token_payload = {
            "id": new_user.id,
            "username": new_user.username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }
        token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
        return jsonify({"message": "User signed up successfully!", "token": token}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        existing_user = User.query.filter_by(username=data['user']).first()
        if not existing_user:
            existing_user = User.query.filter_by(email=data['user']).first()
            if not existing_user:
                return jsonify({"error": "Account not found"}), 404

        if existing_user.password == data['password']:
            token_payload = {
                "id": existing_user.id,
                "username": existing_user.username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
            }
            token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
            return jsonify({"message": "User logged in successfully!", "token": token}), 200
        else:
            return jsonify({"error": "Incorrect password"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/logout', methods=['POST'])
def logout():
    return jsonify({"message": "User logged out successfully!"}), 200

@app.route('/current_user', methods=['GET'])
@jwt_required
def get_current_user():
    user = User.query.get(request.user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "password": user.password,
        "fname": user.fname,
        "lname": user.lname,
        "pronouns": user.pronouns,
        "gender": user.gender,
        "age": user.age,
        "uni": user.uni,
        "abt_me": user.abt_me,
        "ig": user.ig,
        "disc": user.disc,
        "email": user.email
    }), 200

@app.route('/inputted_user', methods=['GET'])
def get_inputted_user():

    data = request.get_json()

    user = User.query.filter_by(id=data['id']).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "password": user.password,
        "fname": user.fname,
        "lname": user.lname,
        "pronouns": user.pronouns,
        "gender": user.gender,
        "age": user.age,
        "uni": user.uni,
        "abt_me": user.abt_me,
        "ig": user.ig,
        "disc": user.disc,
        "email": user.email
    }), 200

    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
