//api routes for post CRUD

import express from 'express';
import { getPosts, createPosts, updatePosts, deletePosts, likePost } from '../controllers/posts.js';
//getPost ^^
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPosts);
// will be implemented and replaced in future video
// router.get('/', getPost);
router.patch('/:id', auth, updatePosts);
router.patch('/:id/likePost', auth, likePost);
router.delete('/:id', auth, deletePosts);


export default router;
