import React, {useContext, useState} from 'react';
import AuthContext from "../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const Signup = () => {
    let { signupUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <Form onSubmit={signupUser}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} name="username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="password"/>
                </Form.Group>
                <Button type="submit" variant="info">Submit</Button>
            </Form>
        </div>
    );
};

export default Signup;