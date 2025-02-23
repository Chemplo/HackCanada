from flask import Flask, request, jsonify, session
from email_validator import validate_email, EmailNotValidError
from setup import app, db, User, login_manager  # Import necessary objects
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import jwt # imports JWT module
import datetime # To set the expiration time for the token

SECRET_KEY = "ROOMIESPROJECTRSSN"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))  # Retrieves user by ID

# Route to receive data from React and insert into DB
@app.route('/signup', methods=['POST'])
def add_user():
    try:
        #print("Incoming request received")  # Debugging
        data = request.get_json()
        print("Received Data:", data)  # This will show if JSON is valid

        existing_user = User.query.filter_by(username = data['username']).first()
        if existing_user:
            print("username repeat")
            raise Exception("Sorry, this username is already in use")

        try:
            validate_email(data['email'])
        except EmailNotValidError as e:
            return jsonify({"error": f"Invalid email: {str(e)}"}), 400
        
        existing_email = User.query.filter_by(email = data['email']).first()
        if existing_email:
            print("email repeat")
            raise Exception("Sorry, this email is already in use")

        #new_user = User(username=data['username'], password=data['password'], fname=data['fname'], lname=data['lname'], pronouns=data['pronouns'], gender=data['gender'], age=data['age'], uni=data['uni'], abt_me=data['abt_me'], ig=data['ig'], disc=data['disc'], email=data['email'])
        new_user = User(username=data['username'], password=data['password'], email=data['email'])
        db.session.add(new_user)
        
        db.session.commit()

        print("inserted into db")
        token_payload = {
            "id": new_user.id,
            "username": new_user.username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12) # Makes the token expire in 12 hours
        }
        print("token payload")
        token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")
        print("token made")
        return jsonify({
            "message": "User logged in successfully!",
            "token": token,
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email
            }
        }), 200 # This token gets returned to frontend
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        #print("Incoming request received")  # Debugging
        data = request.get_json()
        #print("Received Data:", data)  # This will show if JSON is valid

        if data['user'].find('@') == -1:    # username
            existing_user = User.query.filter_by(username = data['user']).first()
            if not existing_user:
                raise Exception("Sorry, this username isn't attached to an account")
        else:   # email
            existing_user = User.query.filter_by(email = data['user']).first()
            if not existing_user:
                raise Exception("Sorry, this email isn't attached to an account")
        
        if existing_user.password == data['password']:
            login_user(existing_user)

            token_payload = {
                "id": existing_user.id,
                "username": existing_user.username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12) # Makes the token expire in 12 hours
            }
            token = jwt.encode(token_payload, SECRET_KEY, algorithm="HS256")

            return jsonify({
                "message": "User logged in successfully!",
                "token": token,
                "user": {
                    "id": existing_user.id,
                    "username": existing_user.username,
                    "email": existing_user.email
                }
            }), 200 # This token gets returned to frontend
        else:
            raise Exception("Incorrect Password")
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()  # Removes user from session
    return jsonify({"message": "User logged out successfully!"}), 200

@app.route('/current_user', methods=['GET'])
@login_required  # Ensures only logged-in users can access this
def get_current_user():
    try: 
        if not current_user.is_authenticated:
            raise Exception("Sorry")
        print("inside func")
        print("Current user", current_user)
        response = jsonify({
            "id": current_user.id,
            "username": current_user.username,
            "password": current_user.password,
            "fname": current_user.fname,
            "lname": current_user.lname,
            "pronouns": current_user.pronouns,
            "gender": current_user.gender,
            "age": current_user.age,
            "uni": current_user.uni,
            "abt_me": current_user.abt_me,
            "ig": current_user.ig,
            "disc": current_user.disc,
            "email": current_user.email
        })
        return response, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/inputted_user', methods=['POST'])
def get_inputted_user():
    data = request.get_json()
    inputted_user = User.query.filter_by(username = data['id']).first()

    return jsonify({
        "id": inputted_user.id,
        "username": inputted_user.username,
        "password": inputted_user.password,
        "fname": inputted_user.fname,
        "lname": inputted_user.lname,
        "pronouns": inputted_user.pronouns,
        "gender": inputted_user.gender,
        "age": inputted_user.age,
        "uni": inputted_user.uni,
        "abt_me": inputted_user.abt_me,
        "ig": inputted_user.ig,
        "disc": inputted_user.disc,
        "email": inputted_user.email
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
