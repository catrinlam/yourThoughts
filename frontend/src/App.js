// import './App.css';
import Header from "./components/Header";
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from "./components/FeedbackList";
import Login from "./components/Login";
import Signup from "./components/Signup";

import AdminDashboard from "./components/AdminDashboard";

import ManageModules from "./components/admin/ManageModules";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './utils/PrivateRoute'

import {AuthProvider} from './context/AuthContext'
import ManageAcademicYears from "./components/admin/ManageAcademicYears";
import Auth from "./components/Auth";





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
                        <Route path="/auth" element={<Auth/>}/>
                        <Route path="/admin" element={<AdminDashboard/>}/>
                        {/*<Route path="/manage-modules" element={<ManageModules/>}/>*/}
                        {/*<Route path="/manage-academicyears" element={<ManageAcademicYears/>}/>*/}
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;