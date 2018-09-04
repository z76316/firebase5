import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import FriendRequest from './FriendRequest';

class CheckFriendList extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	friendList: this.props.friendList
		// };
	}

	render() {
		if(this.props.futureFriend.length !== 0) {
			console.log(this.props.futureFriend);

			return(
				<div className="friend_list_area">
					<div className="friend_list_title">Friend Requests: </div>
					{ this.props.futureFriend.map( (req,index) => {
						console.log(req.id);
						if(req.state !== 'not friend') {
							return (
								<FriendRequest 
									key={index}
									index={index} 
									req={req}
									handleFriendRequest={this.props.handleFriendRequest} 
									handleUnfriend={this.props.handleUnfriend}
								/>
							);
						}
					})}
				</div>
			);
		} else {
			console.log(this.props.futureFriend);
			return(
				<div className="friend_list_area">
					<div className="friend_list_title">Friend Requests: </div>
					<div>孤單寂寞覺得冷</div>
				</div>
			);
		}
	}
	 
};

CheckFriendList.propTypes = { 
	futureFriend: PropTypes.any,
	handleFriendRequest: PropTypes.func,
	handleUnfriend: PropTypes.func
}; 

export default CheckFriendList;