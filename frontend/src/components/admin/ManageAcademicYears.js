import {useState} from "react";
import api from "../../utils/api";
import useFetchAcademicYears from "../../utils/FetchAcademicYears";
import Table from 'react-bootstrap/Table';
import {Button} from "reactstrap";
import Form from "react-bootstrap/Form";

const ManageAcademicYears = () => {
    const {academicYearsList, fetchAcademicYears} = useFetchAcademicYears(); // replace with your actual hook
    const [year, setYear] = useState(0);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editYearId, setEditYearId] = useState(null);

    const handleSubmit = async () => {
        const newYear = {
            year: year
        };
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const response = await api.post('/api/newyear/', newYear, {headers}); // replace with your actual endpoint
            console.log(response);
            await fetchAcademicYears();
            setShowCreateForm(false);
        } catch (e) {
            console.error(e);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this academic year?')) {
            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
                const response = await api.delete(`/api/deleteyear/${id}`, {headers}); // replace with your actual endpoint
                console.log(response);
                await fetchAcademicYears();
            } catch (e) {
                console.error(e);
            }
        }
    }

    const handleEditYear = async (year) => {
        setYear(year.year);
        setEditYearId(year.id);
        setShowEditForm(true);
    }

    const handleEdit = async () => {
        if (window.confirm('Are you sure you want to update this academic year?')) {
            const editYear = {
                year: year
            };
            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
                const response = await api.put(`/api/edityear/${editYearId}/`, editYear, {headers}); // replace with your actual endpoint
                console.log(response);
                await fetchAcademicYears();
                setShowEditForm(false);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div>
            <h2>Manage Academic Years</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {academicYearsList.map(year => (
                    <tr key={year.id}>
                        <td>{year.id}</td>
                        <td>{year.year}</td>
                        <td>
                            <Button variant="danger" style={{marginRight: '10px'}}
                                    onClick={() => handleDelete(year.id)}>Delete</Button>
                            <Button variant="info" onClick={() => handleEditYear(year)}>Edit</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {showEditForm && (
                <>
                    <h3>Edit academic year</h3>
                    <Form.Group controlId="year">
                        <Form.Label>Academic Year</Form.Label>
                        <Form.Control type={"integer"} value={year} onChange={(e) => setYear(e.target.value)}/>
                    </Form.Group>
                    <Button variant="info" onClick={handleEdit}>Submit</Button>
                </>
            )}
            {!showCreateForm && <Button variant="info" onClick={() => setShowCreateForm(true)}>Create Module</Button>}
            {showCreateForm && (
                <>
                    <h3>Add a new academic year</h3>
                    <Form.Group controlId="year">
                        <Form.Label>academic year</Form.Label>
                        <Form.Control type={"integer"} placeholder="Enter year" onChange={(e) => setYear(e.target.value)}/>
                    </Form.Group>
                    <Button variant="info" onClick={handleSubmit}>Submit</Button>
                </>
            )}
        </div>
    );
}

export default ManageAcademicYears;
