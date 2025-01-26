/*
import './App.css'
import RootLayout from "./components/sidebar/RootLayout.tsx";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

function App() {

  return (
    <>
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
        
        {/!*for alerts*!/}
        <ToastContainer />
    </>
  )
}

export default App
*/
/*import './App.css';
import RootLayout from "./components/sidebar/RootLayout.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage.tsx"; // Import your Login page component

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/!* Redirect default route to login *!/}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    {/!* Define login route *!/}
                    <Route path="/login" element={<LoginPage />} />
                    {/!* Define routes for the main app layout *!/}
                    <Route path="/!*" element={<RootLayout />} />
                </Routes>

                {/!* For alerts *!/}
                <ToastContainer />
            </BrowserRouter>
        </>
    );
}

export default App;*/

/*
import './App.css';
import RootLayout from "./components/sidebar/RootLayout.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage.tsx"; // Import your Login page component
import Dashboard from './pages/DashboardPage.tsx';  // Create this page as the dashboard route

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/!* Redirect default route to login *!/}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/!* Define login route *!/}
                    <Route path="/login" element={<LoginPage />} />

                    {/!* Define the main app layout route, which includes the dashboard and other pages *!/}
                    <Route path="/" element={<RootLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/!* Add other routes under RootLayout *!/}
                    </Route>
                </Routes>

                {/!* For alerts *!/}
                <ToastContainer />
            </BrowserRouter>
        </>
    );
}

export default App;
*/
import './App.css'
import RootLayout from "./components/sidebar/RootLayout.tsx";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <>
            <BrowserRouter>
                <RootLayout />
            </BrowserRouter>

            {/*for alerts*/}
            <ToastContainer />
        </>
    )
}

export default App


