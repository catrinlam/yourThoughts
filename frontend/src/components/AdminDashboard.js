import React, {useContext, useState} from 'react';
import ManageData from "../utils/ManageData";
import useFetchData from "../utils/FetchData";
import AuthContext from "../context/AuthContext";
import {Tabs, Tab} from 'react-bootstrap';

const AdminDashboard = () => {
    const [key, setKey] = useState('years');
    let {user} = useContext(AuthContext);
    const isAdmin = user ? user.is_staff : false;
    const {dataList: academicYearsList, fetchData: fetchAcademicYears} = useFetchData('/api/academicyears/');
    const {dataList: moduleList, fetchData: fetchModules} = useFetchData('/api/modules/');
    const {dataList: feedbackList, fetchData: fetchFeedbacks} = useFetchData('/api/feedbacks/');
    const {dataList: userList, fetchData: fetchUsers} = useFetchData('/api/accounts/users/');

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Tabs
                id="admin-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="years" title="Academic Years">
                    <ManageData
                        itemList={academicYearsList}
                        fetchItems={fetchAcademicYears}
                        itemDescriptor="Academic Years"
                        apiEndpoints={{
                            create: '/api/newyear/',
                            delete: (id) => `/api/deleteyear/${id}/`,
                            edit: (id) => `/api/edityear/${id}/`
                        }}
                        formFields={['id', 'year']}
                        canCreate={isAdmin}
                        canEdit={isAdmin}
                    />
                </Tab>
                <Tab eventKey="modules" title="Modules">
                    <ManageData
                        itemList={moduleList}
                        fetchItems={fetchModules}
                        itemDescriptor="Modules"
                        apiEndpoints={{
                            create: '/api/newmodule/',
                            delete: (id) => `/api/deletemodule/${id}/`,
                            edit: (id) => `/api/editmodule/${id}/`
                        }}
                        formFields={['id', 'code', 'title', 'lecturersNames']}
                        canCreate={isAdmin}
                        canEdit={isAdmin}
                    />
                </Tab>
                <Tab eventKey="feedbacks" title="Feedbacks">
                    <ManageData
                        itemList={feedbackList}
                        fetchItems={fetchFeedbacks}
                        itemDescriptor="Feedbacks"
                        apiEndpoints={{
                            delete: (id) => `/api/deletefeedback/${id}/`
                        }}
                        formFields={['id', 'student', 'academicYear', 'moduleCode', 'moduleTitle',
                            'materialRating', 'materialFeedback', 'lecturerRating', 'lecturerFeedback', 'submitDate']}
                        displayFields={[
                            {
                                field: 'academicYear',
                                render: (item) => item.academicYear.year
                            },
                            {
                                field: 'moduleCode',
                                render: (item) => item.module.code
                            },
                            {
                                field: 'moduleTitle',
                                render: (item) => item.module.title
                            }
                        ]}
                        canCreate={false}
                        canEdit={false}
                    />
                </Tab>
                <Tab eventKey="users" title="Users">
                    <ManageData
                        itemList={userList}
                        fetchItems={fetchUsers}
                        itemDescriptor="Users"
                        apiEndpoints={{
                            create: '/api/accounts/newuser/',
                            delete: (id) => `/api/accounts/deleteuser/${id}/`,
                            edit: (id) => `/api/accounts/edituser/${id}/`
                        }}
                        formFields={['id', 'username', 'email', 'password']}
                        displayFields={[
                            {
                                field: 'username',
                                render: (item) => item.user.username
                            },
                            {
                                field: 'email',
                                render: (item) => item.user.email
                            },
                            {
                                field: 'is_staff',
                                render: (item) => item.user.is_staff ? 'Admin' : 'Student'
                            }
                        ]}
                        canCreate={isAdmin}
                        canEdit={false}
                    />
                </Tab>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
