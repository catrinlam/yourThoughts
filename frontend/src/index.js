import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
// import Header from './components/Header';
// import Footer from './components/Footer';

const routing = (
        <React.StrictMode>
            {/*<Header />*/}
            <Router>
                <Routes>
                <Route exact path="/" element={<App />} />
            </Routes>
            </Router>
            {/*<Footer />*/}
        </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));

// serviceWorker.unregister();
