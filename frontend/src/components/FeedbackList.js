import axios from 'axios'
import React, {useState, useEffect, useMemo, useContext} from 'react'
import Select from 'react-select'
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import useFetchModules from "../utils/FetchModules";

function FeedbackList() {
    const {user} = useContext(AuthContext);
    const { moduleList } = useFetchModules();
    const options = moduleList.map(module => ({value: module.code, label: module.title}));
    const [selectedModule, setSelectedModule] = useState(null);
    const [moduleResults, setModuleResults] = useState(null);
    const loggedIn = localStorage.getItem('loggedIn');
    const initialLoggedIn = loggedIn === 'true';


    const handleChange = async selectedOption => {
        setSelectedModule(selectedOption);
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
        const response = await api.get(`/api/${selectedOption.value}`, {headers});
        console.log(response.data);
        setModuleResults(response.data);
    };

    const materialRatingAvg = useMemo(() => {
        if (!moduleResults) {
            return null;
        }

        const materialRatingSum = moduleResults.reduce((sum, result) => sum + result.materialRating, 0);
        return (materialRatingSum / moduleResults.length).toFixed(2);
    }, [moduleResults]);

    const lecturerRatingAvg = useMemo(() => {
        if (!moduleResults) {
            return null;
        }

        const lecturerRatingSum = moduleResults.reduce((sum, result) => sum + result.lecturerRating, 0);
        return (lecturerRatingSum / moduleResults.length).toFixed(2);
    }, [moduleResults]);


    return (
        <div>
            <h2>survey:</h2>
            <Select options={options} onChange={handleChange}/>
            {moduleResults && (
                <div>
                    <h3>Results for {selectedModule.label}:</h3>
                    <div>
                        <h5>Material Ratings</h5>
                        <p>Average Material Rating: {materialRatingAvg}</p>
                        <h5>Material Feedbacks</h5>
                        {moduleResults.map((result, index) => (
                            <p key={index}>{result.materialFeedback}</p>
                        ))}
                        {initialLoggedIn && (
                            <>
                                <h5>Lecturer Ratings</h5>
                                <p>Average Lecturer Rating: {lecturerRatingAvg}</p>
                                <h5>Lecturer Feedbacks</h5>
                                {moduleResults.map((result, index) => (
                                    <p key={index}>{result.lecturerFeedback}</p>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedbackList;