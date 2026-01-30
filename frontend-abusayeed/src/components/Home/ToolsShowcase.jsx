"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { LuSparkles, LuLoader, LuZap, LuChevronLeft, LuChevronRight, LuCpu, LuImage, LuMaximize, LuSettings } from "react-icons/lu";

const ToolsShowcase = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    // State for interactions
    const [sliderPos, setSliderPos] = useState(50);
    const [creativity, setCreativity] = useState(75);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState("Upscaler");

    const containerRef = useRef(null);

    // Handle slider move
    const handleMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const position = (x / rect.width) * 100;
        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    const processAI = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setSliderPos(100);
        }, 1500);
    };

    const tabs = [
        { en: "Upscaler", bn: "আপস্কেলার" },
        { en: "Generator", bn: "জেনারেটর" },
        { en: "Editor", bn: "এডিটর" }
    ];

    return (
        <section className={`py-32 transition-colors duration-700 overflow-hidden ${isDark ? "bg-[#020202]" : "bg-[#f8fafc]"}`}>
            <div className="container mx-auto px-4 max-w-7xl">

                {/* 1. Dynamic Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.3em] mb-4"
                        >
                            <span className="w-8 h-[2px] bg-[#003ECB]" />
                            {language === 'bn' ? 'এআই স্টুডিও' : 'AI Neural Studio'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className={`text-4xl md:text-6xl font-heading font-normal tracking-tight leading-[1.05] ${isDark ? "text-white" : "text-slate-900"
                                } ${bengaliClass}`}
                        >
                            {language === 'bn'
                                ? 'ডিজাইনের ভবিষ্যৎ, এখন আপনার হাতে'
                                : 'Experience the future of design tools'}
                        </motion.h2>
                    </div>
                </div>

                {/* 2. Professional Borderless Dashboard */}
                <div className="relative group">
                    {/* Background Glows */}
                    <div className="absolute -inset-20 bg-[#003ECB]/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`relative flex flex-col lg:flex-row overflow-hidden rounded-md shadow-[0_30px_100px_rgba(0,0,0,0.2)] dark:shadow-none ${isDark ? "bg-[#080808]" : "bg-white"
                            }`}
                    >
                        {/* SIDEBAR UI */}
                        <div className={`w-full lg:w-[360px] p-10 flex flex-col gap-10 z-20 ${isDark ? "bg-[#0c0c0c]" : "bg-slate-50/50"
                            }`}>
                            {/* Controls Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[#003ECB] to-[#4884ff] flex items-center justify-center text-white shadow-xl">
                                        <LuCpu size={24} />
                                    </div>
                                    <div>
                                        <p className={`text-[11px] font-normal uppercase tracking-widest text-slate-500`}>Engine</p>
                                        <p className={`text-sm font-normal ${isDark ? "text-white" : "text-slate-900"}`}>Magnific v4.0</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tab Switcher */}
                            <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-md">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.en}
                                        onClick={() => setActiveTab(tab.en)}
                                        className={`flex-1 py-2.5 text-[10px] font-normal uppercase tracking-widest rounded-md transition-all ${activeTab === tab.en
                                                ? "bg-white dark:bg-white/10 text-[#003ECB] dark:text-white shadow-sm"
                                                : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                                            } ${bengaliClass}`}
                                    >
                                        {language === 'bn' ? tab.bn : tab.en}
                                    </button>
                                ))}
                            </div>

                            {/* Slider Control */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <LuMaximize size={14} />
                                        <span className="text-[10px] font-normal uppercase tracking-[0.2em]">Scale Intensity</span>
                                    </div>
                                    <span className="text-sm font-normal font-heading text-[#003ECB]">{creativity}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={creativity}
                                    onChange={(e) => setCreativity(e.target.value)}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-[#003ECB]"
                                />
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-slate-500">Neural Parameters</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`p-4 rounded-md flex flex-col gap-2 ${isDark ? "bg-white/5" : "bg-white shadow-sm"}`}>
                                        <LuImage className="text-[#003ECB]" />
                                        <p className="text-[9px] font-normal text-slate-500 uppercase">Textures</p>
                                        <p className={`text-xs font-normal ${isDark ? "text-white" : "text-slate-900"}`}>Hyper-Real</p>
                                    </div>
                                    <div className={`p-4 rounded-md flex flex-col gap-2 ${isDark ? "bg-white/5" : "bg-white shadow-sm"}`}>
                                        <LuSettings className="text-[#003ECB]" />
                                        <p className="text-[9px] font-normal text-slate-500 uppercase">Denoise</p>
                                        <p className={`text-xs font-normal ${isDark ? "text-white" : "text-slate-900"}`}>Active</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto">
                                <button
                                    onClick={processAI}
                                    disabled={isProcessing}
                                    className={`w-full py-5 rounded-md font-normal text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-4 ${isProcessing
                                            ? "bg-slate-200 dark:bg-white/5 text-slate-400"
                                            : "bg-[#003ECB] text-white hover:bg-[#002da3] shadow-[0_10px_30px_rgba(0,62,203,0.3)] active:scale-95"
                                        }`}
                                >
                                    {isProcessing ? <LuLoader className="animate-spin" size={18} /> : <span>Apply Enhancement</span>}
                                    {!isProcessing && <LuSparkles className="animate-pulse" size={16} />}
                                </button>
                                <p className="text-center text-[8px] font-normal text-slate-400 mt-6 tracking-[0.5em] uppercase">Render Engine 8.0</p>
                            </div>
                        </div>

                        {/* INTERACTIVE VIEWPORT */}
                        <div
                            ref={containerRef}
                            className={`flex-1 relative cursor-ew-resize select-none bg-black`}
                            onMouseMove={handleMove}
                            onMouseDown={handleMove}
                            onTouchMove={handleMove}
                        >
                            {/* AFTER (BOTTOM) */}
                            <div className="absolute inset-0">
                                <img
                                    src="/ai_showcase.png"
                                    alt="Enhanced Result"
                                    className="w-full h-full object-cover"
                                    style={{
                                        filter: `saturate(${1 + (creativity / 100)}) brightness(${1 + (creativity / 200)}) contrast(1.1) sharp(10px)`
                                    }}
                                />
                                <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3 z-30">
                                    <div className="px-6 py-2 bg-[#003ECB] text-white text-[11px] font-normal uppercase tracking-[0.2em] rounded-md shadow-2xl border border-white/20">AI 16x Enhanced</div>
                                </div>
                            </div>

                            {/* BEFORE (TOP LAYER) */}
                            <div
                                className="absolute inset-0 z-10 pointer-events-none transition-[clip-path] duration-75"
                                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                            >
                                <div className="w-full h-full relative overflow-hidden backdrop-grayscale">
                                    <img
                                        src="/ai_showcase.png"
                                        alt="Original Image"
                                        className="w-full h-full object-cover grayscale opacity-60 contrast-125 brightness-75 blur-[0.5px]"
                                    />
                                    <div className="absolute bottom-10 left-10 px-6 py-2 bg-black/40 backdrop-blur-xl text-white/70 text-[11px] font-normal uppercase tracking-[0.2em] rounded-md border border-white/10 shadow-2xl">
                                        Source: Raw Data
                                    </div>
                                </div>
                            </div>

                            {/* SLIDER LINE */}
                            <div
                                className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-opacity pointer-events-none"
                                style={{ left: `${sliderPos}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-[6px] border-[#003ECB] group-hover:scale-110 transition-transform">
                                    <div className="flex gap-1">
                                        <LuChevronLeft className="text-[#003ECB]" size={14} />
                                        <LuChevronRight className="text-[#003ECB]" size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Hint */}
                            <AnimatePresence>
                                {sliderPos > 40 && sliderPos < 60 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                                    >
                                        <div className="bg-black/60 backdrop-blur-xl px-8 py-4 rounded-md border border-white/10 text-white text-xs font-normal uppercase tracking-widest shadow-2xl">
                                            Slide to Compare
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* 3. Partner Logos */}
                <div className="mt-24 pt-16 border-t border-slate-200 dark:border-white/5 opacity-40">
                    <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 grayscale">
                        {["GOOGLE CLOUD", "NVIDIA AI", "OPENAI", "ANTHROPIC", "MIDJOURNEY"].map(brand => (
                            <span key={brand} className="text-sm font-normal tracking-[0.4em] uppercase">{brand}</span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ToolsShowcase;
