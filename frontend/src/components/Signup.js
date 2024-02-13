import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, email, password };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/signup/', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="username">Email Address</Label>
                <Input type="text" name="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
};

export default Login;