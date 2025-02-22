from flask import request, jsonify
from setup import app, db, User, UserAns, Results  # Import necessary objects
from user import get_current_user
from flask_login import login_required, current_user

# Route to receive data from React and insert into DB
@app.route('/submit', methods=['POST'])
@login_required
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
        return jsonify({"error submitting questionnaire": str(e)}), 500
    
# Route to receive data from React and insert into DB
@app.route('/result', methods=['POST'])
def result():
    try:
        WEIGHTS = [1, 1, 3, 3, 2, 2, 2, 2, 2, 3, 2]
        THRESHOLD = 80

        curr_user_ans = UserAns.query.filter_by(id=current_user.id).first()

        curr_compatible = "" 
        users = UserAns.query.all()

        for user in users:
            if curr_user_ans.id != user.id:
                score = calculate_weighted_score(curr_user_ans, 
                                                 user, WEIGHTS)
            if score >= THRESHOLD:
                curr_compatible += f"{user.id};{score},"  

        new_res = Results(id = current_user.id, compatible = curr_compatible)
        db.session.add(new_res)
        
        db.session.commit()

        return jsonify({"message": "User results inserted successfully!"}), 200
    except Exception as e:
        return jsonify({"error generating resuts": str(e)}), 500
    
def calculate_weighted_score(ans1, ans2, weights):
    try:
        TOTAL_WEIGHT = 26
        FIRST_WEIGHTED_QUESTION = 5
        LAST_WEIGHTED_QUESTION = 16

        score = 0

        for i in range(FIRST_WEIGHTED_QUESTION, LAST_WEIGHTED_QUESTION + 1):
            question = f'q{i}'
            answer1 = getattr(ans1, question)
            answer2 = getattr(ans2, question)

            score += weights[i-1] * (1 if answer1 == answer2 else 0)

        if score == 0:
            return 0
        else:
            return (score / TOTAL_WEIGHT) * 100

    except Exception as e:
        return jsonify({"error calculating score": str(e)}), 500

@app.route('/curr_user_ans', methods=['POST'])
@login_required  # Ensures only logged-in users can access this
def get_curr_user_ans():
    try:
        existing_user = UserAns.query.filter_by(id = current_user.id).first()
        if not existing_user:
            raise Exception("Sorry, this user has not completed the questionnaire")
        
        curr_ans = UserAns.query.filter_by(id = current_user.id).first()
        return jsonify({
            "id": curr_ans.id,
            "q1": curr_ans.q1,
            "q2": curr_ans.q2,
            "q3": curr_ans.q3,
            "q4": curr_ans.q4,
            "q5": curr_ans.q5,
            "q6": curr_ans.q6,
            "q7": curr_ans.q7,
            "q8": curr_ans.q8,
            "q9": curr_ans.q9,
            "q10": curr_ans.q10,
            "q11": curr_ans.q11,
            "q12": curr_ans.q12,
            "q13": curr_ans.q13,
            "q14": curr_ans.q14,
            "q15": curr_ans.q15,
            "q16": curr_ans.q16
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/curr_results', methods=['POST'])
@login_required  # Ensures only logged-in users can access this
def get_curr_results():
    try:
        existing_user = Results.query.filter_by(id = current_user.id).first()
        if not existing_user:
            raise Exception("Sorry, this user has no computed results")
        
        curr_res = Results.query.filter_by(id = current_user.id).first()
        return jsonify({
            "id": curr_res.id,
            "compatible": curr_res.compatible,
            "pinned": curr_res.pinned
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500