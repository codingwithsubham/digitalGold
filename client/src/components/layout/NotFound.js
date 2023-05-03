import React, { Fragment } from 'react';
import {Link} from "react-router-dom"

const NotFound = props => {
  return (
    <Fragment>
      <div className='not-found insta-an'>
      <img src={require("../../static/404.gif")} alt="" />
      <br/>
      <br/>
      <h1 className='x-large text-primary'>
        <i className='fa fa-exclamation-triangle' /> Not Found
      </h1>
      <p className='large'>Sorry, there are nothing for you</p>
      <br/>
      <Link to="/" className='btn sm'>Go To Home</Link>
      </div>
    </Fragment>
  );
};

export default NotFound;
