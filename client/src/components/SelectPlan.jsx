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
                  <li className="list-group-item">Item 1</li>
                  <li className="list-group-item">Item 2</li>
                  <li className="list-group-item">Item 3</li>
                  <li className="list-group-item">Item 4</li>
                  <li className="list-group-item">Item 5</li>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <Button variant="outline-dark mr-0"
                  onClick={() => onClick('BASIC_PLAN')}>
                  Buy now
                </Button>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div className="card">
              <h2 className="card-header">Advanced</h2>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">Item 1</li>
                  <li className="list-group-item">Item 2</li>
                  <li className="list-group-item">Item 3</li>
                  <li className="list-group-item">Item 4</li>
                  <li className="list-group-item">Item 5</li>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <Button variant="outline-dark mr-0"
                  onClick={() => onClick('ADVANCED_PLAN')}>
                  Buy now
                </Button>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div className="card">
              <h2 className="card-header">Comprehensive</h2>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">Item 1</li>
                  <li className="list-group-item">Item 2</li>
                  <li className="list-group-item">Item 3</li>
                  <li className="list-group-item">Item 4</li>
                  <li className="list-group-item">Item 5</li>
                </ul>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
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
