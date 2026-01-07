const multer = require('multer');
const path = require('path');

// File filter for video uploads
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
    const allowedExtensions = ['.mp4', '.mov', '.webm'];

    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only MP4, MOV, and WebM videos are allowed.'), false);
    }
};

// Configure multer
const upload = multer({
    storage: multer.memoryStorage(), // Store in memory for Cloudinary upload
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    },
    fileFilter,
});

module.exports = upload;
