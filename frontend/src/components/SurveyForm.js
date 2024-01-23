import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import 'survey-core/defaultV2.min.css';
import * as Survey from 'survey-react-ui';

const SurveyForm = ({setSurvey, fetchData}) => {
  const [newSurvey, setNewSurvey] = useState({
    'module': '',
    'question': [],
    'materialRating': 0.0
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setNewSurvey(prev => ({
      ...prev,
      [e.target.name]: e.target.name === 'questions' ? value.split(',') : e.target.name === 'materialRating' ? parseFloat(value) : value
    }));
  };

  const postSurvey = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000`, newSurvey);
      setNewSurvey({'module': ''});
      setSurvey(prevSurvey => [...prevSurvey, newSurvey]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const surveyJson = {
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "rating",
            "name": "question1",
            "title": "Material Rating:",
            "isRequired": true,
            "rateType": "stars"
          },
          {
            "type": "comment",
            "name": "question2",
            "title": "Material Review"
          },
          {
            "type": "rating",
            "name": "question3",
            "title": "Lecturer Rating",
            "rateType": "stars"
          },
          {
            "type": "comment",
            "name": "question4",
            "title": "Lecturer Review"
          }
        ]
      }
    ]
  };

  const survey = new Survey.Model(surveyJson);

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
    // Here you can send the results to your server
  }, []);

  survey.onComplete.add(alertResults);

  return (
    <div>
      <Survey.Survey model={survey}/>
      {/*<input type="text" placeholder="Add SurveyForm" value={newSurvey.module}*/}
      {/*    className="input input-bordered input-info w-full max-w-xs"*/}
      {/*    onChange={handleChange}*/}
      {/*    onKeyDown={(e) => {*/}
      {/*        if (e.key === 'Enter') {*/}
      {/*            postSurvey();*/}
      {/*        }*/}
      {/*    }} />*/}
      {/*<button onClick={postSurvey} className="btn btn-primary ml-2">Add SurveyForm</button>*/}
    </div>
  );
};

export default SurveyForm;

// const SurveyForm = ({ setSurvey, fetchData }) => {
//
//     const [newSurvey, setNewSurvey] = useState({
//         'module': '',
//       'question': [],
//       'materialRating': 0.0
//     })
//
//   const handleChange = (e) => {
//     const value = e.target.value;
//     setNewSurvey(prev => ({
//         ...prev,
//         [e.target.name]: e.target.name === 'questions' ? value.split(',') : e.target.name === 'materialRating' ? parseFloat(value) : value
//     }));
// }
//
//     // const handleChange = (e) => {
//     //     setNewSurvey(prev => ({
//     //         ...prev,
//     //         'module': e.target.value
//     //       [e.target.name]: e.target.name === 'questions' ? value.split(',') : e.target.name === 'materialRating' ? parseFloat(value) : value
//     //     }))
//     // }
//
//     const postSurvey = async () => {
//         try {
//             await axios.post(`http://127.0.0.1:8000`, newSurvey)
//             setNewSurvey({ 'module': '' })
//             setSurvey(prevSurvey => [...prevSurvey, newSurvey])
//             fetchData()
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//     // const handleKeyDown = (e) => {
//     //     if (e.key === 'Enter') {
//     //         postTodo();
//     //     }
//     // }
//
//   const surveyJson = {
//         "pages": [
//   {
//    "name": "page1",
//    "elements": [
//     {
//      "type": "rating",
//      "name": "question1",
//      "title": "Material Rating:",
//      "isRequired": true
//     }
//    ]
//   }
//  ]
//     };
//
//   const survey = new Survey.Model(surveyJson);
//   survey.onComplete.add((sender, options) => {
//         console.log(JSON.stringify(sender.data, null, 3));
//     });
//   // const alertResults = useCallback((sender) => {
//   //   const results = JSON.stringify(sender.data);
//   //   alert(results);
//   //   // saveSurveyResults(
//   //   //   "https://your-web-service.com/" + SURVEY_ID,
//   //   //   sender.data
//   //   // )
//   // }, []);
//   //
//   // survey.onComplete.add(alertResults);
//
//   return <Survey model={survey} />;
//
//
//
//     // return (
//     //     <>
//     //         <input type="text" placeholder="Add SurveyForm" value={newSurvey.module}
//     //             className="input input-bordered input-info w-full max-w-xs"
//     //             onChange={handleChange}
//     //             onKeyDown={(e) => {
//     //                 if (e.key === 'Enter') {
//     //                     postSurvey();
//     //                 }
//     //             }} />
//     //         <button onClick={postSurvey} className="btn btn-primary ml-2">Add SurveyForm</button>
//     //     </>
//     // )
// }
//
// export default SurveyForm;

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
