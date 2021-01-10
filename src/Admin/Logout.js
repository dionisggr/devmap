import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  render() {
      window.localStorage.removeItem('authToken')
      window.location = 'https://afternoon-dawn-05389.herokuapp.com/';
    return null;
  };
};

export default withRouter(Logout);