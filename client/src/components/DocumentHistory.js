import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button, ButtonToolbar, Container, Col, Row } from 'react-bootstrap';

function DocumentHistory({ activeTemplate, documents }) {

  const activeDocuments = documents.filter(document => document.templateId._id === activeTemplate._id);

  return (
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Container>
            {activeDocuments.map((document) => (

              <Row>
                <Col xl={4}>
                  <p>{document.createdAt}</p>
                </Col>
                <Col>

                  <ButtonToolbar>
                    <Button variant="outline-dark" className="mr-1">Download</Button>
                    <Button variant="outline-dark" className="mr-1">Print</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            ))}
          </Container>
        </ListGroup.Item>
      </ListGroup>
    </div>



  )

}



const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
  documents: state.documents.documents,
})

export default connect(mapStateToProps)(DocumentHistory);