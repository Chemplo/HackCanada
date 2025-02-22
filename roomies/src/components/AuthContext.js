import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(""); // Store user data

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    // Login function
    const login = async (userData) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            
            if (response.ok && data.token) {
                console.log("User logged in successfully:", data);
                localStorage.setItem("token", data.token);
                setUser(jwtDecode(data.token));
                return true;
            } else {
                console.error("Login error:", data.error);
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    };

    const addUser = async (userData) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            
            if (response.ok && data.token) {
                console.log("User signed up successfully:", data);
                localStorage.setItem("token", data.token);
                setUser(jwtDecode(data.token));
                return true;
            } else {
                console.error("Signup error:", data.error);
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, addUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
