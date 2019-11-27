import React from 'react';
import { Card } from 'react-bootstrap';
import { formatCurrency } from '../utils/format';
import docIcon from '../assets/docIcon.svg';

export default function Template({ template, onClick }) {
  return (
    <div className="hover-outline d-inline-block m-2" key={template._id} onClick={onClick} style={{ width: '8rem' }}>

      <Card>
        <Card.Img style={{ color: 'green' }} variant="top" src={docIcon} />

        <center className="pt-2">
          <p className="font-weight-bold mb-0">{template.title}</p>
          <p className="mt-1">{formatCurrency(template.priceInCents)}</p>
        </center>
      </Card>
    </div>
  );
}
