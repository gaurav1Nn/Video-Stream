const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title must not exceed 100 characters'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    originalFilename: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    },
    cloudinaryPublicId: {
        type: String,
        required: true,
    },
    cloudinaryUrl: {
        type: String,
        required: true,
    },
    processingStatus: {
        type: String,
        enum: ['uploading', 'processing', 'completed', 'failed'],
        default: 'uploading',
    },
    sensitivityStatus: {
        type: String,
        enum: ['pending', 'safe', 'flagged'],
        default: 'pending',
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster queries
videoSchema.index({ userId: 1, uploadDate: -1 });

module.exports = mongoose.model('Video', videoSchema);
