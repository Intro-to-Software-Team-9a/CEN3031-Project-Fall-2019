import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { formatCurrency } from '../utils/format';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import './Template.css';

export default function Template({ template, onClick }) {
  return (
    <Card style={{width: '10rem'}} className="hover-outline d-inline-block m-2" key={template._id} onClick={onClick}>
      <Card.Header className="templateCardHeader">
        {template.title}
      </Card.Header>
      <Card.Body className="templateCardBody">
        <DescriptionOutlinedIcon className="templateIcon" color="primary" style={{ fontSize: 120 }}/>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{template.title}</ListGroupItem>
          <ListGroupItem>{formatCurrency(template.priceInCents)}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
