import React, {useContext} from 'react';
import ManageData from "../utils/ManageData";
import useFetchData from "../utils/FetchData";
import AuthContext from "../context/AuthContext";

const AdminDashboard = () => {
    let {user} = useContext(AuthContext);
    const isAdmin = user ? user.is_staff : false;
    const { dataList: academicYearsList, fetchData: fetchAcademicYears } = useFetchData('/api/academicyears/');
    const { dataList: moduleList, fetchData: fetchModules } = useFetchData('/api/modules/');
    const { dataList: feedbackList, fetchData: fetchFeedbacks } = useFetchData('/api/feedbacks/', true);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ManageData
                itemList={academicYearsList}
                fetchItems={fetchAcademicYears}
                itemDescriptor="Academic Years"
                apiEndpoints={{
                    create: '/api/newyear/',
                    delete: (id) => `/api/deleteyear/${id}/`,
                    edit: (id) => `/api/edityear/${id}/`
                }}
                formFields={['year']}
                canCreate={isAdmin}
                canEdit={isAdmin}
            />
            <ManageData
                itemList={moduleList}
                fetchItems={fetchModules}
                itemDescriptor="Modules"
                apiEndpoints={{
                    create: '/api/newmodule/',
                    delete: (id) => `/api/deletemodule/${id}/`,
                    edit: (id) => `/api/editmodule/${id}/`
                }}
                formFields={['code', 'title']}
                canCreate={isAdmin}
                canEdit={isAdmin}
            />
            <ManageData
                itemList={feedbackList}
                fetchItems={fetchFeedbacks}
                itemDescriptor="Feedbacks"
                apiEndpoints={{
                    delete: (id) => `/api/deletefeedback/${id}/`
                }}
                formFields={['student', 'academicYear', 'module',
                  'materialRating', 'materialFeedback', 'lecturerRating', 'lecturerFeedback', 'submitDate']}
                canCreate={false}
                canEdit={false}
            />
        </div>
    );
};

export default AdminDashboard;
