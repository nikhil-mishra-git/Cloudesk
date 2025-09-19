import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
            trim: true,
        },
        format: {
            type: String,
        },
        url: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
            unique: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        starred: {
            type: Boolean,
            default: false,
        },
        sharedWith: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        downloads: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, 
    }
);

const fileModel = mongoose.model('File', fileSchema);

export default fileModel;

