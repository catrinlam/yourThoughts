import './App.css';
import Header from "./components/Header";
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from "./components/FeedbackList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'

import {AuthProvider} from './context/AuthContext'
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {Home} from '@mui/icons-material';


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
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;

// function App() {
//   const [collapsed, setCollapsed] = useState(false);
//
//   const handleToggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };
//
//   return (
//     <Sidebar collapsed={collapsed}>
//       <Menu>
//         <MenuItem icon={<Home />}>YourThoughts</MenuItem>
//         {/* More menu items... */}
//       </Menu>
//       <button onClick={handleToggleSidebar}>Toggle Sidebar</button>
//     </Sidebar>
//   );
// }


// function App() {
// const { collapseSidebar } = useProSidebar();
//   return (
//     <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
//     </div>
//   );
// }

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//
//   return (
//     <div>
//       <button onClick={toggleSidebar}>Toggle Sidebar</button>
//       {isSidebarOpen && <Header />}
//       <FeedbackList />
//     </div>
//   );
// };

// function App() {
//       return (
//                 <div className="App">
//                     <Header />
//                   <FeedbackList />
//                 </div>
//             );
// const [surveyList, setSurvey] = useState([])
//
// useEffect(() => {
//     setSurvey([
//         {
//             "id": "1",
//             "module": "Module 1",
//         },
//         {
//             "id": "2",
//             "module": "Module 2",
//         }
//     ])
// }, [])
//
// surveyList.map((feedback, index) => {
//         return (
//             <div className="App">
//                 <Header/>
//                 {/*<div className="feedback-item">*/}
//                 {/*    <h2>{module.name}</h2>*/}
//                 {/*</div>*/}
//             </div>
//         );
//     }
// );

// return (
//     <div className="App">
//         {/*<Header />*/}
//         <header className="App-header">
//             <h1>YourTHOUGHTS</h1>
//         </header>
//         <div className="FeedbackList">
//             <h2>List</h2>
//             <div className="Survey">
//                 <h2>Module</h2>
//             </div>
//         </div>
//         <FeedbackList />
//         {/*<FeedbackForm />*/}
//     </div>
// );
// }

// export default App;
