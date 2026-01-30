"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDesignTemplates } from "@/redux/designTemplateSlice";
import { LuArrowUpRight, LuLayers, LuDownload, LuCrown, LuZap, LuLayoutPanelLeft } from "react-icons/lu";

const PopularDesign = () => {
    const dispatch = useDispatch();
    const { items: templates = [], loading } = useSelector((state) => state.designTemplates);
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    useEffect(() => {
        dispatch(fetchDesignTemplates({ limit: 6 }));
    }, [dispatch]);

    return (
        <section className={`py-32 transition-colors duration-700 overflow-hidden relative ${isDark ? "bg-[#020202]" : "bg-[#f8fafc]"}`}>

            {/* Background Aesthetic Elements */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none opacity-20 ${isDark ? "bg-blue-900/40" : "bg-blue-100"}`} />
            <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none opacity-20 ${isDark ? "bg-purple-900/40" : "bg-purple-100"}`} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Header Information */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-[#003ECB] font-normal text-[10px] uppercase tracking-[0.4em] mb-5"
                        >
                            <span className="w-12 h-[1px] bg-[#003ECB]" />
                            {language === 'bn' ? 'এক্সক্লুসিভ ডিজাইন' : 'Exclusive Design Sets'}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className={`text-4xl md:text-5xl lg:text-6xl font-heading font-normal tracking-tight leading-[1.1] ${isDark ? "text-white" : "text-slate-900"
                                } ${bengaliClass}`}
                        >
                            {language === 'bn'
                                ? 'আপনার প্রজেক্টের জন্য প্রিমিয়াম এসেটস'
                                : 'Premium digital assets meticulously crafted'}
                        </motion.h2>
                    </div>

                    <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-[0.2em] text-slate-500 hover:text-[#003ECB] transition-colors py-2 border-b border-transparent hover:border-[#003ECB]"
                    >
                        <span>{language === 'bn' ? 'সবগুলো দেখুন' : 'Explore Market'}</span>
                        <LuArrowUpRight size={14} />
                    </motion.button>
                </div>

                {/* Designs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className={`animate-pulse rounded-md aspect-[16/10] ${isDark ? "bg-white/5" : "bg-slate-100"}`} />
                        ))
                    ) : (
                        templates.slice(0, 6).map((item, idx) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="group"
                            >
                                <div className={`relative h-full flex flex-col transition-all duration-700 bg-transparent rounded-md`}>

                                    {/* Image Container with Floating Effect */}
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100 dark:bg-zinc-900 shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700">
                                        <img
                                            src={item.images?.[0] || "/cat_graphic.png"}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:rotate-1"
                                        />

                                        {/* Premium Badge */}
                                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                            <div className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                                                <LuCrown size={10} className="text-amber-400" />
                                                <span className="text-[8px] font-normal text-white uppercase tracking-widest">Premium</span>
                                            </div>
                                        </div>

                                        {/* Dynamic HUD on Hover */}
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center gap-6">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-2xl"
                                            >
                                                <LuDownload size={20} />
                                            </motion.button>
                                            <p className="text-[9px] font-normal text-white uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all delay-200">Instant Download</p>
                                        </div>

                                        {/* Hover Tool Icons */}
                                        <div className="absolute bottom-4 left-4 z-20 flex gap-2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                            <div className="w-8 h-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-md flex items-center justify-center text-white/70">
                                                <LuZap size={14} />
                                            </div>
                                            <div className="w-8 h-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-md flex items-center justify-center text-white/70">
                                                <LuLayoutPanelLeft size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area - Cleaner Spacing */}
                                    <div className="mt-6 px-1 flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-[1px] bg-[#003ECB]" />
                                            <p className="text-[9px] text-[#003ECB] font-normal uppercase tracking-[0.2em]">Universal Kit</p>
                                        </div>

                                        <h4 className={`text-lg font-normal leading-tight transition-colors group-hover:text-[#003ECB] ${isDark ? "text-white" : "text-slate-900"} ${bengaliClass}`}>
                                            {language === 'bn' ? (item.titleBn || item.title) : item.title}
                                        </h4>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <LuLayers size={14} className="group-hover:text-[#003ECB] transition-colors" />
                                                <span className="text-[10px] uppercase font-normal tracking-wide">48+ Components</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-[10px] text-slate-400 line-through font-normal">$29</span>
                                                <span className="text-sm font-normal text-[#003ECB]">FREE</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
};

export default PopularDesign;
