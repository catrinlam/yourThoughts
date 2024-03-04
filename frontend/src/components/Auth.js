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
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="auth-container">
            <Tabs
                id="auth-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="signIn" title="Sign In">
                    <Form onSubmit={loginUser}>
                        <Form.Group className="mb-2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"
                                          onChange={(e) => setUsername(e.target.value)}
                                          name="username"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
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
                        <Form.Group className="mb-2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"
                                          onChange={(e) => setUsername(e.target.value)} name="username"/>
                            <small>150 characters or fewer. Letters, digits and @/./+/-/_ only.</small>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                                          name="email"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                          onChange={(e) => setPassword(e.target.value)} name="password"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name="confirmPassword"
                            />
                            {password !== confirmPassword && confirmPassword && (
                                <Form.Text style={{color: 'red'}}>
                                    Passwords do not match!
                                </Form.Text>
                            )}
                        </Form.Group>
                        {/*<small>Enter the same password as before, for verification.</small>*/}
                        <Button type="submit" variant="info">Submit</Button>
                    </Form>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AuthPage;
