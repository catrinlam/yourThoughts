import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Container, Row, Button} from "react-bootstrap";


const Index = () => {
    return (
        <div>
            <Container className="my-5">
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1>Welcome to Your Thoughts</h1>
                        <p className="lead">
                            Explore student feedback on university modules to make informed decisions about your
                            education.
                        </p>
                        <p>
                            Enhances the accessibility of module feedback, allowing both current and
                            prospective students to gain insights into the learning experience.
                        </p>
                        <p>
                            View feedback on modules, lecturers and academic years.
                        </p>
                        <Button as={Link} to="/results" variant="primary" className="mb-md-2">View Module Feedback</Button>
                        <Button as={Link} to="/auth" variant="secondary" className="mb-md-2">Log in/Sign up for more features</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Index;