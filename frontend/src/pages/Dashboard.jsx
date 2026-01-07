import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import VideoCard from '../components/VideoCard';
import api from '../services/api';
import { Video, Loader2, Sparkles, Shield, TrendingUp, Zap } from 'lucide-react';

const Dashboard = () => {
    const { isAdmin } = useAuth();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const params = filter !== 'all' ? { status: filter } : {};
            const response = await api.get('/api/videos', { params });
            setVideos(response.data.videos);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch videos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [filter]);

    const handleDelete = (videoId) => {
        setVideos(videos.filter(v => v.id !== videoId));
    };

    const filterOptions = [
        { value: 'all', label: 'All Videos', icon: Video, count: videos.length, bgGradient: 'from-indigo-600 to-blue-600', borderColor: 'border-indigo-400', hoverGlow: 'hover:shadow-indigo-500/50' },
        { value: 'safe', label: 'Safe Content', icon: Sparkles, bgGradient: 'from-emerald-600 to-teal-600', borderColor: 'border-emerald-400', hoverGlow: 'hover:shadow-emerald-500/50' },
        { value: 'flagged', label: 'Flagged', icon: Shield, bgGradient: 'from-rose-600 to-pink-600', borderColor: 'border-rose-400', hoverGlow: 'hover:shadow-rose-500/50' },
        { value: 'pending', label: 'Processing', icon: Zap, bgGradient: 'from-amber-600 to-orange-600', borderColor: 'border-amber-400', hoverGlow: 'hover:shadow-amber-500/50' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
            <Navbar />

            {/* Creative Background Elements */}
            <div className="fixed inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
                {/* Page Header */}
                <div className="mb-12 animate-slide-up">
                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl mb-6 border border-white/20 hover:bg-white/15 transition-all">
                        <div className="relative">
                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-60" />
                        </div>
                        <span className="text-sm font-bold text-white">
                            {videos.length} {videos.length === 1 ? 'Video' : 'Videos'} • AI-Powered
                        </span>
                        {isAdmin && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl border border-purple-400/40">
                                <Shield className="w-3.5 h-3.5 text-purple-300" />
                                <span className="text-xs font-bold text-purple-200">Admin</span>
                            </div>
                        )}
                    </div>

                    {/* Main Heading with Creative Gradient */}
                    <h1 className="text-7xl font-black mb-5 tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
                            {isAdmin ? 'Content Hub' : 'My Studio'}
                        </span>
                    </h1>
                    <p className="text-slate-300 text-xl font-medium max-w-2xl">
                        {isAdmin ? 'Manage all platform content with AI analytics' : 'Your creative workspace with intelligent content screening'}
                    </p>
                </div>

                {/* Enhanced Filters */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {filterOptions.map((option, index) => {
                            const Icon = option.icon;
                            const isActive = filter === option.value;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setFilter(option.value)}
                                    className={`group relative px-7 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-3 text-base ${isActive
                                            ? `bg-gradient-to-r ${option.bgGradient} text-white shadow-2xl ${option.hoverGlow} border-2 ${option.borderColor} scale-105`
                                            : 'bg-white/10 text-slate-300 hover:bg-white/15 border-2 border-white/20 hover:border-white/30 shadow-xl backdrop-blur-md'
                                        }`}
                                >
                                    {isActive && (
                                        <div className={`absolute inset-0 bg-gradient-to-r ${option.bgGradient} rounded-2xl blur-xl opacity-60 -z-10`} />
                                    )}

                                    <Icon className={`w-5 h-5 relative z-10 ${option.value === 'pending' && isActive ? 'animate-spin' : ''}`} />
                                    <span className="relative z-10">{option.label}</span>

                                    {isActive && option.count !== undefined && (
                                        <span className="relative z-10 px-3 py-1 bg-white/25 backdrop-blur-sm rounded-xl text-xs font-black shadow-lg">
                                            {option.count}
                                        </span>
                                    )}

                                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-gradient-to-r from-rose-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-rose-400/50 text-rose-100 px-6 py-5 rounded-2xl mb-10 shadow-2xl animate-slide-down">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-rose-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <div>
                                <p className="font-black text-lg">Error Loading Videos</p>
                                <p className="text-sm text-rose-200 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping absolute opacity-20" />
                            <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center relative shadow-2xl shadow-purple-500/50">
                                <Loader2 className="w-12 h-12 text-white animate-spin" />
                            </div>
                        </div>
                        <p className="mt-8 text-xl font-bold text-white">Loading your content...</p>
                        <p className="text-slate-400 mt-2">Please wait</p>
                    </div>
                ) : (
                    <>
                        {/* Videos Grid */}
                        {videos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                                <div className="relative mb-10">
                                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 backdrop-blur-xl rounded-3xl flex items-center justify-center transform rotate-6 shadow-2xl border-2 border-white/20">
                                        <Video className="w-16 h-16 text-indigo-300" />
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/50 animate-bounce border-2 border-white/20">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-3">No Videos Yet</h3>
                                <p className="text-slate-300 text-center max-w-md text-lg mb-10">
                                    {filter === 'all'
                                        ? "Start creating amazing content today!"
                                        : `No ${filter} videos found. Try selecting a different filter.`
                                    }
                                </p>
                                {filter === 'all' && (
                                    <button
                                        onClick={() => window.location.href = '/upload'}
                                        className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3 border-2 border-white/20"
                                    >
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                            <Video className="w-5 h-5" />
                                        </div>
                                        Upload Your First Video
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {videos.map((video, index) => (
                                    <div
                                        key={video.id}
                                        className="animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <VideoCard
                                            video={video}
                                            isAdmin={isAdmin}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
