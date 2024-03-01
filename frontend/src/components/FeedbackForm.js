import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import useFetchData from "../utils/FetchData";
import {useNavigate} from 'react-router-dom';
import {Button, Dropdown, Form} from "react-bootstrap";


const FeedbackForm = () => {
    const {user} = useContext(AuthContext);
    const {dataList: moduleList} = useFetchData('/api/modules/');
    const {dataList: academicYearsList} = useFetchData('/api/academicyears/');
    const [filterModuleValue, setfilterModuleValue] = useState('');
    const [lecturersNames, setLecturersNames] = useState('');
    const [academicYear, setAcademicYear] = useState(0);
    const [materialRating, setMaterialRating] = useState(0);
    const [materialReview, setMaterialReview] = useState('');
    const [lecturerRating, setLecturerRating] = useState(0);
    const [lecturerReview, setLecturerReview] = useState('');
    const [module, setModule] = useState('');
    const [selectedModule, setSelectedModule] = useState(null);
    const [materialRatingError, setMaterialRatingError] = useState('');
    const [lecturerRatingError, setLecturerRatingError] = useState('');
    const [lecturersNamesError, setLecturersNamesError] = useState('');

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
        setfilterModuleValue('');
        const selectedModule = moduleList.find(module => module.code === selectedModuleCode);
        setSelectedModule(selectedModule);
        setModule(selectedModule.id);
        setLecturersNames(selectedModule.lecturersNames.includes(',') ? selectedModule.lecturersNames.split(', ') : [selectedModule.lecturersNames]);
    };

    const checkReviewForLecturerName = (review) => {
        const namesArray = typeof lecturersNames === 'string' ? lecturersNames.split(', ') : lecturersNames;
        console.log(namesArray);
        const normalizedReview = review.toLowerCase();

        return namesArray.some(name => {
            const parts = name.toLowerCase().split(' ');
            return parts.some(part => normalizedReview.includes(part));
        });
    };

    const handleLecturerReviewChange = (e) => {
        const review = e.target.value;
        setLecturerReview(review);
        const nameMentioned = checkReviewForLecturerName(review);
        console.log(nameMentioned);
        if (nameMentioned) {
            setLecturersNamesError("Review cannot include the lecturer's name.");
        } else {
            setLecturersNamesError("");
        }
    }

    const validateRating = (rating) => {
        const numRating = Number(rating);
        return numRating >= 0 && numRating <= 5;
    };

    const handleMaterialRatingChange = (e) => {
        const rating = e.target.value;
        setMaterialRating(rating);
        setMaterialRatingError(validateRating(rating) ? '' : 'Rating must be between 0 and 5');
    };

    const handleLecturerRatingChange = (e) => {
        const rating = e.target.value;
        setLecturerRating(rating);
        setLecturerRatingError(validateRating(rating) ? '' : 'Rating must be between 0 and 5');
    };

    const isSubmitDisabled = !selectedModule || !validateRating(materialRating) || !validateRating(lecturerRating) || !lecturerReview || lecturersNamesError;

    const handleSubmit = async () => {
        const feedback = {
            student: user.studentId,
            academicYear: academicYear,
            module: module,
            materialRating,
            materialFeedback: materialReview,
            lecturerRating,
            lecturerFeedback: lecturerReview,
        };
        console.log(feedback);
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

    return (<Form>
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

            {!selectedModule && <div style={{color: 'red'}}>Please select a module</div>}
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Material Rating:</Form.Label>
            {/*<RangeSlider*/}
            {/*    value={materialRating}*/}
            {/*    onChange={handleMaterialRatingChange}*/}
            {/*/>*/}
            <Form.Control type="number" min="0" max="5" onChange={handleMaterialRatingChange}/>
            <small>Rating must be between 0 and 5</small>
            {materialRatingError && <div style={{color: 'red'}}>{materialRatingError}</div>}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Material Review:</Form.Label>
            <Form.Control as="textarea"
                          onChange={e => setMaterialReview(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Lecturers Rating :</Form.Label>
            <Form.Control type="number" min="0" max="5" onChange={handleLecturerRatingChange}/>
            <small>Rating must be between 0 and 5</small>
            {lecturerRatingError && <div style={{color: 'red'}}>{lecturerRatingError}</div>}
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
        <Button variant="info" disabled={isSubmitDisabled} onClick={handleSubmit}>
            Submit
        </Button>
    </Form>);
};

export default FeedbackForm;