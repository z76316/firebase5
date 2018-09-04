import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchArticle = (props) => {
	return(
		<div className="search_friend_container">
			<div className="search_friend_title">Search Article: </div>
			<div className="search_friend_input_area">
				<input 
					className="input_friend_email" 
					type="text" 
					name="friend_email" 
					placeholder='Author' 
					onChange={ (e) => props.handleAuthorInput(e) }
				/>
				<input 
					className="input_friend_email" 
					type="text" 
					name="friend_email" 
					placeholder='Tag' 
					onChange={ (e) => props.handleTagInput(e) }
				/>
				<button 
					type='button'
					onClick={ () => props.handleSearchArticle() }
				>Search Article</button>
			</div>
			
		</div>
	);
};

SearchArticle.propTypes = { 
	handleAuthorInput: PropTypes.func,
	handleTagInput: PropTypes.func,
	handleSearchArticle: PropTypes.func
}; 

export default SearchArticle;