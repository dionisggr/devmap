import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from './Header/Header';
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
  constructor(props) {
    super(props);
    this.timer = null; // Timer for Loading component below
  };

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

  render = () => {
    // Validation for empty project list, shows Loading component.
    if (this.state.projects.length < 1 && window.location.pathname === '/') {
      this.timer = setTimeout(() => {
        this.props.history.push('/noprojects')
        this.setState({...this.state, empty:true })
      }, 10000);
      return <><Header /><Loader /></>;
    } else {
      clearTimeout(this.timer);
    }

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
          <Route path='/noprojects' component={NoProjects} />
        </ErrorBoundary>

        <ErrorBoundary>
          <Route exact path='/users' component={UserList} />
          <Route exact path='/users/:userID' component={UserPage} />
          <Route path='/edit/users/:userID' component={UserEdit} />
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
          <Route path='/logout' component={Logout} />
        </ErrorBoundary>
      </main>
    );
  };
  
  componentDidMount() {
    /* API fetch for data. User data fetched separately (when necessary)
    in UserList component to minimize security risks. */
    api.getData()
      .then(data => {
        const [ projects, issues ] = data;
        this.setState({
          user: this.state.user, empty: false,
          projects, issues
        });
      })
      .catch(error => {
        console.log(`Could not fetch data. Error: ${error.message}`);
      });
  };
};

export default withRouter(App);
