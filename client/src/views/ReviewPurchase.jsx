import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import TemplateList from '../components/TemplateList';
import { doPurchase } from '../actions/purchase';

function ReviewPurchase({ templates, doPurchase }) {
  return (
    <Container>
      <h1>Review Your Purchase</h1>
      <Row>
        <Col>
          <h5>Your Cart</h5>
          <TemplateList templates={templates} />
        </Col>
      </Row>
      <Row>
        <Col>
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
const mapDispatchToProps = (dispatch) => ({
  doPurchase: () => dispatch(doPurchase()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewPurchase);
