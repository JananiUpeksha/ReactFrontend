/*
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Use Redux state
import RootLayout from "./components/sidebar/RootLayout";
import { ToastContainer } from "react-toastify";
import React from "react";
import LoginFormComponent from "./components/login/LoginFormComponenet.tsx";
import SignUpFormComponent from "./components/signup/SignupFormComponent.tsx";

function App() {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // ✅ Get from Redux

    console.log("App Component - isAuthenticated:", isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginFormComponent />} />
                <Route path="/signup" element={<SignUpFormComponent />} />

                {/!* Protected Routes *!/}
                <Route
                    path="/!*"
                    element={
                        isAuthenticated ? (
                            <RootLayout />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;*/
import "./App.css";
/*import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RootLayout from "./components/sidebar/RootLayout";
import { ToastContainer } from "react-toastify";
import React from "react";*/

import React from "react";
import RootLayout from "./components/sidebar/RootLayout.tsx";
import {useSelector} from "react-redux";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify/unstyled";
import LoginFormComponent from "./components/login/loginForm.tsx";
import SignUpFormComponent from "./components/signup/SignupForm.tsx";


function App() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    console.log("App Component - isAuthenticated:", isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginFormComponent />} />
                <Route path="/signup" element={<SignUpFormComponent />} />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <RootLayout />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
