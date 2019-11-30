import React from 'react';
import {
  Row, Col, ListGroup, ButtonToolbar,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit';
import Email from '@material-ui/icons/Email';

import LargeButton from './LargeButton';


function UserInformation({ userInfo }) {
  if (!userInfo) {
    return (
      <div></div>
    );
  }
  const formattedDate = moment(userInfo.createdAt).format('MMMM Do YYYY, h:mm:ss a');

  const fields = [
    { value: userInfo.name, label: 'Name' },
    { value: userInfo.email, label: 'Email' },
    { value: formattedDate, label: 'Account Created' },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col xl={6}>
          <h5>Profile Info</h5>
          <ListGroup>
            {fields.map(({ value, label }) => (
              <ListGroup.Item action className="cursor-default" key={label}>
                <div>
                  <small className="text-muted">{label.toUpperCase()}</small>
                </div>
                <div>
                  <span>{value}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h5>Actions</h5>
          <ButtonToolbar>
            <LargeButton
              icon={<Edit />}
              text="Change Password"
            />
            <LargeButton
              icon={<Email />}
              text="Change Email"
            />
          </ButtonToolbar>
        </Col>
      </Row>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  userInfo: state.userInfo.userInfo,
});


export default connect(mapStateToProps)(UserInformation);
