import express from 'express';
import bcrypt from 'bcrypt';
import { generateToken, authMiddleware } from '../middlewares/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import userModel from '../models/user.model.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await userModel.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = await generateToken({ payload: { id: user._id, email: user.email } });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userImage: user.userImage,
                token,
            },
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = await generateToken({ payload: { id: user._id, email: user.email } });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                url: user.avatar.url,
                name: user.name,
                email: user.email,
                avatar: user.avatar.url,
                token: token,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.userData.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (err) {
        console.error('Profile fetch error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

router.patch('/avatar', authMiddleware, async (req, res) => {
    try {
        if (!req.files || !req.files.avatar) {
            return res.status(400).json({ message: 'No avatar file uploaded' });
        }

        const avatarFile = req.files.avatar;
        const userId = req.userData.id;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.avatar?.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        const result = await cloudinary.uploader.upload(avatarFile.tempFilePath, {
            folder: 'Cloudesk/avatars',
            public_id: `user_${userId}_${Date.now()}`,
            transformation: [
                { width: 150, height: 150, crop: 'thumb', gravity: 'face' }
            ],
        });

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        };
        await user.save();

        res.status(200).json({ message: 'Avatar updated successfully', avatar: user.avatar });

    } catch (error) {
        console.error('Avatar update error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
