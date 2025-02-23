import "./Profile.css";
import profilePic from "../images/Generic avatar.png";
import starIcon from "../images/Icon Button.png";
import editButton from "../images/icon.png";
import { useState, useEffect } from "react";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Fetching user data...");
                const response = await fetch(
                    "http://127.0.0.1:5000/current_user",
                    {
                        method: "GET",
                        credentials: "include", // Make sure credentials are included
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("Response status:", response.status);
                const data = await response.json();
                console.log("User data:", data);

                if (response.ok) {
                    setUserData(data);
                } else {
                    setError(data.error || "Failed to fetch user data.");
                }
            } catch (error) {
                setError("Network error: Could not connect to the server.");
                console.error("Fetch error:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <div className="about-me-page">
                <div className="about-left">
                    <div className="profile-info">
                        <img
                            className="profile-pic"
                            src={profilePic}
                            alt="Profile"
                        ></img>
                        <h1 className="profile-name">username</h1>
                        <p className="profile-pronouns">pronouns</p>
                        <h1 className="profile-university">university</h1>
                    </div>

                    <div class="profile-social-links">
                        <div className="profile-email-group">
                            <img
                                className="profile-email-icon"
                                src={starIcon}
                                alt="star"
                            />
                            <p className="profile-email">email</p>
                        </div>
                        <div className="profile-insta-group">
                            <img
                                className="profile-email-icon"
                                src={starIcon}
                                alt="star"
                            />
                            <p className="profile-insta">instagram</p>
                        </div>
                        <div className="profile-disc-group">
                            <img
                                className="profile-email-icon"
                                src={starIcon}
                                alt="star"
                            />
                            <p className="profile-disc">discord</p>
                        </div>
                    </div>
                </div>
                <div className="about-right">
                    <div className="about-right-box">
                        <div className="about-box-header">
                            <h1 className="about-me">About Me</h1>
                            <button className="edit-button">
                                <img
                                    className="edit-button-img"
                                    src={editButton}
                                    alt="edit"
                                />
                            </button>
                        </div>
                        <div className="about-inner-box">
                            <p className="about-me-text">
                                a little bit about yourself...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
