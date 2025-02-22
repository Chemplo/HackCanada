import './Signup.css';
import { useAuth } from "../components/AuthContext.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const { addUser } = useAuth();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        const userData = { email, username, password };

        try {
            const response = await addUser(userData);
            if (response) {
                navigate("/"); // ✅ Redirect to home after signup
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (err) {
            setError("Signup failed. Please try again.");
        }
    };
    
    return (
        <>
        <div className="left">
            <div className="left-text">
                <h1 className="welcome">welcome</h1>
                <h1 className="new">new</h1>
                <h1 className="roomies">roomies</h1>
            </div>
        </div>
        <div className="right">
            <Link className="right-text" to="/">roomies</Link>
            <form className="form" onSubmit={handleSignup}>
                <p className="email-text">Email</p>
                <input className="email" type="email" placeholder="example@domain" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <p className="username-text">Username</p>
                <input className="username" type="text" name="username" placeholder="JohnDoe" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <p className="password-text">Password</p>
                <input className="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="submit" type="submit">Sign Up</button>
            </form>
        </div>
        </>
    );

}

export default Signup;