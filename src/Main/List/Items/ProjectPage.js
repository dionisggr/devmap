import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { API_KEY } from '../../../config';
import api from '../../../api';
import './ProjectPage.css';

class ProjectPage extends React.Component {
  state = { collaborators: [] }

  static defaultProps = { projects: [] };

  static propTypes = {
    projects: PropTypes.array.isRequired,
    updateProjects: PropTypes.func
  };

  render() {
    const token = window.localStorage.getItem('authToken');
    const admin = token === API_KEY;
    const username = (token && !admin) ? jwt_decode(token).sub : null;
    const projectID = this.props.match.params.projectID;
    const collaborators = 
      (this.state.collaborators)
        ? this.state.collaborators.map(collaborator => collaborator.username).join(', ')
        : null;
    let project = this.props.projects.find(project => project.id === projectID) || {};
    const startDate = new Date(project.startDate).toDateString().slice(3);
    return (
      <form className='project-page'>
        <h3>{project.name || 'New Project'}</h3>
        <label>Name: {project.name}</label>
        <label>Description: {project.description}</label>
        <label>Languages/Tools: {project.tools}</label>
        <label>Phase: {project.phase}</label>
        <label>Status: {project.status}</label>
        <label>Start Date: {startDate}</label>
        <label>Owner: {project.owner}</label>
        <label>Collaboration: {(project.collaboration || '').toString()}</label>
        <label>Collaborators: {collaborators}</label>
        <label>GitHub: {project.github}</label>
        {
          (projectID)
            ? <button type='button' onClick={() => this.props.history.push(`/projects/${projectID}/issues`)}>Issues</button>
            : null
        }
        <div className='project-buttons'>
          {
            (token && (admin || username === project.owner))
              ? <>
                  <button type='button' onClick={() => this.props.history.push(`/edit/projects/${projectID}`)}>Edit</button>
                  <button type='button' onClick={() => this.props.history.push('/')}>Cancel</button>
                </>
              : <button type='button' onClick={this.props.history.goBack}>Back</button>
          }
        </div>
      </form>
    );
  };

  componentDidMount() {
    const projectID = this.props.match.params.projectID;
    if (projectID) {  
      api.getProjectCollaborators(projectID)
        .then(collaborators => this.setState({ collaborators }))
    };
  };
};

export default withRouter(ProjectPage);