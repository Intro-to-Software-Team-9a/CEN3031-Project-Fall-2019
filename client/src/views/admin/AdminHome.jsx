import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NoAccess from '../NoAccess';

class AdminHomeView extends React.Component {
  render() {
    if (!this.props.profile || !this.props.profile.role.isAdmin) {
      return (<NoAccess/>);
    }

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

const mapStateToProps = (state) => ({
  profile: state.profiles.profile
});


export default connect(
  mapStateToProps
)(AdminHomeView);