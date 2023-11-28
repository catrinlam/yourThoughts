import './App.css';
import Header from "./components/Header";
import SurveyForm from './components/SurveyForm';
import SurveyList from "./components/SurveyList";
import React, {useEffect, useState} from "react";

function App() {
      return (
                <div className="App">
                    <Header />
                  <SurveyList />
                </div>
            );
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
}

export default App;
