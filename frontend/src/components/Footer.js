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

//<footer className="footer mt-auto py-3 bg-light text-muted">
        // <Container>
        // <Row className="justify-content-between">
        // <Col md="auto" className="text-md-start px-0">
        // <span>© {currentYear} YourThoughts</span>
        // </Col>
        // <Col md="auto" className="text-md-center px-0">
        // Developed by <a href="https://your-link-here.com" className="text-primary" target="_blank"
//                         rel="noopener noreferrer">Cheuk Yu Lam</a><br/>
//         Source code available on <a href="https://git.cs.bham.ac.uk/projects-2023-24/cxl031" className="text-primary"
//                                     target="_blank"
//                                     rel="noopener noreferrer">GitLab</a>
//       </Col>
//       <Col md="auto" className="text-md-end px-0">
//         Supervised by <a href="https://shah.fyi/" className="text-primary" target="_blank"
//                          rel="noopener noreferrer">Dr. S Madasar Shah</a>
//       </Col>
//     </Row>
//   </Container>
// </footer>