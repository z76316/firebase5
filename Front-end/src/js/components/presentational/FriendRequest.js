import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const FriendRequest = (props) => {
	return(
		<div className="friend_container">
			<div className="friend_email">{props.req.id}</div>
			<button 
				type='button'
				onClick={ () => props.handleFriendRequest(props.index) }>{props.req.state}</button>
			<button 
				type='button'
				onClick={ () => props.handleUnfriend(props.index) }>Unfriend</button>
		</div>
	);
};

FriendRequest.propTypes = { 
	index: PropTypes.any,
	req: PropTypes.any,
	handleFriendRequest: PropTypes.func,
	handleUnfriend: PropTypes.func
}; 

export default FriendRequest;