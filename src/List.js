import React from 'react';
import { withRouter } from 'react-router-dom';
import Item from './Item';
import { projects, issues } from './data';
import './List.css';

class List extends React.Component {
  render() {
    const item = 
      (this.props.match.params.project)
        ? issues
        : projects;
    return (
      <div className='item-list'>
      {
        item.map(item => 
          <Item item={item} />
        )
      }
      </div>
    );
  };
};

export default withRouter(List);