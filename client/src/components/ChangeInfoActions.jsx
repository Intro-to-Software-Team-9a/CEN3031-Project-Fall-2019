import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, ButtonToolbar, Modal, Button, Alert,
} from 'react-bootstrap';

import Edit from '@material-ui/icons/Edit';
import Email from '@material-ui/icons/Email';
import TwoPhaseModal from './TwoPhaseModal';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import { doChangeEmail, doChangePassword } from '../actions/account';


function ChangeInfoActions({
  isWaiting, onSubmitChangeEmail, onSubmitChangePassword
}) {

  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const secondPageBodyEmail = (
    <p>Your email was successfully updated.</p>
  );

  const firstPageActionsEmail = (
    <Button
      disabled={isWaiting}
      variant="dark"
      onClick={() => onSubmitChangeEmail(() => setIsEmailUpdated(true))}>
      {isWaiting ? 'Working...' : 'Change Email'}
    </Button>
  );

  const secondPageBodyPassword = (
    <p>Your password was successfully updated.</p>
  );

  const firstPageActionsPassword = (
    <Button
      disabled={isWaiting}
      variant="dark"
      onClick={() => onSubmitChangePassword(() => setIsPasswordUpdated(true))}>
      {isWaiting ? 'Working...' : 'Change Password'}
    </Button>
  );

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col>
          <h5>Actions</h5>
          <ButtonToolbar>
            <TwoPhaseModal
              buttonIcon={<Email />}
              buttonText="Change Email"
              title="Change Email"
              showFirstPage={!isEmailUpdated}
              firstPageBody={<ChangeEmailForm />}
              firstPageActions={firstPageActionsEmail}
              secondPageBody={secondPageBodyEmail}
              secondPageCallback={() => setIsEmailUpdated(false)}
            />
            <TwoPhaseModal
              buttonIcon={<Edit />}
              buttonText="Change Password"
              title="Change Password"
              showFirstPage={!isPasswordUpdated}
              firstPageBody={<ChangePasswordForm />}
              firstPageActions={firstPageActionsPassword}
              secondPageBody={secondPageBodyPassword}
              secondPageCallback={() => setIsPasswordUpdated(false)}
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
  onSubmitChangeEmail: async (onSuccess) => {
    await dispatch(doChangeEmail({ onSuccess }));
  },
  onSubmitChangePassword: async (onSuccess) => {
    await dispatch(doChangePassword({ onSuccess }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeInfoActions);
