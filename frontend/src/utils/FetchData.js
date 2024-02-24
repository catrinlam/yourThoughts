import {useState, useEffect, useCallback} from 'react';
import api from "../utils/api";

const useFetchData = (endpoint) => {
    const [dataList, setDataList] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
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
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {dataList, fetchData, error};
};
export default useFetchData;