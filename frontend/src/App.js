import './App.css';
import Header from "./components/Header";
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from "./components/FeedbackList";
import Login from "./components/Login";
import Signup from "./components/Signup";

import ManageModules from "./components/ManageModules";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'

import {AuthProvider} from './context/AuthContext'




function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<FeedbackList/>}/>
                        <Route path="/feedback" element={<FeedbackForm/>}/>
                        {/*<Route path="/feedback" element={<PrivateRoute><FeedbackForm/></PrivateRoute>}/>*/}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/manage-modules" element={<ManageModules/>}/>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;