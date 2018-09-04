import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const CurrUserData = (props) => {
	return(
		<div className="user_data_container">
			<div className='user_data_name'>User Name: </div>
			<div>{props.currUser}</div>
			<div className='user_data_email'>User Email: </div>
			<div>{props.currUserEmail}</div>
		</div>
	);
};

CurrUserData.propTypes = { 
	currUser: PropTypes.any,
	currUserEmail: PropTypes.any
}; 

export default CurrUserData;