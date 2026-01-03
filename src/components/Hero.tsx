import React from 'react';
import { Mail, Github, Linkedin, User as UserIcon, BookOpen, FileText, Newspaper, Building2, IdCard, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
    data: Record<string, string>;
    publicationStats?: {
        journals: number;
        conferences: number;
        books: number;
    };
    socialLinks?: {
        mail?: string;
        github?: string;
        linkedin?: string;
    };
}

export const Hero: React.FC<HeroProps> = ({ data, publicationStats, socialLinks }) => {
    const name = data['Full Name'] || 'Faculty Member';
    const designation = data['Designation'] || 'Designation';
    const dept = data['Department'] || '';
    const institution = data['Institution Name'];
    const employeeId = data['Employee ID'];
    const officialEmail = data['Official Email'];
    const phone = data['Phone Number'];
    const ensureProtocol = (link: string) => {
        if (!link || link === '#') return '#';
        if (link.startsWith('http://') || link.startsWith('https://')) return link;
        return `https://${link}`;
    };

    // For hrefs
    const githubLink = ensureProtocol(socialLinks?.github || '#');
    const linkedinLink = ensureProtocol(socialLinks?.linkedin || '#');

    const getPhotoUrl = (url: string) => {
        if (!url) return '';

        // Handle various Google Drive URL formats
        if (url.includes('drive.google.com')) {
            let id = '';
            // Match /d/ID or /file/d/ID
            const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
            // Match id=ID
            const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);

            if (dMatch && dMatch[1]) id = dMatch[1];
            else if (idMatch && idMatch[1]) id = idMatch[1];

            if (id) {
                // This is the most reliable "hotlink" format for Google Drive photos
                return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
            }
        }
        return url;
    };

    const photo = getPhotoUrl(data['Profile Photo Link']);

    return (
        <section id="basicInfo" className="min-h-screen relative flex flex-col md:flex-row items-center overflow-hidden bg-[#ecfdf5]">
            {/* Theme Background Shape - The 'Curve' */}
            <div className="absolute top-0 left-0 w-full md:w-[45%] h-full bg-[#d1fae5] rounded-br-[100px] md:rounded-br-[200px] z-0"></div>

            {/* Decorative Outline Circles */}
            <div className="absolute top-20 left-20 w-64 h-64 border border-white/40 rounded-full z-0 pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 border border-[#a7f3d0] rounded-full z-0 pointer-events-none opacity-50"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Content Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col space-y-8 md:pr-10"
                >
                    {/* Greeting */}
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-medium text-slate-600 tracking-wide"
                    >
                        Hello, I'm
                    </motion.h3>

                    {/* Name - Single Line */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight truncate text-[#064e3b]"
                    >
                        {name}
                    </motion.h1>

                    {/* Designation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                    >
                        <p className="text-xl md:text-2xl font-bold text-slate-700">
                            {designation}
                        </p>
                        <p className="text-lg text-slate-500 font-medium font-serif italic">
                            {dept}
                        </p>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.52 }}
                        className="space-y-3 text-slate-600 font-medium text-15 md:text-base mt-4"
                    >
                        {institution && (
                            <div className="flex items-center gap-3">
                                <Building2 size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">{institution}</span>
                            </div>
                        )}
                        {employeeId && (
                            <div className="flex items-center gap-3">
                                <IdCard size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">ID: {employeeId}</span>
                            </div>
                        )}
                        {officialEmail && (
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">{officialEmail}</span>
                            </div>
                        )}
                        {phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">{phone}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4"
                    >
                        {[
                            { icon: <Mail size={20} />, href: '#contact', color: 'bg-[#10b981]' },
                            { icon: <Github size={20} />, href: githubLink, color: 'bg-slate-700' },
                            { icon: <Linkedin size={20} />, href: linkedinLink, color: 'bg-[#059669]' }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target={social.href.startsWith('http') ? "_blank" : undefined}
                                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="group relative w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:border-transparent hover:-translate-y-1 overflow-hidden"
                            >
                                <div className={`absolute inset-0 ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                <span className="relative z-10">{social.icon}</span>
                            </a>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        href="#contact"
                        className="btn-premium px-8 py-4 rounded-full text-white font-bold text-lg w-fit shadow-md hover:shadow-lg bg-[#10b981]"
                    >
                        Let's Connect
                    </motion.a>
                </motion.div>

                {/* Right Column - Workstation Setup */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex justify-center md:self-center md:justify-end relative w-full"
                >
                    <div className="relative w-full max-w-[600px] h-[400px] flex items-end justify-center">

                        {/* The User - Sitting next to monitor (Profile Photo) */}
                        <div className="absolute left-0 bottom-0 z-20 transform translate-x-4 md:translate-x-0">
                            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-white">
                                {photo ? (
                                    <img
                                        src={photo}
                                        alt={name}
                                        className="w-full h-full object-cover object-center"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-500">
                                        <UserIcon size={48} className="opacity-50" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Computer Monitor with Stats */}
                        <div className="relative z-10 transform translate-x-10 md:translate-x-20 -translate-y-12">
                            <div className="relative mx-auto border-slate-800 bg-slate-800 border-[8px] rounded-t-xl h-[220px] w-[320px] md:h-[260px] md:w-[420px] shadow-2xl">
                                {/* Screen Content - Stats Dashboard */}
                                <div className="rounded-lg overflow-hidden h-full w-full bg-slate-900 relative p-4 flex flex-col justify-center">
                                    {/* Code Editor Look Header */}
                                    <div className="absolute top-0 left-0 w-full h-6 bg-slate-800 flex items-center px-4 gap-1.5 border-b border-white/10">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                    </div>

                                    {/* Stats Grid */}
                                    {publicationStats && (
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            {publicationStats.journals > 0 && (
                                                <div className="bg-[#ecfdf5] p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center text-white mb-1">
                                                        <FileText size={16} />
                                                    </div>
                                                    <p className="text-2xl font-black text-slate-800 leading-none">{publicationStats.journals}</p>
                                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Journals</p>
                                                </div>
                                            )}
                                            {publicationStats.conferences > 0 && (
                                                <div className="bg-[#ecfdf5] p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white mb-1">
                                                        <Newspaper size={16} />
                                                    </div>
                                                    <p className="text-2xl font-black text-slate-800 leading-none">{publicationStats.conferences}</p>
                                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Conferences</p>
                                                </div>
                                            )}
                                            {/* Render Books full width if odd number or just 3rd item */}
                                            {publicationStats.books > 0 && (
                                                <div className={`bg-[#ecfdf5] p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1 shadow-sm ${publicationStats.journals > 0 && publicationStats.conferences > 0 ? 'col-span-2' : ''}`}>
                                                    <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center text-white mb-1">
                                                        <BookOpen size={16} />
                                                    </div>
                                                    <p className="text-2xl font-black text-slate-800 leading-none">{publicationStats.books}</p>
                                                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Books</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Monitor Stand */}
                            <div className="relative mx-auto bg-slate-800 rounded-b-xl h-[20px] max-w-[320px] md:h-[24px] md:max-w-[420px]"></div>
                            <div className="relative mx-auto bg-slate-700 h-[40px] w-[80px] md:h-[50px] md:w-[100px] -mt-1 rounded-b-lg shadow-lg" style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }}></div>
                            <div className="relative mx-auto bg-slate-800 h-[8px] w-[120px] md:h-[10px] md:w-[160px] rounded-full shadow-xl"></div>
                        </div>

                        {/* Desk Surface Simulation */}
                        <div className="absolute bottom-0 w-[120%] h-4 bg-slate-200 rounded-full blur-sm opacity-50 -z-10"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
