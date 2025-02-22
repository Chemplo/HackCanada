from flask import request, jsonify
from email_validator import validate_email, EmailNotValidError
from setup import app, db, User  # Import necessary objects

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
