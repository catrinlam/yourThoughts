import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Index from "./components/Index";
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from "./components/FeedbackList";
import Auth from "./components/Auth";
import AdminDashboard from "./components/AdminDashboard";
import {AuthProvider} from './context/AuthContext';

import {createContext, useState} from "react";
// import useLocalStorage from "use-local-storage";

export const ThemeContext = createContext(null);

function App() {
    // const defaultTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // const [theme, setTheme] = useLocalStorage('theme', defaultTheme ? 'dark' : 'light')

    // const [theme, setTheme] = useState(
    //     window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    //
    // const toggleTheme = () => {
    //     setTheme(prevTheme => {
    //         return prevTheme === 'light' ? 'dark' : 'light';
    //     });
    // }
    return (
        // <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className="App d-flex flex-column min-vh-100">
            <Router>
                <AuthProvider>
                    <Header className="App-header"/>
                    <div className="App-content flex-fill">
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/results" element={<FeedbackList/>}/>
                            <Route path="/feedback" element={<FeedbackForm/>}/>
                            <Route path="/auth" element={<Auth/>}/>
                            <Route path="/admin" element={<AdminDashboard/>}/>
                        </Routes>
                    </div>
                    <Footer className="App-footer"/>
                    <ThemeSwitcher/>
                </AuthProvider>
            </Router>
        </div>
        // </ThemeContext.Provider>
    );
}

export default App;