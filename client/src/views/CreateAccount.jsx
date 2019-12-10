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
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4" fluid>
          <Row className="pt-4">
            <Col sm={1}>
              <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col sm={11}>
              <h1>Create Account</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={4}>
              <div className="display-card bg-white shadow">
                <CreateAccontForm onFinish={onFinish} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.profiles.profile,
});

export default connect(
  mapStateToProps,
)(CreateAccount);
