import {useState, useEffect} from 'react';
import api from "../utils/api";

const useFetchData = (endpoint) => {
    const [dataList, setDataList] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get(endpoint);
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

    return { dataList, fetchData, error };
};
export default useFetchData;