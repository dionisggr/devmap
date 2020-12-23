import React from 'react';
import { withRouter } from 'react-router-dom';
import Error from './Error';
import './IssuePage.css';

class IssuePage extends React.Component {
  static defaultProps = { issues: [] };
  
  handleSave = (evt) => {
    evt.preventDefault();
    const issueID = this.props.match.params.issueID;
    let issues = [...this.props.issues];
    const values = {
      id: `i${issues.length+1}`,
      projectID: evt.target.projectID.value,
      name: evt.target.name.value,
      description: evt.target.description.value,
      tools: evt.target.tools.value,
      phase: evt.target.phase.value,
      status: evt.target.status.value,
      startDate: evt.target.startDate.value,
      owner: evt.target.owner.value,
      collaboration: evt.target.collaboration.value,
      collaborators: evt.target.collaborators.value,
      github: evt.target.github.value
    };
    if (!issueID) {
      issues.push(values);
    } else {
      issues = issues.map(issue => {
        if (issue.id === issueID) Object.assign(issue, values);
        return issue;
      });
    };
    this.props.updateIssues(issues);
    this.props.history.push(`/projects/${this.props.match.params.projectID}/issues`);
  };

  handleDelete = () => {
    const issueID = this.props.match.params.issueID;
    const issue = this.props.issues.find(issue => issue.id === issueID) || {};
    let issues = [...this.props.issues];
    issues = issues.filter(issue => issue.id !== this.props.match.params.issueID);
    this.props.updateIssues(issues);
    this.props.history.push(`/projects/${issue.projectID}/issues`);
  };

  render() {
    console.log(this.props.issues);
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