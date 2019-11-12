import React from 'react';
import { Card } from 'react-bootstrap';

export default function Template({ template, onClick }) {
  return (
    <div className="btn btn-link" key={template._id} onClick={onClick} style={{ width: '8rem', color: '#F5FFFA' }}>

        <Card>
          <Card.Img variant="top" src="https://www.pinclipart.com/picdir/middle/23-237671_document-clipart-stack-papers-file-stack-icon-png.png" />
        </Card>

        <center className="pt-2">
          <p>{template.title}</p>
          <p>$10.00</p>
        </center>
    </div>
  );
}
