import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';
import './Signup.css';

class Signup extends React.Component {
  static propTypes = { setIdleTimer: PropTypes.func };

  signup = (evt) => {
    evt.preventDefault();
    const user = {
      username: evt.target.username.value, firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value, email: evt.target.email.value, 
      tools: evt.target.tools.value, startDate: new Date(),
      github: evt.target.github.value, password: evt.target.password.value
    };
    
    for (const [key, value] of Object.entries(user)) {
      if (key === 'tools' || key === 'github' || key === 'start_date') continue;
      if (value === '') {
        evt.target[key].focus();
        document.getElementById('missing-values').style.display = 'inline-block';
        return;
      }
    };

    // Catch repeatPassword value without adding to user
    const repeatPassword = evt.target.repeatPassword.value;

    // Password validation
    if (user.password !== repeatPassword) {
      document.querySelectorAll('span').forEach(span => {
        span.style.display = 'none';
      });
      document.getElementById('password').focus();
      document.getElementById(`passwordError`).style.display = 'inline-block';
    } else {
      api.addUser(user)
        .then(res => {
          // Catch key and determine whether Admin or regular User
          const authToken = res.apiKey || res.authToken;
          if (authToken) {
            window.sessionStorage.setItem('authToken', authToken);
            this.props.setIdleTimer();
            this.props.updateUser(res.user);
            this.props.history.push('/projects');
          } else {
            // Catching field validation error from API error response
            const field = 
              res.error.includes('username')
                ? 'username'
                : res.error.includes('password')
                  ? 'password'
                  : 'email';
            document.querySelectorAll('span').forEach(span => {
              span.style.display = 'none';
            });
            // Show Error label and focus field with error.
            document.getElementById(field).focus();
            document.getElementById(`${field}Error`).style.display = 'inline-block';
          };
        })
        .catch(error => console.log({ error }));
    };
  };

  render() {
    const token = window.sessionStorage.getItem('authToken');
    if (token) this.props.history.goBack(); // Turn back if already logged in.
    return (
      <form className='signup' onSubmit={this.signup}>
        <h3>Sign-up for an account:</h3>
        <span style={{display: 'none'}} id='missing-values'>Missing values!</span>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username'  autoComplete='username'/>
        <span style={{display: 'none'}} id='usernameError'>Username taken!</span>
        <label htmlFor='firstName'>First Name:</label>
        <input type='text' name='firstName' id='firstName' />
        <label htmlFor='lastName'>Last Name:</label>
        <input type='text' name='lastName' id='lastName' />
        <label htmlFor='email'>E-mail:</label>
        <input type='text' name='email' id='email'/>
        <span style={{display: 'none'}} id='emailError'>E-mail taken!</span>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' autoComplete='new-password'/>
        <label htmlFor='repeatPassword'>Repeat password:</label>
        <input type='password' name='repeatPassword' id='repeatPassword' autoComplete='new-password'/>
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