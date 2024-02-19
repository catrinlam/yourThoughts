import {useState} from "react";
import api from "../../utils/api";
import useFetchModules from "../../utils/FetchModules";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ManageModules = () => {
    const {moduleList, fetchModules} = useFetchModules();
    const [moduleCode, setModuleCode] = useState('');
    const [moduleTitle, setModuleTitle] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editModuleId, setEditModuleId] = useState(null);


    const handleSubmit = async () => {
        const newModule = {
            code: moduleCode,
            title: moduleTitle
        };
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const response = await api.post('/api/newmodule/', newModule, {headers});
            console.log(response);
            await fetchModules();
            setShowCreateForm(false);
        } catch (e) {
            console.error(e);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this module?')) {
            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
                const response = await api.delete(`/api/deletemodule/${id}`, {headers});
                console.log(response);
                await fetchModules();
            } catch (e) {
                console.error(e);
            }
        }
    }

    const handleEditModule = async (module) => {
        setModuleCode(module.code);
        setModuleTitle(module.title);
        setEditModuleId(module.id);
        setShowEditForm(true);
    }

    const handleEdit = async () => {
        if (window.confirm('Are you sure you want to update this module?')) {
            const module = {
                code: moduleCode,
                title: moduleTitle
            };
            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
                const response = await api.put(`/api/editmodule/${editModuleId}/`, module, {headers});
                console.log(response);
                await fetchModules();
                setShowEditForm(false);
            } catch (e) {
                console.error(e);
            }
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
                            <Button variant="danger" style={{marginRight: '10px'}}
                                    onClick={() => handleDelete(module.id)}>Delete</Button>
                            <Button variant="info" onClick={() => handleEditModule(module)}>Edit</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {showEditForm && (
                <>
                    <h3>Edit module</h3>
                    <Form.Group controlId="moduleCode">
                        <Form.Label>Module Code</Form.Label>
                        <Form.Control type="text" value={moduleCode}
                                      onChange={(e) => setModuleCode(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="moduleTitle">
                        <Form.Label>Module Title</Form.Label>
                        <Form.Control type="text" value={moduleTitle}
                                      onChange={(e) => setModuleTitle(e.target.value)}/>
                    </Form.Group>
                    <Button variant="info" onClick={handleEdit}>Submit</Button>
                </>
            )}
            {!showCreateForm && <Button variant="info" onClick={() => setShowCreateForm(true)}>Create Module</Button>}
            {showCreateForm && (
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