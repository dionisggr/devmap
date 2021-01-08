import React from 'react';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import api from '../api';
import './Signup.css';

class Signup extends React.Component {
  signup = (evt) => {
    evt.preventDefault();
    const user = {
      username: evt.target.username.value, firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value, email: evt.target.email.value, 
      tools: evt.target.tools.value, startDate: new Date(),
      github: evt.target.github.value, password: evt.target.password.value
    };
    api.addUser(user)
      .then(res => {
        const authToken = res.apiKey || res.authToken;
        if (authToken) {
          window.localStorage.setItem('authToken', authToken);
          this.props.setIdleTimer();
          this.props.history.push('/');
        } else {
          let field = res.error.split('=')[0];
          field = field.slice(1, field.length-1);
          document.querySelectorAll('span').forEach(span => {
            span.style.display = 'none';
          });
          console.log(res.error);
          document.getElementById(field).focus();
          document.getElementById(`${field}Taken`).style.display = 'inline-block';
        };
      })
      .catch(error => console.log('error', error));
  };

  render() {
    const token = window.localStorage.getItem('authToken');
    if (token) this.props.history.goBack();
    return (
      <form className='signup' onSubmit={this.signup}>
        <h3>Sign-up for an account:</h3>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' />
        <span style={{display: 'none'}} id='usernameTaken'>Username taken!</span>
        <label htmlFor='firstName'>First Name:</label>
        <input type='text' name='firstName' id='firstName' />
        <label htmlFor='lastName'>Last Name:</label>
        <input type='text' name='lastName' id='lastName' />
        <label htmlFor='email'>E-mail:</label>
        <input type='text' name='email' id='email'/>
        <span style={{display: 'none'}} id='emailTaken'>E-mail taken!</span>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password' id='password' />
        <label htmlFor='repeatPassword'>Repeat password:</label>
        <input type='text' name='repeatPassword' id='repeatPassword' />
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