import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Store user data

    // Login function
    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                setUser(data.user); // Set user data
            }
        } catch (error) {
            console.error("Login failed", error);
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
            
            if (response.ok) {
                console.log("User signed up successfully:", data);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setUser(data.user);
                }
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
