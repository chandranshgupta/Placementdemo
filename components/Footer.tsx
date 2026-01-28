'use client';

import React from 'react';
import { MapPin, Mail, Phone, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { footerLinks, contactInfo } from '@/src/services/api';

export default function Footer() {
    return (
        <footer className="w-full bg-[#002147] text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Academics */}
                    <div>
                        <h4 className="text-[#ddb55e] font-bold uppercase tracking-wider mb-6 text-sm">
                            ACADEMICS
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.academics.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.link}
                                        className="text-gray-300 hover:text-[#ddb55e] transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Campus Life */}
                    <div>
                        <h4 className="text-[#ddb55e] font-bold uppercase tracking-wider mb-6 text-sm">
                            OUR CAMPUS & LIFE
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.campusLife.map((link, idx) => (
                                <li key={idx}>
                                    <a
                                        href={link.link}
                                        className="text-gray-300 hover:text-[#ddb55e] transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Requests & Quick Links */}
                    <div>
                        {/* Requests */}
                        <div className="mb-8">
                            <h4 className="text-[#ddb55e] font-bold uppercase tracking-wider mb-6 text-sm">
                                REQUESTS
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.requests.map((link, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={link.link}
                                            className="text-gray-300 hover:text-[#ddb55e] transition-colors duration-200 text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-[#ddb55e] font-bold uppercase tracking-wider mb-6 text-sm">
                                QUICK LINKS
                            </h4>
                            <ul className="space-y-3">
                                {footerLinks.quickLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={link.link}
                                            className="text-gray-300 hover:text-[#ddb55e] transition-colors duration-200 text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Address & Contact */}
                    <div>
                        <h4 className="text-[#ddb55e] font-bold uppercase tracking-wider mb-6 text-sm">
                            ADDRESS
                        </h4>
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start">
                                <div className="w-8 h-8 flex-shrink-0 bg-[#ddb55e] text-[#002147] flex items-center justify-center rounded mr-4">
                                    <MapPin size={16} />
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {contactInfo.address}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="flex items-center">
                                <div className="w-8 h-8 flex-shrink-0 bg-[#ddb55e] text-[#002147] flex items-center justify-center rounded mr-4">
                                    <Mail size={16} />
                                </div>
                                <a href={`mailto:${contactInfo.email}`} className="text-gray-300 text-sm hover:text-white transition-colors">
                                    {contactInfo.email}
                                </a>
                            </div>

                            {/* Phones */}
                            <div className="flex items-start">
                                <div className="w-8 h-8 flex-shrink-0 bg-[#ddb55e] text-[#002147] flex items-center justify-center rounded mr-4">
                                    <Phone size={16} />
                                </div>
                                <div className="flex flex-col">
                                    {contactInfo.phones.map((phone, idx) => (
                                        <a key={idx} href={`tel:${phone}`} className="text-gray-300 text-sm hover:text-white transition-colors">
                                            {phone}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        ©2026 - All Rights Reserved. | <span className="text-white">National Forensic Sciences University</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {[Facebook, Linkedin, Twitter, Instagram].map((Icon, idx) => (
                            <a key={idx} href="#" className="hover:text-[#ddb55e] transition-colors duration-300">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
