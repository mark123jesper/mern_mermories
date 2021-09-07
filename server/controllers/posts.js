import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ error: error });
	}
};

export const createPosts = async (req, res) => {
	const body = req.body;
	const newPost = new PostMessage(body);
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ error: error });
	}
};

export const updatePosts = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post Existing with that Id');
	try {
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
		res.status(201).res.json(updatedPost);;
	} catch (error) {
		res.status(409).json({ error: error });
	}
};

export const deletePosts = async (req, res) => {
	const { id:_id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post Existing with that Id');

	await PostMessage.findByIdAndRemove(_id);
	res.status(201).json({ message: 'Successfully deleted' });
}

export const likePost = async (req, res) => {
	const { id: _id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post Existing with that Id');

	try {
		const post = await PostMessage.findById(_id);
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount+1}, { new: true });
		res.status(201).json(updatedPost);
	} catch (error) {
		res.status(409).json({ error: error });
	}
}
