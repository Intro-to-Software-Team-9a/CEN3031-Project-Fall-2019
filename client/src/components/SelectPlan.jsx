import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';

import { selectPlan } from '../actions/selectplan';

function SelectPlan({ onPlanSelect, onFinish, onBack }) {
  const onClick = (plan) => {
    onPlanSelect(plan);
    onFinish();
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="spacing"></div>
      <Container className="pt-4">
        <Row className="pt-4">
          <Col sm={1}>
            <h1 onClick={onBack} className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col sm={11}>
            <h1>Select Plan</h1>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col className="col-4 pt-4">
            <div className="card">
              <h2 className="card-header">Simple</h2>
              <div className="card-body">
                <ul className="list-group">
                  <p>
                    &emsp;A simple plan is perfect for those persons who have
                    estate planning documents in effect and need to update,
                    amend or add supplemental documents to their plan.
                    Make your end of life wishes known and document the
                    specifics of the estate planning documents to help
                    ensure your assets are safe, protected and managed.
                  </p>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <span className="planPrice">$99</span>
                <Button variant="outline-dark mr-0"
                  onClick={() => onClick('BASIC_PLAN')}>
                  Buy now
                </Button>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div className="card h-100">
              <h2 className="card-header">Advanced</h2>
              <div className="card-body">
                <ul className="list-group">
                  <p>
                    &emsp;Powers of Attorney, Advanced Directives and end of
                    life wishes are necessary tools to ensure that
                    your wishes are all included in an Advanced estate plan.
                  </p>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <span className="planPrice">$299</span>
                <Button variant="outline-dark mr-0"
                  onClick={() => onClick('ADVANCED_PLAN')}>
                  Buy now
                </Button>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div className="card h-100">
              <h2 className="card-header">Comprehensive</h2>
              <div className="card-body">
                <ul className="list-group">
                  <p>
                    &emsp;The use of wills, trusts, powers of attorney,
                    and other strategies can help ensure your assets are safe,
                    protected and managed. A comprehensive plan provides different legal
                    tools and the opportunity to use attorneys to confirm
                    that the plans selected will protect the assets you
                    have acquired and achieve your planning goals.
                  </p>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <span className="planPrice">$599</span>
                <Button variant="outline-dark mr-0"
                  onClick={() => onClick('COMPREHENSIVE_PLAN')}>
                  Buy now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onPlanSelect: (plan) => dispatch(selectPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectPlan);
