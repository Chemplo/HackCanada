import './Login.css';
import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate("/"); // Redirect to home on success
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
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    );

}

export default Login;