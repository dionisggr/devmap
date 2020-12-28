import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Item from './Item';
import Error from './Error';
import './List.css';

class List extends React.Component {
  render() {
    const projectID = this.props.match.params.projectID;
    const listTitle = (projectID) ? 'Project Issues' : 'Recent Projects';
    const items = 
      (projectID)
        ? this.props.items.filter(issue => issue.projectID == projectID)
        : this.props.items;
    console.log(items);
    if (!items) return <Error target='project' />
    return (
      <>
        <h3>{listTitle}</h3>
        {
          (projectID)
            ? <Link className='create' to={`/projects/${projectID}/new-issue`}>New Issue</Link>
            : <Link className='create' to='/new-project'>New Project</Link>
        }
        <div className='item-list'>
        {items.map(item => <Item item={item} />)}
        </div>
      </>
    );
  };
};

export default withRouter(List);