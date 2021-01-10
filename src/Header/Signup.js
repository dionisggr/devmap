import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';
import './Signup.css';

class Signup extends React.Component {
  static propTypes = { setIdleTimer: PropTypes.func.isRequired };

  signup = (evt) => {
    evt.preventDefault();
    const user = {
      username: evt.target.username.value, firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value, email: evt.target.email.value, 
      tools: evt.target.tools.value, startDate: new Date(),
      github: evt.target.github.value, password: evt.target.password.value
    };
    const repeatPassword = evt.target.repeatPassword.value;
    if (user.password !== repeatPassword) {
      document.querySelectorAll('span').forEach(span => {
        span.style.display = 'none';
      });
      document.getElementById('password').focus();
      document.getElementById(`passwordError`).style.display = 'inline-block';
    } else {
      api.addUser(user)
        .then(res => {
          const authToken = res.apiKey || res.authToken;
          if (authToken) {
            window.localStorage.setItem('authToken', authToken);
            this.props.setIdleTimer();
            this.props.updateUser(res.user);
            this.props.history.push('/');
          } else {
            const field = 
              res.error.includes('username')
                ? 'username'
                : res.error.includes('password')
                  ? 'password'
                  : 'email';
            document.querySelectorAll('span').forEach(span => {
              span.style.display = 'none';
            });
            document.getElementById(field).focus();
            document.getElementById(`${field}Error`).style.display = 'inline-block';
          };
        });
    };
  };

  render() {
    const token = window.localStorage.getItem('authToken');
    if (token) this.props.history.goBack();
    return (
      <form className='signup' onSubmit={this.signup}>
        <h3>Sign-up for an account:</h3>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' />
        <span style={{display: 'none'}} id='usernameError'>Username taken!</span>
        <label htmlFor='firstName'>First Name:</label>
        <input type='text' name='firstName' id='firstName' />
        <label htmlFor='lastName'>Last Name:</label>
        <input type='text' name='lastName' id='lastName' />
        <label htmlFor='email'>E-mail:</label>
        <input type='text' name='email' id='email'/>
        <span style={{display: 'none'}} id='emailError'>E-mail taken!</span>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' />
        <label htmlFor='repeatPassword'>Repeat password:</label>
        <input type='password' name='repeatPassword' id='repeatPassword' />
        <span style={{display: 'none'}} id='passwordError'>Passwords don't match!</span>
        <label htmlFor='tools'>Tools:</label>
        <input type='text' name='tools' id='tools' />
        <label htmlFor='github'>GitHub:</label>
        <input type='text' name='github' id='github' />
        <div className='signup-buttons'>
          <button type='submit'>Sign-Up</button>
          <button
            type='button'
            onClick={() => this.props.history.push('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };
};

export default withRouter(Signup);