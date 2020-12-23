import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Item.css';

class Item extends React.Component {
  render() {
    const { id, name, description, tools, phase, status, projectID } = this.props.item;
    return (
      <Link to={
        (projectID)
          ? `${this.props.location.pathname}/${id}`
          : `projects/${id}`} className='item'>
        <div className='item-main'>
          <label>{name}</label>
          <p>{description}</p>
          <div className='item-health'>
            <label>{phase}</label>
            <label>{status}</label>
          </div>
        </div>
        <div className='item-tags'>
          <label>{tools}</label>
        </div>
      </Link>
    );
  };
};

export default withRouter(Item);