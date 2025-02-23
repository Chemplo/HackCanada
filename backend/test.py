from flask import Flask, request, jsonify, session
from setup import app, db, UserAns, User, Results  # Import necessary objects
from questionnaire import result

with app.app_context():
	new_user = User(username="n", password="1234", email="n3zhu@uwaterloo.ca", gender="female", fname="nancy", lname="zhu")
	db.session.add(new_user)
	new_user = User(username="s", password="1234", email="z298wang@uwaterloo.ca", gender="female", fname="steven", lname="wang")
	db.session.add(new_user)
	new_user = User(username="a", password="1234", email="sandyw.9372@gmail.com", gender="female", fname="steven", lname="wang")
	db.session.add(new_user)
	new_user = User(username="b", password="1234", email="rinasong0617@gmail.com", gender="female", fname="steven", lname="wang")
	db.session.add(new_user)
	new_user = User(username="c", password="1234", email="s259wang@uwaterloo.ca", gender="female", fname="steven", lname="wang")
	db.session.add(new_user)
	new_user = User(username="d", password="1234", email="s250wang@uwaterloo.ca", gender="female", fname="steven", lname="wang")
	db.session.add(new_user)
	new_user = User(username="e", password="1234", email="s200wang@uwaterloo.ca", gender="female", fname="steven", lname="wang")
	db.session.add(new_user)

	n = User.query.filter_by(username = "n").first()
	s = User.query.filter_by(username = "s").first()
	a = User.query.filter_by(username = "a").first()
	b = User.query.filter_by(username = "b").first()
	c = User.query.filter_by(username = "c").first()
	d = User.query.filter_by(username = "d").first()
	e = User.query.filter_by(username = "e").first()
	new_ans = UserAns(id=n.id, q1=1, q2=1, q3=1, q4=1, q5=1, q6=1, q7=1, q8=1, q9=1, q10=1, q11=1, q12=1, q13=1, q14=1, q15=1, q16=1)
	db.session.add(new_ans)
	new_ans = UserAns(id=s.id, q1=1, q2=1, q3=1, q4=1, q5=1, q6=1, q7=1, q8=1, q9=1, q10=1, q11=1, q12=1, q13=1, q14=1, q15=1, q16=1)
	db.session.add(new_ans)
	new_ans = UserAns(id=a.id, q1=2, q2=3, q3=1, q4=2, q5=1, q6=1, q7=3, q8=1, q9=1, q10=1, q11=3, q12=1, q13=1, q14=1, q15=1, q16=1)
	db.session.add(new_ans)
	new_ans = UserAns(id=b.id, q1=1, q2=3, q3=1, q4=1, q5=2, q6=3, q7=1, q8=1, q9=1, q10=1, q11=1, q12=3, q13=1, q14=1, q15=1, q16=1)
	db.session.add(new_ans)
	new_ans = UserAns(id=c.id, q1=1, q2=1, q3=3, q4=1, q5=1, q6=1, q7=1, q8=1, q9=1, q10=1, q11=1, q12=1, q13=1, q14=1, q15=1, q16=1)
	db.session.add(new_ans)
	new_ans = UserAns(id=d.id, q1=1, q2=1, q3=2, q4=1, q5=1, q6=2, q7=1, q8=1, q9=1, q10=1, q11=3, q12=1, q13=1, q14=1, q15=1, q16=1)
	db.session.add(new_ans)
	new_ans = UserAns(id=e.id, q1=2, q2=1, q3=1, q4=1, q5=3, q6=1, q7=2, q8=2, q9=2, q10=2, q11=2, q12=2, q13=2, q14=2, q15=2, q16=1)
	db.session.add(new_ans)

	db.session.commit()

	stored_users = User.query.all()
	print("Stored Users in Database:")
	for u in stored_users:
		print(u.username)
	stored_ans = UserAns.query.all()
	print("Stored ans in Database:")
	for a in stored_ans:
		print(a.id)

	result()


	stored_res = Results.query.all()
	print("Stored Results in Database:")
	for u in stored_res:
		before = (u.compatible).split(",")
		for b in before:
			after = b.split(";")
			print("user: " + after[0])
			print("  score: " + after[1])
