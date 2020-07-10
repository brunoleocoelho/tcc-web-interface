import React from 'react'
import { Container } from 'react-bootstrap';
import ToastCustom from '../components/ToastCustom';

/**
 * Esta function representa a página inicial
 */
function Home() {
    return (
        <Container className="p3">
            <h1>
                Home Page
            </h1>

            <ToastCustom>
                Hello Bootstrap Toast from Home!!!
            </ToastCustom>
        </Container>
    )
}

export default Home
