import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { doLogout } from '../actions/account';

function NavBar({ isLoggedIn, name, doLogout }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Application</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
          <LinkContainer to="/view-documents"><Nav.Link>Documents</Nav.Link></LinkContainer>
        </Nav>
        <Nav className="mr-sm-2">
          {isLoggedIn
            ? <React.Fragment>
              <LinkContainer to="/home"><Nav.Link>{name}</Nav.Link></LinkContainer>
              <Nav.Link onClick={doLogout}>Logout</Nav.Link>
            </React.Fragment>
            : <React.Fragment>
              <LinkContainer to="/login"><Nav.Link>Log In</Nav.Link></LinkContainer>
              <LinkContainer to="/create-account"><Nav.Link>Get Started</Nav.Link></LinkContainer>
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

const mapDispatchToProps = (dispatch) => ({
  doLogout: () => dispatch(doLogout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
