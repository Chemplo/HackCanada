import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Store user data

    // Login function
    const login = async (userData) => {
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
                console.log("User logged in successfully:", data);
                if (data.token) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
            }
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
