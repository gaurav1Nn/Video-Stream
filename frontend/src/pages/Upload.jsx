import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { getSocket } from '../services/socket';
import { validateVideoFile, validateTitle } from '../utils/validators';
import { Upload as UploadIcon, X, File, CheckCircle2, Loader2, ArrowLeft, Sparkles, Zap } from 'lucide-react';

const Upload = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [error, setError] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = getSocket();
        setSocket(socketInstance);

        return () => {
            if (socketInstance) {
                socketInstance.off('processing-progress');
                socketInstance.off('processing-complete');
                socketInstance.off('processing-error');
            }
        };
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileChange({ target: { files: [droppedFile] } });
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validation = validateVideoFile(selectedFile);
            if (!validation.valid) {
                setError(validation.error);
                setFile(null);
            } else {
                setFile(selectedFile);
                setError('');
            }
        }
    };

    const removeFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const titleValidation = validateTitle(title);
        if (!titleValidation.valid) {
            setError(titleValidation.error);
            return;
        }

        if (!file) {
            setError('Please select a video file');
            return;
        }

        const fileValidation = validateVideoFile(file);
        if (!fileValidation.valid) {
            setError(fileValidation.error);
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('socketId', socket?.id || '');

        try {
            const response = await api.post('/api/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                },
            });

            setUploading(false);
            setProcessing(true);
            const videoId = response.data.video.id;

            if (socket) {
                socket.on('processing-progress', (data) => {
                    if (data.videoId === videoId) {
                        setProcessingProgress(data.progress);
                    }
                });

                socket.on('processing-complete', (data) => {
                    if (data.videoId === videoId) {
                        setProcessing(false);
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 1500);
                    }
                });

                socket.on('processing-error', (data) => {
                    if (data.videoId === videoId) {
                        setProcessing(false);
                        setError(data.message);
                    }
                });
            }
        } catch (err) {
            setUploading(false);
            setProcessing(false);
            setError(err.response?.data?.message || 'Upload failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <Navbar />

            {/* Background Pattern */}
            <div className="fixed inset-0">
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl top-20 right-20 animate-pulse-slow" />
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl bottom-20 left-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors group"
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl flex items-center justify-center group-hover:border-slate-600 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Back to Dashboard</span>
                </button>

                {/* Header */}
                <div className="mb-10 text-center animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-300">AI-Powered Content Analysis</span>
                    </div>

                    <h1 className="text-6xl font-black mb-4">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                            Upload Video
                        </span>
                    </h1>
                    <p className="text-xl text-slate-300 font-medium">
                        Share your content and get instant AI analysis
                    </p>
                </div>

                {/* Upload Card */}
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border-2 border-white/10 overflow-hidden animate-scale-in">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600" />

                    {error && (
                        <div className="bg-gradient-to-r from-rose-900/50 to-pink-900/50 backdrop-blur-sm border-2 border-rose-500/50 text-rose-100 px-5 py-4 rounded-2xl mb-8 flex items-start gap-3 animate-slide-down">
                            <span className="text-xl">⚠️</span>
                            <span className="flex-1">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-bold text-slate-200 mb-3">
                                Video Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={uploading || processing}
                                className="w-full px-5 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 font-medium"
                                placeholder="Enter a descriptive title (3-100 characters)"
                            />
                        </div>

                        {/* File Upload Area */}
                        <div>
                            <label className="block text-sm font-bold text-slate-200 mb-3">
                                Video File *
                            </label>

                            {!file ? (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative border-3 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 ${dragging
                                            ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
                                            : 'border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/50'
                                        }`}
                                >
                                    <div className="relative inline-block mb-6">
                                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl ${dragging ? 'opacity-75' : 'opacity-50'} animate-pulse`} />
                                        <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                            <UploadIcon className="w-10 h-10 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white font-bold text-xl mb-2">
                                        {dragging ? 'Drop your video here!' : 'Drop your video or click to browse'}
                                    </p>
                                    <p className="text-slate-400 font-medium">
                                        MP4, MOV, WebM • Max 100MB
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="video/mp4,video/quicktime,video/webm"
                                        onChange={handleFileChange}
                                        disabled={uploading || processing}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="relative bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50 rounded-2xl p-6 flex items-center gap-5">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                                        <File className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-white text-lg truncate mb-1">{file.name}</p>
                                        <p className="text-sm text-cyan-300 font-semibold">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    {!uploading && !processing && (
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="p-3 hover:bg-rose-500/20 rounded-xl transition-colors border-2 border-transparent hover:border-rose-500/50"
                                        >
                                            <X className="w-6 h-6 text-rose-400" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Upload Progress */}
                        {uploading && (
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-blue-300">Uploading to cloud...</span>
                                    <span className="text-blue-400">{uploadProgress}%</span>
                                </div>
                                <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border-2 border-slate-700">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Processing Progress */}
                        {processing && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl">
                                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-white text-lg">AI Content Analysis</p>
                                        <p className="text-sm text-purple-300">Scanning for sensitive content...</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-purple-300">Processing</span>
                                        <span className="text-purple-400">{Math.round(processingProgress)}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border-2 border-slate-700">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                                            style={{ width: `${processingProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Success State */}
                        {processing && processingProgress >= 100 && (
                            <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-2 border-emerald-500/50 rounded-2xl p-6 flex items-center gap-4 animate-scale-in">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-xl">
                                    <CheckCircle2 className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-emerald-100 text-lg">Analysis Complete!</p>
                                    <p className="text-sm text-emerald-300">Redirecting to dashboard...</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={uploading || processing || !file || !title}
                                className="group flex-1 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-[1.02] active:scale-95 transition-all duration-200 border-2 border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Uploading...
                                    </>
                                ) : processing ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <UploadIcon className="w-6 h-6" />
                                        Upload Video
                                        <Sparkles className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                disabled={uploading || processing}
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold border-2 border-slate-700 hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Upload;
