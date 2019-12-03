import React from 'react';
import { InputGroup, Form, Button, Modal, Col } from 'react-bootstrap';
import axios from 'axios';

import './UploadTemplate.css';
import { Input } from '@material-ui/core';

class UploadTemplateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currFileName: null,
    };
  }

  async onFileUpload(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get('templateName');
    const dollars = formData.get('templatePriceDollars');
    const cents = formData.get('templatePriceCents');

    const price = Number(dollars) * 100 + Number(cents);
    const file = formData.get('templateFile');

    const currTemplate = this.props.template;

    if (!currTemplate) {
      file.arrayBuffer().then((arrayBuffer) => {
        axios.post('/api/templates/add', {
          title: name,
          price,
          fileName: file.name,
          data: Buffer.from(arrayBuffer),
        }).then(() => {
          this.props.onTemplateUpload();
          this.props.showModalFunc(false);
        });
      });
    } else {
      const buffer = file ? Buffer.from(await file.arrayBuffer()) : null;

      axios.patch('/api/templates/update', {
        templateTypeId: currTemplate._id,
        title: name,
        data: (buffer === null || buffer.length === 0) ? undefined : buffer,
        price,
      }).then(() => {
        this.props.onTemplateUpload();
        this.props.showModalFunc(false);
      });
    }
  }

  onFileSelect(e) {
    this.setState({ currFileName: e.target.files[0].name });
  }

  render() {
    const fileName = this.state.currFileName;
    const selectedFile = fileName == null ? (<span>Choose file</span>) : (<span>{fileName}</span>);
    const currTemplate = this.props.template;

    const modalTitle = currTemplate == null ? 'Create New Form Template' : (`Edit Form: ${currTemplate.title}`);
    const initialDollars = currTemplate == null ? 0 : Math.floor(currTemplate.priceInCents / 100);
    const initialCents = currTemplate == null ? '00' : currTemplate.priceInCents % 100;
    const initialTitle = currTemplate == null ? '' : currTemplate.title;

    return (
      <Modal {...this.props} size="md" centered className="border border-dark">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onFileUpload.bind(this)}>
            <Form.Group>
              <Form.Label htmlFor="templateNameInput">Template Name</Form.Label>
              <Form.Control size="md" type="text" id="templateNameInput" name="templateName" defaultValue={initialTitle} />
            </Form.Group>
            <p className="mb-1">File</p>
            <Form.Group className="custom-file">
              <Form.Label className="custom-file-label" htmlFor="templateFileInput">{selectedFile}</Form.Label>
              <Input type="file" className="custom-file-input" id="templateFileInput" name="templateFile" onChange={this.onFileSelect.bind(this)} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="templatePriceDollarsInput">Price</Form.Label>
              <Form.Row>
                <Col md={6}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control size="md" type="text" id="templatePriceDollarsInput" name="templatePriceDollars" defaultValue={initialDollars} />
                 </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">&#162;</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control size="md" type="text" id="templatePriceCentsInput" name="templatePriceCents" defaultValue={initialCents} />
                 </InputGroup>
                </Col>
              </Form.Row>
            </Form.Group>
            <Button variant="secondary" type="submit" className="uploadButton">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UploadTemplateModal;
