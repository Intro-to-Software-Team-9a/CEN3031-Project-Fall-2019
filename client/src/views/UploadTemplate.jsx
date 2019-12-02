import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

import './UploadTemplate.css';
import { Input } from '@material-ui/core';
import { EXITED } from 'react-transition-group/Transition';

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
    const price = formData.get('templatePrice');
    const file = formData.get('templateFile');

    const currTemplate = this.props.template;

    if (!currTemplate) {
      file.arrayBuffer().then((arrayBuffer) => {
        axios.post('/api/templates/add', {
          title: name,
          price,
          fileName: file.name,
          data: Buffer.from(arrayBuffer),
        }).then(this.props.onTemplateUpload);
      });
    } else {
      var buffer = file ? Buffer.from(await file.arrayBuffer()) : null;

      axios.patch('/api/templates/update', {
        templateTypeId: currTemplate._id,
        title: name,
        data: buffer,
        price,
      }).then(this.props.onTemplateUpload);
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
    const initialPrice = currTemplate == null ? 0 : currTemplate.priceInCents;
    const initialTitle = currTemplate == null ? '' : currTemplate.title;

    return (
      <Modal {...this.props} size="lg" centered className="border border-dark">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onFileUpload.bind(this)}>
            <Form.Group>
              <Form.Label htmlFor="templateNameInput">Template Name</Form.Label>
              <Form.Control size="md" type="text" id="templateNameInput" name="templateName" defaultValue={initialTitle}/>
            </Form.Group>
            <Form.Group className="custom-file">
              <Form.Label className="custom-file-label" htmlFor="templateFileInput">{selectedFile}</Form.Label>
              <Input type="file" className="custom-file-input" id="templateFileInput" name="templateFile" onChange={this.onFileSelect.bind(this)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="templatePriceInput">Template Price</Form.Label>
              <Form.Control size="md" type="text" id="templatePriceInput" name="templatePrice" defaultValue={initialPrice}/>
            </Form.Group>
            <Button type="submit" className="uploadButton">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UploadTemplateModal;
