import React from 'react';
import {Container, Nav} from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Container>
            <footer>
                <Nav className="justify-content-center border-bottom pb-3 mb-3 mt-3">
                    <Nav.Item className="pe-3">Developed by <a href="https://github.com/winter7eaf" className="text-primary" target="_blank"
                                              rel="noopener noreferrer">Cheuk Yu Lam</a></Nav.Item>
                    <Nav.Item className="pe-3">Source code available on <a href="https://git.cs.bham.ac.uk/projects-2023-24/cxl031"
                                                          className="text-primary"
                                                          target="_blank"
                                                          rel="noopener noreferrer">GitLab</a></Nav.Item>
                    <Nav.Item>Supervised by <a href="https://shah.fyi/" className="text-primary" target="_blank"
                          rel="noopener noreferrer">Dr. S Madasar Shah</a></Nav.Item>
                </Nav>
                <p className="text-center">&copy; {currentYear} YourThoughts</p>
            </footer>
        </Container>
);
};

export default Footer;