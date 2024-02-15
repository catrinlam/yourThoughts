import {createContext, useEffect, useState} from 'react';
import axios from 'axios'; // Import axios
import {jwtDecode} from 'jwt-decode'; // Use named import for jwtDecode
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const baseURLs = {
        development: 'http://localhost:8000',
        staging: 'http://127.0.0.1:8000',
        production: 'http://127.0.0.1:10001',
        deployment: 'http://localhost:10001'
    };

    const environment = process.env.NODE_ENV || 'development';
    const baseURL = baseURLs[environment];
    const api = axios.create({
        baseURL: baseURL
    });

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/accounts/token/', {
                username: e.target.username.value,
                password: e.target.password.value
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let data = response.data;

            if (data) {
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                let decodedUser = jwtDecode(data.access);
                setUser(decodedUser);
                console.log(decodedUser);
                localStorage.setItem('loggedIn', true)
                navigate('/');
            } else {
                alert('Something went wrong while logging in the user. The username or passoword may be wrong. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login. The username or passoword may be wrong. Please try again.');
        }
    };

    let logoutUser = (e) => {
        if (e) e.preventDefault();
        localStorage.removeItem('authTokens');
        localStorage.removeItem('loggedIn');
        setAuthTokens(null);
        setUser(null);
        navigate('/');
    };

    const updateToken = async () => {
        try {
            const response = await api.post('/api/accounts/token/refresh/', {
                refresh: authTokens?.refresh
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error(error);
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }

    };


    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        if (loading && authTokens) {
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};