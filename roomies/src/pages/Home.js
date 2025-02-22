import './Home.css';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <div className="questionnaire_box">
                <Link to="/questionnaire" className="dbquestionnaire">
                    <h1>Questionnaire</h1>
                </Link>
            </div>
            <div className="second_row">
                <div className="result_box">
                    <Link to="/results" className="dbresult">
                        <h2>Results</h2>
                    </Link>
                </div>
                <div className="profile_box">
                    <Link to="/profile" className="dbprofile">
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
