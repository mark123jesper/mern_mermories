import express from 'express';
import { getPosts, createPosts, updatePosts, deletePosts, likePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.patch('/:id', updatePosts);
router.patch('/:id/likePost', likePost);
router.delete('/:id', deletePosts);


export default router;
