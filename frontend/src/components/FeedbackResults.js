import React, {useState, useMemo, useContext, useEffect} from 'react'
import Select from 'react-select'
import {Accordion, Card, ListGroup, ListGroupItem, Alert} from 'react-bootstrap';
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import useFetchData from "../utils/FetchData";

function FeedbackResults() {
    const {user} = useContext(AuthContext);
    const {dataList: moduleList} = useFetchData('/api/modules/');
    const {dataList: academicYearsList} = useFetchData('/api/academicyears/');
    const options = moduleList.map(module => ({value: module.code, label: module.title}));
    const [selectedModule, setSelectedModule] = useState(null);
    const [moduleResults, setModuleResults] = useState(null);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (academicYearsList.length > 0) {
            const sortedYears = academicYearsList.sort((a, b) => b.year - a.year);
            const latestYear = sortedYears[0];
            setSelectedAcademicYear({value: latestYear.id, label: latestYear.year});
        }
    }, [academicYearsList]);

    const handleChange = async selectedOption => {
        setSelectedModule(selectedOption);
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
        const response = await api.get(`/api/feedback/${selectedOption.value}`, {headers});
        const summary = await api.get(`/api/summarize-feedback/${selectedOption.value}/${selectedAcademicYear.label}`, {headers});
        console.log(response.data);
        console.log(summary.data);
        setModuleResults(response.data);
        setSummary(summary.data);
    };

    const materialRatingAvg = useMemo(() => {
        if (!moduleResults || moduleResults.length === 0) {
            return "No ratings yet";
        }

        const materialRatingSum = moduleResults.reduce((sum, result) => sum + result.materialRating, 0);
        return (materialRatingSum / moduleResults.length).toFixed(2);
    }, [moduleResults]);

    const lecturerRatingAvg = useMemo(() => {
        if (!moduleResults || moduleResults.length === 0) {
            return "No ratings yet";
        }

        const lecturerRatingSum = moduleResults.reduce((sum, result) => sum + result.lecturerRating, 0);
        return (lecturerRatingSum / moduleResults.length).toFixed(2);
    }, [moduleResults]);

    const renderFeedbackItems = (feedbackList, label) => {
        return (
            <>
                {feedbackList.length > 0 ? (
                    feedbackList.map((feedback, index) => (
                        <ListGroupItem key={index}>
                            <strong>{label} {index + 1}:</strong> {feedback}
                        </ListGroupItem>
                    ))
                ) : <Alert variant="info">No feedback available.</Alert>}
            </>
        );
    };

    const convertToPercentage = (ratingAvg) => ratingAvg * 20;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Module Survey Results</h2>
            <Select options={options} onChange={handleChange}
                    className="mb-4"
                    placeholder="Select a module..."
            />
            {
                moduleResults && (
                    <Card>
                        <Card.Header as="h3">Results for {selectedModule.label}</Card.Header>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Material</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush">
                                        <ListGroupItem>
                                            <strong>Material Ratings</strong>
                                            <p>Average Material Rating: {materialRatingAvg}</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <strong>Material Feedbacks</strong>
                                            <br/>
                                            <strong>Summary:</strong>
                                            <p>{summary.summary_material}</p>
                                            {renderFeedbackItems(moduleResults.map(result => result.materialFeedback), 'Feedback')}
                                        </ListGroupItem>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        {user && (
                            <>
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Lecturer</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <ListGroupItem>
                                                    <strong>Lecturer Ratings</strong>
                                                    <p>Average Lecturer Rating: {lecturerRatingAvg}</p>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <strong>Lecturer Feedbacks</strong>
                                                    <strong>Summary:</strong>
                                                    <p>{summary.summary_lecturer}</p>
                                                    {renderFeedbackItems(moduleResults.map(result => result.lecturerFeedback), 'Feedback')}
                                                </ListGroupItem>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </>
                        )}

                    </Card>
                )
            }
        </div>
    );
}

export default FeedbackResults;


//     <div className="container mt-4">
//         <h2 className="mb-3">Module Survey Results:</h2>
//          <Select options={options} onChange={handleChange}

//             className="mb-4"
//             placeholder="Select a module..."
//     />
//     {moduleResults && (
//         <Accordion defaultActiveKey="0">
//             <Card>
//                 <Accordion.Toggle as={Card.Header} eventKey="0">
//                     <h5>Material Feedback</h5>
//                 </Accordion.Toggle>
//                 <Accordion.Collapse eventKey="0">
//                     <ListGroup variant="flush">
//                         <ListGroupItem>
//                             <strong>Material Ratings</strong>
//                             <ProgressBar now={convertToPercentage(materialRatingAvg)}
//                                          label={`${materialRatingAvg}/5`}/>
//                         </ListGroupItem>
//                         <ListGroupItem>
//                             <strong>Material Feedbacks</strong>
//                             <p><strong>Summary:</strong> {summary.summary_material}</p>
//                             {renderFeedbackItems(moduleResults.map(result => result.materialFeedback), 'Feedback', summary.summary_material)}
//                         </ListGroupItem>
//                     </ListGroup>
//                 </Accordion.Collapse>
//             </Card>
//             {user && (
//                 <Card>
//                     <Accordion.Toggle as={Card.Header} eventKey="1">
//                         <h5>Lecturer Feedback</h5>
//                     </Accordion.Toggle>
//                     <Accordion.Collapse eventKey="1">
//                         <ListGroup variant="flush">
//                             <ListGroupItem>
//                                 <strong>Lecturer Ratings</strong>
//                                 <ProgressBar now={convertToPercentage(lecturerRatingAvg)}
//                                              label={`${lecturerRatingAvg}/5`}/>
//                             </ListGroupItem>
//                             <ListGroupItem>
//                                 <strong>Lecturer Feedbacks</strong>
//                                 <p><strong>Summary:</strong> {summary.summary_lecturer}</p>
//                                 {renderFeedbackItems(moduleResults.map(result => result.lecturerFeedback), 'Feedback', summary.summary_lecturer)}
//                             </ListGroupItem>
//                         </ListGroup>
//                     </Accordion.Collapse>
//                 </Card>
//             )}
//         </Accordion>
//     )}
// </div>