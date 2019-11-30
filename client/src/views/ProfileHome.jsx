import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import FolderShared from '@material-ui/icons/FolderShared';
import Edit from '@material-ui/icons/Edit';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import Settings from '@material-ui/icons/SettingsSharp';
import IconLink from './IconLink';
import { Routes } from '../utils/constants';

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
            link={Routes.VIEW_DOCUMENTS}
            title="View Your Documents"
            icon={<FolderShared style={{ fontSize: 40 }} />}
          />
          <IconLink
            link={Routes.VIEW_RESPONSES}
            title="View/Edit Responses"
            icon={<QuestionAnswer style={{ fontSize: 40 }} />}
          />
          <IconLink
            link={Routes.EDIT_QUESTIONNAIRE}
            title="Edit the Questionnaire"
            icon={<Edit style={{ fontSize: 40 }} />}
          />
          <IconLink
            link={Routes.USER_SETTINGS}
            title="Manage your Account"
            icon={<Settings style={{ fontSize: 40 }} />}
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
