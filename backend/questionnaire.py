from flask import request, jsonify
from setup import app, db, User, UserAns, Results  # Import necessary objects
from user import get_current_user
from flask_login import login_required, current_user
import jwt
from functools import wraps

SECRET_KEY = "ROOMIESPROJECTRSSN"

def jwt_required(fn):
    """Custom decorator to check for a valid JWT token."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if request.method == "OPTIONS":
            return '', 204
        
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

# Route to receive data from React and insert into DB
@app.route('/submit', methods=['POST'])
@jwt_required
def submit():
    try:
        data = request.get_json()  # Receive JSON data from React

        curr_ans = UserAns.query.filter_by(id = request.user_id).first()
        if not curr_ans:    # if userAns doesnt exist, must be q1
            answer = UserAns(id=data['id'], q1=data['q1'])
            db.session.add(answer)
        else:
            if 'q1' in data:
                curr_ans.q1 = data['q1']
            elif 'q2' in data:
                curr_ans.q2 = data['q2']
            elif 'q3' in data:
                curr_ans.q3 = data['q3']
            elif 'q4' in data:
                curr_ans.q4 = data['q4']
            elif 'q5' in data:
                curr_ans.q5 = data['q5']
            elif 'q6' in data:
                curr_ans.q6 = data['q6']
            elif 'q7' in data:
                curr_ans.q7 = data['q7']
            elif 'q8' in data:
                curr_ans.q8 = data['q8']
            elif 'q9' in data:
                curr_ans.q9 = data['q9']
            elif 'q10' in data:
                curr_ans.q10 = data['q10']
            elif 'q11' in data:
                curr_ans.q11 = data['q11']
            elif 'q12' in data:
                curr_ans.q12 = data['q12']
            elif 'q13' in data:
                curr_ans.q13 = data['q13']
            elif 'q14' in data:
                curr_ans.q14 = data['q14']
            elif 'q15' in data:
                curr_ans.q15 = data['q15']
            elif 'q16' in data:
                curr_ans.q16 = data['q16']
        
        db.session.commit()
    except Exception as e:
        return jsonify({"error submitting questionnaire": str(e)}), 500
    
# Route to receive data from React and insert into DB
# @jwt_required
@app.route('/result', methods=['GET', 'POST'])
def result():
    try:
        
        WEIGHTS = [1, 1, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2]
        THRESHOLD = 80

        curr_user_ans = UserAns.query.filter_by(id=request.user_id).first()
        if not curr_user_ans:
            return jsonify({"error": "User has not completed the questionnaire"}), 400
        print("current users answers exist")

        users = UserAns.query.all()
        curr_compatible = []

        for user in users:
            if curr_user_ans.id != user.id:
                score = calculate_weighted_score(curr_user_ans, 
                                                 user, WEIGHTS)
                print(user + " has score " + score)
                if score >= THRESHOLD:
                    print("user is compatible")
                    curr_compatible.append(f"{user.id};{score}")  

        existing_result = Results.query.filter_by(id=request.user_id).first()
        if existing_result:
            existing_result.compatible = ",".join(curr_compatible)
        else:
            new_res = Results(id=request.user_id, compatible=",".join(curr_compatible))
            db.session.add(new_res)

        db.session.commit()
        
        print("running")
        return jsonify({"message": "User results inserted successfully!"}), 200
    except Exception as e:
        return jsonify({"error generating results": str(e)}), 500
    
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

            score += weights[i-FIRST_WEIGHTED_QUESTION] * (1 if answer1 == answer2 else 0)

        return (score / TOTAL_WEIGHT) * 100

    except Exception as e:
        return jsonify({"error calculating score": str(e)}), 500

@app.route('/curr_user_ans', methods=['GET'])
@jwt_required  # Ensures only logged-in users can access this
def get_curr_user_ans():
    try:
        existing_user = UserAns.query.filter_by(id = request.user_id).first()
        if not existing_user:
            raise Exception("Sorry, this user has not completed the questionnaire")
        
        curr_ans = UserAns.query.filter_by(id = request.user_id).first()
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

@app.route('/curr_results', methods=['GET'])
@jwt_required  # Ensures only logged-in users can access this
def get_curr_results():
    try:
        existing_user = Results.query.filter_by(id = request.user_id).first()
        if not existing_user:
            raise Exception("Sorry, this user has no computed results")
        
        curr_res = Results.query.filter_by(id = request.user_id).first()
        return jsonify({
            "id": curr_res.id,
            "compatible": curr_res.compatible,
            "pinned": curr_res.pinned
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

def submit():
    try:
        data = request.get_json()  # Receive JSON data from React
        curr_ans = UserAns.query.filter_by(id=current_user.id).first()

        if not curr_ans:
            answer = UserAns(id=data['id'], q1=data['q1'])
            db.session.add(answer)
        else:
            for key, value in data.items():
                if key.startswith('q') and hasattr(curr_ans, key):
                    setattr(curr_ans, key, value)

        db.session.commit()

        # Assuming 'saved_answers' is a count of how many questions were updated
        saved_answers = sum(1 for key in data if key.startswith('q') and hasattr(curr_ans, key))

        return jsonify({"saved_answers": saved_answers}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500