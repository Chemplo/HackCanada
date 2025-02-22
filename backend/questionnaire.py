from flask import request, jsonify
from setup import app, db, UserAns  # Import necessary objects
from user import get_current_user

# Route to receive data from React and insert into DB
@app.route('/submit', methods=['POST'])
def submit():
    try:
        data = request.get_json()  # Receive JSON data from React

        user = get_current_user()
        answer = UserAns(id=user['id'], q1=data['q1'], q2=data['q2'], 
                         q3=data['q3'], q4=data['q4'], q5=data['q5'], 
                         q6=data['q6'], q7=data['q7'], q8=data['q8'], 
                         q9=data['q9'], q10=data['q10'], q11=data['q11'], 
                         q12=data['q12'], q13=data['q13'], q14=data['q14'], 
                         q15=data['q15'], q16=data['q16'])
        db.session.add(answer)

        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500