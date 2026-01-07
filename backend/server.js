require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io accessible in routes
app.set('io', io);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });

    // Handle any custom events if needed
    socket.on('join-room', (data) => {
        console.log(`Socket ${socket.id} joining room:`, data);
    });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/video'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Video Streaming API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            videos: '/api/videos',
            health: '/health',
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Multer errors
    if (err.message && err.message.includes('file type')) {
        return res.status(400).json({ message: err.message });
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds 100MB limit' });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
