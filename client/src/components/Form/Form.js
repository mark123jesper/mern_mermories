// Form component for Post creation

import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
		createdAt: new Date(),
	});
	const post = useSelector((state) =>
		currentId ? state.posts.find((post) => post._id === currentId) : null
	);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [isInvalid, setIsInvalid] = useState(false);
	const user = JSON.parse(localStorage.getItem('Profile'));

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			postData.title === '' ||
			postData.message === '' ||
			postData.tags === ''
		) {
			setIsInvalid(true);
		} else {
			if (currentId === null) {
				dispatch(createPosts({ ...postData, name: user.result.name }));
				clear();
			} else {
				dispatch(
					updatePost(currentId, { ...postData, name: user.result.name })
				);
				clear();
			}
			clear();
		}
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please sign in to create, like and comment a post
				</Typography>
			</Paper>
		);
	}

	const clear = () => {
		setCurrentId(null);
		setPostData({
			title: '',
			message: ``,
			tags: '',
			selectedFile: '',
		});
		setIsInvalid(false);
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}>
				<Typography variant='h6'>
					{currentId ? 'Editing' : 'Creating'} a Memory
				</Typography>
				<TextField
					name='title'
					variant='outlined'
					label='Memory Title'
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				{isInvalid ? (
					postData.title === '' || /^\s*$/.test(postData.title) ? (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							Please entry input
						</Typography>
					) : null
				) : null}
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					multiline
					minRows={5}
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				{isInvalid ? (
					postData.message === '' || /^\s*$/.test(postData.message) ? (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							Please entry input
						</Typography>
					) : null
				) : null}
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.trim().split(',') })
					}
				/>
				{isInvalid ? (
					postData.tags === '' || /^\s*$/.test(postData.tags) ? (
						<Typography variant='subtitle2' style={{ color: 'red' }}>
							Please entry input
						</Typography>
					) : null
				) : null}
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth>
					Submit
				</Button>
				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clear}
					fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
