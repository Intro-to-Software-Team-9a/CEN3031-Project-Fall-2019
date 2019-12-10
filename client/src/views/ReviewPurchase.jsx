import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import TemplateList from '../components/TemplateList';
import { doPurchase } from '../actions/purchase';
import { formatCurrency } from '../utils/format';
import PaypalButton1 from '../components/PaypalButton';

const safelock = require('../assets/safeLock.png');

function ReviewPurchase({ templates, onBack, onFinish }) {
  const totalPurchase = templates.reduce((accum, template) => accum + template.priceInCents, 0);
  return (
    <div className="min-vh-100 bg-three-people">
      <div className="spacing"></div>
      <Container className="pt-4" fluid>
        <Row className="pt-4">
          <Col sm={1}></Col>
          <Col sm={4}>
            <div className="display-card bg-white shadow">
              <h1>
                <span onClick={onBack} className="cursor-pointer">&larr;</span>
                &nbsp;
                Review Your Purchase
                &nbsp;
                <img src={safelock} alt="Checkmark" width="15" height="15"></img>
              </h1>
            </div>
          </Col>
        </Row>

        <Row className="pt-4">
          <Col className="d-none d-xl-block" xl={1}></Col>
          <Col xl={4}>
            <div className="display-card bg-white shadow">
              <h5>Your Cart</h5>
              <TemplateList templates={templates} />
            </div>
          </Col>
        </Row>

        <Row className="pt-4">
          <Col className="d-none d-xl-block" xl={1}></Col>
          <Col xl={3}>
            <div className="display-card bg-white shadow">

              <h5 className="font-weight-bold">Purchase Summary</h5>
              <p><i>We don't store your payment information.</i></p>
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
                <br />
                <h5 className="font-weight-bold">Check Out</h5>
                <PaypalButton1
                  totalPurchase={totalPurchase}
                  onFinish={onFinish}
                />
              </div>
            </div>
          </Col>
        </Row>
        <br />
      </Container>
    </div>
  );
}


const mapStateToProps = (state) => ({
  templates: state.purchase.cart.templates,
});


const mapDispatchToProps = (dispatch) => ({
  doPurchase: async (paymentId) => {
    await dispatch(doPurchase(paymentId));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewPurchase);
