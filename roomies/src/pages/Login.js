import './Login.css';
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const { login } = useAuth();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const userData = { user, password };

        try {
            const response = await login(userData);
            if (response) {
                navigate("/"); // ✅ Redirect to home after signup
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <>
        <div className="left">
            <div className="left-text">
                <h1 className="welcome">welcome</h1>
                <h1 className="back">back</h1>
                <h1 className="roomies">roomies</h1>
            </div>
        </div>
        <div className="right">
            <Link className="right-text" to="/">roomies</Link>
            <form className="form" onSubmit={handleSubmit}>
                <p className="user-text">Username/Email</p>
                <input className="user" type="text" placeholder="John Doe" value={user} onChange={(e) => setUser(e.target.value)} required />
                <p className="password-text">Password</p>
                <input className="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="submit" type="submit">Login</button>
            </form>
            <div className="extra">
                <Link className="forgot" to="/womp">Forgot Password?</Link>
                <Link className="signup" to="/signup">New user?</Link>
            </div>
        </div>
        </>
    );

}

export default Login;