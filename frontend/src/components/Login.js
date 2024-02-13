import React, {useContext, useState} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AuthContext from "../context/AuthContext";

const Login = () => {
    let {loginUser} = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
            </form>
        </div>
    )
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const data = { username, password };
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    //
    // return (
    //     <Form onSubmit={handleSubmit}>
    //         <FormGroup>
    //             <Label for="username">Username</Label>
    //             <Input type="text" name="username" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
    //         </FormGroup>
    //         <FormGroup>
    //             <Label for="password">Password</Label>
    //             <Input type="password" name="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    //         </FormGroup>
    //         <Button>Submit</Button>
    //     </Form>
    // );
};

export default Login;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// // import { connect } from 'react-redux';
// // import { login } from '../actions/auth';
// // import axios from 'axios';
// import axiosInstance from '../axios';
// import { Container, Form, Button, Row, Col } from 'react-bootstrap';
//
// export default function Login() {
//     const navigate = useNavigate();
//     const initialFormData = Object.freeze({
//         email: '',
//         password: '',
//     });
//
//     const [formData, updateFormData] = useState(initialFormData);
//
//     const handleChange = (e) => {
//         updateFormData({
//             ...formData,
//             [e.target.name]: e.target.value.trim(),
//         });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         axiosInstance
//             .post(`token/`, {
//                 email: formData.email,
//                 password: formData.password,
//             })
//             .then((res) => {
//                 localStorage.setItem('access_token', res.data.access);
//                 localStorage.setItem('refresh_token', res.data.refresh);
//                 axiosInstance.defaults.headers['Authorization'] =
//                     'JWT ' + localStorage.getItem('access_token');
//                 navigate('/');
//             });
//     };
//
//     return (
//         <Container>
//             <h1>Sign In</h1>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formEmail">
//                     <Form.Label>Email Address</Form.Label>
//                     <Form.Control
//                         type="email"
//                         placeholder="Email"
//                         name="email"
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type="password"
//                         placeholder="Password"
//                         name="password"
//                         onChange={handleChange}
//                         minLength="6"
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formCheckbox">
//                     <Form.Check type="checkbox" label="Remember me" />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                     Login
//                 </Button>
//             </Form>
//             <Row className="mt-3">
//                 <Col>
//                     <Link to="/forgot-password">Forgot password?</Link>
//                 </Col>
//                 <Col>
//                     <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

//
//
//     // const continueWithGoogle = async () => {
//     //     try {
//     //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)
//     //
//     //         window.location.replace(res.data.authorization_url);
//     //     } catch (err) {
//     //
//     //     }
//     // };
//     //
//     // const continueWithFacebook = async () => {
//     //     try {
//     //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)
//     //
//     //         window.location.replace(res.data.authorization_url);
//     //     } catch (err) {
//     //
//     //     }
//     // };
//
//             {/*<button className='btn btn-danger mt-3' onClick={continueWithGoogle}>*/}
//             {/*    Continue With Google*/}
//             {/*</button>*/}
//             {/*<br />*/}
//             {/*<button className='btn btn-primary mt-3' onClick={continueWithFacebook}>*/}
//             {/*    Continue With Facebook*/}
//             {/*</button>*/}