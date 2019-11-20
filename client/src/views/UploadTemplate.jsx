import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class UploadTemplateView extends React.Component {  

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

      axios.post("/api/templates/add", {
        fileName: file.name,
        buffer: btoa(byteStr)
      });
    });
  }

  onFileSelect(file) {
    console.log(file.value);
  }

  render() {
    return (
      <Container className="pt-4" fluid>
        <Row>
          <Col>
            <form onSubmit={this.onFileUpload.bind(this)}>
              <div class="custom-file">
                <label class="custom-file-label" for="templateFileInput">Choose file</label>
                <input type="file" class="custom-file-input" id="templateFileInput" name="templateFile" onChange={this.onFileSelect.bind(this)}/>
                <button class="btn btn-primary" type="submit">Upload</button>
              </div>
            </form>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default UploadTemplateView;