import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
	path: '../.env'
});
const bcryptSecret = process.env.BCRYPT_SECRET;

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		// Checking if auth token is from google or the custom token from sign up -> length<500 = google token
		const isCustomAuth = token.length < 500;
		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, bcryptSecret);
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub;
		}
		// Do and allow the next thing after authenticating
		// In this case, using auth for post management
		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
