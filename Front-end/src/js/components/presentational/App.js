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
			currUserId: '',
			inputName: '',
			inputEmail: '',
			article_title: '',
			article_content: '',
			article_tag: '表特',
			searchFriend: '',
			searchFriendEmail: '',
			searchFriendId: '',
			friendList: '',
			friendEmailArray: [],
			futureFriend: [],
			inputAuthor: '',
			inputTag: ''
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

	handleAuthorInput = (e) => {
		let inputAuthor = e.target.value;
		console.log(this.state);
		this.setState({inputAuthor: inputAuthor});
	}

	handleTagInput = (e) => {
		let inputTag = e.target.value;
		console.log(this.state);
		this.setState({inputTag: inputTag});
	}

	handleSearchArticle = () => {
		let mark = '';
		if(this.state.inputAuthor && this.state.inputTag) {
			mark = this.state.inputAuthor + '_' + this.state.inputTag;
			ref_article.on('value', (snapshot) => {
				snapshot.forEach( (snap) => {
					if(snap.val().author_article_tag === mark) {
						console.log('Id: ' + snap.val().article_id);
						console.log('Date: ' + snap.val().created_time);
						console.log('Author: ' + snap.val().author);
						console.log('Title: ' + snap.val().article_title);
						console.log('Tag: ' + snap.val().article_tag);
						console.log('Content: ' + snap.val().article_content);
					}
				});
			});
		} else if (this.state.inputAuthor) {
			mark = this.state.inputAuthor;
			ref_article.on('value', (snapshot) => {
				snapshot.forEach( (snap) => {
					if(snap.val().author === mark) {
						console.log('Id: ' + snap.val().article_id);
						console.log('Date: ' + snap.val().created_time);
						console.log('Author: ' + snap.val().author);
						console.log('Title: ' + snap.val().article_title);
						console.log('Tag: ' + snap.val().article_tag);
						console.log('Content: ' + snap.val().article_content);
					}
				});
			});
		} else if (this.state.inputTag) {
			mark = this.state.inputTag;
			ref_article.on('value', (snapshot) => {
				snapshot.forEach( (snap) => {
					if(snap.val().article_tag === mark) {
						console.log('Id: ' + snap.val().article_id);
						console.log('Date: ' + snap.val().created_time);
						console.log('Author: ' + snap.val().author);
						console.log('Title: ' + snap.val().article_title);
						console.log('Tag: ' + snap.val().article_tag);
						console.log('Content: ' + snap.val().article_content);
					}
				});
			});
		} else {
			console.log('Give some target.');
		}
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
			  	// if(snap.val().friends) {
			  	// 	console.log(snap.key);
			  	// 	this.getFriendEmail(snap.key);
			  	// }
			  	this.keepWatchDB(snap.key);
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
							email: this.state.inputEmail,
							friends: ''
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
		console.log(friend_id_array);
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

	handleSearchFriendButton = () => {
		console.log('人肉中');
		let searchFriendEmail = this.state.searchFriendEmail;

		if(searchFriendEmail === this.state.currUserEmail) {
			alert('That is you ...');
			return;
		}

		ref_user.once('value', (snapshot) => {
			let len = Object.keys(snapshot.val()).length;
			let i = 0;
			snapshot.forEach((snap) => {
				if(snap.val().email === searchFriendEmail) {
					console.log(snap.key +  ' is id of ' + snap.val().email);
			  	console.log(snap.val().name);
			  	this.setState({
			  		searchFriend: snap.val().name,
			  		searchFriendId: snap.key,
			  		searchFriendEmail: searchFriendEmail
			  	});
			  	return;
				} 
			});

		});

	}

	handleSearchFriendEmail = (e) => {
		let searchFriendEmail = e.target.value;
		console.log(this.state);
		this.setState({searchFriendEmail: searchFriendEmail});
	}

	handleAddFriend = () => {
		let myId = this.state.currUserId;
		let friendId = this.state.searchFriendId;
		// 加他那邊
		firebase.database().ref('/user/' + friendId).set({
			email: this.state.searchFriendEmail,
			name: this.state.searchFriend,
	    [myId]: 'receiver'
	  });
	  // 加我這
	  firebase.database().ref('/user/' + myId).set({
	  	email: this.state.currUserEmail,
	  	name: this.state.currUser,
	    [friendId]: 'sender'
	  });
		console.log(this.state);
		this.setState({requestFriend: {
			id: friendId,
			state: 'sender'
		}});
	}

	handleFriendRequest = (index) => {
		console.log(index);
		let friendId = this.state.futureFriend[index].id;
		firebase.database().ref('/user/' + friendId).once('value', (snap) => {
			this.handleFriendRequest2(index, snap.val().email, snap.val().name);
		});
	}

	handleFriendRequest2 = (index, friendEmail, friendName) => {
		if(this.state.futureFriend[index].state === 'receiver') {
			let myId = this.state.currUserId;
			let friendId = this.state.futureFriend[index].id;
			console.log(myId);
			console.log(friendId);
			console.log(this.state.currUserEmail);
			console.log(this.state.currUser);
			// 改他那邊
			firebase.database().ref('/user/' + friendId).set({
				email: friendEmail,
				name: friendName,
		    [myId]: 'friend'
		  });
		  // 改我這
		  firebase.database().ref('/user/' + myId).set({
		  	email: this.state.currUserEmail,
		  	name: this.state.currUser,
		    [friendId]: 'friend'
		  });
		}
	}

	handleUnfriend = (index) => {
		console.log(index);
		let friendId = this.state.futureFriend[index].id;
		firebase.database().ref('/user/' + friendId).once('value', (snap) => {
			this.handleUnfriend2(index, snap.val().email, snap.val().name);
		});
	}

	handleUnfriend2 = (index, friendEmail, friendName) => {
		let myId = this.state.currUserId;
		let friendId = this.state.futureFriend[index].id;
		console.log(myId);
		console.log(friendId);
		console.log(this.state.currUserEmail);
		console.log(this.state.currUser);
		// 改他那邊
		firebase.database().ref('/user/' + friendId).set({
			email: friendEmail,
			name: friendName,
	    [myId]: 'not friend'
	  });
	  // 改我這
	  firebase.database().ref('/user/' + myId).set({
	  	email: this.state.currUserEmail,
	  	name: this.state.currUser,
	    [friendId]: 'not friend'
	  });
	  let tempArray = this.state.futureFriend;
	  tempArray.splice(index,1);
	  this.setState({futureFriend: tempArray});
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

	keepWatchDB(id) {
		firebase.database().ref('/user/' + id).on('value', (snapshot) => {
			let tempArray = [];
			let tempCell = {};
			let snapArray = Object.values(snapshot);
			console.log(snapshot.val());
			for (let snap in snapshot.val()) {
				if(snap !== 'email' && snap !== 'name'){
					console.log(snapshot.val()[snap]);
					tempCell = {id: snap, state: snapshot.val()[snap]};
					tempArray.push(tempCell);
				}
			}
			console.log(tempArray);
			this.setState({futureFriend: tempArray});
		});
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
					handleAddFriend={this.handleAddFriend}
					futureFriend={this.state.futureFriend}
					handleFriendRequest={this.handleFriendRequest}
					handleUnfriend={this.handleUnfriend}
					handleTagInput={this.handleTagInput}
					handleAuthorInput={this.handleAuthorInput}
					handleSearchArticle={this.handleSearchArticle}
				/>
			</div>
		);
		
	}


}

export default App;