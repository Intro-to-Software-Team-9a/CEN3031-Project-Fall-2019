import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import FolderShared from '@material-ui/icons/FolderShared';
import Edit from '@material-ui/icons/Edit';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import IconLink from './IconLink';

function ProfileHome({ profile }) {
  if (!profile) return '';

  return (
    <Container className="pt-4">
      <Row>
        <Col md={5}>
          <div className="spacing"></div>
          <h1>Welcome, {profile.name}</h1>
          <br />
          <h5 className="font-weight-normal text-muted">
            Here are the tasks you can accomplish.
          </h5>
          <div className="spacing"></div>
        </Col>
        <Col md={1} />
        <Col md={6}>
          <br />
          <div className="spacing"></div>
          <IconLink
            link="view-documents"
            title="View Your Documents"
            icon={<FolderShared style={{ fontSize: 40 }} />}
          />
          <IconLink
            link="/view-responses"
            title="View/Edit Responses"
            icon={<QuestionAnswer style={{ fontSize: 40 }} />}
          />
          <IconLink
            link="/edit-questionnaire"
            title="Edit the Questionnaire"
            icon={<Edit style={{ fontSize: 40 }} />}
          />
        </Col>
      </Row>
    </Container >
  );
}

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(mapStateToProps)(ProfileHome);
