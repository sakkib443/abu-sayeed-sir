"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LuArrowRight, LuX } from "react-icons/lu";

const Hero = () => {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [showRibbon, setShowRibbon] = useState(true);
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    // Image assets
    const assets = {
        eye: "/hero_eye.png",
        bag: "/hero_bag.png",
        headphones: "/hero_headphones.png",
        portrait: "/hero_portrait.png"
    };

    // Animation Variants for Floating (Freepik Style)
    const floatingAnimation = (delay = 0, duration = 4) => ({
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }
        }
    });

    return (
        <section className={`relative min-h-screen flex flex-col items-center pt-12 md:pt-16 pb-40 px-4 overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#020202] text-white" : "bg-[#f8fafc] text-slate-900"
            }`}>

            {/* Background Decorative elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.08] ${isDark ? "bg-[#003ECB]" : "bg-[#003ECB]/40"}`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.05] ${isDark ? "bg-[#D4AF37]" : "bg-[#D4AF37]/30"}`} />
                {/* Background Grain/Noise Effect */}
                <div className={`absolute inset-0 opacity-[0.03] z-0 ${isDark ? "bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" : "bg-black/[0.02]"}`} />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center text-center">

                {/* 1. Pill Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`mb-8 flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] md:text-xs font-bold tracking-tight ${isDark ? "bg-white/10 border-white/10" : "bg-white border-black/5 shadow-sm"
                        }`}
                >
                    <span className="px-1.5 py-0.5 rounded-md bg-[#003ECB] text-white text-[8px] uppercase">New</span>
                    <span className={isDark ? "text-white" : "text-slate-600"}>
                        {language === 'bn' ? 'স্পেস পরিচিতি' : 'Introducing Spaces'}
                    </span>
                    <LuArrowRight className="ml-1 opacity-50" size={12} />
                </motion.div>

                {/* 2. Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={`text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.1] mb-5 max-w-4xl ${isDark ? "text-white" : "text-slate-900"
                        } ${bengaliClass}`}
                >
                    {language === 'bn'
                        ? 'সৃজনশীল কাজ, নতুনভাবে কল্পনায়'
                        : 'Creative work, reimagined'}
                </motion.h1>

                {/* 3. Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`text-sm md:text-base max-w-2xl mb-6 leading-relaxed font-body ${isDark ? "text-gray-400" : "text-slate-500"
                        } ${bengaliClass}`}
                >
                    {language === 'bn'
                        ? 'এক স্থানে সেরা ডিজাইন রিসোর্স, প্রিমিয়াম টুলস এবং ২০ বছরের অভিজ্ঞ প্রশিক্ষকের মেন্টরশিপ—বিশ্বাস করেন লক্ষাধিক সৃজনশীল মানুষ।'
                        : 'One suite: top design resources, professional training tools, and expert mentorship—trusted by 700,000+ creatives.'}
                </motion.p>

                {/* 4. CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8"
                >
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#003ECB] text-white font-bold rounded-full hover:bg-[#002da3] hover:shadow-2xl hover:shadow-[#003ECB]/30 hover:-translate-y-0.5 transition-all"
                    >
                        {language === 'bn' ? 'ফ্রি শুরু করুন' : 'Get started for free'}
                        <LuArrowRight className="text-lg" />
                    </Link>
                </motion.div>

                {/* 5. Modern Image Collage (Animated) */}
                <div className="w-full relative h-[400px] md:h-[500px] flex items-center justify-center -mt-4">

                    {/* Central Image (The Eye) - Gentle Slow Float */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -10, 0]
                        }}
                        transition={{
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 1.2, delay: 0.4 },
                            scale: { duration: 1.2, delay: 0.4 }
                        }}
                        className={`absolute w-[80%] md:w-[680px] aspect-video z-20 rounded-[2rem] overflow-hidden ${isDark ? "shadow-[0_40px_100px_rgba(0,0,0,0.8)]" : "shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
                            }`}
                    >
                        <video
                            src="/images/ai video.webm"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </motion.div>

                    {/* Top-Left Image (Bag) - Floating Up/Down */}
                    <motion.div
                        initial={{ opacity: 0, x: -60, y: -40 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: [0, -20, 0]
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                            opacity: { duration: 1.2, delay: 0.6 },
                            x: { duration: 1.2, delay: 0.6 }
                        }}
                        className={`absolute left-[0%] md:left-[2%] top-0 md:top-[-40px] w-[30%] md:w-[320px] aspect-[4/3] z-10 rounded-[1.5rem] overflow-hidden ${isDark ? "shadow-2xl opacity-80" : "shadow-xl"
                            }`}
                    >
                        <img
                            src={assets.bag}
                            alt="Design Object"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Bottom-Left Image (Headphones) - Faster Floating */}
                    <motion.div
                        initial={{ opacity: 0, x: -40, y: 60 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: [0, -15, 0]
                        }}
                        transition={{
                            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
                            opacity: { duration: 1.2, delay: 0.8 },
                            x: { duration: 1.2, delay: 0.8 }
                        }}
                        className={`absolute left-[4%] md:left-[8%] bottom-[-20px] md:bottom-[40px] w-[20%] md:w-[180px] aspect-square z-30 rounded-[1.5rem] overflow-hidden ${isDark ? "shadow-2xl" : "shadow-xl"
                            }`}
                    >
                        <img
                            src={assets.headphones}
                            alt="Creative Lifestyle"
                            className="w-full h-full object-cover"
                        />
                        {/* Audio wavelength dummy overlay */}
                        <div className="absolute bottom-4 left-4 right-4 h-4 flex gap-1 items-end opacity-60">
                            {[40, 70, 45, 90, 65, 30].map((h, i) => (
                                <div key={i} className={`flex-1 rounded-full ${isDark ? "bg-white" : "bg-slate-700"}`} style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right-Side Image (Portrait) - Staggered Float */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: [0, -25, 0]
                        }}
                        transition={{
                            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                            opacity: { duration: 1.2, delay: 0.7 },
                            x: { duration: 1.2, delay: 0.7 }
                        }}
                        className={`absolute right-[-10%] md:right-[-5%] top-[-20px] md:top-[20px] w-[25%] md:w-[280px] aspect-[3/4] z-10 rounded-[2rem] overflow-hidden ${isDark ? "shadow-2xl" : "shadow-xl"
                            }`}
                    >
                        <img
                            src={assets.portrait}
                            alt="Professional Retouching"
                            className="w-full h-full object-cover"
                        />
                        {/* Divider for split effect */}
                        <div className={`absolute top-0 bottom-0 left-1/2 w-[1px] z-10 ${isDark ? "bg-white/30" : "bg-black/10"}`} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border scale-75 ${isDark ? "bg-white/20 border-white/20" : "bg-white/80 border-black/10 shadow-lg"
                                }`}>
                                <LuArrowRight className={`rotate-180 ${isDark ? "text-white" : "text-slate-800"}`} size={14} />
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>

            {/* Bottom Language Banner (Mimicking Freepik) */}
            <AnimatePresence>
                {showRibbon && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-xl"
                    >
                        <div className={`border rounded-2xl py-3 px-5 flex items-center justify-between shadow-2xl backdrop-blur-xl ${isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-black/5"
                            }`}>
                            <p className={`text-[11px] md:text-xs ${isDark ? "text-gray-300" : "text-slate-600"} ${bengaliClass}`}>
                                {language === 'bn'
                                    ? 'আবু সাঈদ আপনার ভাষাতেও কথা বলে'
                                    : 'Abu Sayeed speaks your language too'}
                            </p>
                            <div className="flex items-center gap-4">
                                <button className={`px-3 py-1 text-[10px] md:text-xs font-bold rounded-lg transition-colors ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-[#003ECB] text-white hover:bg-[#002da3]"
                                    }`}>
                                    {language === 'bn' ? 'সক্রিয় করুন' : 'Activate now'}
                                </button>
                                <button
                                    onClick={() => setShowRibbon(false)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <LuX size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default Hero;
