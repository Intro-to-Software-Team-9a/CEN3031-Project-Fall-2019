import React from 'react';
import { Button, ButtonToolbar, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';
import DocumentHistory from './DocumentHistory';
import axios from 'axios';
import { getDocuments } from '../actions/document';
import { regenerate } from '../actions/template';

class CurrentDoc extends React.Component {
  generateDocument(activeTemplate) {
    axios.get(`/api/documents/generate/${activeTemplate._id}`).then((res) => {
      this.props.getDocuments();
    });
  }

  render() {
    const { activeTemplate, documents, responses, regenerate, isLoading } = this.props;

    if (isLoading) {
      return (
        <div>
          Loading...
      </div>
      );
    }
    const activeDocuments = documents.filter(
      (document) => document.templateId._id === activeTemplate._id,
    );

    const canRegenerate = responses.some((response) => {
      if (activeDocuments.every((doc) => doc.createdAt < response.createdAt)) {
        return true;
      }
      return false;
    });

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
      <h5>Status</h5>
      {canRegenerate
        ? <Alert variant="primary" style={{ maxWidth: '500px' }}>
          This document can be updated with newer information about you.
          Click <Alert.Link
            onClick={() => regenerate(activeTemplate._id)}
          >here</Alert.Link> to regenerate it.
        </Alert>
        : <Alert variant="success" style={{ maxWidth: '500px' }}>
          This document is up to date with your latest info.
        </Alert>
      }

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
  responses: state.viewResponse.questionnaireResponses || [],
  isLoading: state.viewResponse.questionnaireResponsesState.isWaiting
    || state.documents.documentState.isWaiting
    || state.documents.generateState.isWaiting,
});

const mapDispatchToProps = (dispatch) => ({
  regenerate: (templateId) => dispatch(regenerate(templateId)),
  getDocuments: () => dispatch(getDocuments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentDoc);
