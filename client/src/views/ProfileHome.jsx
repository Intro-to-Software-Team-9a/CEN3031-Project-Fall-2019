import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import FolderShared from '@material-ui/icons/FolderShared';
import Edit from '@material-ui/icons/Edit';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Settings from '@material-ui/icons/SettingsSharp';

import IconLink from './IconLink';
import { Routes } from '../utils/constants';

function ProfileHome({ profile }) {
  if (!profile) return '';

  return (
    <div className="min-vh-100 bg-two-people">
      <Container>
        <Row className="align-items-center vh-100">
          <Col xl={6}>
            <div className="w-100 bg-white d-inline-block display-card shadow">
              <div className="p-4">
                <h1>Welcome, {profile.name}</h1>
                <br />
                <h5 className="font-weight-normal text-muted">
                  Here are the tasks you can accomplish.</h5>
              </div>
              <div className="p-4">
                {
                  !profile.role.isAdmin
                  && <IconLink
                    link={Routes.VIEW_DOCUMENTS}
                    title="View Your Documents"
                    icon={<FolderShared style={{ fontSize: 40 }} />}
                  />
                }
                <IconLink
                  link={Routes.VIEW_RESPONSES}
                  title="View/Edit Responses"
                  icon={<QuestionAnswer style={{ fontSize: 40 }} />}
                />
                {
                  profile.role.isAdmin
                    ? <React.Fragment>
                      <IconLink
                        link={Routes.EDIT_QUESTIONNAIRE}
                        title="Edit the Questionnaire"
                        icon={<Edit style={{ fontSize: 40 }} />}
                      />
                      <IconLink
                        link={Routes.MANAGE_TEMPLATES}
                        title="Manage Templates"
                        icon={<DescriptionOutlinedIcon style={{ fontSize: 40 }} />}
                      />
                    </React.Fragment>
                    : <IconLink
                      link={Routes.USER_SETTINGS}
                      title="Manage your Account"
                      icon={<Settings style={{ fontSize: 40 }} />}
                    />
                }
              </div>
            </div>
            <div className="spacing"></div>
            <div className="spacing"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(mapStateToProps)(ProfileHome);
