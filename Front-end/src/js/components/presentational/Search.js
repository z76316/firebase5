import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Search = (props) => {
	return(
		<div className="search_friend_container">
			<div className="search_friend_title">Search Your Friends: </div>
			<div className="search_friend_input_area">
				<input 
					className="input_friend_email" 
					type="text" 
					name="friend_email" 
					placeholder='Email of Your Friend' 
					onChange={ (e) => props.handleSearchFriendEmail(e) }
				/>
				<button type='button'
					onClick={ () => props.handleSearchFriendButton()}
				>Search</button>	
			</div>
			<div className="search_friend_result">
				<div className="friend_id">ID of hey@gmail.com: {props.searchFriendId}</div>
				<button 
					type='button'
				>Add Friend Request</button>
			</div>
		</div>
	);
};

Search.propTypes = { 
	handleSearchFriendEmail: PropTypes.func,
	searchFriendId: PropTypes.any,
	handleSearchFriendButton: PropTypes.func
}; 

export default Search;