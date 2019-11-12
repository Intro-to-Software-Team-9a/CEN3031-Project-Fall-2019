import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { selectPlan } from '../actions/selectplan';

function SelectPlan({ plan, onPlanSelect, onFinish}) {

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
            <div class="card">
              <h2 class="card-header">Simple</h2>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item">Item 1</li>
                  <li class="list-group-item">Item 2</li>
                  <li class="list-group-item">Item 3</li>
                  <li class="list-group-item">Item 4</li>
                  <li class="list-group-item">Item 5</li>
                </ul>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <a href="#" class="btn btn-outline-dark"
                  onClick={(event) => onClick('BASIC_PLAN')}>
                  Buy now
                </a>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div class="card">
              <h2 class="card-header">Advanced</h2>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item">Item 1</li>
                  <li class="list-group-item">Item 2</li>
                  <li class="list-group-item">Item 3</li>
                  <li class="list-group-item">Item 4</li>
                  <li class="list-group-item">Item 5</li>
                </ul>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <a href="#" class="btn btn-outline-dark"
                  onClick={(event) => onClick('ADVANCED_PLAN')}>
                  Buy now
                </a>
              </div>
            </div>
          </Col>
          <Col className="col-4 pt-4">
            <div class="card">
              <h2 class="card-header">Comprehensive</h2>
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item">Item 1</li>
                  <li class="list-group-item">Item 2</li>
                  <li class="list-group-item">Item 3</li>
                  <li class="list-group-item">Item 4</li>
                  <li class="list-group-item">Item 5</li>
                </ul>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span className="planPrice">$50</span>
                <a href="#" class="btn btn-outline-dark"
                  onClick={(event) => onClick('COMPREHENSIVE_PLAN')}>
                  Buy now
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onPlanSelect: (plan) => dispatch(selectPlan(plan))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectPlan);
