import React, {useContext, useState} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";

const Signup = () => {
    let {signupUser} = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={signupUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
            </form>
        </div>
        // <Form onSubmit={signupUser}>
        //     <FormGroup>
        //         <Label for="username">Username</Label>
        //         <Input type="text" name="username" placeholder="Username"/>
        //     </FormGroup>
        //     <FormGroup>
        //         <Label for="username">Email Address</Label>
        //         <Input type="text" name="email" placeholder="Email"/>
        //     </FormGroup>
        //     <FormGroup>
        //         <Label for="password">Password</Label>
        //         <Input type="password" name="password" placeholder="Password"/>
        //     </FormGroup>
        //     <Button>Submit</Button>
        // </Form>
    );
};

export default Signup;