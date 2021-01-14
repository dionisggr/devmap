import React from 'react';
import { Link } from 'react-router-dom';
import background from '../img/background.jpeg';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <div className='home-primary'>
          <img src={background} alt='background' />
          <h2>Welcome to DevMap!</h2>
          <p>A stopping point for developers to keep keep track of their projects and bugs.</p>
          <p>Establish a phase and status for each project and issue, so you can be thorough on every project's health!</p>
          <Link to='projects'>Projects</Link>
        </div>
        <div className='home-secondary'>
          <p>It's easy:</p>
          <ul>
            <li>Sign-Up.</li>
            <li>Create a project.</li>
            <li>Establish your issues.</li>
            <li>Share away!</li>
          </ul>
          <p><i>(Next up: Implementing collaborators and teams!)</i></p>
        </div>
      </div>
    );
  };
};

export default Home;