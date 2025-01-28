/*
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    onLogin: () => void; // Callback function to handle login
}

function LoginPage({ onLogin }: LoginPageProps) {
    const navigate = useNavigate();

    const handleSignIn = (event: React.FormEvent) => {
        event.preventDefault();
        // Perform any login logic here (e.g., validation, API calls)
        // After successful login, call onLogin to update the state and navigate
        onLogin(); // Update authentication state
        navigate('/'); // Navigate to the dashboard
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <h1 style={{ color: '#432e32', textAlign: 'center' }}>Login</h1>
                <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                    <button
                        type="submit"
                        style={{ padding: '10px', backgroundColor: '#674b50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
    onLogin?: () => void; // Optional callback for login handling
}

function LoginPage({ onLogin }: LoginPageProps) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (event: React.FormEvent) => {
        event.preventDefault();
        if (username && password) {
            // Trigger login callback if provided
            if (onLogin) onLogin();
            // Navigate to the dashboard
            navigate("/");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div
                className="flex justify-center items-center bg-green-500 px-6 py-12 rounded-lg"
                style={{ width: "1000px", height: "700px" }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-full">
                    {/* Form Section */}
                    <div className="flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="flex items-center justify-center space-x-2 mt-8">
                            <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
                                Welcome Back!
                            </h1>
                        </div>
                        <h2 className="mt-2 mb-6 text-center text-2xl font-semibold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSignIn}>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:ring-indigo-600 focus:ring-2 focus:border-indigo-600 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:ring-indigo-600 focus:ring-2 focus:border-indigo-600 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-indigo-600 focus:ring-2 focus:ring-offset-2"
                                    >
                                        Sign in
                                    </button>
                                    <p className="mt-10 text-center text-sm text-gray-500">
                                        Don't have an account?{" "}
                                    </p>
                                    <button
                                        type="button"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-indigo-600 focus:ring-2 focus:ring-offset-2 mt-4"
                                        onClick={() => navigate("/signup")}
                                    >
                                        Create account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center h-full rounded-lg overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="/flower3.jpg"
                            alt="Login"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

