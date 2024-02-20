import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Index from "./components/Index";
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from "./components/FeedbackList";
import Auth from "./components/Auth";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

import AdminDashboard from "./components/AdminDashboard";

import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGlobalStyle } from 'styled-components';
import PrivateRoute from './utils/PrivateRoute'

import {AuthProvider} from './context/AuthContext'

function App() {
    return (
        <div className="App d-flex flex-column min-vh-100">
            <Router>
                <AuthProvider>
                    <Header />
                    <div className="App-content flex-fill">
                        <Routes>
                            {/*<Route path="/" element={<Index/>}/>*/}
                            <Route path="/results" element={<FeedbackList/>}/>
                            <Route path="/feedback" element={<FeedbackForm/>}/>
                            <Route path="/auth" element={<Auth/>}/>
                            <Route path="/admin" element={<AdminDashboard/>}/>
                        </Routes>
                    </div>
                    <Footer />
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;