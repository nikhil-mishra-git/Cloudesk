import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import fileModel from '../models/file.model.js';
import userModel from '../models/user.model.js';
import path from 'path';

const router = express.Router();

// Upload a file
router.post('/upload', authMiddleware, async (req, res) => {
    try {
        const file = req.files?.file;
        if (!file) return res.status(400).json({ message: 'No file provided' });

        const fileName = path.parse(file.name).name;
        const extension = path.extname(file.name);

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type:'raw',
            folder: 'cloudesk-items',
            access_mode: 'public',
            use_filename: true,
            unique_filename: false,
        });

        const newFile = await fileModel.create({
            filename: file.name,
            format: extension,
            url: result.url,
            secure_url: result.secure_url,
            size: file.size,
            public_id: result.public_id,
            owner: req.userData.id,
        });

        await userModel.findByIdAndUpdate(req.userData.id, {
            $push: { files: newFile._id },
        });

        res.status(201).json({ message: 'File uploaded', file: newFile });
    } catch (err) {
        res.status(500).json({ message: 'Upload failed' });
    }
});

// Get all user's files
router.get('/', authMiddleware, async (req, res) => {
    try {
        const files = await fileModel.find({
            owner: req.userData.id,
        }).populate('owner', 'name').sort({ createdAt: -1 });

        res.status(200).json({ files });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching files' });
    }
});

// Soft delete (move to trash)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'Not found' });
        if (file.owner.toString() !== req.userData.id)
            return res.status(403).json({ message: 'Unauthorized' });

        file.starred = false;
        file.deleted = true;
        await file.save();

        res.status(200).json({ message: 'File moved to trash' });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed' });
    }
});

// Restore file from trash
router.patch('/:id/restore', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        if (!file || !file.deleted)
            return res.status(404).json({ message: 'File not found in trash' });

        file.deleted = false;
        await file.save();

        res.status(200).json({ message: 'File restored' });
    } catch (err) {
        res.status(500).json({ message: 'Restore failed' });
    }
});

// Share file with another user
router.patch('/:id/share', authMiddleware, async (req, res) => {
    const { userId } = req.body;

    try {
        const file = await fileModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'File not found' });
        if (file.owner.toString() !== req.userData.id)
            return res.status(403).json({ message: 'Unauthorized' });

        if (!file.sharedWith.includes(userId)) {
            file.sharedWith.push(userId);
            file.access = 'shared';
            await file.save();
        }

        res.status(200).json({ message: 'File shared', file });
    } catch (err) {
        res.status(500).json({ message: 'Share failed' });
    }
});

// Toggle star on a file
router.post('/star/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'File not found' });
        if (file.owner.toString() !== req.userData.id)
            return res.status(403).json({ message: 'Unauthorized' });

        file.starred = !file.starred;
        await file.save();

        res.status(200).json({
            message: `File ${file.starred ? 'starred' : 'unstarred'}`,
            file,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle star' });
    }
});

// Get files shared with current user
router.get('/shared/me', authMiddleware, async (req, res) => {
    try {
        const files = await fileModel.find({
            sharedWith: req.userData.id,
            deleted: false,
        }).sort({ createdAt: -1 });

        res.status(200).json({ files });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching shared files' });
    }
});

// Permanently delete a file
router.delete('/:id/permanent', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });
        if (file.owner.toString() !== req.userData.id)
            return res.status(403).json({ message: "Unauthorized access" });
        if (!file.deleted)
            return res.status(400).json({ message: "File is not in trash" });

        await cloudinary.uploader.destroy(file.public_id, {
            resource_type: 'raw',
        });

        await userModel.findByIdAndUpdate(req.userData.id, {
            $pull: { files: file._id },
        });

        await file.deleteOne();

        res.status(200).json({ message: "File permanently deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
