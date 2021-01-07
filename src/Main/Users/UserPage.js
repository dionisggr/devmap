import React from 'react';
import { withRouter } from 'react-router-dom';
import { API_KEY } from '../../config';
import Error from '../Errors/Error';
import api from '../../api';
import './UserPage.css';

class UserPage extends React.Component {
  state = { user: {} };

  render() {
    const userID = this.props.match.params.userID;
    const user = this.state.user;
    const permission = window.localStorage.getItem('authToken') && user.role === 'Admin';
    if (!permission) <Error message='Unauthorized access.'/>
    return (
      <form className='user-page' onSubmit={this.edit}>
        <h3>Profile</h3>
        <label>Username: {user.username}</label>
        <label>First Name: {user.firstName}</label> 
        <label>Last Name: {user.lastName}</label> 
        <label>E-mail: {user.email}</label> 
        <label>Tools: {user.tools}</label> 
        <label>Start Date: {user.startDate}</label> 
        <label>GitHub: {user.github}</label> 
        <div className='issue-buttons'>
          <button type='button' onClick={() => this.props.history.push(`/edit/users/${userID}`)}>Edit</button>
          <button type='button' onClick={this.props.history.goBack}>Back</button>
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