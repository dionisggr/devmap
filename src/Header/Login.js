import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../api';
import './Login.css';

class Login extends React.Component {
  login = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    api.login({username, password})
      .then(res => {
        const authToken = res.apiKey || res.authToken;
        if (authToken) {
          window.localStorage.setItem('authToken', authToken);
          api.getUsernames()
            .then(usernames => {
              this.props.setIdleTimer();
              this.props.updateUserInfo({usernames, user: res.user});
            })
            .catch(error => console.log({ error }));
        } else {
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
    const token = window.localStorage.getItem('authToken');
    if (token) this.props.history.goBack();
    return (
      <form className='login' onSubmit={(evt) => this.login(evt)}>
        <h3>Login:</h3>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' />
        <span style={{display: 'none'}} id='usernameInvalid'>Invalid username!</span>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' />
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
};

export default withRouter(Login);