import React from 'react';
import { connect } from 'react-redux';
import {
  Button, ListGroup,
} from 'react-bootstrap';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';

/** Displays all generated versions of a template for a user. */
function DocumentHistory({ activeTemplate, documents }) {
  const activeDocuments = documents
    .filter(
      (document) => document.templateId._id === activeTemplate._id,
    )
    // sort by newest first
    .sort(
      (d1, d2) => new Date(d2.createdAt).getTime() - new Date(d1.createdAt).getTime(),
    );

  return (
    <div style={{ maxWidth: '500px' }}>

      <ListGroup>
        {activeDocuments.map((document) => (
          <ListGroup.Item key={`history-entry-${document._id}`}>
            <Button
              variant="outline-dark"
              className="mr-2"
              onClick={() => window.open(`/api/pdf/${document._id}`, 'Your Document')}>
              <span className="mr-1"><GetAppIcon /></span> Download
            </Button>
            <span className="ml-4 mt-2">{moment(document.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
  documents: state.documents.documents,
});

export default connect(mapStateToProps)(DocumentHistory);
