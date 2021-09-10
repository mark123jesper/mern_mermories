// Login component for account authentication

import React, { useState } from 'react';
import {
	Avatar,
	Button,
	Grid,
	Typography,
	Container,
	Card,
	Grow,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { AUTH } from '../../constants/actionTypes';
import { signUp, signIn } from '../../actions/auth.js';
import Input from './Input.js';
import Icon from './Icon.js';
import useStyles from './styles';

const initialState = {
	fName: '',
	lName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const Auth = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [userData, setUserData] = useState(initialState);

	const switchMode = () => {
		setIsSignUp((previsSignUp) => !previsSignUp);
		setShowPassword(false);
	};

	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signUp(userData, history));
		} else {
			dispatch(signIn(userData, history));
		}
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			dispatch({ type: AUTH, data: { result, token } });
			history.push('/');
		} catch (error) {
			console.log(error);
			console.log('Google Sign In Failed')
		}
	};

	const googleFailure = (error) => {
		console.log(error)
	};

	return (
		<Grow in>
			<Container component='main' maxWidth='xs'>
				<Card className={classes.paper} elevation={3}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						<Grid container spacing={1}>
							{isSignUp && (
								<>
									<Input
										type='text'
										label='First Name'
										name='fName'
										handleChange={handleChange}
										autofocus
										half
									/>

									<Input
										type='text'
										label='Last Name'
										name='lName'
										handleChange={handleChange}
										half
									/>
								</>
							)}
							<Input
								type='email'
								label='Email Address'
								name='email'
								id='email'
								handleChange={handleChange}
							/>
							<Input
								type={showPassword ? 'text' : 'password'}
								label='Password'
								name='password'
								id='password'
								handleChange={handleChange}
								handleShowPassword={handleShowPassword}
							/>
							{isSignUp && (
								<Input
									type={showPassword ? 'text' : 'password'}
									label='Confirm Password'
									name='confirmPassword'
									handleChange={handleChange}
									handleShowPassword={handleShowPassword}
								/>
							)}
						</Grid>
						<Grid container>
							<Button
								fullWidth
								type='submit'
								variant='contained'
								color='primary'
								className={classes.submit}>
								{isSignUp ? 'Sign Up' : 'Sign In'}
							</Button>
							<GoogleLogin
								clientId='652702842463-i95kvu1cjrtl3f9hfuuro5vipv8iilu3.apps.googleusercontent.com'
								render={(renderProps) => (
									<Button
										fullWidth
										className={classes.googleButton}
										color='primary'
										disabled={renderProps.disables}
										startIcon={<Icon />}
										variant='contained'
										onClick={renderProps.onClick}>
										Google Sign In
									</Button>
								)}
								onSuccess={googleSuccess}
								onFailure={googleFailure}
								cookiePolicy='single_host_origin'
							/>
						</Grid>
						<Grid container justifyContent='center'>
							<Grid item>
								<Button onClick={switchMode}>
									{isSignUp
										? 'Already have an account? Sign in'
										: "Don't have an account? Sign up"}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Card>
			</Container>
		</Grow>
	);
};

export default Auth;
