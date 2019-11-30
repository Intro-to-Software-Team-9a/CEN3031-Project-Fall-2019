import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, ButtonToolbar, Modal, Button,
} from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';

import LargeButton from './LargeButton';
import { deleteAccount, resetApplication } from '../actions/account';


function PermanentActions({
  deleteAccount, isWaiting, isError, error, isAccountDeleted, resetApplication,
}) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col>
          <h5>Permanent Actions</h5>
          <ButtonToolbar>
            <LargeButton
              onClick={openModal}
              icon={<Delete />}
              text="Delete Account"
            />
          </ButtonToolbar>

          <Modal centered show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            {}
            <Modal.Body>
              {isAccountDeleted
                ? <p>Your account and all associated data were successfully deleted.</p>
                : <React.Fragment>
                  <p>This will permanently delete all of your
                    account information and associated data, including</p>
                  <ul>
                    <li>Name, email, and profile information</li>
                    <li>Questionnaire Responses</li>
                    <li>Generated Documents</li>
                  </ul>
                  <p><b>This cannot be undone.</b></p>
                  <p>Are you sure you want to continue?</p>
                </React.Fragment>
              }
            </Modal.Body>
            <Modal.Footer>
              {
                isAccountDeleted
                  ? <Button variant="outline-dark" onClick={resetApplication}>Continue</Button>
                  : <React.Fragment>
                    <Button variant="outline-dark" onClick={closeModal}>
                      No, cancel
                    </Button>
                    <Button disabled={isWaiting} variant="outline-danger" onClick={deleteAccount}>
                      {isWaiting ? 'Working...' : 'Yes, delete account'}
                    </Button>
                  </React.Fragment>
              }
            </Modal.Footer>
          </Modal>
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
