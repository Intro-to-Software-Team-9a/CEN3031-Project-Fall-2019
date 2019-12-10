import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, ButtonToolbar, Button, Alert,
} from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';

import TwoPhaseModal from './TwoPhaseModal';

import { deleteAccount, resetApplication } from '../actions/account';


function PermanentActions({
  deleteAccount, isWaiting, isError, error, isAccountDeleted, resetApplication,
}) {
  const secondPageBody = (
    <p>Your account and all associated data were successfully deleted.</p>
  );

  const firstPageBody = (
    <React.Fragment>
      <p>This will permanently delete all of your
                    account information and associated data, including</p>
      <ul>
        <li>Name, email, and profile information</li>
        <li>Questionnaire Responses</li>
        <li>Generated Documents</li>
      </ul>
      <p><b>This cannot be undone.</b></p>
      <p>Are you sure you want to continue?</p>
      {isError
        ? <Alert variant="danger">{error}</Alert>
        : ''
      }
    </React.Fragment>
  );

  const firstPageActions = (
    <React.Fragment>
      <Button disabled={isWaiting} variant="outline-danger" onClick={deleteAccount}>
        {isWaiting ? 'Working...' : 'Yes, delete account'}
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col>
          <h5>Permanent Actions</h5>
          <ButtonToolbar>
            <TwoPhaseModal
              buttonIcon={<Delete />}
              buttonText="Delete Account"
              title="Delete Account"
              showFirstPage={!isAccountDeleted}
              firstPageBody={firstPageBody}
              firstPageActions={firstPageActions}
              secondPageBody={secondPageBody}
              secondPageCallback={resetApplication}
            />
          </ButtonToolbar>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isWaiting: state.accounts.deleteAccountState.isWaiting,
  isError: state.accounts.deleteAccountState.isError,
  error: state.accounts.deleteAccountState.error,
  isAccountDeleted: state.accounts.isAccountDeleted,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteAccount: () => dispatch(deleteAccount()),
  resetApplication: () => {
    dispatch(resetApplication());
    ownProps.onSuccessfulDelete();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PermanentActions);
