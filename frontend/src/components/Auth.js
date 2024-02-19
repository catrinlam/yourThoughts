import React, {useContext, useState} from 'react';
import {Tabs, Tab, Form, Button} from 'react-bootstrap';
import AuthContext from "../context/AuthContext";
import './Auth.css';

const AuthPage = () => {
    const [key, setKey] = useState('signIn');
    let {loginUser} = useContext(AuthContext)
    let {signupUser} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="auth-container">
            <Tabs
                id="auth-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="signIn" title="Sign In">
                    {/* Sign In Form */}
                    <Form onSubmit={loginUser}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"
                                          onChange={(e) => setUsername(e.target.value)}
                                          name="username"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                          onChange={(e) => setPassword(e.target.value)}
                                          name="password"/>
                        </Form.Group>
                        <Button type="submit" variant="info">Submit</Button>
                    </Form>
                </Tab>
                <Tab eventKey="signUp" title="Sign Up">
                    <Form onSubmit={signupUser}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"
                                          onChange={(e) => setUsername(e.target.value)} name="username"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                                          name="email"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                          onChange={(e) => setPassword(e.target.value)} name="password"/>
                        </Form.Group>
                        <Button type="submit" variant="info">Submit</Button>
                    </Form>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AuthPage;
