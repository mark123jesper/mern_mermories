import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

export const createPosts = async (req, res) => {
	const body = req.body;
	const newPost = new PostMessage(body);
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ error: error.message });
	}
};

export const updatePosts = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post Existing with that Id');
	
	const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

	res.json(updatedPost);
};
