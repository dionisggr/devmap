import React from 'react';
import { withRouter } from 'react-router-dom';
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
        if (this.state.user.role !== 'Admin') {
          window.sessionStorage.removeItem('authToken');
        }
        this.props.history.push('/users');
      })
      .catch(error => console.log({ error }));
  };

  render() {
    const user = this.state.user;
    const startDate = (user.startDate) ? new Date(user.startDate).toDateString().slice(4) : null;
    const permission = window.sessionStorage.getItem('authToken') && user.role === 'Admin';
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
          <input type='text' name='startDate' id='startDate' defaultValue={startDate} />
        </label>
        <label htmlFor='github'>GitHub:
          <input type='text' name='github' id='github' defaultValue={user.github} />
        </label>
        <div className='issue-buttons'>
          <button type='submit'>Save</button>
          {
            // Show 'Delete' button only if has permission (owner or 'Admin')
            (!permission)
              ? <button type='button' onClick={this.delete}>Delete</button>
              : null
          }
          <button type='button' onClick={() => this.props.history.push('/users')}>Cancel</button>
        </div>
      </form>
    );
  };
  componentDidMount() {
    // Get User for handling User Data (and displaying 'username')
    const id = this.props.match.params.userID;
    api.getUserById(id)
      .then(user => this.setState({user}))
      .catch(error => console.log(error));
  };
};

export default withRouter(UserPage);