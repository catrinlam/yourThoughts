import React, {useContext, useState} from "react";
import './Header.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";

function Header() {
    let {user, logoutUser} = useContext(AuthContext)
    const loggedIn = localStorage.getItem('loggedIn');
    const initialLoggedIn = loggedIn === 'true';
    const isAdmin = user ? user.is_staff : false;

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">YourThoughts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href='/results'>Results</Nav.Link>
                        {initialLoggedIn && !isAdmin && <Nav.Link href="/feedback"> Write a Feedback</Nav.Link>}
                        {isAdmin && <Nav.Link href="/admin">Admin Dashboard</Nav.Link>}
                        {/*{isAdmin && <Nav.Link href="/manage-modules">Manage Modules</Nav.Link>}*/}
                        {/*{isAdmin && <Nav.Link href="/manage-academicyears">Manage Academic Years</Nav.Link>}*/}
                        {user ? (
                            <Button variant="danger" onClick={logoutUser}>Logout</Button>
                        ) : (
                            <Button variant="info" href="/auth">Sign in/Sign up</Button>
                        )}
                        {user && <Navbar.Text >Hello {user.username}!</Navbar.Text>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;