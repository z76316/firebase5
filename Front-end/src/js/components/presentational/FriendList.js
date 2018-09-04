import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Friend from './Friend';

class FriendList extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	friendList: this.props.friendList
		// };
	}

	render() {
		if(this.props.friendEmailArray) {
			console.log(this.props.friendEmailArray);
			return(
				<div className="friend_list_area">
					<div className="friend_list_title">Friend List: </div>
					{ this.props.friendEmailArray.map( (email, index) => {
						return (
							<Friend  
								key={index} // key is exclusive to react, we are not allowed to pass it as a property
								email={email} 
							/>
						);
						
					})}
				</div>
			);
		} else {
			console.log(this.props.friendEmailArray);
			return(
				<div className="friend_list_area">
					<div className="friend_list_title">Friend List: </div>
					
				</div>
			);
		}
	}
	 
};

FriendList.propTypes = { 
	friendEmailArray: PropTypes.any
}; 

export default FriendList;