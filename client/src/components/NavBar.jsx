import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import './NavBar.css';

import { doLogout } from '../actions/account';

function NavBar({ isLoggedIn, name, doLogout }) {
  return (
    <Navbar bg="#343a40" expand="lg">
      <Navbar.Brand style={{color:'#F5FFFA', fontFamily: 'fantasy', fontWeight: '700px'}}>Application</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/home" style={{color:'#F5FFFA'}}><Nav.Link>Home</Nav.Link></LinkContainer>
          <LinkContainer to="/catalog" style={{color:'#F5FFFA'}}><Nav.Link>Catalog</Nav.Link></LinkContainer>
          <LinkContainer to="/view-documents"><Nav.Link>Documents</Nav.Link></LinkContainer>
        </Nav>
        <Nav className="mr-sm-2">
          {isLoggedIn
            ? <React.Fragment>
              <LinkContainer to="/home" style={{color:'#F5FFFA'}}><Nav.Link>{name}</Nav.Link></LinkContainer>
              <Button onClick={doLogout} variant="outline-light">Log Off</Button>
            </React.Fragment>
            : <React.Fragment>
              <Link to='/login'><Button variant="outline-light" style={{marginRight:'10px'}}>Log In</Button></Link>
              <Link to='/create-account'><Button variant="outline-light">Get Started</Button></Link>
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
