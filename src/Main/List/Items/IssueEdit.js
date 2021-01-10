import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { API_KEY } from '../../../config';
import api from '../../../api';
import './IssueEdit.css';

class IssueEdit extends React.Component {
  static defaultProps = { state: [] };

  static propTypes = {
    state:  PropTypes.object.isRequired,
    updateIssues: PropTypes.func
  };
  
  handleSave = (evt) => {
    evt.preventDefault();
    let issues = [...this.props.state.issues];
    const issueID = this.props.match.params.issueID;
    const issue = this.props.state.issues.find(issue => issue.id === issueID);
    const projectID = this.props.match.params.projectID;
    const values = {
      project_id: projectID,
      name: evt.target.name.value,
      description: evt.target.description.value,
      tools: evt.target.tools.value,
      phase: evt.target.phase.value,
      status: evt.target.status.value,
      start_date: new Date(issue.startDate).toDateString(),
      owner: issue.owner,
      owner_id: issue.owner_id,
      collaboration: evt.target.collaboration.checked,
      github: evt.target.github.value
    };
    if (!issueID) {
      api.addIssue(values)
        .then(issue => {
          issue.id = issue.issue_id.toString();
          issue.startDate = issue.start_date.toString();
          issue.projectID = issue.project_id;
          delete issue.issue_id;
          delete issue.start_date;
          delete issue.project_id;
          issues.push(issue);
          this.props.updateIssues(issues);
          this.props.history.push(`/projects/${issue.projectID}/issues`);
        })
        .catch(error => console.log(error));
    } else {
      api.editIssue(issueID, values)
        .then(() => {
          values.id = issueID.toString();
          values.projectID = values.project_id.toString();
          values.startDate = values.start_date.toString();
          delete values.project_id;
          delete values.start_date;
          issues = issues.map(issue => {
            if (issue.id === issueID) Object.assign(issue, values);
            return issue;
          });
          this.props.updateIssues(issues);
          this.props.history.push(`/projects/${values.projectID}/issues`);
        })
        .catch(error => console.log(error));
    };
  };

  handleDelete = () => {
    const issueID = this.props.match.params.issueID;
    api.deleteIssue(issueID)
      .then(() => {
        const issue = this.props.state.issues.find(issue => issue.id === issueID) || {};
        let issues = [...this.props.state.issues];
        issues = issues.filter(issue => issue.id !== this.props.match.params.issueID);
        this.props.updateIssues(issues);
        this.props.history.push(`/projects/${issue.projectID}/issues`);
      })
      .catch(error => console.log(error));
  };

  render() {
    const token = window.localStorage.getItem('authToken');
    const admin = token === API_KEY;
    const username = (token && !admin) ? jwt_decode(token).sub : 'dionisggr';
    const issueID = this.props.match.params.issueID;
     const issue =
      (issueID)
        ? this.props.state.issues.find(issue => issue.id === issueID)
        : {};
    const startDate = (issue.startDate) ? new Date(issue.startDate).toDateString().slice(4) : null;
    const project = 
      (this.props.state.projects)
        ? this.props.state.projects.find(project => project.id === this.props.match.params.projectID)
        : {};
    const projectName = (project) ? project.name : null;
    return (
      <form 
        className='issue-edit'
        onSubmit={this.handleSave}
      >
        <h3>{issue.name || 'New Issue'}</h3>
        <label id='owner'>Owner: {issue.owner || username}</label>
        <label id='projectName'>Project: {projectName}</label>
        <label htmlFor='name'>Name:</label>
        <input type='text' name='name' id='name' defaultValue={issue.name}/>
        <label htmlFor='description'>Description:</label>
        <input type='text' name='description' defaultValue={issue.description}/>
        <label htmlFor='tools'>Languages/Tools:</label>
        <input type='text' name='tools' defaultValue={issue.tools}/>
        <label htmlFor='phase'>Phase:
          <select name='phase' id='phase'>
            <option>Planning</option>
            <option>Design</option>
            <option>Development</option>
            <option>Testing</option>
            <option>Ready</option>
          </select>
        </label>
        <label htmlFor='status'>Status:
          <select name='status' id='status'>
            <option>Pending</option>
            <option>Delayed</option>
            <option>In-Progress</option>
            <option>Help</option>
          </select>
        </label>
        <label htmlFor='collaboration'>Collaboration:</label>
        <input type='checkbox' name='collaboration' id='collaboration' defaultChecked />
        <label htmlFor='github'>GitHub:</label>
        <input type='text' name='github' defaultValue={issue.github}/>
        <div className='issue-buttons'>
          {
            (token && (admin || username === issue.owner))
              ? <>
                  <button type='submit'>Save</button>
                  {
                    (this.props.match.params.issueID)
                      ? <button type='button' onClick={this.handleDelete}>Delete</button>
                      : null
                  }
                  <button type='button' onClick={this.props.history.goBack}>Cancel</button>
                </>
              : <button type='button' onClick={this.props.history.goBack}>Back</button>
          }
        </div>
      </form>
    );
  };
};

export default withRouter(IssueEdit);