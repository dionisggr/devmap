import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { API_KEY } from './config';
import jwt_decode from 'jwt-decode';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Main/Home';
import List from './Main/List/List';
import Signup from './Header/Signup';
import Login from './Header/Login';
import Logout from './Admin/Logout';
import ProjectPage from './Main/List/Items/ProjectPage';
import IssuePage from './Main/List/Items/IssuePage';
import ProjectEdit from './Main/List/Items/ProjectEdit';
import NoProjects from './Main/NoProjects';
import IssueEdit from './Main/List/Items/IssueEdit';
import UserPage from './Main/Users/UserPage';
import UserEdit from './Main/Users/UserEdit';
import UserList from './Admin/UserList';
import ErrorBoundary from './Main/Errors/ErrorBoundary';
import UserContext from './context/UserContext';
import Loader from './Main/Loader';
import api from './api';
import './App.css';

class App extends React.Component {
  static defaultProps = { timer: null };

  state = { 
    projects: [], issues: [], user: {}
  };

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

  // Timer for JWT token refresh every 10 minutes
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

  componentDidMount() {
    // API fetch for data.
    api.getData()
      .then(([projects, issues]) => {
        const newState = this.state;
        newState.project = projects;
        newState.issues = issues;

        this.setState(newState);
      })
      .catch(error => console.log({ error }));
  };

  render = () => {
    const { projects, issues } = this.state;

    // Validation for empty project list, shows Loading component.
    if (this.state.projects.length < 1 && window.location.pathname === '/') {
      this.timer = setTimeout(() => {
        this.props.history.push('/noprojects')
        this.setState({...this.state, empty: true })
      }, 16000);
      return <><Header /><Loader /></>;
    } else {
      clearTimeout(this.timer);
    };

    return (
      <main className='App'>
        <UserContext.Provider value={this.state.user}>
          <ErrorBoundary>

            <Header />

          </ErrorBoundary>
        </UserContext.Provider>

        <ErrorBoundary>
          <Route exact path='/' component={Home} />

          <Route exact path='/users' component={UserList} />

          <Route exact path='/users/:userId' component={UserPage} />

          <Route path='/edit/users/:userId' component={UserEdit} />

          <Route path='/noprojects' component={NoProjects} />

          <Route path='/logout' component={Logout} />
        </ErrorBoundary>

        <ErrorBoundary>
          <Route exact path='/projects'
            render={() =>
              <List items={projects} />
            }
          />
          
          <Route exact path='/projects/:projectId'
            render={() =>
              <ProjectPage
                projects={projects}
                updateProjects={this.updateProjects}
              />
            }
          />
          
          <Route exact path='/projects/:projectId/issues'
            render={() =>
              <List items={issues} />
            }
          />

          <Route exact path={['/edit/projects/:projectId', '/new-project']}
            render={() => 
              <ProjectEdit
                projects={projects}
                updateProjects={this.updateProjects}
              />
            }
          />
          
          <Route path='/projects/:projectId/issues/:issueID'
            render={() =>
              <IssuePage state={this.state} />
            }
          />
          
          <Route exact path={
            [
              '/projects/:projectId/new-issue',
              '/edit/projects/:projectId/issues/:issueID'
            ]
          }
            render={() => 
              <IssueEdit
                state={this.state}
                updateIssues={this.updateIssues}
              />
            }
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <Route path='/signup' render={() => 
            <Signup
              setIdleTimer={this.setIdleTimer}
              updateUser={this.updateUser}
            />
          } />

          <Route path='/login' render={() =>
            <Login
              setIdleTimer={this.setIdleTimer}
              updateUser={this.updateUser}
            />
          } />
        </ErrorBoundary>

        <ErrorBoundary>

          <Footer />

        </ErrorBoundary>
      </main>
    );
  };
};

export default withRouter(App);
