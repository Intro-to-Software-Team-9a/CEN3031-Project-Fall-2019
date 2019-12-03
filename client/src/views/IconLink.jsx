import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function IconLink({ link, title, icon }) {
  return (
    <LinkContainer className="d-inline-block m-1" to={link} style={{ maxWidth: '120px', minHeight: '120px' }}>
      <Button variant="outline-dark" className="text-center no-border">
        <div className="my-2">
          {icon}
        </div>
        <h6>{title}</h6>
      </Button>
    </LinkContainer>
  );
}
