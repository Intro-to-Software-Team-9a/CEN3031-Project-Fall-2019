import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';
import DocumentHistory from './DocumentHistory';
import axios from 'axios';

class CurrentDoc extends React.Component {
  downloadActiveTemplate(activeTemplate) {
    axios.get(`/api/documents/generate/${activeTemplate._id}`).then((res) => {
      var bufferData = new Uint8Array(res.data.document.data.data);

      // Open a file download prompt
      var blob = new Blob([bufferData], {type: 'application/zip'} );
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "download.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  render() {
    var activeTemplate = this.props.activeTemplate;
    var documents = this.props.documents;

    const activeDocuments = documents.filter(
      (document) => document.templateId._id === activeTemplate._id,
    );
    if (!activeTemplate) {
      return (
          <div>
            <p className="text-center text-muted">Select a document</p>
          </div>
      );
    }
    return (
      <div>
        <h2>{activeTemplate.title}</h2>

        <br />

        <h5>Actions</h5>
        <ButtonToolbar>
          <Button
            variant="outline-dark"
            className="mr-2"
            style={{ minWidth: '175px' }}
            onClick={() => this.downloadActiveTemplate(activeTemplate)}
          >
            <span className="mr-1"><GetAppIcon /></span>
            Download
            </Button>
          <Button
            variant="outline-dark"
            className="mr-2"
            style={{ minWidth: '175px' }}
            onClick={() => this.downloadActiveTemplate(activeTemplate)}
          >
            <span className="mr-2"><PrintIcon /></span>
            Print
            </Button>
        </ButtonToolbar>

        <br />

        <h5>Document History</h5>
        <DocumentHistory />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
  documents: state.documents.documents || [],
});
export default connect(mapStateToProps)(CurrentDoc);
