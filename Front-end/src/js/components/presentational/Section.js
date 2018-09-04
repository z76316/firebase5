import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './Login';
import FriendList from './FriendList';
import PostArticle from './PostArticle';
import Search from './Search';
import CurrUserData from './CurrUserData';


const Section = (props) => {
	return(
		<section>
			<div className="container">
				<Route 
					exact path="/" 
					render={() => <Login 
						handleNameInput={props.handleNameInput}
						handleEmailInput={props.handleEmailInput}
						handleLogin={props.handleLogin} 
					/>}
				/>
				<Route 
					exact path="/" 
					render={() => <CurrUserData 
						currUser={props.currUser}
						currUserEmail={props.currUserEmail}
					/>}
				/>
				<Route 
					exact path="/" 
					render={() => <FriendList 
						friendEmailArray={props.friendEmailArray}
					/>}
				/>
				<Route 
					exact path="/" 
					render={() => <PostArticle 
						handleArticleTitle={props.handleArticleTitle}
						handleArticleContent={props.handleArticleContent}
						handleArticleTag={props.handleArticleTag}
						handlePostArticle={props.handlePostArticle}
					/>}
				/>
				<Route 
					path="/search" 
					render={() => <Search 
						handleSearchFriendEmail={props.handleSearchFriendEmail}
						searchFriendId={props.searchFriendId}
						handleSearchFriendButton={props.handleSearchFriendButton}
					/>}
				/>

			</div>
		</section>
	);
};

Section.propTypes = { 
	handleNameInput: PropTypes.func,
	handleEmailInput: PropTypes.func,
	handleLogin: PropTypes.func,
	currUser: PropTypes.any,
	currUserEmail: PropTypes.any,
	handleArticleTitle: PropTypes.func,
	handleArticleContent: PropTypes.func,
	handleArticleTag: PropTypes.func,
	handlePostArticle: PropTypes.func,
	handleSearchFriendEmail: PropTypes.func,
	searchFriendId: PropTypes.any,
	handleSearchFriendButton: PropTypes.func,
	friendEmailArray: PropTypes.any
}; 

export default Section;