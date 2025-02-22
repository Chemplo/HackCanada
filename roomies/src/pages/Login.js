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
        <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={user} onChange={(e) => setUser(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    );

}

export default Login;