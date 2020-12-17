import React from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username'/>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password'/>
        <div className='login-buttons'>
          <button type='Login'>LOGIN</button>
          <button
            type='button'
            onClick={() => this.props.history.push('/')}
          >CANCEL</button>
        </div>
      </div>
    );
  };
};

export default withRouter(Login);