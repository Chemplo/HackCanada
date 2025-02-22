from flask import Flask, request, jsonify, session
from setup import app, db, User, login_manager  # Import necessary objects
from user import get_current_user
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

@app.route('/edit_profile', methods=['POST'])
@login_required
def edit_profile():
	try:
		data = request.get_json()

		curr_user = User.query.filter_by(id = current_user.id).first()
		if not curr_user:
			return jsonify({"error": "User not found"}), 404

		if 'fname' in data:
			curr_user.fname = data['fname']
		if 'lname' in data:
			curr_user.lname = data['lname']
		if 'username' in data:
			curr_user.username = data['username']
		if 'uni' in data:
			curr_user.uni = data['uni']
		if 'pronouns' in data:
			curr_user.pronouns = data['pronouns']
		if 'gender' in data:
			curr_user.gender = data['gender']
		if 'age' in data:
			curr_user.age = data['age']
		if 'abt_me' in data:
			curr_user.abt_me = data['abt_me']
		if 'ig' in data:
			curr_user.ig = data['ig']
		if 'disc' in data:
			curr_user.disc = data['disc']

		db.session.commit()
		return jsonify({"message": "User info updated successfully"}), 200
	except Exception as e:
		return jsonify({"error": str(e)}), 500