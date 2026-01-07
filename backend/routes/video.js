const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    uploadVideo,
    getVideos,
    getVideo,
    deleteVideo,
} = require('../controllers/videoController');

// All routes require authentication
router.post('/upload', auth, upload.single('video'), uploadVideo);
router.get('/', auth, getVideos);
router.get('/:id', auth, getVideo);
router.delete('/:id', auth, deleteVideo);

module.exports = router;
