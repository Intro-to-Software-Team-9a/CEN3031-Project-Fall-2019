
import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import Settings from '../components/Settings';
import UserInfo from '../components/UserInfo'
import PermanentActions from '../components/PermanentActions';

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    this.props.history.push('/home');
  }

  onBack() {
    this.props.history.push('/profile-home');
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
            <PermanentActions onSuccessfulDelete={this.redirectToHome} />
          </Col>
        </Row>
      </Container >
    );
  }
}


export default UserSettings;

