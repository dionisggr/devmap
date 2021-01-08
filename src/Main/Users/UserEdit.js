import React from 'react';
import { withRouter } from 'react-router-dom';
import { API_KEY } from '../../config';
import Error from '../Errors/Error';
import api from '../../api';
import './UserPage.css';

class UserPage extends React.Component {
  state = { user: {} };

  edit = (evt) => {
    evt.preventDefault();
    const userID = this.props.match.params.userID;
    const user = {
      id: parseInt(userID),
      username: evt.target.username.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      email: evt.target.email.value, 
      tools: evt.target.tools.value,
      startDate: new Date(evt.target.startDate.value).toDateString().slice(3),
      github: evt.target.github.value,
    };
    api.editUser(userID, user)
      .then(this.props.history.goBack)
      .catch(error => console.log({ error }));
  }

  delete = () => {
    const userID = this.props.match.params.userID;
    api.deleteUser(userID)
      .then(() => {
        const token = window.localStorage.getItem('authToken');
        if (token === API_KEY) {
          this.props.history.push('/users');
        } else {
          window.localStorage.removeItem('authToken');
          this.props.history.push('/users');
        };
      })
      .catch(error => console.log({ error }));
  };

  render() {
    const user = this.state.user;
    const permission = window.localStorage.getItem('authToken') && user.role === 'Admin';
    if (!permission) <Error message='Unauthorized access.'/>
    return (
      <form className='user-page' onSubmit={this.edit}>
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
          <button type='button' onClick={() => this.props.history.push('/users')}>Cancel</button>
          <button type='button' onClick={this.delete}>Delete</button>
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