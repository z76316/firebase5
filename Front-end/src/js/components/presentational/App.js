import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import { createStore } from 'redux';

import './firebase/firebase_init.js';

import './css/normalize.css';
import './css/firebase_team_web.css';

import Header from './Header';
import Section from './Section';

let ref = firebase.database().ref();
let ref_user = firebase.database().ref('/user');
let ref_article = firebase.database().ref('/article');

let inputN, inputE, inputAT, inputAC;

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currUser: '',
			currUserEmail: '',
			inputName: '',
			inputEmail: '',
			article_title: '',
			article_content: '',
			article_tag: '表特',
			searchFriend: '',
			searchFriendEmail: '',
			searchFriendId: '',
			friendList: '',
			friendEmailArray: []
		};

	}

	handleNameInput = (e) => {
		let inputName = e.target.value;
		console.log(this.state);
		this.setState({inputName: inputName});
	}

	handleEmailInput = (e) => {
		let inputEmail = e.target.value;
		console.log(this.state);
		this.setState({inputEmail: inputEmail});
	}

	handleLogin = () => {
		if(!this.state.inputName || !this.state.inputEmail) {
			alert('生命不留白，input也是^_<');
			return;
		}

		console.log('hihi');

		ref_user.once('value', (snapshot) => {
			let len = Object.keys(snapshot.val()).length;
			console.log(len);
			let i = 0;
			snapshot.forEach((snap) => {
				if(snap.val().email === this.state.inputEmail) {
					console.log(snap.key +  ' was ' + snap.val().email);
			  	console.log(snap.val().name);
			  	this.getFriendEmail(snap.val().friends);
			  	alert(`${snap.val().name}，歡迎回來！`);
			  	this.setState({
			  		currUser: snap.val().name, 
			  		currUserEmail: snap.val().email,
			  		currUserId: snap.key,
			  		friendList: snap.val().friends,
			  		inputName: '',
			  		inputEmail: ''
			  	});
			  	return;
				} else {
					if(i === len - 1) {
						let newUserKey = ref.child('user').push().key;

						let user_data = {
							name: this.state.inputName,
							email: this.state.inputEmail
							// userID: newUserKey
						};

						let updates = {};
						updates['/user/' + newUserKey] = user_data;

						ref.update(updates);
						alert(`初次見面，${this.state.inputName}！`);
						this.setState({
							currUser: this.state.inputName, 
							currUserEmail: this.state.inputEmail,
							currUserId: newUserKey,
							friendList: '',
							inputName: '',
			  			inputEmail: ''
						});
					}
					i++;
				}
			});
			

		});
	}

	getFriendEmail = (friends) => {
		let friendEmailArray = [];
		let friend_id_array = Object.keys(friends);
		let len = friend_id_array.length;
		friend_id_array.forEach( (id) => {
			firebase.database().ref('/user/' + id).once('value', (snapshot) => {
				let i = 0;
				for(i = 0; i < len ; i++) {
					console.log(snapshot.val().email);
					friendEmailArray.push(snapshot.val().email);
				}
				console.log(friendEmailArray);
				this.setState({
					friendEmailArray: friendEmailArray
				});
			});
		});
	}

	handleArticleTitle = (e) => {
		let article_title = e.target.value;
		console.log(this.state);
		this.setState({article_title: article_title});
	}

	handleArticleContent = (e) => {
		let article_content = e.target.value;
		console.log(this.state);
		this.setState({article_content: article_content});
	}

	handleArticleTag = (e) => {
		let article_tag = e.target.value;
		console.log(this.state);
		this.setState({article_tag: article_tag});
	}

	handleSearchFriendEmail = (e) => {
		let searchFriendEmail = e.target.value;
		console.log(this.state);
		this.setState({searchFriendEmail: searchFriendEmail});
	}

	handleSearchFriendButton = () => {
		console.log('人肉中');
		let searchFriendEmail = this.state.searchFriendEmail;

		ref_user.once('value', (snapshot) => {
			let len = Object.keys(snapshot.val()).length;
			let i = 0;
			snapshot.forEach((snap) => {
				if(snap.val().email === searchFriendEmail) {
					console.log(snap.key +  ' is id of ' + snap.val().email);
			  	console.log(snap.val().name);
			  	this.setState({searchFriendId: snap.key});
			  	return;
				} 
			});

		});

	}

	handlePostArticle = () => {
		if(this.state.currUser && this.state.currUserEmail 
			&& this.state.article_title && this.state.article_content ) {

			let newArticleKey = ref.child('article').push().key;

			let article_data = {
				article_id: newArticleKey,
				article_title: this.state.article_title,
				article_content: this.state.article_content,
				article_tag: this.state.article_tag,
				author_article_tag: this.state.currUserEmail + '_' + this.state.article_tag,
				author: this.state.currUserEmail,
				created_time: new Date().valueOf()
			};

			let updates = {};
			updates['/article/' + newArticleKey] = article_data;
			ref.update(updates);

			this.setState({
				inputName: '',
				inputEmail: '',
				article_title: '',
				article_content: '', 
				article_tag: '表特'
			});
			console.log('有了有了');
		}

	}

	render() {
		return(
			<div>
				<Header />
				<Section 
					handleNameInput={this.handleNameInput}
					handleEmailInput={this.handleEmailInput}
					handleLogin={this.handleLogin}
					currUser={this.state.currUser}
					currUserEmail={this.state.currUserEmail}
					handleArticleTitle={this.handleArticleTitle}
					handleArticleContent={this.handleArticleContent}
					handleArticleTag={this.handleArticleTag}
					handlePostArticle={this.handlePostArticle}
					handleSearchFriendEmail={this.handleSearchFriendEmail}
					searchFriendId={this.state.searchFriendId}
					handleSearchFriendButton={this.handleSearchFriendButton}
					friendEmailArray={this.state.friendEmailArray}
				/>
			</div>
		);
		
	}


}

export default App;