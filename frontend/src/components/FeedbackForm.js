import React, {useContext, useEffect, useState} from 'react';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from "../context/AuthContext";
import api from "../utils/api";
import useFetchData from "../utils/FetchData";
import {useNavigate} from 'react-router-dom';

const FeedbackForm = () => {
    const {user} = useContext(AuthContext);
    const {dataList: moduleList} = useFetchData('/api/modules/');
    const {dataList: academicYearsList} = useFetchData('/api/academicyears/');
    const [academicYear, setAcademicYear] = useState(0);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
    const [materialRating, setMaterialRating] = useState(0);
    const [materialReview, setMaterialReview] = useState('');
    const [lecturerRating, setLecturerRating] = useState(0);
    const [lecturerReview, setLecturerReview] = useState('');
    const [module, setModule] = useState('');
    const [selectedModule, setSelectedModule] = useState(null);
    const [materialRatingError, setMaterialRatingError] = useState('');
    const [lecturerRatingError, setLecturerRatingError] = useState('');

    const navigate = useNavigate();

    const moduleOptions = moduleList.map(mod => ({value: mod.id, label: mod.title}));

    useEffect(() => {
        if (academicYearsList.length > 0) {
            const sortedYears = academicYearsList.sort((a, b) => b.year - a.year);
            const latestYear = sortedYears[0];
            setAcademicYear(latestYear.id); // Assuming you're using the ID as the value
            setSelectedAcademicYear({value: latestYear.id, label: latestYear.year});
        }
    }, [academicYearsList]);

    const handleModuleChange = selectedOption => {
        setSelectedModule(selectedOption);
        setModule(selectedOption.value);
    };

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

    const isSubmitDisabled = !validateRating(materialRating) || !validateRating(lecturerRating) || !selectedModule;

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
            <Select
                value={selectedModule}
                onChange={handleModuleChange}
                options={moduleOptions}
            />
            {!selectedModule && <div style={{color: 'red'}}>Please select a module</div>}
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Material Rating:</Form.Label>
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
            <Form.Label>Lecturer Rating:</Form.Label>
            <Form.Control type="number" min="0" max="5" onChange={handleLecturerRatingChange}/>
            <small>Rating must be between 0 and 5</small>
            {lecturerRatingError && <div style={{color: 'red'}}>{lecturerRatingError}</div>}
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Lecturer Review:</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                value={lecturerReview}
                onChange={e => setLecturerReview(e.target.value)}
            />
        </Form.Group>
        <Button variant="info" disabled={isSubmitDisabled} onClick={handleSubmit}>
            Submit
        </Button>
    </Form>);
};

export default FeedbackForm;