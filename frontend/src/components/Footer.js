import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container>
                <Row>
                    <Col className="text-left">
                        <span className="text-muted">© {new Date().getFullYear()} YourThoughts</span>
                    </Col>
                    <Col className="text-right">
                        <p className="text-muted"> Developed by: <a className="text-muted" href="Cheuk Yu Lam">Cheuk Yu Lam</a>, Supervisor: <a className="text-muted" href="https://shah.fyi/">Dr. Madasar Shah</a></p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
