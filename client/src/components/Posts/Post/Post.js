import React from 'react';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	TextField,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('Profile'));

	//Displaying like counter with dynamic like description
	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				(like) => like === (user?.result.googleId || user?.result._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{post.likes.length === 1 ? '1 Like' : `${post.likes.length} Likes`}
				</>
			);
		}
		return (
			<>
				<ThumbUpAltOutlined />
				&nbsp;Like
			</>
		);
	};

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={post.selectedFile}
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant='subtitle2'>{post.name}</Typography>
				<Typography variant='body2'>
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			<div className={classes.overlay2}>
				{user?.result.googleId === post.creator ||
					(user?.result._id === post.creator && (
						<Button
							style={{ color: 'white' }}
							size='small'
							onClick={() => {
								setCurrentId(post._id);
							}}>
							<EditIcon fontSize='medium' />
						</Button>
					))}
			</div>
			<div className={classes.details}>
				<Typography variant='caption' color='textSecondary'>
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<CardContent>
				<Typography variant='h5' gutterBottom>
					{post.title}
				</Typography>
				<Typography variant='subtitle1' gutterBottom>
					<TextField
						variant='standard'
						fullWidth
						multiline
						InputProps={{
							readOnly: true,
							disableUnderline: true,
						}}
						value={post.message}
					/>
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					onClick={() => dispatch(likePost(post._id))}
					disabled={!user?.result}>
					<Likes />
				</Button>
				{user?.result.googleId === post.creator ||
					(user?.result._id === post.creator && (
						<Button
							size='small'
							color='primary'
							onClick={() => dispatch(deletePost(post._id))}>
							<DeleteIcon fontSize='small' />
							Delete
						</Button>
					))}
			</CardActions>
		</Card>
	);
};

export default Post;
