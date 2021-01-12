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
    const token = window.sessionStorage.getItem('authToken');
    if (!token) this.props.history.push('/signup') // Redirect to Signup if not logged in.
    let issues = [...this.props.state.issues];
    const admin = (token) ? token === API_KEY : false;
    const issueID = this.props.match.params.issueID;
    const issue = this.props.state.issues.find(issue => issue.id === issueID);
    const username = (token && !admin) ? jwt_decode(token).sub : 'dionisggr';
    const projectID = this.props.match.params.projectID;
    const ownerID = this.props.state.projects.find(project => project.id === projectID).owner_id;
    const startDate =
      // Choose existing or new Date depending if existing or new issue.
      (issue) 
        ? new Date(issue.startDate).toDateString()
        : new Date().toDateString();
    const values = {
      project_id: projectID,
      name: evt.target.name.value,
      description: evt.target.description.value,
      tools: evt.target.tools.value,
      phase: evt.target.phase.value,
      status: evt.target.status.value,
      start_date: startDate,
      owner: username,
      owner_id: ownerID,
      collaboration: evt.target.collaboration.checked,
      github: evt.target.github.value
    };

    for (const [key, value] of Object.entries(values)) {
      if (key === 'start_date') continue;
      if (value === '') {
        evt.target[key].focus();
        document.getElementById('missing-values').style.display = 'inline-block';
        return;
      }
    };

    // Split functionality, depending on Adding or Editing an issue.
    if (!issueID) {
      api.addIssue(values)
        .then(issue => {
          // Renaming some keys for data handling
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
          // Renaming some keys for data handling
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
    const token = window.sessionStorage.getItem('authToken');
    const admin = token === API_KEY;
    const username = (token && !admin) ? jwt_decode(token).sub : 'dionisggr';
    const issueID = this.props.match.params.issueID;
    let issue = (issueID)
      ? this.props.state.issues.find(issue => issue.id === issueID)
      : null;
    const project = 
      (this.props.state.projects)
        ? this.props.state.projects.find(project => project.id === this.props.match.params.projectID)
        : {};
    const projectName = (project) ? project.name : null;
    if (!issue) issue = {};
    return (
      <form 
        className='issue-edit'
        onSubmit={this.handleSave}
      >
        <h3>{(issue) ? issue.name : 'New Issue'}</h3>
        <span style={{display: 'none'}} id='missing-values'>Missing values!</span>
        <label id='owner'>Owner: {username}</label>
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
            // Show 'Save' and 'Delete' buttons if owner or 'Admin'.
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