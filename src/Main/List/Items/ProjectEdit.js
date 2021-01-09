import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { API_KEY } from '../../../config';
import api from '../../../api';
import './ProjectPage.css';

class ProjectPage extends React.Component {
  static defaultProps = { projects: [] };

  static propTypes = {
    projects: PropTypes.array.isRequired,
    updateProjects: PropTypes.func
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
      start_date: new Date(evt.target.startDate.value).toISOString(),
      collaboration: evt.target.collaboration.checked,
      github: evt.target.github.value,
      owner: document.querySelector('label').innerText.split(': ')[1]
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
        .catch(error => console.log(error));
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
        })
        .catch(error => console.log(error));
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
      })
      .catch(error => console.log(error));
  };

  render() {
    const token = window.localStorage.getItem('authToken');
    if (!token) this.props.history.push('/signup')
    const admin = token === API_KEY;
    const username = (token && !admin) ? jwt_decode(token).sub : 'dionisggr';
    const projectID = this.props.match.params.projectID;
    let project = this.props.projects.find(project => project.id === projectID) || {};
    const startDate = (!projectID) ? null : new Date(project.startDate).toDateString().slice(4);
    return (
      <form onSubmit={this.handleSave} className='project-page'>
        <h3>{project.name || 'New Project'}</h3>
        <label id='project-owner'>Owner: {username}</label>
        <label htmlFor='name'>Name:
        <input type='text' name='name' id='name' defaultValue={project.name}/></label>
        <label htmlFor='description'>Description:
        <input type='text' name='description' id='description' defaultValue={project.description}/></label>
        <label htmlFor='tools'>Languages/Tools:
        <input type='text' name='tools' id='tools' defaultValue={project.tools}/></label>
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
        <label htmlFor='startDate'>Start Date:
        <input type='text' name='startDate' id='startDate' defaultValue={startDate}/></label>
        <label htmlFor='collaboration'>Collaboration:
        <input type='checkbox' name='collaboration' id='collaboration' defaultChecked /></label>
        <label htmlFor='github'>GitHub:
        <input type='text' name='github' id='github' defaultValue={project.github}/></label>
        {
          (projectID)
            ? <button type='button' onClick={() => this.props.history.push(`/projects/${projectID}/issues`)}>Issues</button>
            : null
        }
        <div className='project-buttons'>
          {
            (token && (admin || username === project.owner))
              ? <>
                  <button type='submit'>Save</button>
                  <button type='button' onClick={this.handleDelete}>Delete</button>
                  <button type='button' onClick={this.props.history.goBack}>Cancel</button>
                </>
              : <button type='button' onClick={() => this.props.history.push('/projects')}>Back</button>
          }
        </div>
      </form>
    );
  };
};

export default withRouter(ProjectPage);