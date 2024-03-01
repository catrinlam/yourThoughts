import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Index from "./components/Index";
import FeedbackForm from './components/FeedbackForm';
import FeedbackResults from "./components/FeedbackResults";
import Auth from "./components/Auth";
import AdminDashboard from "./components/AdminDashboard";
import {AuthProvider} from './context/AuthContext';

function App() {

    return (
        <div className="App d-flex flex-column min-vh-100">
            <Router>
                <AuthProvider>
                    <Header className="App-header"/>
                    <div className="App-content flex-fill">
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/results" element={<FeedbackResults/>}/>
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
    );
}

export default App;