import React, {useContext} from "react";
import './Header.css';

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

function Header() {
    let {user, logoutUser} = useContext(AuthContext)
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
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href='/results'>Results</Nav.Link>
                        {user && !isAdmin && <Nav.Link href="/feedback"> Write a Feedback</Nav.Link>}
                        {isAdmin && <Nav.Link href="/admin">Admin Dashboard</Nav.Link>}
                        {!user && <Nav.Link href="/auth">Sign in/Sign up</Nav.Link>}
                        {user && (
                            <NavDropdown title={`Hi, ${user.username}!`} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={logoutUser}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;