import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./components/Index";
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from "./components/FeedbackList";
import Auth from "./components/Auth";
import AdminDashboard from "./components/AdminDashboard";
import {AuthProvider} from './context/AuthContext';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//     App-content {
//         margin: 0 5%; /* Default margin for small screens */
//     }
//
//     @media (min-width: 768px) {
//         App-content {
//             margin: 0 5%; /* Larger margin for medium screens and up */
//         }
//     }
// `;

function App() {
    return (
        <div className="App d-flex flex-column min-vh-100">
            {/*<GlobalStyle />*/}
            <Router>
                <AuthProvider>
                    <Header />
                    <div className="App-content flex-fill">
                        <Routes>
                            <Route path="/" element={<Index/>}/>
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