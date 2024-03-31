import React, {useContext, useState} from "react";
import './Header.css';

import {Container, Nav, Navbar, NavDropdown, Button} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

function Header() {
    let {user, logoutUser} = useContext(AuthContext)
    const isAdmin = user ? user.is_staff : false;
    const [expanded, setExpanded] = useState(false); // State to track navbar expansion

    return (
        <Navbar expand="lg" className="bg-body-tertiary" expanded={expanded} onToggle={setExpanded}>
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
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link href='/results'>Results</Nav.Link>
                        {user && !isAdmin && <Nav.Link href="/feedback"> Write a Feedback</Nav.Link>}
                        {isAdmin && <Nav.Link href="/admin">Admin Dashboard</Nav.Link>}
                        {!user && <Nav.Link href="/auth">Sign in/Sign up</Nav.Link>}
                        {user && (
                            <>
                                <Navbar.Text className="me-3">Hi, {user.username}!</Navbar.Text>
                                <Button variant="danger" onClick={logoutUser} className={expanded ? "w-25" : "w-auto"}>Log
                                    out</Button>{' '}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;