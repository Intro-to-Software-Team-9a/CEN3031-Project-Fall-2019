import React from 'react';
import DocumentHistory from './DocumentHistory';
import { Button, ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';

function CurrentDoc ({activeTemplate}){
    if (!activeTemplate) {
      return (
        <div>
          <p className="text-center text-muted">Select a document</p>
        </div>
      )
      }
    return (
      <div>
        <h2>{activeTemplate.title}</h2>

        <br />

        <h5>Actions</h5>
        <ButtonToolbar>
          <Button variant="outline-dark" className="mr-1">Download</Button>
          <Button variant="outline-dark" className="mr-1">Print</Button>
          <Button variant="outline-dark" className="mr-1">Edit</Button>
        </ButtonToolbar>

        <br />

        <h5>Document History</h5>
        <DocumentHistory />
      </div>
    );

  }


const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate
})
export default connect(mapStateToProps)(CurrentDoc);