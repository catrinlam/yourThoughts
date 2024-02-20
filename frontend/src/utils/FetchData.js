import {useState, useEffect} from 'react';
import api from "../utils/api";

const useFetchData = (endpoint, requiresAuth = false) => {
    const [dataList, setDataList] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const response = await api.get(endpoint, {headers});
            setDataList(response.data);
            setError(null);
        } catch (err) {
            setError(err);
            console.error("Failed to fetch data:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return {dataList, fetchData, error};
};
export default useFetchData;