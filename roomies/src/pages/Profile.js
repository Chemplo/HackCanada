import "./Profile.css";
import profilePic from "../images/Generic avatar.png";
import starIcon from "../images/Icon Button.png";
import editButton from "../images/icon.png";
import { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found. Please log in.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/current_user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Send token in header
                    }
                });
                
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
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div className="about-me-page">
            <div className="about-left">
                <div className="profile-info">
                    <img className="profile-pic" src={profilePic} alt="Profile"></img>
                    <h1 className="profile-name">{user.username != null ? user.username : "username"}</h1>
                    <p className="profile-pronouns">{user.pronouns != null ? user.pronouns : "pronouns"}</p>
                    <h1 className="profile-university">{user.uni != null ? user.uni : "university"}</h1>
                </div>

                <div class="profile-social-links">
                    <div className="profile-email-group">
                        <img className="profile-email-icon" src={starIcon} alt="star"/>
                        <p className="profile-email">{user.email != null ? user.email : "email"}</p>
                    </div>
                    <div className="profile-insta-group">
                        <img className="profile-email-icon" src={starIcon} alt="star"/>
                        <p className="profile-insta">{user.ig != null ? user.ig : "instagram"}</p>
                    </div>
                    <div className="profile-disc-group">
                        <img className="profile-email-icon" src={starIcon} alt="star"/>
                        <p className="profile-disc">{user.disc != null ? user.disc : "discord"}</p>
                    </div>
                </div>
            </div>
            <div className="about-right">
                <div className="about-right-box">
                    <div className="about-box-header">
                        <h1 className="about-me">About Me</h1>
                        <button className="edit-button">
                            <img className="edit-button-img" src={editButton} alt="edit"/>
                        </button>
                    </div>
                    <div className="about-inner-box">
                        <p className="about-me-text">{user.abt_me != null ? user.abt_me : "a little bit about youself..."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
