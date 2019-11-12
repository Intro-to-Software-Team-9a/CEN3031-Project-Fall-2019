import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DocumentHistory from './DocumentHistory';

function CurrentDoc({ activeTemplate }) {
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
          <Button variant="outline-dark" className="mr-3" style={{ minWidth: '175px' }}><span className="mr-1"><GetAppIcon /></span>Download</Button>
          <Button variant="outline-dark" className="mr-3" style={{ minWidth: '175px' }}><span className="mr-2"><PrintIcon /></span>Print</Button>
          <Button variant="outline-dark" className="mr-3" style={{ minWidth: '175px' }}><span className="mr-2"><EditOutlinedIcon /></span>Edit</Button>
        </ButtonToolbar>

        <br />

        <h5>Document History</h5>
        <DocumentHistory />
      </div>
  );
}

const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
});
export default connect(mapStateToProps)(CurrentDoc);
