from flask import Flask, request, jsonify, session
from email_validator import validate_email, EmailNotValidError
from setup import app, db, User, login_manager  # Import necessary objects
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))  # Retrieves user by ID

# Route to receive data from React and insert into DB
@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()  # Receive JSON data from React

        existing_user = User.query.filter_by(username = data['username']).first()
        if existing_user:
            raise Exception("Sorry, this username is already in use")
        
        try:
            validate_email(data['email'])
        except EmailNotValidError as e:
            return jsonify({"error": f"Invalid email: {str(e)}"}), 400

        new_user = User(username=data['username'], password=data['password'], fname=data['fname'], lname=data['lname'], pronouns=data['pronouns'], gender=data['gender'], age=data['age'], uni=data['uni'], abt_me=data['abt_me'], ig=data['ig'], disc=data['disc'], email=data['email'])
        db.session.add(new_user)
        
        db.session.commit()
        return jsonify({"message": "User added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()  # Receive JSON data from React

        existing_user = User.query.filter_by(username = data['username']).first()
        if existing_user:
            if existing_user.password == data['password']:
                login_user(existing_user)
                return jsonify({"message": "User logged in successfully!"}), 201
            else:
                raise Exception("Incorrect Password")
        else:
            raise Exception("Sorry, this username doesn't exist")
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
    return jsonify({
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
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
