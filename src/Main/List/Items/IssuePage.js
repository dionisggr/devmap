import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { API_KEY } from '../../../config';
import api from '../../../api';
import './IssuePage.css';

class IssuePage extends React.Component {
  state = { collaborators: [] }

  static defaultProps = { issues: [] };

  static propTypes = {
    issues: PropTypes.array.isRequired,
    updateIssues: PropTypes.func
  };

  render() {
    const token = window.localStorage.getItem('authToken');
    const admin = token === API_KEY;
    const username = (token && !admin) ? jwt_decode(token).sub : null;
    const issueID = this.props.match.params.issueID;
    const collaborators = this.state.collaborators.map(collaborator => collaborator.username).join(', ');
    let issue = this.props.issues.find(issue => issue.id === issueID) || {};
    const collaboration = (issue.collaboration) ? issue.collaboration.toString() : null;
    const startDate = new Date(issue.startDate).toDateString().slice(3);
    return (
      <form onSubmit={this.handleSave} className='issue-page'>
        <h3>{issue.name || 'New Issue'}</h3>
        <label>Name: {issue.name}</label>
        <label>Description: {issue.description}</label>
        <label>Languages/Tools: {issue.tools}</label>
        <label>Phase: {issue.phase}</label>
        <label>Status: {issue.status}</label>
        <label>Start Date: {startDate}</label>
        <label>Owner: {issue.owner}</label>
        <label>Collaboration: {collaboration}</label>
        <label>Collaborators: {collaborators}</label>
        <label>GitHub: {issue.github}</label>
        {
          (issueID)
            ? <button type='button' onClick={() => this.props.history.push(`/issues/${issueID}/issues`)}>Issues</button>
            : null
        }
        <div className='issue-buttons'>
        {
            (token && (admin || username === issue.owner))
              ? <>
                  <button type='button' onClick={() => this.props.history.push(`/edit/issues/${issueID}`)}>Edit</button>
                  <button type='button' onClick={this.props.history.goBack}>Cancel</button>
                </>
              : <button type='button' onClick={this.props.history.goBack}>Back</button>
          }
        </div>
      </form>
    );
  };

  componentDidMount() {
    const issueID = this.props.match.params.issueID;
    api.getIssueCollaborators(issueID)
      .then(collaborators => this.setState({ collaborators }))
  };
};

export default withRouter(IssuePage);