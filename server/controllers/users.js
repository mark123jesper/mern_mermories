
// Controllers for user authentication, and registration

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import dotenv from 'dotenv';

dotenv.config();
const bcryptSecret = process.env.BCRYPT_SECRET
const bcryptExpiresIn = process.env.BCRYPT_EXPIRESIN

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User not found' });
        
        const isPasswordsMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordsMatch) return res.status(400).json({ message: 'Incorrect credentials' });

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, bcryptSecret, { expiresIn: bcryptExpiresIn });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};

export const signUp = async (req, res) => {
	const { email, password, fName, lName, confirmPassword } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({ email, password: hashedPassword, name: `${fName} ${lName}` });
        const token = jwt.sign({ id: result._id, email: result.email }, bcryptSecret, { expiresIn: bcryptExpiresIn });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};