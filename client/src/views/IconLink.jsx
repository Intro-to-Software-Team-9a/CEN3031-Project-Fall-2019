import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function IconLink({ link, title, icon }) {
  return (
    <LinkContainer className="d-inline-block m-1" to={link} style={{ maxWidth: '129px' }}>
      <Button variant="outline-dark" className="text-center">
        <div className="my-2">
          {icon}
        </div>
        <h6>{title}</h6>
      </Button>
    </LinkContainer>
  );
}
