import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import List from './Main/List/List';
import Signup from './Header/Signup';
import Login from './Header/Login';
import ProjectPage from './Main/List/Items/ProjectPage';
import IssuePage from './Main/List/Items/IssuePage';
import UserPage from './Main/Users/UserPage';
import ErrorBoundary from './Main/Errors/ErrorBoundary';
import api from './api';
import './App.css';

class App extends React.Component {
  state = { projects: [], issues: [] };

  updateProjects = (projects) => {
    const newState = {...this.state};
    newState.projects = projects;
    this.setState(newState);
  }

  updateIssues = (issues) => {
    const newState = {...this.state};
    newState.issues = issues;
    this.setState(newState);
  }

  render = () => {
    return (
      <main className='App'>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route exact path={['/', '/projects']} render={() => 
            <List items={this.state.projects} />
          }/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Route exact path={[
            '/projects/:projectID',
            '/new-project'
          ]} render={() => 
            <ProjectPage
              projects={this.state.projects}
              updateProjects={this.updateProjects}
            />
          }/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Route exact path='/projects/:projectID/issues' render={() => 
            <List items={this.state.issues} />
          }/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Route path={[
            '/projects/:projectID/new-issue',
            '/projects/:projectID/issues/:issueID'
          ]} render={() => 
            <IssuePage
              issues={this.state.issues}
              updateIssues={this.updateIssues}
            />
          }/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route path='/users/:userID' component={UserPage} />
        </ErrorBoundary>
      </main>
    );
  };
  
  componentDidMount() {
    api.getData()
      .then(data => {
        const [ projects, issues ] = data;
        this.setState({ projects, issues });
      })
      .catch(error => {
        console.log(`Could not fetch data. Error: ${error.message}`);
      });
  };
};

export default App;
