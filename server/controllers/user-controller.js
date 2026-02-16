
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../models/token.js';

export const signupUser = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: 'Request body is empty' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, name: req.body.name, password: hashedPassword, role: 'user' };

        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'Username already exists' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: error.message });
        }
        return res.status(500).json({ msg: 'Error while signing up user' });
    }
}

export const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ msg: 'Username does not match' });
        }

        let match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '24h' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: user.name,
                username: user.username,
                role: user.role || 'user',
                _id: user._id
            });
        } else {
            return res.status(400).json({ msg: 'Password does not match' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error while logging in user' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users but exclude passwords
        const users = await User.find({}, '-password').sort({ createdAt: -1 });
        return res.status(200).json({ isSuccess: true, data: users });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        return res.status(500).json({ msg: error.message });
    }
}
