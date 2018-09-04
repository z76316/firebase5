import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './Login';
import FriendList from './FriendList';
import PostArticle from './PostArticle';
import Search from './Search';
import CurrUserData from './CurrUserData';
import CheckFriendList from './CheckFriendList';
import SearchArticle from './SearchArticle';

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
						handleAddFriend={props.handleAddFriend}
					/>}
				/>
				<Route 
					path="/search" 
					render={() => <CheckFriendList 
						futureFriend={props.futureFriend}
						handleFriendRequest={props.handleFriendRequest}
						handleUnfriend={props.handleUnfriend}
					/>}
				/>
				<Route 
					path="/search" 
					render={() => <SearchArticle 
						handleAuthorInput={props.handleAuthorInput}
						handleTagInput={props.handleTagInput}
						handleSearchArticle={props.handleSearchArticle}
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
	friendEmailArray: PropTypes.any,
	handleAddFriend: PropTypes.func,
	futureFriend: PropTypes.any,
	handleFriendRequest: PropTypes.func,
	handleUnfriend: PropTypes.func,
	handleAuthorInput: PropTypes.func,
	handleTagInput: PropTypes.func,
	handleSearchArticle: PropTypes.func
}; 

export default Section;