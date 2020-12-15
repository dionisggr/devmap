import React from 'react';
import { withRouter } from 'react-router-dom';
import './Item.css';

class Item extends React.Component {
  render() {
    const { name, description, tools, phase, status } = this.props.item;
    return (
      <div className='item'>
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
      </div>
    );
  };
};

export default withRouter(Item);