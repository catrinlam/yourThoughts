import {createContext, useCallback, useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode'; // Use named import for jwtDecode
import {useNavigate} from 'react-router-dom';
import api from "../utils/api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(() => (sessionStorage.getItem('authTokens') ? jwtDecode(sessionStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (sessionStorage.getItem('authTokens') ? JSON.parse(sessionStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    let signupUser = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const signupResponse = await api.post('/api/accounts/signup/', {
                user: {
                    username: username,
                    email: email,
                    password: password
                }
            });
            if (signupResponse.data) {
                console.log(signupResponse.data);

                const fakeEvent = {
                    preventDefault: () => {
                    },
                    target: {
                        username: {value: username},
                        password: {value: password}
                    }
                };

                await loginUser(fakeEvent);
                navigate('/');
                alert('Signup successful. You are now logged in.');
            } else {
                console.error('No data in response from signup');
            }
        } catch (error) {
            console.error(error);
            alert('Signup failed. Please try again with a different username or email.');
        }
    };

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
                sessionStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                let decodedUser = jwtDecode(data.access);
                setUser(decodedUser);
                console.log(decodedUser);
                sessionStorage.setItem('loggedIn', true)
                navigate('/results');
            } else {
                alert('Something went wrong while logging in the user. The username or passoword may be wrong. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login. The username or passoword may be wrong. Please try again.');
        }
    };

    let logoutUser = useCallback((e) => {
        if (e) e.preventDefault();
        sessionStorage.removeItem('authTokens');
        sessionStorage.removeItem('loggedIn');
        setAuthTokens(null);
        setUser(null);
        navigate('/');
    }, [navigate]);

    const updateToken = useCallback(async () => {
        try {
            const authTokens = JSON.parse(sessionStorage.getItem('authTokens'));
            const headers = authTokens ? {'Authorization': `Bearer ${authTokens.access}`} : {};
            const response = await api.post('/api/accounts/token/refresh/', {
                refresh: authTokens?.refresh
            }, {headers});

            const data = response.data;
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                sessionStorage.setItem('authTokens', JSON.stringify(data));
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

    }, [authTokens?.refresh, loading, logoutUser]);


    let contextData = {
        user: user,
        authTokens: authTokens,
        signupUser: signupUser,
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

    }, [authTokens, loading, updateToken])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};