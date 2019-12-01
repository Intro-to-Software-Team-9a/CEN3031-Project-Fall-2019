import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, ButtonToolbar, Modal, Button, Alert,
} from 'react-bootstrap';
import Delete from '@material-ui/icons/Delete';

import LargeButton from './LargeButton';
import { deleteAccount, resetApplication } from '../actions/account';


/**
 * @param showFirstPage whether first or second page is shown
 * @param firstPageBody
 * @param firstPageActions
 * @param secondPageBody
 * @param secondPageCallback
 * @param buttonIcon
 * @param buttonText
 * @param title
 */
function TwoPhaseModal({
  showFirstPage, firstPageBody, firstPageActions, secondPageBody, secondPageCallback, buttonIcon, buttonText, title
}) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const onContinueClick = async () => {
    await secondPageCallback();
    closeModal();
  };

  return (
    <React.Fragment>
      <LargeButton
        onClick={openModal}
        icon={buttonIcon}
        text={buttonText}
      />

      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {showFirstPage ? firstPageBody : secondPageBody}
        </Modal.Body>
        <Modal.Footer>
          {showFirstPage
            ? <React.Fragment>
              <Button variant="outline-dark" onClick={closeModal}>
                No, cancel
                    </Button>
              {firstPageActions}
            </React.Fragment>
            : <Button variant="outline-dark" onClick={onContinueClick}>Continue</Button>
          }
        </Modal.Footer>
      </Modal>
    </React.Fragment >
  );
}
export default TwoPhaseModal;
