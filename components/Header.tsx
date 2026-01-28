import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ChevronDown } from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full font-sans z-50 relative">

            {/* --- LEVEL 1: Thin Top Utility Bar --- */}
            <div className="bg-[#002147] text-white h-[45px] flex items-center justify-between px-4 lg:px-16 text-xs lg:text-sm">

                {/* Left Side: Contact Info */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
                        <Mail size={14} />
                        <span>rajesh.c@nfsu.ac.in</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <div className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
                        <Phone size={14} />
                        <span>+91 948 151 5684</span>
                    </div>
                </div>

                {/* Right Side: Navigation & Login */}
                <div className="hidden md:flex items-center gap-6 font-semibold tracking-wide">
                    <a href="https://dharwad.nfsu.ac.in/" className="hover:text-gray-300 transition-colors">HOME</a>

                    {/* Drpdown for About Us */}
                    <div className="relative group flex items-center h-full cursor-pointer">
                        <span className="flex items-center gap-1 hover:text-gray-300 transition-colors py-2">
                            ABOUT US <ChevronDown size={14} />
                        </span>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-0 w-64 bg-white text-gray-800 shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden border-t-2 border-[#bf9000]">
                            <ul className="flex flex-col text-sm font-normal">
                                <li><a href="https://dharwad.nfsu.ac.in/about/about_campus" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors">About Campus / Institute Profile</a></li>
                                <li><a href="https://dharwad.nfsu.ac.in/c_director" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors">Campus Director</a></li>
                                <li><a href="https://dharwad.nfsu.ac.in/facility" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors">Infrastructure / Facilities</a></li>
                                <li><a href="https://beta.nfsu.ac.in/Uploads/Brochure/NFSU%20Dharwad_Brochure.pdf" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors">Brochure</a></li>
                                <li><a href="https://dharwad.nfsu.ac.in/message" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-100 transition-colors">Message from Campus Director</a></li>
                                <li><a href="https://dharwad.nfsu.ac.in/contact" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-gray-100 transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    <a href="https://dharwad.nfsu.ac.in/department/list/9" className="hover:text-gray-300 transition-colors">SCHOOLS</a>

                    {/* Login Button (Pill Shaped) */}
                    <Link href="/login" className="bg-white text-[#002147] px-5 py-1 rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-200 shadow-sm flex items-center justify-center">
                        LOGIN
                    </Link>
                </div>
            </div>

            {/* --- LEVEL 2: Main Brand/Logo Bar --- */}
            <div className="bg-white shadow-md py-3 px-4 lg:px-16 flex items-center justify-between">
                {/* Logo & Brand Text */}
                <a className="flex items-center gap-3" href="https://dharwad.nfsu.ac.in">
                    <img
                        src="/assets/img/NFSU_logo.png"
                        className="h-12 w-auto object-contain"
                        alt="NFSU Logo"
                    />
                    <div className="flex flex-col justify-center">
                        <span className="text-[#bf9000] font-bold text-xl leading-none tracking-widest">NFSU</span>
                        <span className="text-[#002147] font-bold text-lg leading-tight tracking-wide">DHARWAD CAMPUS</span>
                    </div>
                </a>

                {/* Right Side: Additional Utilities */}
                <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide text-[#002147]">
                    <a href="https://nfsu.ac.in/career" target="_blank" rel="noopener noreferrer" className="hover:text-[#bf9000] transition-colors uppercase">Career</a>
                    <a href="#" className="hover:text-[#bf9000] transition-colors uppercase">Training</a>
                    <a href="https://login.nfsu.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#bf9000] transition-colors uppercase">Results</a>
                </div>
            </div>

        </header>
    );
};

export default Header;
