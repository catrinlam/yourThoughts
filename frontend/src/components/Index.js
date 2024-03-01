import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const Index = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Container className="my-5">
                <h1>Welcome to Your Thoughts</h1>
                <p className="lead">
                    Explore student feedback on university final year modules to make informed decisions about your
                    education.
                </p>
                <p>
                    Enhances the accessibility of module feedback, allowing both current and
                    prospective students to gain insights into the learning experience.
                </p>
                <p>
                    View feedback on modules, lecturers and academic years. by clicking the button below.
                </p>
                <Button as={Link} to="/results" variant="primary" className="mb-2 me-3">View Module Feedback</Button>
                {!user &&
                    <Button as={Link} to="/auth" variant="secondary" className="mb-2">Log in/Sign up for more features</Button>}
            </Container>
        </div>
    );
}

export default Index;