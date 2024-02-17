import {useEffect, useState} from "react";
import api from "../utils/api";
import authContext from "../context/AuthContext";
import useFetchModules from "../utils/FetchModules";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import {Button} from "reactstrap";

const ManageModules = () => {
    const {moduleList, fetchModules} = useFetchModules();
    const [moduleCode, setModuleCode] = useState('');
    const [moduleTitle, setModuleTitle] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async () => {
        const module = {
            code: moduleCode,
            title: moduleTitle
        };
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const response = await api.post('/api/newmodule/', module, {headers});
            console.log(response);
            await fetchModules();
            setShowForm(false);
        } catch (e) {
            console.error(e);
        }
    }

    const handleDelete = async (id) => {
        alert('Are you sure you want to delete this module?')
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const response = await api.delete(`/api/deletemodule/${id}`, {headers});
            console.log(response);
            await fetchModules();  // refresh the data
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h2>Manage Modules</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {moduleList.map(module => (
                    <tr key={module.id}>
                        <td>{module.id}</td>
                        <td>{module.code}</td>
                        <td>{module.title}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(module.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {!showForm && <Button variant="info" onClick={() => setShowForm(true)}>Create Module</Button>}
            {showForm && (
                <>
                    <h3>Add a new module</h3>
                    <Form.Group controlId="moduleCode">
                        <Form.Label>Module Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter module code"
                                      onChange={(e) => setModuleCode(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="moduleTitle">
                        <Form.Label>Module Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter module title"
                                      onChange={(e) => setModuleTitle(e.target.value)}/>
                    </Form.Group>
                    <Button variant="info" onClick={handleSubmit}>Submit</Button>
                </>
            )}
        </div>
    );
}

export default ManageModules;