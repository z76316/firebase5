import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = (props) => {
	return(
		<div className="log_in_container">
			<div className="log_in_title">Log In User: </div>
			<div className="log_in_input_area">
				<input 
					className="input_user_name" 
					type="text" 
					name="user_name" 
					placeholder='User Name' 
					onChange={ (e) => props.handleNameInput(e) }
				/>
				<input 
					className="input_user_email" 
					type="text" 
					name="user_email" 
					placeholder='User Email'
					onChange={ (e) => props.handleEmailInput(e) }
		 		/>
				<button type='button' onClick={() => props.handleLogin()}>Log In</button>
			</div>
		</div>
	);
};

Login.propTypes = { 
	handleNameInput: PropTypes.func,
	handleEmailInput: PropTypes.func,
	handleLogin: PropTypes.func
}; 

export default Login;