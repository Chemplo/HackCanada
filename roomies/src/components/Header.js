import './Header.css';
import { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <div className="header">
            <Link className="logo" to="/">roomies</Link>

            <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
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