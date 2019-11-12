import React from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import TemplateList from '../components/TemplateList';
import { doPurchase } from '../actions/purchase';

function ReviewPurchase({ templates, doPurchase, onBack }) {
  return (
    <Container fluid className="pt-4">
      <Row>
        <Col md={1}>
          <h1 onClick={onBack} className="float-right">&larr;</h1>
        </Col>
        <Col>
          <h1>Review Your Purchase</h1>
        </Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col>
          <h5>Your Cart</h5>
          <TemplateList templates={templates} />
          <Button onClick={doPurchase} variant="outline-light">Purchase</Button>
        </Col>
      </Row>
    </Container>
  );
}


// create necessary props for AbstractForm
const mapStateToProps = (state) => ({
  templates: state.purchase.cart.templates,
});


// create action-dispatchers for AbstractForm
const mapDispatchToProps = (dispatch, ownProps) => ({
  doPurchase: () => {
    dispatch(doPurchase({ onSuccess: ownProps.onFinish }))
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewPurchase);
