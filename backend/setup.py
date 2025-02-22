from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secure random value
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///roomies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# Flask-Login Setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Redirects to login if unauthorized access occurs

# Database Model
class Gender(db.Model):
    key = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(100), unique = True)
    
class University(db.Model):
    key = db.Column(db.Integer, primary_key=True)
    uni = db.Column(db.String(100), unique = True)
    
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), unique = True)
    password = db.Column(db.String(100))
    fname = db.Column(db.String(100))
    lname = db.Column(db.String(100))
    pronouns = db.Column(db.String(100))
    gender = db.Column(db.String(100), db.ForeignKey("gender.gender"))
    age = db.Column(db.Integer)
    uni = db.Column(db.String(100), db.ForeignKey("university.uni"))
    abt_me = db.Column(db.String(255))
    ig = db.Column(db.String(100))
    disc = db.Column(db.String(100))
    email = db.Column(db.String(100), unique = True)
    
class UserAns(db.Model):
	key = db.Column(db.Integer, primary_key=True)
	id = db.Column(db.Integer, db.ForeignKey("user.id"))
	q1 = db.Column(db.Integer)
	q2 = db.Column(db.Integer)
	q3 = db.Column(db.Integer)
	q4 = db.Column(db.Integer)
	q5 = db.Column(db.Integer)
	q6 = db.Column(db.Integer)
	q7 = db.Column(db.Integer)
	q8 = db.Column(db.Integer)
	q9 = db.Column(db.Integer)
	q10 = db.Column(db.Integer)
	q11 = db.Column(db.Integer)
	q12 = db.Column(db.Integer)
	q13 = db.Column(db.Integer)
	q14 = db.Column(db.Integer)
	q15 = db.Column(db.Integer)
	q16 = db.Column(db.Integer)

class Results(db.Model):
	key = db.Column(db.Integer, primary_key=True)
	id = db.Column(db.Integer, db.ForeignKey("user.id"))
	compatible = db.Column(db.String(255))
	pinned = db.Column(db.String(255))

# Create database tables
with app.app_context():
	db.create_all()

	# adds pronoun options
	genders = ["female", "male", "nonbinary/other"]
	for x in genders:
		existing_gender = Gender.query.filter_by(gender = x).first()
		if not existing_gender:
			new_gender = Gender(gender = x)
			db.session.add(new_gender)

	# adds university options
	universities = ["Waterloo", "Laurier", "UofT", "TMU", "Western", "York", "Queens", "UBC", "McGill", "McMaster", "Guelph", "Calgary", "OCAD"]
	for x in universities:
		existing_uni = University.query.filter_by(uni=x).first()
		if not existing_uni:
			new_uni = University(uni = x)
			db.session.add(new_uni)
		
	db.session.commit()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
