import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";
import {Link} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
    let {loginUser} = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <Form onSubmit={loginUser}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                                  name="username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                  name="password"/>
                </Form.Group>
                <Button type="submit" variant="info">Submit</Button>
            </Form>
        </div>
    );
};

export default Login;