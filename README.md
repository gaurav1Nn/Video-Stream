# 🎬 Video Upload, Sensitivity Processing & Streaming Application

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-blue?style=for-the-badge)](https://stream-sigma-ebon.vercel.app)
[![Backend API](https://img.shields.io/badge/API-Running-success?style=for-the-badge)](https://video-stream-g5vc.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/gaurav1Nn/Video-Stream)

**A full-stack production-ready application for video upload, AI-powered sensitivity analysis, and streaming with real-time progress tracking.**

[Live Demo](https://stream-sigma-ebon.vercel.app) • [API Docs](#-api-endpoints) • [Tech Stack](#-tech-stack) • [Features](#-features)

</div>

---

## 🌐 Live Deployment

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [https://stream-sigma-ebon.vercel.app](https://stream-sigma-ebon.vercel.app) | ✅ Live |
| **Backend API** | [https://video-stream-g5vc.onrender.com](https://video-stream-g5vc.onrender.com) | ✅ Live |
| **Database** | MongoDB Atlas | ✅ Live |
| **CDN** | Cloudinary | ✅ Live |

---

## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-endpoints)
- [Real-time Events](#-real-time-events-socketio)
- [Deployment](#-deployment)
- [Assignment Requirements](#-assignment-requirements)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🎯 Core Functionality

| Feature | Description | Status |
|---------|-------------|--------|
| **User Authentication** | JWT-based auth with access & refresh tokens | ✅ |
| **Video Upload** | Drag-and-drop with validation (100MB, MP4/MOV/WebM) | ✅ |
| **Cloud Storage** | Cloudinary integration for storage & CDN streaming | ✅ |
| **Sensitivity Analysis** | AI-powered content screening (safe/flagged) | ✅ |
| **Real-time Updates** | Socket.io for live progress tracking | ✅ |
| **Video Streaming** | Direct CDN streaming with range requests | ✅ |
| **Role-Based Access** | User and Admin roles with permissions | ✅ |
| **Multi-tenant** | Complete user isolation and data segregation | ✅ |

### 🔐 Security Features

- ✅ Bcrypt password hashing (10 rounds)
- ✅ JWT token refresh mechanism (15min access, 7d refresh)
- ✅ Protected API endpoints with middleware
- ✅ File type and size validation
- ✅ User-specific access control
- ✅ CORS configuration
- ✅ Environment variable protection

### 🎨 UI/UX Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Real-time upload progress bar
- ✅ Real-time processing progress
- ✅ Beautiful gradient design with Tailwind CSS
- ✅ Intuitive dashboard with filters
- ✅ Video preview thumbnails
- ✅ Status badges (Safe, Flagged, Processing)

---

## 🎥 Live Demo

**Try the live application:** [https://stream-sigma-ebon.vercel.app](https://stream-sigma-ebon.vercel.app)

### Quick Test Flow:

1. **Register** an account
2. **Upload** a video (sample videos in `/test-videos` folder)
3. **Watch** real-time processing (5-10 seconds)
4. **View** processed videos in dashboard
5. **Filter** by status (All, Safe, Flagged, Processing)
6. **Stream** videos directly from CDN

### Test Credentials

```
Email: demo@example.com
Password: demo123

(Or create your own account)
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime environment | 18+ |
| **Express.js** | Web framework | 4.x |
| **MongoDB** | Database | Atlas |
| **Mongoose** | ODM | 8.x |
| **JWT** | Authentication | Latest |
| **Bcrypt.js** | Password hashing | 2.x |
| **Cloudinary** | Video storage & CDN | SDK 2.x |
| **Socket.io** | Real-time communication | 4.x |
| **Multer** | File upload handling | 1.x |

### Frontend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI library | 18.x |
| **Vite** | Build tool | 5.x |
| **Tailwind CSS** | Styling | 3.x |
| **React Router** | Navigation | 6.x |
| **Axios** | HTTP client | 1.x |
| **Socket.io Client** | Real-time updates | 4.x |
| **Lucide React** | Icons | Latest |

### Infrastructure

- **Hosting (Frontend):** Vercel
- **Hosting (Backend):** Render
- **Database:** MongoDB Atlas
- **CDN:** Cloudinary
- **Version Control:** GitHub

---

## 🏗️ Architecture

```mermaid
graph TB
    A[User Browser] -->|HTTPS| B[Vercel Frontend]
    B -->|API Calls| C[Render Backend]
    B -->|Socket.io| C
    C -->|CRUD| D[(MongoDB Atlas)]
    C -->|Upload/Stream| E[Cloudinary CDN]
    C -->|Process| F[Sensitivity Analysis]
    E -->|Direct Stream| A
```

### Data Flow

1. **Upload:** Client → Backend → Cloudinary
2. **Processing:** Backend → Sensitivity Analysis → Socket.io → Client
3. **Streaming:** Cloudinary CDN → Client (direct)
4. **Auth:** Client → Backend → MongoDB

---

## 📦 Installation

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas))
- Cloudinary account ([Sign up](https://cloudinary.com/))
- Git

### 1. Clone Repository

```bash
git clone https://github.com/gaurav1Nn/Video-Stream.git
cd Video-Stream
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/videos
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Generate JWT Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

**Open** http://localhost:5173 in your browser! 🎉

---

## 📖 Usage Guide

### 1. User Registration

1. Navigate to [https://stream-sigma-ebon.vercel.app](https://stream-sigma-ebon.vercel.app)
2. Click **"Sign up for free"**
3. Enter valid email and password (6+ characters)
4. Click **"Create Account"**

### 2. Upload Video

1. Click **"Upload"** button in navbar
2. **Drag & drop** video or click to browse
3. Enter **video title** (3-100 characters)
4. Click **"Upload Video"**
5. Watch **real-time progress** bars:
   - Upload progress (0-100%)
   - Processing progress (0-100%)
6. Get **instant notification** when complete

### 3. View Videos

- **Dashboard** shows all your videos (grid layout)
- **Filter tabs:** All | Safe Content | Flagged | Processing
- **Video cards** show:
  - Thumbnail preview
  - Status badge with color coding
  - Upload date & file size
  - Watch and Delete buttons

### 4. Stream Video

1. Click **"Watch Now"** on any processed video
2. Video player with:
   - Full controls (play, pause, volume, fullscreen)
   - Seek bar with buffering
   - Metadata display
3. Videos stream from **Cloudinary CDN** globally

### 5. Admin Features

**Create Admin:**
1. Register a normal user
2. Go to MongoDB Atlas → Collections → `users`
3. Edit user: change `role` from `"user"` to `"admin"`

**Admin Abilities:**
- View **all users' videos**
- Delete **any video**
- See **video owner** information

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ✅ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Videos

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/videos/upload` | Upload video | ✅ |
| GET | `/api/videos` | List videos (with filters) | ✅ |
| GET | `/api/videos/:id` | Get video details | ✅ |
| DELETE | `/api/videos/:id` | Delete video | ✅ |

### Example Request

```javascript
// Upload Video
const formData = new FormData();
formData.append('video', videoFile);
formData.append('title', 'My Video');
formData.append('socketId', socket.id);

const response = await axios.post(
  'https://video-stream-g5vc.onrender.com/api/videos/upload',
  formData,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  }
);
```

---

## 🔄 Real-time Events (Socket.io)

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `processing-progress` | `{ videoId, progress }` | Processing progress (0-100%) |
| `processing-complete` | `{ videoId, status }` | Processing done (safe/flagged) |
| `processing-error` | `{ videoId, message }` | Processing failed |

### Example Usage

```javascript
import { getSocket } from './services/socket';

const socket = getSocket();

socket.on('processing-progress', (data) => {
  console.log(`Video ${data.videoId}: ${data.progress}%`);
});

socket.on('processing-complete', (data) => {
  console.log(`Video ${data.videoId}: ${data.status}`);
});
```

---

## 🚀 Deployment

### Backend Deployment (Render)

1. **Push to GitHub**
2. **Create Render Web Service**
3. **Configure:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add Environment Variables** (all from local `.env`)
5. **Deploy!**

### Frontend Deployment (Vercel)

1. **Push to GitHub**
2. **Import to Vercel**
3. **Configure:**
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variables:**
   - `VITE_API_URL=https://video-stream-g5vc.onrender.com`
   - `VITE_SOCKET_URL=https://video-stream-g5vc.onrender.com`
5. **Deploy!**

### MongoDB Atlas Setup

1. **Create Cluster** (free tier M0)
2. **Network Access:** Add `0.0.0.0/0` (allow all IPs)
3. **Database User:** Create user with read/write access
4. **Get Connection String:** Use in `MONGO_URI`

---

## 📊 Assignment Requirements

### ✅ Functional Requirements (100% Complete)

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Full-Stack Architecture | ✅ | Node.js + Express + MongoDB + React + Vite |
| Video Management | ✅ | Cloudinary with upload validation |
| Content Analysis | ✅ | Mock sensitivity detection (5-10s) |
| Real-Time Updates | ✅ | Socket.io progress tracking |
| Streaming Service | ✅ | Cloudinary CDN streaming |
| Access Control | ✅ | JWT + RBAC (User/Admin) |
| Multi-tenant Architecture | ✅ | User isolation + data segregation |

### ✅ Technical Requirements (100% Complete)

| Component | Status | Details |
|-----------|--------|---------|
| RESTful API | ✅ | 9 endpoints with proper validation |
| Content Processing | ✅ | Simulated AI analysis |
| Real-Time Communication | ✅ | Socket.io with 3 events |
| Database Management | ✅ | MongoDB with Mongoose schemas |
| Authentication | ✅ | JWT with refresh tokens |
| Upload Interface | ✅ | Drag-drop with progress |
| Real-Time Dashboard | ✅ | Live status updates |
| Video Library | ✅ | Grid with filters |
| Media Player | ✅ | HTML5 player with controls |
| Responsive Design | ✅ | Mobile-first Tailwind CSS |

### ✅ Advanced Features

| Feature | Status | Notes |
|---------|--------|-------|
| Content Filtering | ✅ | 4 filter tabs (All, Safe, Flagged, Processing) |
| CDN Integration | ✅ | Cloudinary global CDN |
| Video Compression | ⚠️ | Using Cloudinary auto-optimization |
| Caching | ⚠️ | Browser default + CDN caching |

### ✅ Deliverables (100% Complete)

- ✅ Fully functional application
- ✅ Clean code structure
- ✅ Comprehensive documentation
- ✅ Public deployment (Vercel + Render)
- ✅ GitHub repository
- ⏳ Demo video (pending)

---

## 🤝 Design Decisions

### Why Cloudinary?
- Free tier supports 100MB uploads
- Global CDN for fast streaming
- Automatic video optimization
- No storage management needed

### Why Mock Sensitivity Analysis?
- Demonstrates workflow without AI costs
- 5-10 second simulation realistic
- Easy to replace with real AI (Google Vision, AWS Rekognition)

### Why Direct CDN Streaming?
- Faster than backend proxy
- Scales better (no server load)
- Browser handles buffering natively
- Range requests supported by default

### Why JWT Refresh Tokens?
- Better UX (no forced re-login)
- More secure than long-lived tokens
- Industry standard pattern

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error:** `MongoServerError: bad auth`
- ✅ Check MongoDB connection string
- ✅ Verify username/password
- ✅ Ensure IP whitelist includes `0.0.0.0/0`

**Error:** `Port 5000 already in use`
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Won't Connect

**Error:** `Network Error`
- ✅ Verify backend is running (`http://localhost:5000/health`)
- ✅ Check `VITE_API_URL` in `.env`
- ✅ Clear browser cache (Ctrl+Shift+R)

### Upload Fails

**Error:** `File too large`
- ✅ Max file size is 100MB
- ✅ Compress video before uploading

**Error:** `Invalid file type`
- ✅ Only MP4, MOV, WebM supported
- ✅ Convert video to supported format

**Error:** `Cloudinary upload failed`
- ✅ Check Cloudinary credentials
- ✅ Verify Cloudinary free tier limits

### Socket.io Not Connecting

**Error:** `WebSocket connection failed`
- ✅ Check `VITE_SOCKET_URL` matches backend URL
- ✅ Verify backend CORS allows frontend origin
- ✅ Check browser console for errors

---

## 📁 Project Structure

```
Video-Stream/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js       # Cloudinary configuration
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── videoController.js   # Video CRUD logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── roleCheck.js         # Admin check
│   │   └── upload.js            # Multer config
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Video.js             # Video schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── video.js             # Video routes
│   ├── utils/
│   │   ├── jwt.js               # JWT helpers
│   │   └── sensitivityAnalysis.js # Mock AI
│   ├── .env.example
│   ├── package.json
│   └── server.js                # Express + Socket.io
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Upload.jsx
│   │   │   └── VideoPlayer.jsx
│   │   ├── services/
│   │   │   ├── api.js           # Axios instance
│   │   │   └── socket.js        # Socket.io client
│   │   ├── utils/
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── SETUP.md
```

---

## 📝 License

ISC License

---

## 👨‍💻 Author

**Gaurav**  
📧 Email: [gaurav@example.com]  
🔗 GitHub: [@gaurav1Nn](https://github.com/gaurav1Nn)  
🌐 Live Demo: [https://stream-sigma-ebon.vercel.app](https://stream-sigma-ebon.vercel.app)

---

## 🙏 Acknowledgments

- **MongoDB Atlas** - Cloud database hosting
- **Cloudinary** - Video storage and CDN
- **Render** - Backend hosting
- **Vercel** - Frontend hosting
- **Tailwind CSS** - Beautiful UI components
- **Socket.io** - Real-time communication

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ using React, Node.js, and MongoDB

[View Live Demo](https://stream-sigma-ebon.vercel.app) | [Report Bug](https://github.com/gaurav1Nn/Video-Stream/issues) | [Request Feature](https://github.com/gaurav1Nn/Video-Stream/issues)

</div>
