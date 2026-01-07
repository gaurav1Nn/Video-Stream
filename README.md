# Video Upload & Streaming Application

A full-stack production-ready application for video upload, sensitivity analysis, and streaming with real-time progress tracking.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based auth with access & refresh tokens
- **Video Upload**: Drag-and-drop upload with validation (100MB limit, MP4/MOV/WebM)
- **Cloud Storage**: Cloudinary integration for video storage and CDN streaming
- **Sensitivity Analysis**: Mock processing with real-time progress updates (5-10 seconds)
- **Video Streaming**: Direct CDN streaming with browser-native range request support
- **Role-Based Access**: User and Admin roles with permission management
- **Real-time Updates**: Socket.io for live upload and processing progress
- **Multi-tenant Architecture**: Complete user isolation and data segregation

### Security
- Bcrypt password hashing
- JWT token refresh mechanism
- Protected API endpoints
- File type and size validation
- User-specific video access control

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- MongoDB Atlas account
- Cloudinary account (free tier works)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the Repository
```bash
cd video-streaming-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_secure_random_access_secret
JWT_REFRESH_SECRET=your_secure_random_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**How to get credentials:**

**MongoDB Atlas:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<password>` with your database password

**Cloudinary:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Dashboard shows your Cloud Name, API Key, and API Secret

**JWT Secrets:**
Generate random secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

## 👤 User Accounts

### Creating Admin User
Admins must be created manually in MongoDB:

1. Register a normal user through the UI
2. Open MongoDB Atlas → Browse Collections → `users`
3. Find your user and edit the `role` field from `"user"` to `"admin"`

### Default Roles
- **User**: Can upload, view, edit, and delete own videos
- **Admin**: Can view all videos and delete any video

## 📱 Usage Guide

### 1. Register/Login
- Navigate to http://localhost:5173
- Click "Sign up" to create an account
- Login with your credentials

### 2. Upload Video
- Click "Upload Video" button in navbar
- Enter video title (3-100 characters)
- Select video file (MP4, MOV, or WebM, max 100MB)
- Click "Upload Video"
- Watch real-time upload progress
- See processing progress (5-10 seconds simulation)
- Video automatically marked as "safe" or "flagged"

### 3. View Videos
- Dashboard shows all your videos (all videos if admin)
- Filter by: All, Safe, Flagged, Pending
- Click "Watch" to stream completed videos
- Click "Delete" to remove videos

### 4. Stream Video
- Videos stream directly from Cloudinary CDN
- Browser handles buffering and seeking automatically
- No backend proxy = faster streaming

## 🏗️ Project Structure

```
video-streaming-app/
├── backend/
│   ├── config/          # Database and Cloudinary config
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, upload, role check
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # JWT and sensitivity analysis
│   └── server.js        # Express + Socket.io server
└── frontend/
    └── src/
        ├── components/  # Reusable React components
        ├── context/     # Auth context
        ├── pages/       # Route pages
        ├── services/    # API and Socket.io clients
        └── utils/       # Validation helpers
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Videos
- `POST /api/videos/upload` - Upload video (multipart/form-data)
- `GET /api/videos` - List videos (with optional status filter)
- `GET /api/videos/:id` - Get video details + Cloudinary URL
- `DELETE /api/videos/:id` - Delete video

### Health
- `GET /health` - Server health check

## 🔄 Real-time Events (Socket.io)

### Client → Server
- `connection` - Client connects
- `disconnect` - Client disconnects

### Server → Client
- `processing-progress` - Processing progress update (0-100%)
- `processing-complete` - Processing finished (safe/flagged)
- `processing-error` - Processing failed

## 🧪 Testing

### Manual Testing Checklist
- [ ] Register new user
- [ ] Login with credentials
- [ ] Upload MP4 video
- [ ] Upload MOV video
- [ ] Upload WebM video
- [ ] Try uploading >100MB file (should fail)
- [ ] Try uploading AVI file (should fail)
- [ ] Watch upload progress bar
- [ ] Watch processing progress bar
- [ ] View video in dashboard
- [ ] Filter by safe/flagged
- [ ] Play video
- [ ] Delete video
- [ ] Logout
- [ ] Create admin user in DB
- [ ] Login as admin
- [ ] View all users' videos
- [ ] Delete another user's video

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect to Render/Railway
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables
6. Deploy

### Production Environment Variables
Update `FRONTEND_URL` in backend .env to your deployed frontend URL
Update `VITE_API_URL` and `VITE_SOCKET_URL` in frontend .env to your deployed backend URL

## 📊 Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken + bcryptjs)
- Cloudinary SDK
- Socket.io
- Multer

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- Socket.io Client

## 🤝 Assumptions & Design Decisions

1. **Cloudinary for storage**: Offloads video hosting complexity and provides CDN
2. **Mock sensitivity analysis**: Demonstrates workflow without AI service costs
3. **Direct CDN streaming**: Faster, more scalable than backend proxy
4. **JWT token refresh**: Better UX than forcing re-login every 15 minutes
5. **Title-only metadata**: Simpler upload flow for MVP
6. **2 roles (User/Admin)**: Adequate for demo, easily extensible
7. **Desktop-first UI**: Most video management done on desktop
8. **100MB file limit**: Fast uploads within Cloudinary free tier

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Verify all environment variables are set
- Ensure port 5000 is not in use

### Frontend won't connect
- Verify backend is running on port 5000
- Check VITE_API_URL in frontend .env
- Clear browser cache and localStorage

### Video upload fails
- Check file size (max 100MB)
- Verify file type (MP4, MOV, WebM only)
- Check Cloudinary credentials
- Look at browser console for errors

### Socket.io not connecting
- Ensure backend Socket.io server is running
- Check CORS configuration in backend
- Verify VITE_SOCKET_URL matches backend URL

## 📄 License

ISC

## 👨‍💻 Author

Built as a production-ready full-stack video streaming application with modern best practices.
