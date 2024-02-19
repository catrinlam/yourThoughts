import {useState, useEffect} from 'react';
import api from "../utils/api";

const useFetchAcademicYears = () => {
    const [academicYearsList, setAcademicYearsList] = useState([]);

    const fetchAcademicYears = async () => {
        const response = await api.get('/api/academicyears/');
        setAcademicYearsList(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        fetchAcademicYears();
    }, []);

    return { academicYearsList, fetchAcademicYears };
};

export default useFetchAcademicYears;
