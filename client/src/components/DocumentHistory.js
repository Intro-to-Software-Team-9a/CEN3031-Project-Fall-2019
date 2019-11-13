import React from 'react';
import { connect } from 'react-redux';
import {
  Button, ButtonToolbar, Container, Col, Row,
} from 'react-bootstrap';
import GetAppIcon from '@material-ui/icons/GetApp';
// import PrintIcon from '@material-ui/icons/Print';
import moment from 'moment';

function DocumentHistory({ activeTemplate, documents }) {
  const activeDocuments = documents.filter(
    (document) => document.templateId._id === activeTemplate._id,
  );

  return (
    <div>
      <Container>
        {activeDocuments.map((document) => (
          <Row key={`history-entry-${document._id}`} className="mb-4">
            <Col xl={4}>
              <p className="mt-2">{moment(document.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </Col>
            <Col>
              <ButtonToolbar>
                <Button
                  variant="outline-dark"
                  className="mr-2"
                  onClick={() => window.open(`/api/pdf/${document._id}`, 'Your Document')}
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
const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
  documents: state.documents.documents,
});

export default connect(mapStateToProps)(DocumentHistory);
