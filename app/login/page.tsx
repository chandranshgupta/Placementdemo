'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import api from '@/src/services/api';

export default function LoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ id: '', pass: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for Forgot Password View
    const [view, setView] = useState<'login' | 'forgot'>('login');
    const [recoveryId, setRecoveryId] = useState('');
    const [recoveryStatus, setRecoveryStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [recoveryMsg, setRecoveryMsg] = useState('');

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await api.loginUser(credentials) as any;
            if (response.success) {
                // Save token (mock)
                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('user_role', response.user.role);

                // Redirect based on role
                if (response.user.role === 'admin') {
                    router.push('/dashboard/admin');
                } else {
                    router.push('/dashboard/student');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRecoveryStatus('idle');
        setLoading(true);
        setRecoveryMsg('');

        try {
            const response = await api.forgotPassword(recoveryId) as any;
            if (response.success) {
                setRecoveryStatus('success');
                setRecoveryMsg(response.message);
            }
        } catch (err: any) {
            setRecoveryStatus('error');
            setRecoveryMsg(err.message || 'User ID not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('/Loginbackground.png')` }}
        >
            {/* Card Container - Glassmorphic */}
            <div className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/50 rounded-lg shadow-2xl overflow-hidden p-8 mx-4 animate-in fade-in zoom-in duration-500">

                {/* Header */}
                <div className="flex flex-col items-start mb-8">
                    {/* Logo Placeholder */}
                    <img src="/assets/img/NFSU_logo.png" alt="NFSU Logo" className="h-16 w-auto mb-4 object-contain" />

                    <h1
                        className="text-[#c02528] font-bold text-3xl tracking-wider"
                        style={{ fontFamily: 'Calibri, sans-serif' }}
                    >
                        {view === 'login' ? 'Login' : 'Recover Password'}
                    </h1>
                </div>

                {view === 'login' ? (
                    /* LOGIN FORM */
                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                        {/* User ID Input - Thick Red Border */}
                        <div>
                            <input
                                type="text"
                                placeholder="Roll / Enrollment No / EMP Code"
                                required
                                value={credentials.id}
                                onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                                className="w-full border-2 border-[#c02528] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c02528] focus:border-transparent transition-all placeholder-gray-500 text-gray-800 font-medium"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={credentials.pass}
                                onChange={(e) => setCredentials({ ...credentials, pass: e.target.value })}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c02528] focus:border-transparent transition-all placeholder-gray-400 text-gray-800 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-[#c02528] text-sm font-medium text-center bg-red-50/80 py-2 rounded border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#c02528] text-white font-bold py-3 rounded-md uppercase tracking-wide hover:bg-[#a01f22] active:scale-[0.98] transition-all duration-300 shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>

                        {/* Forgot Password Link - Moved Below Button */}
                        <div className="text-right mt-2">
                            <button
                                type="button"
                                onClick={() => setView('forgot')}
                                className="text-gray-600 hover:text-[#c02528] text-sm font-medium transition-colors underline-offset-2 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </form>
                ) : (
                    /* FORGOT PASSWORD FORM */
                    <form onSubmit={handleForgotSubmit} className="space-y-6">
                        <p className="text-gray-700 text-sm font-medium mb-4">
                            Enter Your Employee Code Or Student Enrollment/Roll Number to receive recovery instructions.
                        </p>

                        <div>
                            <input
                                type="text"
                                placeholder="Enter ID / Roll No"
                                required
                                value={recoveryId}
                                onChange={(e) => setRecoveryId(e.target.value)}
                                className="w-full border-2 border-[#c02528] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c02528] focus:border-transparent transition-all placeholder-gray-500 text-gray-800 font-medium"
                            />
                        </div>

                        {/* Status Messages */}
                        {recoveryStatus === 'error' && (
                            <div className="text-[#c02528] text-sm font-medium text-center bg-red-50/80 py-2 rounded border border-red-100">
                                {recoveryMsg}
                            </div>
                        )}
                        {recoveryStatus === 'success' && (
                            <div className="text-green-700 text-sm font-medium text-center bg-green-50/80 py-2 rounded border border-green-100">
                                {recoveryMsg}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || recoveryStatus === 'success'}
                            className="w-full bg-[#c02528] text-white font-bold py-3 rounded-md uppercase tracking-wide hover:bg-[#a01f22] active:scale-[0.98] transition-all duration-300 shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Processing...
                                </>
                            ) : (
                                "Send Recovery Email"
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setView('login');
                                    setRecoveryStatus('idle');
                                    setRecoveryMsg('');
                                }}
                                className="text-gray-600 hover:text-[#c02528] text-sm font-medium transition-colors"
                            >
                                &larr; Back to Login
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}
