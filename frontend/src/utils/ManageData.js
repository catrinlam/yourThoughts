import React, {useState, useRef, useEffect} from 'react';
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
    const formRef = useRef(null);

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

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        try {
            let dataToSubmit = {};
            const processedFormData = Object.entries(formData).reduce((acc, [key, value]) => {
                acc[key] = value === '' ? null : value;
                return acc;
            }, {});

            if (editItemId) {
                dataToSubmit = {...formData};
            } else {
                if (itemDescriptor === "Users") {
                    dataToSubmit = {
                        user: {
                            username: formData.username,
                            email: formData.email,
                            password: formData.password
                        }
                    };
                } else {
                    const {id, ...dataWithoutId} = processedFormData;
                    dataToSubmit = dataWithoutId;
                }
            }
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const endpoint = editItemId ? apiEndpoints.edit(editItemId) : apiEndpoints.create;
            await api[editItemId ? 'put' : 'post'](endpoint, dataToSubmit, {headers});
            await fetchItems();
            setShowForm(false);
            setEditItemId(null);
            setFormData({});

        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (showForm && formRef.current) {
            formRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [showForm]);

    const handleCreate = () => {
        setShowForm(true);
        // formRef.current.scrollIntoView({behavior: 'smooth'});
        if (formRef.current) {
            formRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    const handleEdit = (item) => {
        const initialFormData = formFields.reduce((acc, field) => {
            if (item.user && field in item.user) {
                return {...acc, [field]: item.user[field]};
            } else {
                return {...acc, [field]: item[field]};
            }
        }, {});

        setFormData(initialFormData);
        setEditItemId(item.id);
        setShowForm(true);
        if (formRef.current) {
            formRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete this ${itemDescriptor.toLowerCase()}?`)) {
            try {
                const authTokens = JSON.parse(localStorage.getItem('authTokens'));
                const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
                await api.delete(apiEndpoints.delete(id), {headers});
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
                {canCreate && !showForm && (
                    <Button className="mb-3" variant="info" onClick={handleCreate}>
                        {`Create ${itemDescriptor}`}
                    </Button>
                )}
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
                    <h3 ref={formRef}>{editItemId ? `Edit ${itemDescriptor}` : `Add a new ${itemDescriptor}`}</h3>
                    {formFields.filter(field => field !== 'id').map(field => (
                        <Form.Group key={field} controlId={field}>
                            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Enter ${field}`}
                                value={formData[field] || ''}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        </Form.Group>
                    ))}
                    <Button className="mt-3" variant="info" onClick={handleCreateOrUpdate}>
                        {editItemId ? 'Update' : 'Create'}
                    </Button>
                    <Button className="mt-3" variant="secondary" onClick={handleCancel} style={{marginLeft: '10px'}}>
                        Cancel
                    </Button>
                </>
            )}
        </div>
    );
};

export default ManageModels;
