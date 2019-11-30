import React from 'react';
import { Button } from 'react-bootstrap';

export default function LargeButton({
  icon, text, onClick, variant,
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant || 'outline-dark'}
      className="mr-2"
      style={{ minWidth: '175px' }}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </Button>
  );
}
