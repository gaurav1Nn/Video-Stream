import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Video, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles, Shield, Zap, Cloud, CheckCircle2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    const features = [
        {
            icon: Cloud,
            title: 'Cloud Storage',
            description: 'Cloudinary CDN Integration',
            gradient: 'from-blue-600 to-cyan-600'
        },
        {
            icon: Zap,
            title: 'AI Analysis',
            description: 'Real-time Content Detection',
            gradient: 'from-purple-600 to-pink-600'
        },
        {
            icon: Shield,
            title: 'Secure Access',
            description: 'JWT Authentication',
            gradient: 'from-emerald-600 to-green-600'
        }
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Features Showcase */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden items-center justify-center p-12">
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-0 left-0 animate-pulse-slow" />
                    <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                </div>

                <div className="relative max-w-lg text-white">
                    {/* Logo */}
                    <div className="mb-8 animate-slide-up">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl animate-pulse" />
                            <div className="relative w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/30">
                                <Video className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-5xl font-black mb-4 leading-tight">
                            AI-Powered<br />Video Platform
                        </h1>
                        <p className="text-xl text-white/90 font-medium">
                            Upload, analyze, and stream with intelligent content screening
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-xl p-4 border-2 border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                                        <div className={`relative w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-xl border-2 border-white/20`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-lg mb-1">{feature.title}</h3>
                                        <p className="text-white/80 text-sm font-medium">{feature.description}</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-white/60" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Tech Badge */}
                    <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-xl border-2 border-white/20 shadow-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span className="font-bold">Production Ready • React + Node.js</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden p-8">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl top-0 right-0 animate-pulse-slow" />
                    <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl bottom-0 left-0 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                </div>

                <div className="relative max-w-md w-full space-y-8 animate-fade-in">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-5xl font-black mb-3">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                Welcome Back
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg font-medium">
                            Sign in to continue to VideoStream
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl text-sm animate-slide-down">
                                    {error}
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Sign up link */}
                        <p className="mt-6 text-center text-slate-400 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
