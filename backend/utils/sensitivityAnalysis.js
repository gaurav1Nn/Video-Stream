const Video = require('../models/Video');

/**
 * Mock sensitivity analysis function
 * Simulates video processing with progress updates via Socket.io
 * Takes 5-10 seconds with random safe/flagged result
 */
const analyzeSensitivity = async (videoId, io, socketId) => {
    const totalSteps = 10;
    const delayPerStep = 500 + Math.random() * 500; // 500-1000ms per step

    try {
        // Update status to processing
        await Video.findByIdAndUpdate(videoId, {
            processingStatus: 'processing',
        });

        // Simulate processing with progress updates
        for (let i = 1; i <= totalSteps; i++) {
            await new Promise(resolve => setTimeout(resolve, delayPerStep));

            const progress = Math.round((i / totalSteps) * 100);

            // Emit progress to specific client
            if (socketId && io) {
                io.to(socketId).emit('processing-progress', {
                    videoId: videoId.toString(),
                    progress,
                    currentStep: i,
                    totalSteps,
                    message: `Processing video... ${i}/${totalSteps}`,
                });
            }
        }

        // Random safe/flagged (70% safe, 30% flagged)
        const isSafe = Math.random() > 0.3;
        const sensitivityStatus = isSafe ? 'safe' : 'flagged';

        // Update video with final status
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            {
                processingStatus: 'completed',
                sensitivityStatus,
            },
            { new: true }
        );

        // Emit completion event
        if (socketId && io) {
            io.to(socketId).emit('processing-complete', {
                videoId: videoId.toString(),
                status: sensitivityStatus,
                message: `Processing complete! Video marked as ${sensitivityStatus}.`,
            });
        }

        return updatedVideo;
    } catch (error) {
        // Mark as failed if error occurs
        await Video.findByIdAndUpdate(videoId, {
            processingStatus: 'failed',
        });

        if (socketId && io) {
            io.to(socketId).emit('processing-error', {
                videoId: videoId.toString(),
                message: 'Processing failed. Please try again.',
            });
        }

        throw error;
    }
};

module.exports = { analyzeSensitivity };
