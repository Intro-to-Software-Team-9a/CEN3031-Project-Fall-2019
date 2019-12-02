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
      <Container className="pt-4">
        <h1>Log In</h1>
        <Row>
          <Col className="col-4 pt-4">
            <LoginForm onFinish={this.onLogin.bind(this)} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(
  mapStateToProps,
)(Login);
