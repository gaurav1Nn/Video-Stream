import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Video, Upload, LogOut, User, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 shadow-2xl backdrop-blur-xl">
            {/* Subtle top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                                <Video className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                VideoStream
                            </span>
                            <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </div>
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/upload"
                            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold flex items-center gap-2.5 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
                            <Upload className="w-5 h-5" />
                            <span className="hidden sm:inline">Upload</span>
                        </Link>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 border-2 border-transparent hover:border-white/20"
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    {isAdmin && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                                            <Shield className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-white truncate max-w-[150px]">{user?.email}</p>
                                    {isAdmin && (
                                        <p className="text-xs font-bold text-amber-400 flex items-center gap-1">
                                            Admin Access
                                        </p>
                                    )}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowDropdown(false)}
                                    />
                                    <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border-2 border-white/10 py-3 z-20 animate-slide-down overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

                                        <div className="relative px-4 py-3 border-b border-white/10">
                                            <p className="text-sm font-bold text-white truncate">{user?.email}</p>
                                            {isAdmin && (
                                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30">
                                                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                                                    <span className="text-xs font-bold text-amber-300">Administrator</span>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleLogout}
                                            className="relative w-full px-4 py-3 text-left text-sm font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-3 transition-colors mt-2"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
