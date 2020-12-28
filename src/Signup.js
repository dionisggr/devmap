import React from 'react';
import { withRouter } from 'react-router-dom';
import './Signup.css';

class Signup extends React.Component {
  render() {
    return (
      <form className='signup'>
        <h3>Sign-up for an account:</h3>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' />
        <label htmlFor='email'>E-mail:</label>
        <input type='text' name='email' id='email'/>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password' id='password' />
        <label htmlFor='repeatPassword'>Repeat password:</label>
        <input type='text' name='repeatPassword' id='repeatPassword' />
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