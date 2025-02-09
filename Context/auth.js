// /Context/auth.js
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
  const [auth, setAuth] = useState("") ;
  // Load authentication data from localStorage or cookies
  useEffect(() => {
    function abc(){
      // console.log(localStorage.getItem("auth"),"in use effect")
    // const storedAuth = ;
    if (localStorage.getItem("auth")) {
      setAuth(() => localStorage.getItem("auth"));
    }
    
    }
    abc();
    // console.log(auth,"auth")
  }, []);
  
  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={[ auth , login, logout, setAuth ]}>
      {children}
    </AuthContext.Provider>
  );
};
