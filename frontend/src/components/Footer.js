import React, {useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {ThemeContext} from "../App";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useContext(ThemeContext);

  return (
    <footer className={`footer mt-auto py-3 bg-light text-muted ${theme}-theme`}>
      <Container>
        <Row className="justify-content-between">
          <Col md="auto" className="text-md-start px-0">
            <span>© {currentYear} YourThoughts</span>
          </Col>
          <Col md="auto" className="text-md-center px-0">
            Developed by <a href="https://your-link-here.com" className="text-primary" target="_blank"
                            rel="noopener noreferrer">Cheuk Yu Lam</a><br/>
              Source code available on <a href="https://git.cs.bham.ac.uk/projects-2023-24/cxl031" className="text-primary" target="_blank"
                            rel="noopener noreferrer">GitLab</a>
            </Col>
            <Col md="auto" className="text-md-end px-0">
                    Supervised by <a href="https://shah.fyi/" className="text-primary" target="_blank"
                                     rel="noopener noreferrer">Dr. S Madasar Shah</a>
            </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;