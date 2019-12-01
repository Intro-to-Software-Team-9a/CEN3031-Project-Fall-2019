import React from 'react';
import {
  Row, Col, ListGroup, ButtonToolbar,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';


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
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
  userInfo: state.userInfo.userInfo,
});


export default connect(mapStateToProps)(UserInformation);
