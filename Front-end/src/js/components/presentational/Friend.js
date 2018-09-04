import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Friend = (props) => {
	return(
		<div className="friend_container">
			<div className="friend_email">{props.email}</div>
			<button type='button'>Add Friend Request</button>
			<button type='button'>Cancel Request</button>
		</div>
	);
};

Friend.propTypes = { 
	email: PropTypes.any
}; 

export default Friend;