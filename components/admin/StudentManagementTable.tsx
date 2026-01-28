'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, Filter, Download, FileText, MoreVertical,
    CheckCircle, XCircle, AlertCircle, Trash2, Edit2, ShieldCheck, UserCheck
} from 'lucide-react';
import api from '@/src/services/api';

// Define Student Interface matching our API
interface Student {
    id: string;
    name: string;
    rollNo: string;
    branch: string;
    cgpa: number;
    status: string;
    resume: string;
    backlogs: number;
}

export default function StudentManagementTable() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterBranch, setFilterBranch] = useState('All');
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getStudents();
                // Map the data to ensure it fits the interface if needed, 
                // but direct assignment works if mock matches
                setStudents(data as Student[]);
            } catch (error) {
                console.error("Failed to fetch students", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Derived Data
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || student.status === filterStatus;
        const matchesBranch = filterBranch === 'All' || student.branch === filterBranch;

        return matchesSearch && matchesStatus && matchesBranch;
    });

    const toggleSelection = (id: string) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedStudents.length === filteredStudents.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(filteredStudents.map(s => s.id));
        }
    };

    // --- Render Helpers ---

    // Status Badge
    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            Placed: "bg-green-100 text-green-700 border-green-200",
            Unplaced: "bg-gray-100 text-gray-700 border-gray-200",
            Blocked: "bg-red-100 text-red-700 border-red-200"
        };
        const activeStyle = styles[status as keyof typeof styles] || styles.Unplaced;

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeStyle}`}>
                {status}
            </span>
        );
    };

    // Branch Badge
    const BranchBadge = ({ branch }: { branch: string }) => {
        // Deterministic color assignment based on branch string length or other hash
        const colors = [
            "text-blue-600 bg-blue-50 border-blue-100",
            "text-purple-600 bg-purple-50 border-purple-100",
            "text-indigo-600 bg-indigo-50 border-indigo-100",
            "text-cyan-600 bg-cyan-50 border-cyan-100"
        ];
        const colorIndex = branch.length % colors.length;

        return (
            <span className={`px-2 py-1 rounded text-xs font-semibold border ${colors[colorIndex]}`}>
                {branch}
            </span>
        );
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading Student Data...</div>;
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Top Bar */}
            <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">

                {/* Search */}
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Name or Roll No..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#002147] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none cursor-pointer hover:border-gray-300"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Placed">Placed</option>
                            <option value="Unplaced">Unplaced</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>

                    {/* Branch Filter */}
                    <div className="relative">
                        <select
                            className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none cursor-pointer hover:border-gray-300"
                            value={filterBranch}
                            onChange={(e) => setFilterBranch(e.target.value)}
                        >
                            <option value="All">All Branches</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="Digital Forensics">Digital Forensics</option>
                            <option value="Homeland Security">Homeland Security</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>

                    {/* Export Button */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm">
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                            <th className="p-4 w-10 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                                    onChange={toggleAll}
                                    className="rounded border-gray-300 text-[#002147] focus:ring-0 cursor-pointer"
                                />
                            </th>
                            <th className="p-4">Student</th>
                            <th className="p-4">Branch</th>
                            <th className="p-4 text-center">CGPA</th>
                            <th className="p-4 text-center">Backlogs</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-center">Resume</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className={`border-b border-gray-50 hover:bg-gray-50/80 transition-colors group ${selectedStudents.includes(student.id) ? 'bg-blue-50/30' : ''}`}
                                >
                                    {/* Checkbox */}
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => toggleSelection(student.id)}
                                            className="rounded border-gray-300 text-[#002147] focus:ring-0 cursor-pointer"
                                        />
                                    </td>

                                    {/* Student Profile */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar Placeholder */}
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                                                {student.name.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{student.name}</div>
                                                <div className="text-xs text-gray-500 font-mono mt-0.5">{student.rollNo}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Branch */}
                                    <td className="p-4">
                                        <BranchBadge branch={student.branch} />
                                    </td>

                                    {/* CGPA */}
                                    <td className="p-4 text-center">
                                        <div className={`font-bold ${student.cgpa < 6.0 ? 'text-red-500' : 'text-gray-700'}`}>
                                            {student.cgpa}
                                        </div>
                                    </td>

                                    {/* Backlogs */}
                                    <td className="p-4 text-center">
                                        {student.backlogs > 0 ? (
                                            <span className="inline-flex items-center gap-1 text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded text-xs">
                                                <AlertCircle size={10} /> {student.backlogs}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>

                                    {/* Status */}
                                    <td className="p-4 text-center">
                                        <StatusBadge status={student.status} />
                                    </td>

                                    {/* Resume */}
                                    <td className="p-4 text-center">
                                        <button className="text-gray-400 hover:text-[#002147] transition-colors p-1" title="View Resume">
                                            <FileText size={18} />
                                        </button>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4 text-right">
                                        <div className="relative group/menu inline-block">
                                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                                <MoreVertical size={18} />
                                            </button>

                                            {/* Dropdown Menu (CSS Hover Based for simplicity, or use state for robust) */}
                                            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-20 hidden group-hover/menu:block">
                                                <div className="py-1">
                                                    <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                        <Edit2 size={12} /> Edit Profile
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-xs text-green-700 hover:bg-green-50 flex items-center gap-2">
                                                        <UserCheck size={12} /> Mark as Placed
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 text-xs text-red-700 hover:bg-red-50 flex items-center gap-2">
                                                        <Trash2 size={12} /> Delete User
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-gray-500">
                                    No students found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer (Static for UI Demo) */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <div>
                    Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
}
