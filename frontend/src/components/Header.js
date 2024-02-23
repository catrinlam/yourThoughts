import React, {useContext} from "react";
import './Header.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";
import {ThemeContext} from "../App";

function Header() {
    // const {theme, toggleTheme} = useContext(ThemeContext);
    let {user, logoutUser} = useContext(AuthContext)
    const loggedIn = localStorage.getItem('loggedIn');
    const initialLoggedIn = loggedIn === 'true';
    const isAdmin = user ? user.is_staff : false;

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block"
                    />{' '}
                    YourThoughts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href='/results'>Results</Nav.Link>
                        {initialLoggedIn && !isAdmin && <Nav.Link href="/feedback"> Write a Feedback</Nav.Link>}
                        {isAdmin && <Nav.Link href="/admin">Admin Dashboard</Nav.Link>}
                        {/*<Button onClick={toggleTheme} className="btn btn-link border-0" style={{backgroundColor: 'transparent'}} aria-label="Toggle theme">*/}
                        {/*    {theme === 'light' ? (*/}
                        {/*        <i className="bi bi-moon"/>*/}
                        {/*    ) : (*/}
                        {/*        <span className="bi-sun"></span>*/}
                        {/*    )}*/}
                        {/*</Button>*/}
                        {/*<Button variant="info" onClick={toggleTheme}>Toggle Theme</Button>*/}
                        {user ? (
                            <Button variant="danger" onClick={logoutUser}>Logout</Button>
                        ) : (
                            <Button variant="info" href="/auth">Sign in/Sign up</Button>
                        )}
                        {user && <Navbar.Text>Hello {user.username}!</Navbar.Text>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;