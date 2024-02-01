import axios from 'axios'
import React, {useState, useEffect, useMemo} from 'react'
import Select from 'react-select'

// import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'

function SurveyList() {
    const [surveyList, setSurvey] = useState([])
    const [selectedModule, setSelectedModule] = useState(null);
    const [moduleResults, setModuleResults] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/');
            setSurvey(response.data);
        };

        fetchModules();
    }, []);

    const uniqueModules = Array.from(new Set(surveyList.map(survey => survey.moduleName)));
    const options = uniqueModules.map(moduleName => {
        const correspondingSurvey = surveyList.find(survey => survey.moduleName === moduleName);
        return {value: correspondingSurvey.id, label: moduleName};
    });


    // const options = surveyList.map(survey => ({value: survey.id, label: survey.module}));

    const handleChange = async selectedOption => {
        setSelectedModule(selectedOption);
        const response = await axios.get(`http://127.0.0.1:8000/api/${selectedOption.label}`);
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
                        <h4>{selectedModule.label}</h4>
                        <h5>Material Ratings</h5>
                        <p>Average Material Rating: {materialRatingAvg}</p>
                        <h5>Material Feedbacks</h5>
                        {moduleResults.map((result, index) => (
                            <p key={index}>{result.materialFeedback}</p>
                        ))}
                        <h5>Lecturer Ratings</h5>
                        <p>Average Lecturer Rating: {lecturerRatingAvg}</p>
                        <h5>Lecturer Feedbacks</h5>
                        {moduleResults.map((result, index) => (
                            <p key={index}>{result.lecturerFeedback}</p>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );

}

export default SurveyList;

// {moduleResults.map((result, index) => (
//                             <p key={index}>Rating: {result.lecturerRating}</p>
//                         ))}

{/*{moduleResults.map((result, index) => (*/}
                        {/*    // <p>Average Material Rating: {materialRatingAvg.toFixed(2)}</p>*/}
                        {/*    // <p key={index}>Rating: {result.materialRating}</p>*/}
                        {/*))}*/}

    // const handleChange = async selectedOption => {
    //     setSelectedModule(selectedOption);
    //     const response = await axios.get(`http://127.0.0.1:8000/api/feedback/${selectedOption.value}`);
    //     console.log(response.data);
    //     setModuleResults(response.data);
    // };

{/*<Select options={surveyList.map(survey => ({value: survey.id, label: survey.moduleName}))} onChange={handleChange}/>*/}
            {/*<Select options={options} onChange={handleChange}/>*/}
            {/*<p>Selected Module: {selectedModule ? selectedModule.label : 'None'}</p>*/}
            {/*{moduleResults && (*/}
            {/*    <div>*/}
            {/*      <h3>Results for {selectedModule.label}:</h3>*/}
            {/*      <div>*/}
            {/*        <h4>{moduleResults.moduleName}</h4>*/}
            {/*        <p>{moduleResults.materialQuestion}</p>*/}
            {/*        <p>Rating: {moduleResults.materialRating}</p>*/}
            {/*        <p>Feedback: {moduleResults.materialFeedback}</p>*/}
            {/*        <p>{moduleResults.lecturerQuestion}</p>*/}
            {/*        <p>Rating: {moduleResults.lecturerRating}</p>*/}
            {/*        <p>Feedback: {moduleResults.lecturerFeedback}</p>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{moduleResults && (*/}
            {/*    <div>*/}
            {/*        <h3>Results for {selectedModule.label}:</h3>*/}
            {/*        {Array.isArray(moduleResults) ? moduleResults.map((result, index) => (*/}
            {/*            <div key={index}>*/}
            {/*                <h4>{result.moduleName}</h4>*/}
            {/*                <p>{result.materialQuestion}</p>*/}
            {/*                <p>Material Rating: {result.materialRating}</p>*/}
            {/*                <p>Material Feedback: {result.materialFeedback}</p>*/}
            {/*                <p>{result.lecturerQuestion}</p>*/}
            {/*                <p>Lecturer Rating: {result.lecturerRating}</p>*/}
            {/*                <p>Lecturer Feedback: {result.lecturerFeedback}</p>*/}
            {/*            </div>*/}
            {/*        )) : (*/}
            {/*            <div>*/}
            {/*                <h4>{moduleResults.moduleName}</h4>*/}
            {/*                <p>{moduleResults.materialQuestion}</p>*/}
            {/*                <p>Material Rating: {moduleResults.materialRating}</p>*/}
            {/*                <p>Material Feedback: {moduleResults.materialFeedback}</p>*/}
            {/*                <p>{moduleResults.lecturerQuestion}</p>*/}
            {/*                <p>Lecturer Rating: {moduleResults.lecturerRating}</p>*/}
            {/*                <p>Lecturer Feedback: {moduleResults.lecturerFeedback}</p>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*)}*/}

// useEffect(() => {
//     // async function fetchSurvey(){
//     //   const response = await fetch('http://127.0.0.1:8000/api/');
//     //   response.json()
//     //       .then(response => setSurvey(response.response))
//     //       .catch(err => setErrors(err));
//     // }
//     // fetchSurvey();
//     setSurvey([
//         {
//             "id": 1,
//             "module": "Module 1",
//             "questions": [
//                 {
//                     "question": "Question 1",
//                     "answers": ["Answer 1", "Answer 2", "Answer 3"]
//                 },
//                 {
//                     "question": "Question 2",
//                     "answers": ["Answer 1", "Answer 2", "Answer 3"]
//                 }
//             ]
//         },
//         {
//             "id": 2,
//             "module": "Team Project",
//             "questions": [
//                 {
//                     "question": "Question 1",
//                     "answers": ["Answer 1", "Answer 2", "Answer 3"]
//                 },
//                 {
//                     "question": "Question 2",
//                     "answers": ["Answer 1", "Answer 2", "Answer 3"]
//                 }
//             ]
//         }
//     ])
// }, [])


// const getSurvey = async () => {
//   const response = await fetch('http://127.0.0.1:8000/api/')
//   const data = response.json()
// }
//
// return (
//       <div>
//           <h2>feedback:</h2>
//           {surveyList.map((feedback, index) => {
//               return (
//                   <div className="feedback-item" key={index}>
//                     <Select options={[{ value: feedback.module, label: feedback.module }]} />
//                       <p>{feedback.module}</p>
//                   </div>
//               );
//           })}
//       </div>
//   );

// const SurveyList = ({ surveys, isLoading, setSurvey }) => {
//
//   const [editText, setEditText] = useState({
//     'module': ''
//   })
//
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
//       const newList = todos.filter(todo => todo.id !== id)
//       setTodos(newList)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   const handleEdit = async (id, value) => {
//     try {
//       const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
//       console.log(response.data);
//       const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
//       setTodos(newTodos)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//
//   const handleChange = (e) => {
//     console.log(e.target.value);
//     setEditText(prev => ({
//       ...prev,
//       'module': e.target.value
//     }))
//     console.log(editText);
//   }
//
//   const handleClick = () => {
//     handleEdit(editText.id, editText)
//     setEditText({
//       'module': ""
//     })
//   }
//
//   const handleCheckbox = (id, value) => {
//     console.log(value.completed);
//     handleEdit(id, {
//       'completed': !value
//     })
//   }
//
//
//   return (
//     <div>
//       <table className='w-11/12 max-w-4xl'>
//         <thead className='border-b-2 border-black'>
//           <tr>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>To Do</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Created</th>
//             <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? <div>Is Loading </div> :
//             <> {todos.map((todoItem, index) =>
//             (
//               <tr key={todoItem.id} className='border-b border-black'>
//                 <td className='p-3'>
//                   <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
//                     className='inline-block cursor-pointer'>{todoItem.completed === true ? <MdOutlineCheckBox /> :
//                       <MdOutlineCheckBoxOutlineBlank />}
//                   </span>
//                 </td>
//                 <td className='p-3 text-sm ' title={todoItem.id}>{todoItem.body}</td>
//                 <td className='p-3 text-sm text-center'>
//                   <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-green-300' : 'bg-red-300'}`}>
//                     {todoItem.completed ? 'Done' : 'Incomplete'}
//                   </span>
//                 </td>
//                 <td className='p-3 text-sm font-medium'>{new Date(todoItem.created).toLocaleString()}</td>
//                 <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5 '>
//                   <span><label htmlFor="my-modal" ><MdEditNote onClick={() => setEditText(todoItem)} className=' text-xl cursor-pointer' /></label></span>
//                   <span className=' text-xl cursor-pointer'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></span>
//
//                 </td>
//               </tr>
//             )
//             )}</>}
//         </tbody>
//       </table>
//
//       {/* Modal */}
//       <input type="checkbox" id="my-modal" className="modal-toggle" />
//       <div className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Edit Todo</h3>
//           <input type="text" value={editText.body} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full mt-8" />
//           <div className="modal-action">
//             <label htmlFor="my-modal" onClick={handleClick} className="btn btn-primary">Edit</label>
//             <label htmlFor="my-modal" className="btn">Close</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default SurveyList;
