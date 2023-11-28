import React, { useEffect, useState } from 'react';
import axios from 'axios'

const SurveyForm = ({ setSurvey, fetchData }) => {

    const [newSurvey, setNewSurvey] = useState({
        'module': ''
    })

    const handleChange = (e) => {
        setNewSurvey(prev => ({
            ...prev,
            'module': e.target.value
        }))
    }

    const postSurvey = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000`, newSurvey)
            setNewSurvey({ 'module': '' })
            setSurvey(prevSurvey => [...prevSurvey, newSurvey])
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         postTodo();
    //     }
    // }



    return (
        <>
            <input type="text" placeholder="Add SurveyForm" value={newSurvey.module}
                className="input input-bordered input-info w-full max-w-xs"
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        postSurvey();
                    }
                }} />
            <button onClick={postSurvey} className="btn btn-primary ml-2">Add SurveyForm</button>
        </>
    )
}

export default SurveyForm;

// function SurveyForm() {
// 	const [appState, setAppState] = useState("");
//
// 	const fetchData = async () => {
// 		try {
// 			const response = await axios.get('http://127.0.0.1:8000');
// 			setSurvey(response.data)
// 		} catch (error){
// 			console.log(error);
// 		}
// 	}
// 	return (
// 		<div className="App">
// 			<h1>Latest Posts</h1>
//
// 		</div>
// 	);
// }
