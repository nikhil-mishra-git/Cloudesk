import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        avatar: {
            public_id: {
                type: String,
                default: '',
            },
            url: {
                type: String,
                default: 'https://api.dicebear.com/9.x/micah/svg',
            },
        },
        files: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'File',
            },
        ],
    },
    { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
