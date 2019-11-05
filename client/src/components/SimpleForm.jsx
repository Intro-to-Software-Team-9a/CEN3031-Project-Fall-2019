import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SimpleForm({
  fields, data, state, onSubmit, changeField,
}) {
  const formFields = fields.map(({ type, name, label }) => (
    <Form.Group key={name} controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={data[name]}
        onChange={(e) => changeField(name, e.target.value)}
        type={type} />
    </Form.Group>
  ));

  return (
    <div>
      <Form onSubmit={onSubmit}>
        {formFields}
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      {JSON.stringify(state)}
    </div>
  );
}
