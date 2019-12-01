import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

import './UploadTemplate.css';
import { Input } from '@material-ui/core';

class UploadTemplateModal extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      currFileName: null
    }
  }

  onFileUpload(e) {
    e.preventDefault();

    var formData = new FormData(e.target);

    var name = formData.get('templateName');
    var price = formData.get('templatePrice');
    var file = formData.get('templateFile');

    var currTemplate = this.props.template;
    if (currTemplate) {
      name = currTemplate.title;
    }

    if (file) {
      file.arrayBuffer().then(arrayBuffer => {
        var buffer = Buffer.from(arrayBuffer);

        axios.post("/api/templates/add", {
          title: name,
          price: price,
          fileName: file.name,
          data: buffer
        }).then(this.props.onTemplateUpload);
      });
    }
    else {
        axios.patch("/api/templates/update", {
          title: name,
          price: price
        }).then(this.props.onTemplateUpload);
    }
  }

  onFileSelect(e) {
    this.setState({ currFileName: e.target.files[0].name });
  }

  render() {
    var fileName = this.state.currFileName;
    var selectedFile = fileName == null ? (<span>Choose file</span>) : (<span>{fileName}</span>);
    var currTemplate = this.props.template;

    var modalTitle = currTemplate == null ? 'Create New Form Template' : ('Edit Form: ' + currTemplate.title);

    return (
      <Modal {...this.props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onFileUpload.bind(this)}>
            { currTemplate == null &&
              <Form.Group>
                <Form.Label htmlFor="templateNameInput">Template Name</Form.Label>
                <Form.Control size="md" type="text" id="templateNameInput" name="templateName"/>
              </Form.Group>
            }
            <Form.Group className="custom-file">
              <Form.Label className="custom-file-label" htmlFor="templateFileInput">{selectedFile}</Form.Label>
              <Input type="file" className="custom-file-input" id="templateFileInput" name="templateFile" onChange={this.onFileSelect.bind(this)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="templatePriceInput">Template Price</Form.Label>
              <Form.Control size="md" type="text" id="templatePriceInput" name="templatePrice"/>
            </Form.Group>
            <Button type="submit" className="uploadButton">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UploadTemplateModal;