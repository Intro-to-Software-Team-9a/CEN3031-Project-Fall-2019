import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DocumentHistory from './DocumentHistory';

function CurrentDoc({ activeTemplate, documents }) {
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
          <Button variant="outline-dark" className="mr-2" style={{ minWidth: '175px' }} onClick={() => window.open('/api/pdf/'+activeDocuments[activeDocuments.length-1]._id, '_blank')}><span className="mr-1"><GetAppIcon /></span>Download</Button>
          <Button variant="outline-dark" className="mr-2" style={{ minWidth: '175px' }} onClick={() => window.open('/api/pdf/'+activeDocuments[activeDocuments.length-1]._id, '_blank')}><span className="mr-2"><PrintIcon /></span>Print</Button>
          {/* <Button variant="outline-dark" className="mr-3" style={{ minWidth: '175px' }}><span className="mr-2"><EditOutlinedIcon /></span>Edit</Button> */}
        </ButtonToolbar>

        <br />

        <h5>Document History</h5>
        <DocumentHistory />
      </div>
  );
}

const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
  documents: state.documents.documents || [],
});
export default connect(mapStateToProps)(CurrentDoc);
