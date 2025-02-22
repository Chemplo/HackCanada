import './Profile.css';

function Profile() {
    return (
    <>
    <div className="about-me-page">
        <div className="sidebar">
            <div className="profile-pic"></div>
            <h2>name</h2>
            <p>pronouns</p>
            <h3>university</h3>

            <ul class="social-links">
                <li>⭐ email</li>
                <li>⭐ instagram</li>
                <li>⭐ discord</li>
            </ul>
        </div>
        <div className="about-me-box">
            <p className="about-me">About Me</p>
        </div>
    </div>
    </>);
}

export default Profile;