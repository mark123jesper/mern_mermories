import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
	const post = useSelector((state) =>
		currentId ? state.posts.find((post) => post._id === currentId) : null
	);
	const classes = useStyles();
	const [postData, setPostData] = useState({
		creator: '',
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});
	const [isInvalid, setIsInvalid] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			postData.creator === '' ||
			postData.title === '' ||
			postData.message === '' ||
			postData.message === '' ||
			postData.tags === ''
		) {
			setIsInvalid(true);
		} else {
			if (currentId) {
				dispatch(updatePost(currentId, postData));
			} else {
				dispatch(createPost(postData));
			}
			clear();
		}
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({
			creator: '',
			title: '',
			message: '',
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
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={postData.creator}
					onChange={(e) =>
						setPostData({ ...postData, creator: e.target.value })
					}
				/>
				{isInvalid
					?
					(postData.creator === '' || /^\s*$/.test(postData.creator))
					?
					<Typography variant="subtitle2" style={{ color: 'red' }}>Please entry input</Typography>
					:
					null
					:
					null
				}
				<TextField
					name='title'
					variant='outlined'
					label='Memory Title'
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				{isInvalid
					?
					(postData.title === '' || /^\s*$/.test(postData.title))
					?
					<Typography variant="subtitle2" style={{ color: 'red' }}>Please entry input</Typography>
					:
					null
					:
					null
				}
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					multiline
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				{isInvalid
					?
					(postData.message === '' || /^\s*$/.test(postData.message))
					?
					<Typography variant="subtitle2" style={{ color: 'red' }}>Please entry input</Typography>
					:
					null
					:
					null
				}
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
				/>
				{isInvalid
					?
					(postData.tags === '' || /^\s*$/.test(postData.tags))
					?
					<Typography variant="subtitle2" style={{ color: 'red' }}>Please entry input</Typography>
					:
					null
					:
					null
				}
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
					Reset
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
