import React from 'react';
import ManageData from "../utils/ManageData";
import useFetchData from "../utils/FetchData";

const AdminDashboard = () => {
    const { dataList: academicYearsList, fetchData: fetchAcademicYears } = useFetchData('/api/academicyears/');
    const { dataList: moduleList, fetchData: fetchModules } = useFetchData('/api/modules/');

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
            />
        </div>
    );
};

export default AdminDashboard;
