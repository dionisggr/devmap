import React from 'react';
import { Link } from 'react-router-dom';
import './NoProjects.css'

class NoProjects extends React.Component {
  render() {
    return (
      <div className='no-projects'>
        <h3>No projects.</h3>
        <Link
          className='create'
          to='/new-project'
        > New Project
        </Link>
    </div>
    );
  };
};

export default NoProjects;