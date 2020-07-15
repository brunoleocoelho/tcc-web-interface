import React from 'react'
import { Container, Button } from 'react-bootstrap';

/**
 * Representa a página "Sobre"
 */
function About() {
    return (
        <Container className="p3">
            <h1> Sobre Page </h1>
            <Button variant="primary" href="/">Homepage</Button>
        </Container>
    )
}

export default About
