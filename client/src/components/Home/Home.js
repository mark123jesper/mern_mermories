// Home components for Homepage

import React, { useState, useEffect } from 'react';
import {
	Container,
	Grow,
	Grid,
} from '@material-ui/core';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts.js';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
			<Container maxWidth='xl'>
				<Grid
					container
					justifyContent='center'
					alignItems='stretch'
					spacing={3}>
					<Grid item xs={11} md={8} lg={7}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={11} md={8} lg={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
