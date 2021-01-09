import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import List from './Main/List/List';
import Signup from './Header/Signup';
import Login from './Header/Login';
import ProjectPage from './Main/List/Items/ProjectPage';
import IssuePage from './Main/List/Items/IssuePage';
import ProjectEdit from './Main/List/Items/ProjectEdit';
import IssueEdit from './Main/List/Items/IssueEdit';
import UserPage from './Main/Users/UserPage';
import UserEdit from './Main/Users/UserEdit';
import UserList from './Admin/UserList';
import ErrorBoundary from './Main/Errors/ErrorBoundary';
import UserContext from './context/UserContext';
import api from './api';
import './App.css';

class App extends React.Component {
  state = { projects: [], issues: [], user: {} };

  updateProjects = (projects) => {
    const newState = {...this.state};
    newState.projects = projects;
    this.setState(newState);
  };

  updateIssues = (issues) => {
    const newState = {...this.state};
    newState.issues = issues;
    this.setState(newState);
  };

  updateUser = (user) => {
    const newState = {...this.state};
    newState.user = user;
    this.setState(newState);
  };

  setIdleTimer = () =>{
    let reset = setInterval(() => {
      api.refreshToken();
    }, 600000);
    let stop = setTimeout(() => {
      clearInterval(reset)
    }, 550000);
    document.addEventListener('mousemove keydown', function () {
      clearTimeout(stop);
      stop = setTimeout(() => {
        clearTimeout(reset)
      }, 550000);
    });
  };

  render = () => {
    return (
      <main className='App'>
        <UserContext.Provider value={this.state.user}>
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
        </UserContext.Provider>

        <ErrorBoundary>
          <Route exact path={['/', '/projects']} render={() => 
            <List items={this.state.projects} />
          }/>
          <Route exact path='/projects/:projectID/issues' render={() => 
            <List items={this.state.issues} />
          }/>
          <Route exact path='/projects/:projectID' render={() => 
              <ProjectPage
                projects={this.state.projects}
                updateProjects={this.updateProjects}
              />
          }/>
          <Route exact path={['/edit/projects/:projectID', '/new-project']}
            render={() => 
              <ProjectEdit
                projects={this.state.projects}
                updateProjects={this.updateProjects}
              />
          }/>
          <Route path='/projects/:projectID/issues/:issueID' render={() => 
              <IssuePage state={this.state} />
          }/>
          <Route exact path={
            ['/projects/:projectID/new-issue','/edit/projects/:projectID/issues/:issueID']
          }
            render={() => 
              <IssueEdit
                state={this.state}
                updateIssues={this.updateIssues}
              />
          }/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Route exact path='/users' component={UserList} />
          <Route exact path='/users/:userID' render={() => 
            <UserPage />
          } />
          <Route path='/edit/users/:userID' render={() =>
            <UserEdit />
          } />
        </ErrorBoundary>
        <ErrorBoundary>
          <Route path='/signup' render={() => 
            <Signup setIdleTimer={this.setIdleTimer}/>
          } />
          <Route path='/login' render={() =>
            <Login
              setIdleTimer={this.setIdleTimer}
              updateUser={this.updateUser}
            />
          } />
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

  componentWillUnmount() {
    window.localStorage.removeItem('authToken');
  };
};

export default App;
