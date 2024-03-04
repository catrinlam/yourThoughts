import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import useFetchData from "../utils/FetchData";
import {useNavigate} from 'react-router-dom';
import {Button, Dropdown, Form, Col, Row} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';


const FeedbackForm = () => {
    const {user} = useContext(AuthContext);
    const {dataList: moduleList} = useFetchData('/api/modules/');
    const {dataList: academicYearsList} = useFetchData('/api/academicyears/');
    const [filterModuleValue, setfilterModuleValue] = useState('');
    const [lecturersNames, setLecturersNames] = useState('');
    const [academicYear, setAcademicYear] = useState(0);
    const [materialRating, setMaterialRating] = useState(0);
    const [materialReview, setMaterialReview] = useState('');
    const [assessmentRating, setAssessmentRating] = useState(0);
    const [assessmentReview, setAssessmentReview] = useState('');
    const [lecturerRating, setLecturerRating] = useState(0);
    const [lecturerReview, setLecturerReview] = useState('');
    const [module, setModule] = useState('');
    const [selectedModule, setSelectedModule] = useState(null);
    const [moduleError, setModuleError] = useState("");
    const [lecturersNamesError, setLecturersNamesError] = useState('');
    const [formError, setFormError] = useState('');

    const filteredModules = moduleList.filter(module =>
        module.title.toLowerCase().includes(filterModuleValue.toLowerCase())
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (academicYearsList.length > 0) {
            const sortedYears = academicYearsList.sort((a, b) => b.year - a.year);
            const latestYear = sortedYears[0];
            setAcademicYear(latestYear.id); // Assuming you're using the ID as the value
        }
    }, [academicYearsList]);

    const handleChangeModule = async (selectedModuleCode) => {
        setModuleError('');
        setfilterModuleValue('');
        const selectedModule = moduleList.find(module => module.code === selectedModuleCode);
        setSelectedModule(selectedModule);
        setModule(selectedModule.id);
        setLecturersNames(selectedModule.lecturersNames ? (selectedModule.lecturersNames.includes(',') ? selectedModule.lecturersNames.split(', ') : [selectedModule.lecturersNames]) : null);
    };

    const checkReviewForLecturerName = (review) => {
        if (!module) {
            setModuleError("Please select a module before writing the review.")
            return false;
        }
        if (!lecturersNames) return false;
        const namesArray = Array.isArray(lecturersNames) ? lecturersNames : [lecturersNames];
        const normalizedReview = review.toLowerCase();

        return namesArray.some(name => {
            const parts = name.toLowerCase().split(' ');
            return parts.some(part => normalizedReview.includes(part));
        });
    };

    const handleMaterialRatingChange = (e) => {
        const value = e.target.value;
        setMaterialRating(value);
        setFormError('');
    }

    const handleMaterialReviewChange = (e) => {
        const value = e.target.value;
        setMaterialReview(value);
        setFormError('');
    }

    const handleAssessmentRatingChange = (e) => {
        const value = e.target.value;
        setAssessmentRating(value);
        setFormError('');
    }

    const handleAssessmentReviewChange = (e) => {
        const value = e.target.value;
        setAssessmentReview(value);
        setFormError('');
    }

    const handleLecturerRatingChange = (e) => {
        const value = e.target.value;
        setLecturerRating(value);
        setFormError('');
    }

    const handleLecturerReviewChange = (e) => {
        const review = e.target.value;
        setFormError('');
        setLecturerReview(review);
        const nameMentioned = checkReviewForLecturerName(review);
        setLecturersNamesError(nameMentioned ? 'Review cannot include the lecturer\'s name.' : '');
    }

    const handleSubmit = async () => {
        if (!selectedModule) {
            setModuleError("Please select a module before submitting.");
            return;
        } else (setModuleError(""));

        if (!materialRating && !lecturerRating && !materialReview && !lecturerReview) {
            setFormError("Please fill in the form before submitting.");
            return;
        } else (setFormError(""));

        const feedback = {
            student: user.studentId,
            academicYear: academicYear,
            module: module,
            materialRating,
            materialFeedback: materialReview,
            assessmentRating,
            assessmentFeedback: assessmentReview,
            lecturerRating,
            lecturerFeedback: lecturerReview,
        };
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            await api.post('/api/newfeedback/', feedback, {headers});
            navigate('/results/');
            alert('Feedback submitted successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form>
            <h1>Feedback Form</h1>
            <Form.Group className="mb-3">
                <Form.Label>Module</Form.Label>
                <Dropdown className="mb-3" onSelect={handleChangeModule}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-module-select">
                        {selectedModule ? selectedModule.title : "Select a module..."}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
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
                {moduleError && <div style={{color: 'red'}}>{moduleError}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Material Rating:</Form.Label>
                <Row>
                    <Col>
                        <RangeSlider
                            type="range"
                            onChange={handleMaterialRatingChange}
                            value={materialRating}
                            min={0}
                            max={5}
                            step={0.25}
                        />
                    </Col>
                    <Col>
                        <Form.Control value={materialRating} onChange={handleMaterialRatingChange}/>
                    </Col>
                </Row>

            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Material Review:</Form.Label>
                <Form.Control as="textarea"
                              onChange={handleMaterialReviewChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Assessment Rating:</Form.Label>
                <br/>
                <small>Assessment includes exams, assignments, and other forms of assessment.</small>
                <Row>
                    <Col>
                        <RangeSlider
                            type="range"
                            onChange={handleAssessmentRatingChange}
                            value={assessmentRating}
                            min={0}
                            max={5}
                            step={0.25}
                        />
                    </Col>
                    <Col>
                        <Form.Control value={assessmentRating} onChange={handleAssessmentRatingChange}/>
                    </Col>
                </Row>

            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Assessment Review:</Form.Label>
                <Form.Control as="textarea"
                              onChange={handleAssessmentReviewChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Lecturers Rating :</Form.Label>
                <Row>
                    <Col>
                        <RangeSlider
                            type="range"
                            onChange={handleLecturerRatingChange}
                            value={lecturerRating}
                            min={0}
                            max={5}
                            step={0.25}
                        />
                    </Col>
                    <Col>
                        <Form.Control value={lecturerRating} onChange={handleLecturerRatingChange}/>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Lecturers Review:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={lecturerReview}
                    onChange={handleLecturerReviewChange}
                />
                {lecturersNamesError && <div style={{color: 'red'}}>{lecturersNamesError}</div>}
            </Form.Group>
            {formError && <div style={{color: 'red'}}>{formError}</div>}
            <Button variant="info" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
};

export default FeedbackForm;