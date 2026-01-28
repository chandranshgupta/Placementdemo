'use client';

import React from 'react';
import StudentManagementTable from '@/components/admin/StudentManagementTable';
import { LayoutDashboard, Users, Briefcase, BarChart3, Settings, LogOut, Bell } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">

            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-[#002147] text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <img src="/assets/img/NFSU_logo.png" alt="Logo" className="w-8 h-8 object-contain bg-white rounded-full p-0.5" />
                    <div>
                        <h1 className="font-bold text-lg tracking-wide">ADMIN PORTAL</h1>
                        <p className="text-xs text-gray-400">NFSU Placement Cell</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {/* Active State Example */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#ddb55e] text-[#002147] rounded-lg font-bold shadow-lg cursor-pointer">
                        <Users size={20} />
                        <span>Student Master DB</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer">
                        <Briefcase size={20} />
                        <span>Recruiter Inbox</span>
                        <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer">
                        <LayoutDashboard size={20} />
                        <span>Drive Manager</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer">
                        <BarChart3 size={20} />
                        <span>Analytics Center</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors cursor-pointer">
                        <Settings size={20} />
                        <span>Settings</span>
                    </div>
                    <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-lg transition-colors cursor-pointer">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col min-w-0">

                {/* Top Header Mobile/Desktop */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-10">
                    {/* Breadcrumbs / Page Title */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Student Database</h2>
                        <p className="text-xs text-gray-500">Manage student profiles, verification, and placement status.</p>
                    </div>

                    {/* Right Utilities */}
                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-500 hover:text-[#002147] transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800">Administrator</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
                                <img src="/p2.png" alt="Admin" className="w-full h-full object-cover" />
                                {/* Placeholder image using p2.png as admin avatar for now */}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
                    {/* Stats Ticker (Mini) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Total Students", value: "3,200" },
                            { label: "Placed", value: "1,150", text: "text-green-600" },
                            { label: "Unplaced", value: "2,050", text: "text-orange-500" },
                            { label: "Avg CTC", value: "₹ 12.5 LPA", text: "text-[#002147]" }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.label}</p>
                                <p className={`text-2xl font-bold mt-1 ${stat.text || 'text-gray-800'}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Table Component */}
                    <StudentManagementTable />
                </div>
            </main>
        </div>
    );
}
