import React, {useState, useMemo, useContext, useEffect} from 'react'
import {Form, Dropdown, Accordion, Card, ListGroup, ListGroupItem, Alert, Button} from 'react-bootstrap';
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import useFetchData from "../utils/FetchData";
import {Link} from "react-router-dom";

function FeedbackResults() {
    const {user} = useContext(AuthContext);
    const {dataList: moduleList} = useFetchData('/api/modules/');
    const {dataList: academicYearsList} = useFetchData('/api/academicyears/');
    const [filterModuleValue, setfilterModuleValue] = useState('');
    const [selectedModule, setSelectedModule] = useState(null);
    const [moduleResults, setModuleResults] = useState(null);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
    const [summary, setSummary] = useState(null);

    const filteredModules = moduleList.filter(module =>
        module.title.toLowerCase().includes(filterModuleValue.toLowerCase())
    );

    useEffect(() => {
        if (academicYearsList.length > 0) {
            const sortedYears = academicYearsList.sort((a, b) => b.year - a.year);
            const latestYear = sortedYears[0];
            setSelectedAcademicYear({value: latestYear.id, label: latestYear.year});
        }
    }, [academicYearsList]);

    const handleChangeModule = async (selectedModuleCode) => {
        setfilterModuleValue('');
        const selectedModule = moduleList.find(module => module.code === selectedModuleCode);
        setSelectedModule(selectedModule);
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));
        const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
        const response = await api.get(`/api/feedback/${selectedModule.code}`, {headers});
        const summary = await api.get(`/api/summarize-feedback/${selectedModule.code}/${selectedAcademicYear.label}`, {headers});
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

    const assessmentRatingAvg = useMemo(() => {
        if (!moduleResults || moduleResults.length === 0) {
            return "No ratings yet";
        }

        const assessmentRatingSum = moduleResults.reduce((sum, result) => sum + result.assessmentRating, 0);
        return (assessmentRatingSum / moduleResults.length).toFixed(2);
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
            <Dropdown className="mb-3" onSelect={handleChangeModule}>
                <Dropdown.Toggle variant="secondary" id="dropdown-module-select">
                    {selectedModule ? selectedModule.title : "Select a module..."}
                </Dropdown.Toggle>

                <Dropdown.Menu show style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                }}>

                    <Form.Control
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Search for a module..."
                        onChange={(e) => setfilterModuleValue(e.target.value)}
                        value={filterModuleValue}
                    />

                    {filteredModules.map(module => (
                        <Dropdown.Item key={module.code} eventKey={module.code}>
                            {module.title}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            {selectedAcademicYear && selectedModule && <Button as={Link} to={`https://www.cs.bham.ac.uk/internal/modules/${selectedAcademicYear.label}/${selectedModule.code}/`} className="mb-2 me-2" target="_blank"
                                                          rel="noopener noreferrer">Module details</Button>}
            {!user && selectedAcademicYear && selectedModule && <Button as={Link} to="/auth" variant="secondary" className="mb-2">Log in/Sign up for feedbacks on other aspect of the module</Button>}
            {
                moduleResults && (
                    <Card>
                        <Card.Header as="h3">Results for {selectedModule.title}</Card.Header>
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
                                            <p>Summary:</p>
                                            <p>{summary.summary_material}</p>
                                            {renderFeedbackItems(moduleResults.map(result => result.materialFeedback), 'Feedback')}
                                        </ListGroupItem>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Assessment</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush">
                                        <ListGroupItem>
                                            <strong>Assessment Ratings</strong>
                                            <p>Average Assessment Rating: {assessmentRatingAvg}</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <strong>Assessment Feedbacks</strong>
                                            <br/>
                                            <p>Summary:</p>
                                            <p>{summary.summary_assessment}</p>
                                            {renderFeedbackItems(moduleResults.map(result => result.ssessmentFeedback), 'Feedback')}
                                        </ListGroupItem>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        {user && (
                            <>
                                <Accordion defaultActiveKey="2">
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Lecturer</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <ListGroupItem>
                                                    <strong>Lecturer Ratings</strong>
                                                    <p>Average Lecturer Rating: {lecturerRatingAvg}</p>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <strong>Lecturer Feedbacks</strong>
                                                    <br/>
                                                    <p>Summary:</p>
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