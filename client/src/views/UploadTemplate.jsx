import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

import './UploadTemplate.css';
import { Input } from '@material-ui/core';

class UploadTemplateModal extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      curFileName: null
    }
  }

  onFileUpload(e) {
    e.preventDefault();

    var formData = new FormData(e.target);

    var name = formData.get('templateName');
    var price = formData.get('templatePrice');
    var file = formData.get('templateFile');

    var curTemplate = this.props.template;
    if (curTemplate) {
      name = curTemplate.title;
    }

    if (file) {
      file.arrayBuffer().then(buffer => {
        var byteArray = new Uint8Array(buffer);
        var byteStr = '';

        for (var i = 0; i < buffer.byteLength; i++) {
          byteStr += byteArray[i];
        }

        // Todo: Move to actions/template.js
        axios.post("/api/templates/add", {
          name: name,
          price: price,
          fileName: file.name,
          buffer: btoa(byteStr)
        }).then(this.props.onTemplateUpload);
      });
    }
    else {
        axios.post("/api/templates/update", {
          name: name,
          price: price
        }).then(this.props.onTemplateUpload);
    }
  }

  onFileSelect(e) {
    this.setState({ curFileName: e.target.files[0].name });
  }

  render() {
    var fileName = this.state.curFileName;
    var selectedFile = fileName == null ? (<span>Choose file</span>) : (<span>{fileName}</span>);
    var curTemplate = this.props.template;

    var modalTitle = curTemplate == null ? 'Create New Form Template' : ('Edit Form: ' + curTemplate.title);

    return (
      <Modal {...this.props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onFileUpload.bind(this)}>
            { curTemplate == null &&
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