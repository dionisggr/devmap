import React from 'react';
import './Signup.css'

class Signup extends React.Component {
  render() {
    return (
      <div className='signup'>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username'/>
        <label htmlFor='email'>E-mail:</label>
        <input type='text' name='email'/>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password'/>
        <label htmlFor='repeatPassword'>Repeat password:</label>
        <input type='text' name='repeatPassword'/>
        <div className='signup-buttons'>
          <button type='submit'>Sign-Up</button>
          <button type='button'>Cancel</button>
        </div>
      </div>
    );
  };
};

export default Signup;