import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/sidebar/RootLayout";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "./App.css";
import SignUpPage from "./pages/SignupPage.tsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

    console.log("App Component - isAuthenticated:", isAuthenticated);

    return (
        <Router>
            <Routes>
                {/* Login Route */}
                <Route
                    path="/login"
                    element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} // Pass onLogin callback

                />
                <Route
                    path="/signup"
                    element={<SignUpPage />} // Add route for sign-up page
                />

                {/* Protected Routes */}
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <RootLayout />
                        ) : (
                            <Navigate to="/login" replace /> // Redirect to login if not authenticated
                        )
                    }
                />
            </Routes>
            <ToastContainer /> {/* For alerts */}
        </Router>
    );
}

export default App;