import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';
import './Login.css';

class Login extends React.Component {
  static propTypes = {
    setIdleTimer: PropTypes.func,
    updateUser: PropTypes.func
  };

  login = (evt) => {
    evt.preventDefault();
    const values = {
      username: evt.target.username.value,
      password: evt.target.password.value
    };

    for (const [key, value] of Object.entries(values)) {
      if (value === '') {
        evt.target[key].focus();
        document.getElementById('missing-values').style.display = 'inline-block';
        return;
      }
    };
    
    api.login(values)
      .then(res => {
        const authToken = res.apiKey || res.authToken;
        if (authToken) {
          /* If 'authToken' received and successful, set active User
            for app and begin refreshToken() timer. */
          window.sessionStorage.setItem('authToken', authToken);
          this.props.setIdleTimer();
          this.props.updateUser(res.user);
          this.props.history.push('/projects');
        } else {
          /* If no 'authToken', highlighth error label and 
            focus field to fix */
          const field = res.error.split(': ')[1];
          document.querySelectorAll('span').forEach(span => {
            span.style.display = 'none';
          });
          document.getElementById(field).focus();
          document.getElementById(`${field}Invalid`).style.display = 'inline-block';
        };
      });
  }

  render() {
    return (
      <form className='login' onSubmit={(evt) => this.login(evt)}>
        <h3>Login:</h3>
        <span style={{display: 'none'}} id='missing-values'>Missing values!</span>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' autoComplete='username'/>
        <span style={{display: 'none'}} id='usernameInvalid'>Invalid username!</span>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' autoComplete='current-password'/>
        <span style={{display: 'none'}} id='passwordInvalid'>Invalid password!</span>
        <div className='login-buttons'>
          <button type='submit'>Login</button>
          <button
            type='button'
            onClick={() => this.props.history.push('/')}
          >Cancel</button>
        </div>
      </form>
    );
  };

  componentDidMount() {
    const token = window.sessionStorage.getItem('authToken');
    if (token) this.props.history.push('/'); // Turn to HomePage if already logged in.
  };
};

export default withRouter(Login);