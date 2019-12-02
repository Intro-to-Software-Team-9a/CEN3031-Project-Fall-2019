import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import TemplateList from '../components/TemplateList';
import { doPurchase } from '../actions/purchase';
import { formatCurrency } from '../utils/format';
import PaypalButton1 from '../components/PaypalButton';

function ReviewPurchase({ templates, onBack, onFinish }) {
  const totalPurchase = templates.reduce((accum, template) => accum + template.priceInCents, 0);
  return (
    <Container fluid className="pt-4">
      <Row>
        <Col md={1}>
          <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
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
        </Col>
      </Row>

      <br />
      <Row>
        <Col md={1}></Col>
        <Col md={2}>
          <h5>Purchase Info</h5>
          <div>
            {templates.map((template) => (
              <p>
                {template.title}
                <span className="float-right">{formatCurrency(template.priceInCents)}</span>
              </p>
            ))}

            <p className="font-weight-bold">
              Total
              <span className="float-right font-weight-bold">{formatCurrency(totalPurchase)}</span>
            </p>
            <PaypalButton1
              totalPurchase={totalPurchase}
              onFinish = {onFinish}
            />
          </div>
        </Col>
      </Row>
      <br />
    </Container>
  );
}


const mapStateToProps = (state) => ({
  templates: state.purchase.cart.templates,
});


const mapDispatchToProps = (dispatch) => ({
  doPurchase: async (paymentId) => {
    await dispatch(doPurchase(paymentId))
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewPurchase);
