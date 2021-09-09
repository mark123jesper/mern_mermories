/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
	AppBar,
	useScrollTrigger,
	Slide,
	Toolbar,
	Avatar,
	Typography,
	Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import memories from '../../images/memories.png';
import useStyles from './styles';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';


function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};


const Navbar = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('Profile')));
	
	const logout = () => {
		dispatch({ type: LOGOUT });
		history.push('/');;
		setUser(null);
	}

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 > new Date().getTime()) {
				logout();
			}
		}
		setUser(JSON.parse(localStorage.getItem('Profile')));
	}, [location, user?.token])
	
	return (
		<HideOnScroll {...props}>
			<AppBar className={classes.appBar} position='sticky' color='inherit'>
				<div className={classes.brandContainer}>
					<NavLink to='/'>
						<img
							className={classes.image}
							src={memories}
							alt='memories'
							height='50'
						/>
					</NavLink>
				</div>
				<Toolbar className={classes.toolbar}>
					{user ? (
						<div className={classes.profile}>
							<Avatar
								className={classes.purple}
								alt={user.result.name}
								src={user.result.imgUrl}>
								{user.result.name.charAt(0)}
							</Avatar>
							<Typography className={classes.userName} variant='subtitle1'>
								{user.result.name}
							</Typography>
							<Button
								variant='contained'
								className={classes.logout}
								color='secondary'
								onClick={logout}>
								Logout
							</Button>
						</div>
					) : (
						<div className={classes.profile}>
							<Button
								component={Link}
								to='/auth'
								variant='contained'
								color='inherit'>
								Sign In
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	);
};

export default Navbar;
