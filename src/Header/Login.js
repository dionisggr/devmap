import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../api';
import './Login.css';

class Login extends React.Component {
  state = { error: false };

  login = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    api.login({username, password})
      .then(res => {
        const authToken = res.authToken;
        if (authToken) {
          window.localStorage.setItem('authToken', authToken);
          this.props.setIdleTimer();
          this.props.history.push('/');
        } else {
          this.setState({error: res.error})
        };
      });
  }

  render() {
    const token = window.localStorage.getItem('authToken');
    console.log(token);
    return (
      (token)
        ? this.props.history.goBack()
        : <form className='login' onSubmit={(evt) => this.login(evt)}>
            <h3>Login:</h3>
            <label htmlFor='username'>Username:</label>
            <input type='text' name='username' id='username' />
            <label htmlFor='password'>Password:</label>
            <input type='text' name='password' id='password' />
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