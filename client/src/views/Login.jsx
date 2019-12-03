import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import LoginForm from '../components/LoginForm.jsx';
import { Routes } from '../utils/constants';

class Login extends React.Component {
  onLogin() {
    const { history } = this.props;
    const { profile } = this.props;

    if (!this.props.profile) {
      history.push(Routes.HOME);
      return;
    }

    if (profile.role.isAdmin) {
      history.push('/admin');
      return;
    }

    history.push(Routes.PROFILE_HOME);
  }

  render() {
    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4" fluid>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col sm={11}>
              <h1>Log In</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={4}>
              <div className="display-card bg-white shadow">
                <LoginForm onFinish={this.onLogin.bind(this)} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(
  mapStateToProps,
)(Login);
