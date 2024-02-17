import {useState, useEffect} from 'react';
import api from "../utils/api";

const useFetchModules = () => {
    const [moduleList, setModuleList] = useState([]);

    const fetchModules = async () => {
        const response = await api.get('/api/modules/');
        setModuleList(response.data);
    };

    useEffect(() => {
        fetchModules();
    }, []);

    return { moduleList, fetchModules };
};

export default useFetchModules;
