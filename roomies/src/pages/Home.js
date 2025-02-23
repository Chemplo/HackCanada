import './Home.css';
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext.js";

const progress = 20

function Home() {

    const { user } = useAuth(); // Get user state & logout function

    return (
        <div className="container">
            <div className="questionnaire_box">
                <Link to={user ? "/questionnaire" : "/login"} className="dbquestionnaire">
                    <h1>Questionnaire</h1>
                </Link>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress_text">{progress}%</div>
            </div>
            <div className="second_row">
                <div className="result_box">
                    <Link to={user ? "/results" : "/login"} className="dbresult">
                        <h2>Results</h2>
                    </Link>
                </div>
                <div className="profile_box">
                    <Link to={user ? "/profile" : "/login"} className="dbprofile">
                        <h2>My Profile</h2>
                    </Link>
                </div>
                <div className="about_box">
                    <Link to="/about" className="dbabout">
                        <h2>About</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
