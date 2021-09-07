// uses import instead of require
// just put <"type": "module"> in package.json after <"main">
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postsRoutes from './routes/posts.js';
// mongoose -> create models for the post request
// express -> framework for the routing of application
// cors -> enable cross-origin request
// body-parser -> enable post request (deprecated. now using express built-in)

// axios -> making api request
// moment -> moment.js library responsible for working with time and date
// react-file-base64 -> convert images
// redux & redux-thunk -> responsible for async actions in redux
// react-redux
dotenv.config({
	path: './.env',
});
const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
//express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.urlencoded({ limit: '30mb', extended: true }));
//express. urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(cors());

app.use('/posts', postsRoutes);

const mongodb_url = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;

mongoose
	.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(port, () => console.log(`Server listening on port: ${port}`))
	)
	.catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false); -> for mongoose v5 only
