import about_image from "../images/IMG_3074.jpg";
import './About.css';

function About() {
    
    return (<div>
        <div className="center"> 
            <h1 className="center-text">about roomies</h1>
        </div>

        <div className="content">
            <img 
            src={about_image}
            alt="us"
            className="about-image"/>

            <p className="about-block">roomies is an intelligent roommate-matching tool designed to help university students find compatible living partners. By analyzing questionnaire responses on lifestyle, habits, and preferences—such as sleep schedules, cleanliness, and dietary restrictions—the tool generates optimal matches using a weighted scoring system. Say goodbye to mismatched roommates and enjoy a harmonious living experience with roomies!</p>
        </div>
        
    </div>);
}

export default About;