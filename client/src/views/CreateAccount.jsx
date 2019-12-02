import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import CreateAccontForm from '../components/CreateAccountForm.jsx';

class CreateAccount extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.onFinish();
    }
  }

  render() {
    const { onFinish, onBack } = this.props;
    return (
      <Container className="pt-4" fluid>
        <Row>
          <Col md={1}>
            <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col>
            <h1>Create Account</h1>
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={3} className="col-4 pt-4">
            <CreateAccontForm onFinish={onFinish} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.profiles.profile,
});

export default connect(
  mapStateToProps,
)(CreateAccount);
