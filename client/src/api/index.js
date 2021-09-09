import axios from 'axios';
import dotenv from 'dotenv';

// dotenv.config({
//     path: '../../.env'
// });
const apiBaseUrl = process.env.API_BASEURL;

// for fetching all data from the database 
const API = axios.create({ baseURL: apiBaseUrl });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    return req;
});

// const url = ""; http://localhost:3000
export const fetchPosts = () => API.get('/posts');
export const createPosts = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);