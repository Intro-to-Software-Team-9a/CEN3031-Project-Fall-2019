import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavBar.css';

import { doLogout, resetApplication } from '../actions/account';
import { Routes } from '../utils/constants';

function NavBar({ isLoggedIn, name, doLogout }) {
  return (
    <Navbar className="bg-white shadow-sm fixed-top" expand="lg">
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
              <Nav.Link onClick={doLogout}>Logout</Nav.Link>
              <LinkContainer to={Routes.USER_SETTINGS}><Nav.Link>Settings</Nav.Link></LinkContainer>
            </React.Fragment>
            : <React.Fragment>
              <LinkContainer to={Routes.LOGIN}><Nav.Link>Log In</Nav.Link></LinkContainer>
              <LinkContainer to={Routes.ONBOARDING}><Nav.Link>Get Started</Nav.Link></LinkContainer>
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
  doLogout: async () => {
    await dispatch(doLogout());
    await dispatch(resetApplication());
    ownProps.onLogout();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
