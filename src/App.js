import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import List from './List';
import Signup from './Signup';
import Login from './Login';
import './App.css';

function App() {
  return (
    <main className='App'>

      <Header />
      <Route exact path='/' component={List} />
      <Route path='/signup' component={Signup} />
      <Route path='/login' component={Login} />

    </main>
  );
}

export default App;
