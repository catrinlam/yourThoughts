import './App.css';
import Header from "./components/Header";
import SurveyForm from './components/SurveyForm';
import SurveyList from "./components/SurveyList";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Home } from '@mui/icons-material';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<SurveyList />} />
                <Route path="/survey" element={<SurveyForm />} />
            </Routes>
        </Router>
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
//       <SurveyList />
//     </div>
//   );
// };

// function App() {
//       return (
//                 <div className="App">
//                     <Header />
//                   <SurveyList />
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
// surveyList.map((survey, index) => {
//         return (
//             <div className="App">
//                 <Header/>
//                 {/*<div className="survey-item">*/}
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
//         <div className="SurveyList">
//             <h2>List</h2>
//             <div className="Survey">
//                 <h2>Module</h2>
//             </div>
//         </div>
//         <SurveyList />
//         {/*<SurveyForm />*/}
//     </div>
// );
// }

// export default App;
