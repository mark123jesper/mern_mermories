// Controllers for post CRUD

import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ error: error });
		console.log(error);
	}
};

export const createPosts = async (req, res) => {
	const post = req.body;

	const newPostMessage = new PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPostMessage.save();
		res.status(201).json(newPostMessage);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePosts = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No Post Existing with that Id');
	try {
		const updatedPost = await PostMessage.findByIdAndUpdate(
			_id,
			{ ...post, _id },
			{ new: true }
		);
		res.status(201).json(updatedPost);
	} catch (error) {
		res.status(409).json({ error: error });
	}
};

export const deletePosts = async (req, res) => {
	const { id: _id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No Post Existing with that Id');

	await PostMessage.findByIdAndRemove(_id);
	res.status(201).json({ message: 'Successfully deleted' });
};

export const likePost = async (req, res) => {
	const { id } = req.params;

	if (req.userId === null) {
		return res.json({ message: 'Unauthenticated' });
	} else if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post with id: ${id}`);
	} else {
		const post = await PostMessage.findById(id);

		const index = post.likes.findIndex((id) => id === String(req.userId));

		if (index === -1) {
			post.likes.push(req.userId);
		} else {
			post.likes = post.likes.filter((id) => id !== String(req.userId));
		}
		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
			new: true,
		});
		res.status(200).json(updatedPost);
	}
};
