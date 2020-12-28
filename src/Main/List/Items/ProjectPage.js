import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../../api';
import './ProjectPage.css';

class ProjectPage extends React.Component {
  static defaultProps = { projects: [] };

  static propTypes = {
    projects: PropTypes.array.isRequired,
    updateProjects: PropTypes.func.isRequired
  };
  
  handleSave = (evt) => {
    evt.preventDefault();
    const projectID = this.props.match.params.projectID;
    let projects = [...this.props.projects];
    const values = {
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
    if (!projectID) {
      api.addProject(values)
        .then(project => {
          project.id = project.project_id.toString();
          project.startDate = project.start_date.toString();
          delete project.project_id;
          delete project.start_date;
          projects.push(project);
          this.props.updateProjects(projects);
          this.props.history.push('/');
        })
    } else {
      api.editProject(projectID, values)
        .then(() => {
          values.id = projectID.toString();
          values.startDate = values.start_date.toString();
          delete values.start_date;
          projects = projects.map(project => {
            if (project.id === projectID) Object.assign(project, values);
            return project;
          });
          this.props.updateProjects(projects);
          this.props.history.push('/');
        });
    };
  };

  handleDelete = () => {
    const projectID = this.props.match.params.projectID;
    api.deleteProject(projectID)
      .then(() => {
        let projects = [...this.props.projects];
        projects = projects.filter(project => project.id !== this.props.match.params.projectID);
        this.props.updateProjects(projects);
        this.props.history.push('/');
      });
  };

  render() {
    const projectID = this.props.match.params.projectID;
    let project = this.props.projects.find(project => project.id === projectID) || {};
    return (
      <form onSubmit={this.handleSave} className='project-page'>
        <h3>{project.name || 'New Project'}</h3>
        <label htmlFor='name'>Name:
        <input type='text' name='name' id='name' defaultValue={project.name}/></label>
        <label htmlFor='description'>Description:
        <input type='text' name='description' id='description' defaultValue={project.description}/></label>
        <label htmlFor='tools'>Languages/Tools:
        <input type='text' name='tools' id='tools' defaultValue={project.tools}/></label>
        <label htmlFor='phase'>Phase:
        <input type='text' name='phase' id='phase' defaultValue={project.phase}/></label>
        <label htmlFor='status'>Status:
        <input type='text' name='status' id='status' defaultValue={project.status}/></label>
        <label htmlFor='startDate'>Start Date:
        <input type='text' name='startDate' id='startDate' defaultValue={project.startDate}/></label>
        <label htmlFor='owner'>Owner:
        <input type='text' name='owner' id='owner' defaultValue={project.owner}/></label>
        <label htmlFor='collaboration'>Collaboration:
        <input type='text' name='collaboration' id='collaboration' defaultValue={project.collaboration}/></label>
        <label htmlFor='collaborators'>Collaborators:
        <input type='text' name='collaborators' id='collaborators' defaultValue={project.collaborators}/></label>
        <label htmlFor='github'>GitHub:
        <input type='text' name='github' id='github' defaultValue={project.github}/></label>
        {
          (projectID)
            ? <button type='button' onClick={() => this.props.history.push(`/projects/${projectID}/issues`)}>Issues</button>
            : null
        }
        <div className='project-buttons'>
          <button type='submit'>Save</button>
          <button type='button' onClick={this.props.history.goBack}>Cancel</button>
          <button type='button' onClick={this.handleDelete}>Delete</button>
        </div>
      </form>
    );
  };
};

export default withRouter(ProjectPage);