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
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: userData,
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                return data; // ✅ Return response to handle in `Signup.js`
            } else {
                throw new Error(data.error || "Signup failed");
            }
        } catch (error) {
            console.error("Error:", error);
            return null; // Return null on failure
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
