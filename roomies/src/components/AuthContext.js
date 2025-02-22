import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(""); // Store user data

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser); // Set user from token
            } catch (error) {
                console.error("Invalid token", error);
                logout();
            }
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
            } else {
                console.error("Login error:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
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
            } else {
                console.error("Signup error:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
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
