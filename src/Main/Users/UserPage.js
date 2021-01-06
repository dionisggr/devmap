import React from 'react';
import { withRouter } from 'react-router-dom';
import Error from '../Errors/Error';
import api from '../../api';
import './UserPage.css';

class UserPage extends React.Component {
  state = { user: {} };

  render() {
    const user = this.state.user;
    const permission = window.localStorage.getItem('authToken') && user.role === 'Admin';
    if (!permission) <Error message='Unauthorized access.'/>
    return (
      <form className='user-page'>
        <h3>Profile</h3>
        <label htmlFor='username'>Username:
          <input type='text' name='username' id='username' defaultValue={user.username}/>
        </label>
        <label htmlFor='firstName'>First Name:
          <input type='text' name='firstName' id='firstName' defaultValue={user.firstName} />
        </label>
        <label htmlFor='lastName'>Last Name:
          <input type='text' name='lastName' id='lastName' defaultValue={user.lastName} />
        </label>
        <label htmlFor='email'>E-mail:
          <input type='text' name='email' id='email' defaultValue={user.email} />
        </label>
        <label htmlFor='tools'>Tools:
          <input type='text' name='tools' id='tools' defaultValue={user.tools} />
        </label>
        <label htmlFor='startDate'>Start Date:
          <input type='text' name='startDate' id='startDate' defaultValue={user.startDate} />
        </label>
        <label htmlFor='github'>GitHub:
          <input type='text' name='github' id='github' defaultValue={user.github} />
        </label>
        <div className='issue-buttons'>
          <button type='submit'>Save</button>
          <button type='button' onClick={this.props.history.goBack}>Cancel</button>
          <button type='button'>Delete</button>
        </div>
      </form>
    );
  };
  componentDidMount() {
    const id = this.props.match.params.userID;
    api.getUserById(id)
      .then(user => this.setState({user}))
      .catch(error => console.log(error));
  };
};

export default withRouter(UserPage);