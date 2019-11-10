import React from 'react';
import {Container, Row} from 'react-bootstrap';

export default function ReviewPurchase() {
    return (
        <Container>
         <h1>Review Your Purchase</h1>
         <Row>
             <h5>Your Cart:</h5>
        </Row>
        <Row>
            <button>Back to Documents</button>
            <button>Purchase</button>
        </Row>   
        </Container>
    );
}