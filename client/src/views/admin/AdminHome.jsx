import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class AdminHomeView extends React.Component {
  render() {
    return (
      <Container className="pt-4" fluid>
        <Row className="justify-content-md-center">
          <Col>
            Welcome to Admin Home
            <Link to='/admin/templates'>
              <Button variant="outline-dark">Manage Templates</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AdminHomeView;