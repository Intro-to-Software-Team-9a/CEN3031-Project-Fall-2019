import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';

import { selectPlan } from '../actions/selectplan';

function SelectPlan({ onPlanSelect, onFinish }) {
  function onClick(plan) {
    onPlanSelect(plan);
    onFinish();
  }

  return (
    <React.Fragment>
      <Container className="pt-4">
        <h1>Select Plan</h1>
        <Row>
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
    </React.Fragment>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  onPlanSelect: (plan) => dispatch(selectPlan(plan)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectPlan);
