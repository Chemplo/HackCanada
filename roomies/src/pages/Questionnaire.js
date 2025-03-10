import React, { useState, useEffect } from "react";
import "./Questionnaire.css";
import downarrow from "../images/downarrow.png";
import uparrow from "../images/uparrow.png";
import { Link, useNavigate } from "react-router-dom";

function Questionnaire() {
    const [currentStep, setCurrentStep] = useState("start");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({}); // Store answers for each question
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0); // Track the number of questions answered
    const navigate = useNavigate();

    // Load saved answers from localStorage when the component mounts
    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem("answers"));
        if (savedAnswers) {
            setAnswers(savedAnswers);
            const savedCount = Object.keys(savedAnswers).length;
            setAnsweredQuestionsCount(savedCount); // Set the number of answered questions
        }

        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/current_user",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // Send token in header
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleInputChange = (e) => {
        const updatedAnswers = { ...answers, [e.target.name]: e.target.value };
        setAnswers(updatedAnswers);
        localStorage.setItem("answers", JSON.stringify(updatedAnswers)); // Save updated answers to localStorage

        // Update the answered questions count
        const answeredCount = Object.keys(updatedAnswers).length;
        setAnsweredQuestionsCount(answeredCount);
    };

    const startQuestionnaire = () => {
        setCurrentStep(1);
    };

    const backQuestion = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const nextQuestion = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div className="questionnaire-container">
            {currentStep === "start" && (
                <div className="start-page">
                    <h1 className="start-header">Roomies Questionnaire</h1>
                    <div className="start-description">
                        <p>
                            Looking for someone you actually like living with?
                            This quick questionnaire helps you find a roommate
                            whose vibe aligns with yours.
                        </p>
                    </div>
                    <button
                        className="start-button"
                        onClick={startQuestionnaire}
                    >
                        Start
                    </button>
                </div>
            )}

            {currentStep === 1 && (
                <form className="question-active">
                    <div className="question">
                        <h2>Question {currentStep}</h2>
                        <h2>What is your range of preferred rent costs?</h2>
                        <label>
                            <input
                                type="checkbox"
                                name="rent"
                                value="low"
                                checked={
                                    answers.rent && answers.rent.includes("low")
                                }
                                onChange={handleInputChange}
                            />
                            $600 - $800
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="rent"
                                value="medium"
                                checked={
                                    answers.rent &&
                                    answers.rent.includes("medium")
                                }
                                onChange={handleInputChange}
                            />
                            $800 - $1000
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="rent"
                                value="high"
                                checked={
                                    answers.rent &&
                                    answers.rent.includes("high")
                                }
                                onChange={handleInputChange}
                            />
                            $1000 - $1200
                        </label>
                        <br />
                    </div>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    />
                </form>
            )}

            {currentStep === 2 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>what is your preferred lease duration?</h2>
                        <label>
                            <input type="checkbox" name="lease" value="four" />4
                            months
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="lease" value="eight" />
                            8 months
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="lease" value="year" />1
                            year
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="lease" value="more" />1
                            year +
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 3 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>what is your preferred roommate gender?</h2>
                        <label>
                            <input type="checkbox" name="gender" value="male" />
                            male
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="gender"
                                value="female"
                            />
                            female
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="gender"
                                value="nonbinary/other"
                            />
                            nonbinary/other
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 4 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>what is your preferred roommate age?</h2>
                        <label>
                            <input type="checkbox" name="age" value="18" />
                            18
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="age" value="19" />
                            19
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="age" value="20" />
                            20
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="age" value="21" />
                            21
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="age" value="22" />
                            22
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="age" value="23" />
                            23
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="age" value="24+" />
                            24+
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 5 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>what is your preferred sleep schedule?</h2>
                        <label>
                            <input
                                type="radio"
                                name="sleep"
                                value="early bird"
                            />
                            early bird
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="sleep"
                                value="night owl"
                            />
                            night owl
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="sleep" value="flexible" />
                            flexible
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 6 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>what is your preferred study habits?</h2>
                        <label>
                            <input type="radio" name="study" value="quiet" />
                            quiet at home
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="study" value="outside" />
                            outside study-er
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="study"
                                value="background noise"
                            />
                            background noise is fine
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 7 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>what is your preferred cleanliness levels?</h2>
                        <label>
                            <input
                                type="radio"
                                name="cleanliness"
                                value="very clean"
                            />
                            very clean
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="cleanliness"
                                value="somewhat tidy"
                            />
                            somewhat tidy
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="cleanliness"
                                value="messy is fine"
                            />
                            messy is fine
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 8 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>what is your preferred noise levels?</h2>
                        <label>
                            <input type="radio" name="noise" value="quiet" />
                            very quiet
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="noise"
                                value="some noise"
                            />
                            some noise is fine
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="noise" value="loud" />
                            any noise is fine
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 9 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>how acceptable is smoking?</h2>
                        <label>
                            <input type="radio" name="smoking" value="yes" />
                            i'm fine with it
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="smoking" value="no" />
                            no thank you
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="smoking"
                                value="occasionally"
                            />
                            occasionally is fine
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 10 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>how acceptable is drinking?</h2>
                        <label>
                            <input type="radio" name="drinking" value="yes" />
                            i'm fine with it
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="drinking" value="no" />
                            no thank you
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="drinking"
                                value="occasionally"
                            />
                            occasionally is fine
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 11 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>
                            how comfortable are you with your roommates cooking?
                        </h2>
                        <label>
                            <input type="radio" name="cooking" value="yes" />
                            very comfortable
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="cooking" value="no" />
                            only minimally
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="cooking"
                                value="occasionally"
                            />
                            occasionally is fine
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 12 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>are you comfortable with pets?</h2>
                        <label>
                            <input type="radio" name="pets" value="yes" />
                            yes
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="pets" value="no" />
                            no
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 13 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>how social are you?</h2>
                        <label>
                            <input type="radio" name="social" value="very" />
                            very social
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="social"
                                value="sometimes"
                            />
                            sometimes social
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="social" value="no" />
                            prefers alone time
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 14 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>how do you handle conflict?</h2>
                        <label>
                            <input
                                type="radio"
                                name="conflict"
                                value="direct"
                            />
                            direct communication
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="conflict" value="avoid" />
                            avoid conflict
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="conflict"
                                value="passive"
                            />
                            passive approach
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 15 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>how comfortable are you with guests over?</h2>
                        <label>
                            <input type="radio" name="guests" value="yes" />
                            i'm fine with guests
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="guests" value="no" />
                            no thank you/minimal guests
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="guests"
                                value="occasionally"
                            />
                            occasionally is fine
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 16 && (
                <form className="question-active">
                    <div className="question">
                        <h2>question {currentStep}</h2>
                        <h2>
                            how important is it for you to be friends with your
                            roommate?
                        </h2>
                        <label>
                            <input type="radio" name="friends" value="yes" />
                            yes of course
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="friends" value="no" />
                            no attachment
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="friends" value="sure" />
                            i'm fine with anything
                        </label>
                        <br />
                    </div>
                    <input
                        className="uparrow"
                        type="image"
                        src={uparrow}
                        alt="back"
                        width="100"
                        height="50"
                        onClick={backQuestion}
                    ></input>
                    <input
                        className="downarrow"
                        type="image"
                        src={downarrow}
                        alt="submit"
                        width="100"
                        height="50"
                        onClick={nextQuestion}
                    ></input>
                </form>
            )}

            {currentStep === 17 && (
                <div className="finish-page">
                    <div className="finish-box">
                        <h1 className="finish-header">
                            are you sure you're ready to submit?
                        </h1>

                        <div className="finish-description">
                            <p>
                                wanting to change anwers beyong this page will
                                require you to reopen the entire questionnaire
                                again.
                            </p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="back-button" onClick={backQuestion}>
                            back
                        </button>
                        <button
                            className="finish-button"
                            onClick={nextQuestion}
                        >
                            submit
                        </button>
                    </div>
                </div>
            )}

            {currentStep === 18 && (
                <div className="end-page">
                    <h1 className="end-header">
                        thank you so much for submitting our questionnaire!
                    </h1>
                    <Link to="/">
                        <button className="end-button">home</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Questionnaire;
