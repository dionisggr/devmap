import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../../api';
import './IssuePage.css';

class IssuePage extends React.Component {
  static defaultProps = { issues: [] };

  static propTypes = {
    issues:  PropTypes.array.isRequired,
    updateIssues: PropTypes.func.isRequired
  };
  
  handleSave = (evt) => {
    evt.preventDefault();
    const issueID = this.props.match.params.issueID;
    let issues = [...this.props.issues];
    const values = {
      project_id: evt.target.projectID.value,
      name: evt.target.name.value,
      description: evt.target.description.value,
      tools: evt.target.tools.value,
      phase: evt.target.phase.value,
      status: evt.target.status.value,
      start_date: evt.target.startDate.value,
      owner: evt.target.owner.value,
      collaboration: evt.target.collaboration.value,
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
          console.log(this.props.issues);
          this.props.updateIssues(issues);
          console.log(this.props.issues);
          this.props.history.push(`/projects/${issue.projectID}/issues`);
        })
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
        });
    };
  };

  handleDelete = () => {
    const issueID = this.props.match.params.issueID;
    api.deleteIssue(issueID)
      .then(() => {
        const issue = this.props.issues.find(issue => issue.id === issueID) || {};
        let issues = [...this.props.issues];
        issues = issues.filter(issue => issue.id !== this.props.match.params.issueID);
        this.props.updateIssues(issues);
        this.props.history.push(`/projects/${issue.projectID}/issues`);
      });
  };

  render() {
    const issueID = this.props.match.params.issueID;
    const issue = this.props.issues.find(issue => issue.id === issueID) || {};
    return (
      <form 
        className='issue-page'
        onSubmit={this.handleSave}
      >
        <h3>{issue.name || 'New Issue'}</h3>
        <label htmlFor='name'>Name:
        <input type='text' name='name' id='name' defaultValue={issue.name}/></label>
        <label htmlFor='description'>Description:
        <input type='text' name='description' defaultValue={issue.description}/></label>
        <label htmlFor='projectID'>Project ID:
        <input type='text' name='projectID' defaultValue={issue.projectID}/></label>
        <label htmlFor='tools'>Languages/Tools:
        <input type='text' name='tools' defaultValue={issue.tools}/></label>
        <label htmlFor='phase'>Phase:
        <input type='text' name='phase' defaultValue={issue.phase}/></label>
        <label htmlFor='status'>Status:
        <input type='text' name='status' defaultValue={issue.status}/></label>
        <label htmlFor='start-date'>Start Date:
        <input type='text' name='startDate' defaultValue={issue.startDate}/></label>
        <label htmlFor='owner'>Owner:
        <input type='text' name='owner' defaultValue={issue.owner}/></label>
        <label htmlFor='collaboration'>Collaboration:
        <input type='text' name='collaboration' defaultValue={issue.collaboration}/></label>
        <label htmlFor='collaborators'>Collaborators:
        <input type='text' name='collaborators' defaultValue={issue.collaborators}/></label>
        <label htmlFor='github'>GitHub:
        <input type='text' name='github' defaultValue={issue.github}/></label>
        <div className='issue-buttons'>
          <button type='submit'>Save</button>
          <button type='button' onClick={this.props.history.goBack}>Cancel</button>
          <button type='button' onClick={this.handleDelete}>Delete</button>
        </div>
      </form>
    );
  };
};

export default withRouter(IssuePage);