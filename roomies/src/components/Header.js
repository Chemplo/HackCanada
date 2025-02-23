import './Header.css';
import { useState } from 'react';
import { useAuth } from "../components/AuthContext.js";
import { Link } from "react-router-dom";
import profileIcon from "../images/Generic avatar.png";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth(); // Get user state & logout function

    return (
        <>
        <div className="header">
            <Link className="logo" to="/">roomies</Link>

            <div className="header-left">
                {user ? (  // If user is logged in, show profile icon
                    <div className="profile-container">
                        <Link to="/profile">
                            <img className="profile-icon" src={profileIcon} alt="Profile" />
                        </Link>
                        <Link className="logout-wrapper" to="/">
                        <button className="logout-btn" onClick={logout}>Logout</button>
                        </Link>
                    </div>
                ) : (  // Otherwise, show login/signup buttons
                    <Link className="login-btn" to="/login">
                        Login / Signup
                    </Link>
                )}

                <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
            </div>
        </div>
        {isOpen && (
            <div className="dropdown-menu">
                <Link className="dashboard" to="/" onClick={() => setIsOpen(!isOpen)}>Home</Link>
                <span className="divider"/>
                <Link className="question" to="/questionnaire" onClick={() => setIsOpen(!isOpen)}>Questionnaire</Link>
                <span className="divider"/>
                <Link className="results" to="/results" onClick={() => setIsOpen(!isOpen)}>Results</Link>
                <span className="divider"/>
                <Link className="profile" to="/profile" onClick={() => setIsOpen(!isOpen)}>My Profile</Link>
                <span className="divider"/>
                <Link className="about" to="/about" onClick={() => setIsOpen(!isOpen)}>About Us</Link>
            </div>
        )}
        </>
    );
}

export default Header;