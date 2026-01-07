import { Link } from 'react-router-dom';
import { formatFileSize } from '../utils/validators';
import api from '../services/api';
import { useState } from 'react';
import { Play, Trash2, Clock, HardDrive, MoreVertical, CheckCircle2, AlertCircle, Loader2, Sparkles, User } from 'lucide-react';

const VideoCard = ({ video, isAdmin, onDelete }) => {
    const [deleting, setDeleting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'safe':
                return {
                    icon: CheckCircle2,
                    class: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-2xl shadow-emerald-500/50',
                    text: 'Safe',
                    dotColor: 'bg-emerald-300'
                };
            case 'flagged':
                return {
                    icon: AlertCircle,
                    class: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-2xl shadow-rose-500/50',
                    text: 'Flagged',
                    dotColor: 'bg-rose-300'
                };
            case 'processing':
                return {
                    icon: Loader2,
                    class: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-2xl shadow-amber-500/50',
                    text: 'Processing',
                    dotColor: 'bg-amber-300',
                    spin: true
                };
            case 'pending':
                return {
                    icon: Clock,
                    class: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/50',
                    text: 'Pending',
                    dotColor: 'bg-blue-300'
                };
            default:
                return {
                    icon: Clock,
                    class: 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-2xl',
                    text: 'Pending',
                    dotColor: 'bg-slate-300'
                };
        }
    };

    const statusConfig = getStatusConfig(video.sensitivityStatus);
    const StatusIcon = statusConfig.icon;

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${video.title}"? This action cannot be undone.`)) {
            return;
        }

        setDeleting(true);
        try {
            await api.delete(`/api/videos/${video.id}`);
            if (onDelete) {
                onDelete(video.id);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert(error.response?.data?.message || 'Failed to delete video');
        } finally {
            setDeleting(false);
        }
    };

    const getRelativeTime = (date) => {
        const now = new Date();
        const uploaded = new Date(date);
        const diffMs = now - uploaded;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 overflow-hidden border-2 border-slate-700 hover:border-purple-500/50 animate-fade-in hover:scale-[1.03] hover:-translate-y-1">
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 overflow-hidden">
                {video.processingStatus === 'completed' ? (
                    <>
                        <video
                            src={video.cloudinaryUrl}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            preload="metadata"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        {/* Play Button with Pulse */}
                        <Link
                            to={`/video/${video.id}`}
                            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                        >
                            <div className="relative">
                                {/* Animated pulse rings */}
                                <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-0 group-hover:opacity-30 scale-150" />
                                <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-0 group-hover:opacity-40" />

                                {/* Main play button */}
                                <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl shadow-purple-500/50 border-4 border-white/20">
                                    <Play className="w-10 h-10 text-white ml-1.5" fill="currentColor" />
                                </div>
                            </div>
                        </Link>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border-2 border-slate-600">
                            <Loader2 className={`w-10 h-10 text-slate-400 ${video.processingStatus === 'processing' ? 'animate-spin' : ''}`} />
                        </div>
                        <span className="text-sm font-bold text-slate-400">
                            {video.processingStatus === 'processing' ? 'Processing...' : 'Pending'}
                        </span>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <div className={`${statusConfig.class} px-4 py-2 rounded-xl backdrop-blur-md flex items-center gap-2.5 border-2 border-white/20`}>
                        <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`} />
                        <StatusIcon className={`w-4 h-4 ${statusConfig.spin ? 'animate-spin' : ''}`} />
                        <span className="text-xs font-black tracking-wide">{statusConfig.text}</span>
                    </div>
                </div>

                {/* Menu */}
                <div className="absolute top-4 right-4">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-11 h-11 bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-800 shadow-2xl hover:scale-110 border-2 border-slate-700 hover:border-slate-600"
                    >
                        <MoreVertical className="w-5 h-5 text-slate-300" />
                    </button>

                    {showMenu && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                            <div className="absolute right-0 mt-3 w-48 bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-700 py-2 z-20 animate-slide-down overflow-hidden">
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="relative w-full px-5 py-3 text-left text-sm font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-3 disabled:opacity-50 transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    {deleting ? 'Deleting...' : 'Delete Video'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <h3 className="font-black text-white mb-4 truncate text-lg group-hover:text-purple-300 transition-colors flex items-center gap-2">
                    {video.title}
                    {video.sensitivityStatus === 'safe' && (
                        <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                </h3>

                <div className="space-y-3 text-sm mb-5">
                    <div className="flex items-center gap-3 text-slate-300 group/item hover:text-blue-400 transition-colors">
                        <div className="w-9 h-9 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                            <Clock className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="font-semibold">{getRelativeTime(video.uploadDate)}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300 group/item hover:text-emerald-400 transition-colors">
                        <div className="w-9 h-9 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                            <HardDrive className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="font-semibold">{formatFileSize(video.fileSize)}</span>
                    </div>

                    {isAdmin && video.owner && (
                        <div className="pt-3 border-t border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black border-2 border-white/20 shadow-lg">
                                    {video.owner.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-500 font-semibold">Owner</p>
                                    <p className="text-xs text-slate-300 truncate font-bold">{video.owner}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                {video.processingStatus === 'completed' && (
                    <Link
                        to={`/video/${video.id}`}
                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-[1.02] active:scale-95 transition-all duration-200 border-2 border-white/10"
                    >
                        <Play className="w-5 h-5" fill="currentColor" />
                        Watch Now
                    </Link>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
