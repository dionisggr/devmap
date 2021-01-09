import React from 'react';
import { withRouter } from 'react-router-dom';
import Error from '../Errors/Error';
import api from '../../api';
import './UserPage.css';

class UserPage extends React.Component {
  state = { users: [] };

  render() {
    const userID = this.props.match.params.userID;
    const user = this.state.users.find(user => user.id === userID) || {};
    const startDate = (user.startDate) ? new Date(user.startDate).toDateString().slice(4) : null;
    const permission = window.localStorage.getItem('authToken') && user.role === 'Admin';
    if (!permission) <Error message='Unauthorized access.'/>;
    return (
      <form className='user-page' onSubmit={this.edit}>
        <h3>Profile</h3>
        <label>Username: {user.username}</label>
        <label>First Name: {user.firstName}</label> 
        <label>Last Name: {user.lastName}</label> 
        <label>E-mail: {user.email}</label> 
        <label>Tools: {user.tools}</label> 
        <label>Start Date: {startDate}</label> 
        <label>GitHub: {user.github}</label> 
        <div className='issue-buttons'>
          <button type='button' onClick={() => this.props.history.push(`/edit/users/${userID}`)}>Edit</button>
          <button type='button' onClick={this.props.history.goBack}>Back</button>
        </div>
      </form>
    );
  };
  componentDidMount() {
    api.getUsers()
      .then(users => this.setState({ users }))
      .catch(error => console.log({ error }));
  };
};

export default withRouter(UserPage);