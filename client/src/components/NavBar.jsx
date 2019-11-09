import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function NavBar() {
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
          <LinkContainer to="/login"><Nav.Link>Log In</Nav.Link></LinkContainer>
          <LinkContainer to="/create-account"><Nav.Link>Get Started</Nav.Link></LinkContainer>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
