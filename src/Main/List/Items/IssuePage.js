import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { API_KEY } from '../../../config';
import api from '../../../api';
import './IssuePage.css';

class IssuePage extends React.Component {
  static defaultProps = { state: {} };

  static propTypes = {
    issues: PropTypes.array.isRequired,
    updateIssues: PropTypes.func
  };

  render() {
    const token = window.localStorage.getItem('authToken');
    const admin = token === API_KEY;
    const username = (token && !admin) ? jwt_decode(token).sub : null;
    const issueID = this.props.match.params.issueID;
    const issue = 
      (this.props.state.issues)
        ? this.props.state.issues.find(issue => issue.id === issueID)
        : {};
    const startDate = new Date(issue.startDate).toDateString().slice(4);
    const project = 
    (this.props.state.projects)
      ? this.props.state.projects.find(project => project.id === this.props.match.params.projectID)
      : {};
    const projectName = (project) ? project.name : null;
    return (
      <form onSubmit={this.handleSave} className='issue-page'>
        <h3>{issue.name || 'New Issue'}</h3>
        <label>Project: {projectName}</label>
        <label>Name: {issue.name}</label>
        <label>Description: {issue.description}</label>
        <label>Owner: {issue.owner}</label>
        <label>Languages/Tools: {issue.tools}</label>
        <label>Phase: {issue.phase}</label>
        <label>Status: {issue.status}</label>
        <label>Start Date: {startDate}</label>
        <label>Collaboration: {(issue.collaboration) ? issue.collaboration.toString() :  null}</label>
        <label>GitHub: {issue.github}</label>
        <div className='issue-buttons'>
        {
            (token && (admin || username === issue.owner))
              ? <>
                  <button type='button' onClick={() => {
                    return this.props.history.push(`/edit/projects/${issue.projectID}/issues/${issueID}`)
                  }}>Edit</button>
                </>
              : null
          }
          <button type='button' onClick={this.props.history.goBack}>Back</button>
        </div>
      </form>
    );
  };
};

export default withRouter(IssuePage);