import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';
import DocumentHistory from './DocumentHistory';
import axios from 'axios';
import { getDocuments } from '../actions/document';


class CurrentDoc extends React.Component {
  generateDocument(activeTemplate) {
    axios.get(`/api/documents/generate/${activeTemplate._id}`).then((res) => {
      this.props.getDocuments();
    });
  }

  render() {
    var activeTemplate = this.props.activeTemplate;

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
            onClick={() => this.generateDocument(activeTemplate)}
          >
            <span className="mr-1"><GetAppIcon /></span>
            Generate
            </Button>
          <Button
            variant="outline-dark"
            className="mr-2"
            style={{ minWidth: '175px' }}
            onClick={() => this.generateDocument(activeTemplate)}
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

const mapDispatchToProps = (dispatch) => ({
  getDocuments: () => dispatch(getDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDoc);
