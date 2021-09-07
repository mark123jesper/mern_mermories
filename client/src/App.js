import React, { useState, useEffect } from 'react';
import {
	Container,
	AppBar,
	Typography,
	Grow,
	Grid,
	useScrollTrigger,
	Slide,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import memories from '../src/images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts.js';

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

const App = (props) => {

	const [currentId, setCurrentId] = useState(null);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Container maxWidth='xl'>
			<HideOnScroll {...props}>
				<AppBar className={classes.appBar} position='sticky' color='inherit'>
					<Typography className={classes.heading} variant='h2' align='center'>
						Memories
					</Typography>
					<img
						className={classes.image}
						src={memories}
						alt='memories'
						height='60'
					/>
				</AppBar>
			</HideOnScroll>
			<Grow in>
				<Container maxWidth='xl'>
					<Grid
						container
						justifyContent='center'
						alignItems='stretch'
						spacing={3}>
						<Grid item xs={7}>
							<Form currentId={currentId} setCurrentId={setCurrentId} />
						</Grid>
						<Grid item xs={7}>
							<Posts setCurrentId={setCurrentId} />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default App;
