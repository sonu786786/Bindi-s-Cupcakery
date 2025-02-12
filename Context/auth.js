"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide authentication data
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);  // Initialize with null instead of "" for clarity
  useEffect(() => {
    // Get auth data from localStorage and parse it safely

    function setitem(){const storedAuth = localStorage.getItem("auth");

    // Check if there's a valid auth token in localStorage
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuth(parsedAuth);  // Set parsed auth data to state
      } catch (e) {
        console.error("Error parsing auth data from localStorage", e);
      }
    }}
    setitem();
  }, []);  // Empty dependency array, run only once when the component mounts

  const login = (userData) => {
    setAuth(userData);  // Update the state with the user data
    localStorage.setItem("auth", JSON.stringify(userData));  // Store the user data in localStorage
  };

  const logout = () => {
    setAuth(null);  // Clear auth data from state
    localStorage.removeItem("auth");  // Remove auth data from localStorage
  };

  return (
    <AuthContext.Provider value={[auth, login, logout, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

