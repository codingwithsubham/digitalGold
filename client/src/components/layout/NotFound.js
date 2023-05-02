import React, { Fragment } from 'react';
import {Link} from "react-router-dom"

const NotFound = props => {
  return (
    <Fragment>
      <div className='not-found'>
      <img src={require("../../static/404.gif")} alt="" />
      <h1 className='x-large text-primary'>
        <i className='fa fa-exclamation-triangle' /> No {props.msg} Found
      </h1>
      <p className='large'>Sorry, there are no {props.msg} for you</p>
      <Link to="/" className='btn sm'>Go To Home</Link>
      </div>
    </Fragment>
  );
};

export default NotFound;
