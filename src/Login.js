import React from 'react';
import './Login.css'

class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username'/>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password'/>
        <div className='signup-buttons'>
          <button type='Login'>Login</button>
          <button type='button'>Cancel</button>
        </div>
      </div>
    );
  };
};

export default Login;