import React from 'react';
import { connect } from 'react-redux';
import {
  Button, ButtonToolbar, Container, Col, Row,
} from 'react-bootstrap';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import axios from 'axios';

class DocumentHistory extends React.Component {
  downloadDocument(documentId) {
    axios.get(`/api/documents/${documentId}`).then((res) => {
      var bufferData = new Uint8Array(res.data.document.data.data);

      // Open a file download prompt
      var blob = new Blob([bufferData], {type: 'application/zip'} );
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = res.data.document.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  render() {
    var documents = this.props.documents;
    return (
      <div>
        <Container>
          {documents.map((document) => (
            <Row key={`history-entry-${document._id}`} className="mb-4">
              <Col xl={4}>
                <p className="mt-2">{moment(document.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </Col>
              <Col>
                <ButtonToolbar>
                  <Button
                    variant="outline-dark"
                    className="mr-2"
                    onClick={() => this.downloadDocument(document._id)}
                  >
                    <span className="mr-1"><GetAppIcon /></span>
                    Download
                  </Button>
                  {/* <Button variant="outline-dark"
                    className="mr-2"><span className="mr-1"><PrintIcon />ˇ</span>Print</Button> */}
                </ButtonToolbar>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
  documents: state.documents.documents,
});

export default connect(mapStateToProps)(DocumentHistory);
