
import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
import ChangeInfoActions from '../components/ChangeInfoActions'
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
      <Container>
        <Row>
          <Col md={1}>
            <h2 onClick={this.onBack} className="cursor-pointer hover-white float-right">&larr;</h2>
          </Col>
          <Col>
            <h2>
              Settings
            </h2>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col md={1}></Col>
          <Col>
            <UserInfo />
            <ChangeInfoActions />
            <PermanentActions onSuccessfulDelete={this.redirectToHome} />
          </Col>
        </Row>
      </Container >
    );
  }
}


export default UserSettings;
