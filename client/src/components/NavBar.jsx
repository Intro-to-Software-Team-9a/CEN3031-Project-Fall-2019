import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

import { doLogout } from '../actions/account';
import { Routes } from '../utils/constants';

function NavBar({ isLoggedIn, name, doLogout }) {
  return (
    <Navbar expand="lg">
      <LinkContainer to={Routes.HOME}>
        <Navbar.Brand>
          EstatePlanR
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="mr-sm-2">
          {isLoggedIn
            ? <React.Fragment>
              <LinkContainer to={Routes.PROFILE_HOME}><Nav.Link>{name}</Nav.Link></LinkContainer>
              &nbsp;&nbsp;
              <Button onClick={doLogout} variant="outline-dark">Logout</Button>
            </React.Fragment>
            : <React.Fragment>
              <Link to={Routes.LOGIN}><Button variant="outline-dark">Log In</Button></Link>
              <Link to={Routes.ONBOARDING}><Button className="mr-0" variant="outline-dark">Get Started</Button></Link>
            </React.Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  const isLoggedIn = !!state.profiles.profile;
  const name = isLoggedIn ? state.profiles.profile.name : '';

  return {
    isLoggedIn,
    name,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  doLogout: () => dispatch(doLogout(ownProps.onLogout)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
