"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

const CategoryShowcase = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const categories = [
        {
            id: 0,
            en: "Graphic Design",
            bn: "গ্রাফিক ডিজাইন",
            image: "/cat_graphic.png",
            color: "from-purple-600/20 to-blue-600/20"
        },
        {
            id: 1,
            en: "UI/UX Design",
            bn: "ইউআই/ইউএক্স ডিজাইন",
            image: "/cat_uiux.png",
            color: "from-teal-600/20 to-emerald-600/20"
        },
        {
            id: 2,
            en: "Premium Templates",
            bn: "প্রিমিয়াম টেমপ্লেট",
            image: "/cat_templates.png",
            color: "from-orange-600/20 to-red-600/20"
        },
        {
            id: 3,
            en: "Content Creation",
            bn: "কন্টেন্ট ক্রিয়েশন",
            image: "/cat_content.png",
            color: "from-pink-600/20 to-rose-600/20"
        }
    ];

    return (
        <section className={`py-24 transition-colors duration-500 overflow-hidden ${isDark ? "bg-[#020202]" : "bg-[#f8fafc]"}`}>
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-3xl md:text-4xl font-heading font-normal tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            {language === 'bn'
                                ? 'আপনার পেশাদার দক্ষতাকে আরও বাড়িয়ে তুলুন'
                                : 'Boost your professional workflow and productivity'}
                        </motion.h2>
                    </div>
                </div>

                {/* Categories Cards Container */}
                <div
                    className="flex flex-col md:flex-row gap-8 min-h-[400px] w-full items-stretch"
                    onMouseLeave={() => setHoveredIdx(null)}
                >
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.id}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            initial={false}
                            animate={{
                                flex: hoveredIdx === null ? 1 : hoveredIdx === idx ? 2.5 : 0.8,
                            }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative overflow-hidden rounded-md cursor-pointer group transition-all duration-500 ${hoveredIdx === idx ? "opacity-100" : hoveredIdx === null ? "opacity-100" : "opacity-60 grayscale"
                                }`}
                        >
                            {/* Card Background Image */}
                            <img
                                src={cat.image}
                                alt={cat.en}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 transition-opacity duration-500 ${hoveredIdx === idx ? "opacity-100" : "opacity-60"
                                }`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <motion.div
                                    animate={{ opacity: hoveredIdx === idx ? 1 : 0.6 }}
                                    className="flex items-center gap-3"
                                >
                                    <h3 className={`text-lg md:text-xl font-normal text-white drop-shadow-lg`}>
                                        {language === 'bn' ? cat.bn : cat.en}
                                    </h3>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: hoveredIdx === idx ? 1 : 0,
                                        y: hoveredIdx === idx ? 0 : 20
                                    }}
                                    className="mt-auto"
                                >
                                    <button className="flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-md text-white text-xs font-normal border border-white/20 hover:bg-white hover:text-black transition-all">
                                        <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Category'}</span>
                                        <LuArrowRight size={14} />
                                    </button>
                                </motion.div>
                            </div>

                            {/* Border Highlight (Only on Hovered) */}
                            {hoveredIdx === idx && (
                                <motion.div
                                    layoutId="category-border"
                                    className="absolute inset-0 border-2 border-white/30 rounded-md z-20 pointer-events-none"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CategoryShowcase;
