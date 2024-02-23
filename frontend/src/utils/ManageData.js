import React, {useState} from 'react';
import {Table, Form, Button} from 'react-bootstrap';
import api from "./api";

const ManageModels = ({
                          itemList,
                          fetchItems,
                          itemDescriptor,
                          apiEndpoints,
                          formFields,
                          displayFields,
                          canCreate = true,
                          canEdit = true
                      }) => {
    const [formData, setFormData] = useState(formFields.reduce((acc, field) => ({...acc, [field]: ''}), {}));
    const [showForm, setShowForm] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            setShowForm(false);
            setEditItemId(null);
            setFormData(formFields.reduce((acc, field) => ({...acc, [field]: ''}), {})); // Reset form data
        }
    };

    const handleCreateOrUpdate = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const endpoint = editItemId ? apiEndpoints.edit(editItemId) : apiEndpoints.create;
            const response = await api[editItemId ? 'put' : 'post'](endpoint, formData, {headers});
            console.log(response);
            await fetchItems();
            setShowForm(false);
            setEditItemId(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleEdit = (item) => {
        setFormData(formFields.reduce((acc, field) => ({...acc, [field]: item[field]}), {}));
        setEditItemId(item.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this ${itemDescriptor.toLowerCase()}?`)) {
            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
                const response = await api.delete(apiEndpoints.delete(id), {headers});
                console.log(response);
                await fetchItems();
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div>
            <h2>Manage {itemDescriptor}</h2>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        {formFields.map(field => (
                            <th key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemList && itemList.length > 0 ? (
                        itemList.map(item => (
                            <tr key={item.id}>
                                {formFields.map(field => {
                                    const displayField = displayFields?.find(df => df.field === field);
                                    const value = displayField && displayField.render ? displayField.render(item) : item[field];
                                    return <td key={`${item.id}-${field}`}>{value}</td>;
                                })}
                                <td>
                                    {canEdit && <Button variant="info" onClick={() => handleEdit(item)}
                                                        style={{marginRight: '10px'}}>
                                        Edit
                                    </Button>}
                                    <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={formFields.length + 1}>No data available</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
            {(canCreate || canEdit) && showForm && (
                <>
                    <h3>{editItemId ? `Edit ${itemDescriptor}` : `Add a new ${itemDescriptor}`}</h3>
                    {formFields.filter(field => field !== 'id').map(field => (
                        <Form.Group key={field} controlId={field}>
                            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Enter ${field}`}
                                value={formData[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        </Form.Group>
                    ))}
                    <Button variant="info" onClick={handleCreateOrUpdate}>
                        {editItemId ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="secondary" onClick={handleCancel} style={{marginLeft: '10px'}}>
                        Cancel
                    </Button>
                </>
            )}
            {canCreate && !showForm && (
                <Button variant="info" onClick={() => setShowForm(true)}>
                    {`Create ${itemDescriptor}`}
                </Button>
            )}
        </div>
    );
};

export default ManageModels;
