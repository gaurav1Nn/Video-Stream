const Video = require('../models/Video');
const cloudinary = require('../config/cloudinary');
const { analyzeSensitivity } = require('../utils/sensitivityAnalysis');
const streamifier = require('streamifier');

// @desc    Upload video
// @route   POST /api/videos/upload
// @access  Private
const uploadVideo = async (req, res) => {
    try {
        const { title, socketId } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (title.length < 3 || title.length > 100) {
            return res.status(400).json({
                message: 'Title must be between 3 and 100 characters'
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Video file is required' });
        }

        const file = req.file;

        // Upload to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'video',
                folder: 'video-streaming-app',
                format: file.originalname.split('.').pop(),
            },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Failed to upload video to cloud storage' });
                }

                try {
                    // Create video record in database
                    const video = await Video.create({
                        title,
                        userId: req.user._id,
                        originalFilename: file.originalname,
                        fileSize: file.size,
                        cloudinaryPublicId: result.public_id,
                        cloudinaryUrl: result.secure_url,
                        processingStatus: 'processing',
                        sensitivityStatus: 'pending',
                    });

                    // Return video info immediately
                    res.status(201).json({
                        message: 'Video uploaded successfully',
                        video: {
                            id: video._id,
                            title: video.title,
                            processingStatus: video.processingStatus,
                            sensitivityStatus: video.sensitivityStatus,
                            uploadDate: video.uploadDate,
                        },
                    });

                    // Start background sensitivity analysis
                    const io = req.app.get('io');
                    analyzeSensitivity(video._id, io, socketId).catch(err => {
                        console.error('Sensitivity analysis error:', err);
                    });
                } catch (dbError) {
                    console.error('Database error:', dbError);
                    // Clean up Cloudinary upload
                    await cloudinary.uploader.destroy(result.public_id, { resource_type: 'video' });
                    return res.status(500).json({ message: 'Failed to save video metadata' });
                }
            }
        );

        // Stream the buffer to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(uploadStream);

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Server error during upload' });
    }
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Private
const getVideos = async (req, res) => {
    try {
        const { status } = req.query;

        // Build query
        let query = {};

        // If user is not admin, only show their own videos
        if (req.user.role !== 'admin') {
            query.userId = req.user._id;
        }

        // Filter by sensitivity status if provided
        if (status && ['safe', 'flagged', 'pending'].includes(status)) {
            query.sensitivityStatus = status;
        }

        // Get videos and populate user info for admins
        const videos = await Video.find(query)
            .populate('userId', 'email')
            .sort({ uploadDate: -1 });

        res.json({
            count: videos.length,
            videos: videos.map(video => ({
                id: video._id,
                title: video.title,
                uploadDate: video.uploadDate,
                fileSize: video.fileSize,
                processingStatus: video.processingStatus,
                sensitivityStatus: video.sensitivityStatus,
                cloudinaryUrl: video.cloudinaryUrl,
                owner: req.user.role === 'admin' ? video.userId.email : undefined,
            })),
        });
    } catch (error) {
        console.error('Get videos error:', error);
        res.status(500).json({ message: 'Server error fetching videos' });
    }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Private
const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('userId', 'email');

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Check access: owner or admin
        if (video.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json({
            id: video._id,
            title: video.title,
            originalFilename: video.originalFilename,
            fileSize: video.fileSize,
            uploadDate: video.uploadDate,
            processingStatus: video.processingStatus,
            sensitivityStatus: video.sensitivityStatus,
            cloudinaryUrl: video.cloudinaryUrl,
            cloudinaryPublicId: video.cloudinaryPublicId,
            owner: req.user.role === 'admin' ? video.userId.email : undefined,
        });
    } catch (error) {
        console.error('Get video error:', error);
        res.status(500).json({ message: 'Server error fetching video' });
    }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Check access: owner or admin
        if (video.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Delete from Cloudinary
        try {
            await cloudinary.uploader.destroy(video.cloudinaryPublicId, {
                resource_type: 'video'
            });
        } catch (cloudinaryError) {
            console.error('Cloudinary deletion error:', cloudinaryError);
            // Continue with database deletion even if Cloudinary fails
        }

        // Delete from database
        await Video.findByIdAndDelete(req.params.id);

        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Delete video error:', error);
        res.status(500).json({ message: 'Server error deleting video' });
    }
};

module.exports = {
    uploadVideo,
    getVideos,
    getVideo,
    deleteVideo,
};
