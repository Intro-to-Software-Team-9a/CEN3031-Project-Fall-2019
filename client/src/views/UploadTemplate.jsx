import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

import './UploadTemplate.css';

class UploadTemplateModal extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
      curFileName: null
    }
  }

  onFileUpload(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const file = formData.get('templateFile');

    file.arrayBuffer().then(buffer => {
      var byteArray = new Uint8Array(buffer);
      var byteStr = '';

      for (var i = 0; i < buffer.byteLength; i++) {
        byteStr += byteArray[i];
      }

      // Todo: Move to actions/template.js
      axios.post("/api/templates/add", {
        fileName: file.name,
        buffer: btoa(byteStr)
      });
    });
  }

  onFileSelect(e) {
    this.setState({ curFileName: e.target.files[0].name });
  }

  render() {
    var fileName = this.state.curFileName;
    var selectedFile = fileName == null ? (<span>Choose file</span>) : (<span>{fileName}</span>);

    return (
      <Modal {...this.props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Form Template
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Upload Form</h4>
          <form onSubmit={this.onFileUpload.bind(this)}>
            <div className="custom-file">
              <label className="custom-file-label" htmlFor="templateFileInput">{selectedFile}</label>
              <input type="file" className="custom-file-input" id="templateFileInput" name="templateFile" onChange={this.onFileSelect.bind(this)}/>
            </div>
            <Button type="submit" className="uploadButton">Upload</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UploadTemplateModal;