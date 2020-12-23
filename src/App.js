import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import List from './List';
import Signup from './Signup';
import Login from './Login';
import ProjectPage from './ProjectPage';
import IssuePage from './IssuePage';
import { projects, issues, posts } from './data';
import './App.css';

class App extends React.Component {
  state = { projects: [], issues: []}

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

        <Header />
        <Route exact path={['/', '/projects']} render={() => 
          <List items={this.state.projects} />
        }/>
        <Route exact path={[
          '/projects/:projectID',
          '/new-project'
         ]} render={() => 
          <ProjectPage
            projects={this.state.projects}
            updateProjects={this.updateProjects}
          />
        }/>
        <Route exact path='/projects/:projectID/issues' render={() => 
          <List items={this.state.issues} />
        }/>
        <Route path={[
          '/projects/:projectID/new-issue',
          '/projects/:projectID/issues/:issueID'
        ]} render={() => 
          <IssuePage
            issues={this.state.issues}
            updateIssues={this.updateIssues}
          />
        }/>
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </main>
    );
  }
  componentDidMount() {
    this.setState({ projects, issues })
  };
}

export default App;
