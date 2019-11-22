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
        <ListGroup variant="flush">
          <ListGroup.Item className="templateCardListItem">{template.fileName}</ListGroup.Item>
          <ListGroup.Item className="templateCardListItem">{formatCurrency(template.priceInCents)}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
