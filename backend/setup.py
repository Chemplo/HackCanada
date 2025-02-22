from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Database configuration (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///roomies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Model
class Gender(db.Model):
    key = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(100), unique = True)
    
class University(db.Model):
    key = db.Column(db.Integer, primary_key=True)
    uni = db.Column(db.String(100), unique = True)
    
class User(db.Model):
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
    email = db.Column(db.String(100))
    
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

class Results(db.Model):
	key = db.Column(db.Integer, primary_key=True)
	id = db.Column(db.Integer, db.ForeignKey("user.id"))
	threshold = db.Column(db.String(255))
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
	stored_genders = Gender.query.all()
	print("Stored Genders in Database:")
	for g in stored_genders:
		print(g.gender)

	# adds university options
	universities = ["Waterloo", "Laurier", "UofT", "TMU", "Western", "York", "Queens", "UBC", "McGill", "McMaster", "Guelph", "Calgary", "OCAD"]
	for x in universities:
		existing_uni = University.query.filter_by(uni=x).first()
		if not existing_uni:
			new_uni = University(uni = x)
			db.session.add(new_uni)
		
	db.session.commit()

if __name__ == '__main__':
    app.run(debug=False, port=5000)
