import './Home.css';

function Home() {
    return (
        <div className="container">
            <div className="questionnaire_box">
                <h1 className="dbquestionnaire">Questionnaire</h1>
            </div>
            <div className="second_row">
                <div className="result_box">
                    <h2 className="dbresult">Results</h2>
                </div>
                <div className="profile_box">
                    <h2 className="dbprofile">My Profile</h2>
                </div>
                <div className="about_box">
                    <h2 className="dbabout">About</h2>
                </div>
            </div>
        </div>
    );
}

export default Home;
