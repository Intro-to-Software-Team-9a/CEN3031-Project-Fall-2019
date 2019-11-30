import React from 'react';
import { Row, Col, Container} from 'react-bootstrap';

class Settings extends React.Component {

  render() {
    return (

        <Container fluid>
        <Row> 
            <Col md={1} className="pb-4 pt-4">
                <h2>&larr;</h2>
            </Col>
            <Col md={11}className="pb-4 pt-4">
                <h1>Settings</h1>
            </Col>
        </Row>
      </Container >
      
    );
  }
}


export default Settings;
