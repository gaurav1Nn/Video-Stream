import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { formatFileSize, formatDate } from '../utils/validators';
import { ArrowLeft, Calendar, HardDrive, AlertTriangle, CheckCircle2, Clock, Loader2, Play, Shield, Sparkles } from 'lucide-react';

const VideoPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await api.get(`/api/videos/${id}`);
                setVideo(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load video');
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [id]);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'safe':
                return {
                    icon: CheckCircle2,
                    class: 'from-emerald-600 to-green-600',
                    borderClass: 'border-emerald-500/50',
                    text: 'Safe Content',
                    dotColor: 'bg-emerald-400'
                };
            case 'flagged':
                return {
                    icon: AlertTriangle,
                    class: 'from-rose-600 to-pink-600',
                    borderClass: 'border-rose-500/50',
                    text: 'Flagged Content',
                    dotColor: 'bg-rose-400'
                };
            case 'processing':
                return {
                    icon: Loader2,
                    class: 'from-amber-600 to-orange-600',
                    borderClass: 'border-amber-500/50',
                    text: 'Processing',
                    dotColor: 'bg-amber-400',
                    spin: true
                };
            default:
                return {
                    icon: Clock,
                    class: 'from-blue-600 to-purple-600',
                    borderClass: 'border-blue-500/50',
                    text: 'Pending',
                    dotColor: 'bg-blue-400'
                };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-40">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping absolute opacity-20" />
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center relative shadow-2xl">
                            <Loader2 className="w-12 h-12 text-white animate-spin" />
                        </div>
                    </div>
                    <p className="mt-8 text-xl font-bold text-white">Loading video...</p>
                </div>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
                    <div className="bg-gradient-to-r from-rose-900/50 to-pink-900/50 backdrop-blur-xl border-2 border-rose-500/50 text-rose-100 px-8 py-6 rounded-3xl mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <div>
                                <p className="font-bold text-lg">Error Loading Video</p>
                                <p className="text-sm text-rose-200">{error || 'Video not found'}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const statusConfig = getStatusConfig(video.sensitivityStatus);
    const StatusIcon = statusConfig.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
            <Navbar />

            {/* Background Pattern */}
            <div className="fixed inset-0">
                <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl top-20 right-20 animate-pulse-slow" />
                <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl bottom-20 left-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-3 text-slate-300 hover:text-white mb-8 transition-colors group animate-slide-up"
                >
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl flex items-center justify-center group-hover:border-slate-600 transition-all shadow-xl">
                        <ArrowLeft className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg">Back to Dashboard</span>
                </button>

                {/* Video Player */}
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl mb-10 animate-scale-in border-2 border-white/10">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
                    <video
                        src={video.cloudinaryUrl}
                        controls
                        className="w-full aspect-video bg-black"
                        controlsList="nodownload"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Video Info Card */}
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border-2 border-white/10 overflow-hidden animate-slide-up">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

                    {/* Title */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/10">
                            <Play className="w-8 h-8 text-white" fill="currentColor" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl font-black text-white mb-2">
                                {video.title}
                            </h1>
                            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r ${statusConfig.class} border-2 ${statusConfig.borderClass} shadow-xl`}>
                                <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`} />
                                <StatusIcon className={`w-5 h-5 text-white ${statusConfig.spin ? 'animate-spin' : ''}`} />
                                <span className="font-black text-white">{statusConfig.text}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-xl border-2 border-white/10">
                                    <Calendar className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 font-semibold mb-1">Uploaded</p>
                                    <p className="font-bold text-white text-lg">{formatDate(video.uploadDate)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl border-2 border-white/10">
                                    <HardDrive className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 font-semibold mb-1">File Size</p>
                                    <p className="font-bold text-white text-lg">{formatFileSize(video.fileSize)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl p-6 border-2 border-slate-700/50">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 bg-gradient-to-br ${statusConfig.class} rounded-xl flex items-center justify-center shadow-xl border-2 border-white/10`}>
                                    <StatusIcon className={`w-7 h-7 text-white ${statusConfig.spin ? 'animate-spin' : ''}`} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 font-semibold mb-1">AI Analysis</p>
                                    <p className="font-bold text-white text-lg">{statusConfig.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Original Filename */}
                    <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/30 rounded-2xl p-6 border-2 border-slate-700/50">
                        <p className="text-sm font-bold text-slate-400 mb-2">Original Filename</p>
                        <p className="text-white font-mono text-sm break-all">{video.originalFilename}</p>
                    </div>

                    {/* Flagged Warning */}
                    {video.sensitivityStatus === 'flagged' && (
                        <div className="mt-8 bg-gradient-to-r from-rose-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 flex gap-6 border-2 border-rose-500/50 animate-slide-down">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/10">
                                    <AlertTriangle className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div>
                                <p className="font-black text-rose-100 text-2xl mb-3">⚠️ Content Warning</p>
                                <p className="text-rose-200 text-lg font-medium">
                                    This video has been flagged by our AI analysis system as potentially sensitive content.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
