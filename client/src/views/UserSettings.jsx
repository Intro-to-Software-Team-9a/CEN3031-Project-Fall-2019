
import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
import ChangeInfoActions from '../components/ChangeInfoActions';
import PermanentActions from '../components/PermanentActions';
import { Routes } from '../utils/constants';

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    this.props.history.push(Routes.HOME);
  }

  onBack() {
    this.props.history.push(Routes.PROFILE_HOME);
  }

  render() {
    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4">
          <Row className="pt-4">
            <Col sm={1}>
              <h1 onClick={this.onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col sm={11}>
              <h1>Manage Account</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={6}>
              <div className="display-card bg-white shadow">
                <UserInfo />
                <ChangeInfoActions />
                <PermanentActions onSuccessfulDelete={this.redirectToHome} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default UserSettings;
