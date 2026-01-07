import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Video, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight, Sparkles, Shield, Zap, Users, TrendingUp, Award } from 'lucide-react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        const result = await register(email, password);

        if (result.success) {
            alert('✅ Account created successfully! Please login.');
            navigate('/login');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 6 ? 'good' : password.length >= 3 ? 'fair' : 'weak';

    const benefits = [
        {
            icon: Sparkles,
            title: 'Free Forever',
            description: 'No credit card required. Start uploading instantly.',
            gradient: 'from-blue-600 to-cyan-600'
        },
        {
            icon: Shield,
            title: 'Secure Storage',
            description: 'Enterprise-grade security with Cloudinary CDN.',
            gradient: 'from-purple-600 to-pink-600'
        },
        {
            icon: Zap,
            title: 'Instant Analysis',
            description: 'Real-time AI content screening and classification.',
            gradient: 'from-amber-600 to-orange-600'
        },
        {
            icon: TrendingUp,
            title: 'HD Streaming',
            description: 'Lightning-fast video delivery worldwide.',
            gradient: 'from-emerald-600 to-green-600'
        }
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Features Showcase */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse-slow" />
                    <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                </div>

                <div className="relative flex flex-col items-center justify-center p-16 text-white w-full">
                    {/* Main Heading */}
                    <div className="mb-16 text-center animate-slide-up">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-2xl border-2 border-white/30 mb-8 shadow-2xl">
                            <Award className="w-6 h-6 text-amber-300" />
                            <span className="font-black text-lg">Join 1000+ Creators</span>
                        </div>

                        <h1 className="text-6xl font-black mb-6 leading-tight">
                            Start Creating<br />
                            Amazing Content
                        </h1>
                        <p className="text-2xl text-white/90 font-medium max-w-xl mx-auto">
                            Get instant access to AI-powered video platform
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:bg-white/15 cursor-pointer animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative inline-block mb-6">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                                        <div className={`relative w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black mb-3">{benefit.title}</h3>
                                    <p className="text-white/80 font-medium leading-relaxed">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 flex items-center gap-8">
                        <div className="text-center">
                            <p className="text-5xl font-black mb-2">100%</p>
                            <p className="text-white/80 font-semibold">Free</p>
                        </div>
                        <div className="w-px h-16 bg-white/30" />
                        <div className="text-center">
                            <p className="text-5xl font-black mb-2">100MB</p>
                            <p className="text-white/80 font-semibold">Max Upload</p>
                        </div>
                        <div className="w-px h-16 bg-white/30" />
                        <div className="text-center">
                            <p className="text-5xl font-black mb-2">24/7</p>
                            <p className="text-white/80 font-semibold">Available</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden p-8">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl -top-32 -right-32 animate-pulse-slow" />
                    <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -bottom-32 -left-32 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                </div>

                <div className="relative max-w-md w-full space-y-8 animate-fade-in">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/10 hover:scale-110 transition-transform duration-300">
                                <Video className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h2 className="text-5xl font-black mb-3">
                            <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                                Create Account
                            </span>
                        </h2>
                        <p className="text-slate-300 text-lg font-medium">
                            Join thousands of content creators
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border-2 border-white/10 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-gradient-to-r from-rose-900/50 to-pink-900/50 backdrop-blur-sm border-2 border-rose-500/50 text-rose-100 px-5 py-4 rounded-2xl text-sm flex items-start gap-3 animate-slide-down">
                                    <span className="text-xl">⚠️</span>
                                    <span className="flex-1">{error}</span>
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-200 mb-3">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-200 mb-3">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-14 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                                        )}
                                    </button>
                                </div>
                                {password && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${passwordStrength === 'strong' ? 'bg-gradient-to-r from-emerald-500 to-green-500 w-full' :
                                                        passwordStrength === 'good' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4' :
                                                            passwordStrength === 'fair' ? 'bg-gradient-to-r from-amber-500 to-orange-500 w-1/2' :
                                                                'bg-gradient-to-r from-rose-500 to-red-500 w-1/4'
                                                    }`}
                                            />
                                        </div>
                                        <span className={`text-xs font-bold ${passwordStrength === 'strong' ? 'text-emerald-400' :
                                                passwordStrength === 'good' ? 'text-cyan-400' :
                                                    passwordStrength === 'fair' ? 'text-amber-400' :
                                                        'text-rose-400'
                                            }`}>
                                            {passwordStrength === 'strong' && <><CheckCircle2 className="w-3 h-3 inline" /> Strong</>}
                                            {passwordStrength === 'good' && 'Good'}
                                            {passwordStrength === 'fair' && 'Fair'}
                                            {passwordStrength === 'weak' && 'Weak'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-200 mb-3">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Shield className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-14 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-slate-400 hover:text-slate-200" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-[1.02] active:scale-95 transition-all duration-200 border-2 border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Sign in link */}
                        <p className="mt-8 text-center text-slate-300">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all">
                                Sign in →
                            </Link>
                        </p>
                    </div>

                    {/* Bottom Badge */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-slate-400">No credit card required</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
