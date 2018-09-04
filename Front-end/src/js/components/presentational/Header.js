import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = () => {
	return(
		<header>
			<Link to='/'><div className="header_button">Main</div></Link>
			<Link to='/search'><div className="header_button">Search</div></Link>
		</header>
	);
};


export default Header;