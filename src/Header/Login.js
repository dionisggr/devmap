import React from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <form className='login'>
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