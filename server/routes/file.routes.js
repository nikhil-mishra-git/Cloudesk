import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import fileModel from '../models/file.model.js';
import userModel from '../models/user.model.js';

const router = express.Router()

// POST /api/files/upload
router.post('/upload', authMiddleware, async (req, res) => {
    try {
        const file = req.files?.file;
        if (!file) return res.status(400).json({ message: 'No file provided' });

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
        });

        const newFile = await fileModel.create({
            filename: file.name,
            format: result.format,
            url: result.url,
            secure_url: result.secure_url,
            size: file.size,
            public_id: result.public_id,
            owner: req.userData.id,
        });

        console.log(newFile);

        await userModel.findByIdAndUpdate(req.userData.id, {
            $push: { files: newFile._id },
        });

        res.status(201).json({ message: 'File uploaded', file: newFile });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ message: 'Upload failed' });
    }
});

// GET /api/files
router.get('/', authMiddleware, async (req, res) => {
    try {
        const files = await fileModel.find({
            owner: req.userData.id,
            deleted: false,
        }).populate('owner', 'name').sort({ createdAt: -1 });

        res.status(200).json({ files });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching files' });
    }
});

// DELETE /api/files/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: 'Not found' });

        if (file.owner.toString() !== req.userData.id)
            return res.status(403).json({ message: 'Unauthorized' });

        file.deleted = true;
        await file.save();

        res.status(200).json({ message: 'File moved to trash' });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed' });
    }
});

// PATCH /api/files/:id/restore
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

// PATCH /api/files/:id/share
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

// GET /api/files/shared
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

router.delete('/:id/permanent', authMiddleware, async (req, res) => {
    try {
        const fileId = req.params.id;

        const file = await fileModel.findById(fileId);
        if (!file) return res.status(404).json({ message: "File not found" });

        if (file.owner.toString() !== req.userData.id)
            return res.status(403).json({ message: "Unauthorized access" });

        if (!file.deleted)
            return res.status(400).json({ message: "File is not in trash" });

        // 1. Delete from Cloudinary
        await cloudinary.uploader.destroy(file.public_id, {
            resource_type: 'auto',
        });

        // 2. Remove file ID from user's file list
        await userModel.findByIdAndUpdate(req.userData.id, {
            $pull: { files: file._id },
        });

        // 3. Delete from MongoDB
        await file.deleteOne();

        res.status(200).json({ message: "File permanently deleted" });
    } catch (error) {
        console.error("Permanent delete error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;