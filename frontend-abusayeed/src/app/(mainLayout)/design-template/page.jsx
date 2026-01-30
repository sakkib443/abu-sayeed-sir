"use client";
import { API_URL } from '@/config/api';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    LuPalette,
    LuSearch,
    LuGrid3X3,
    LuChevronDown,
    LuLayoutGrid,
    LuFilter
} from "react-icons/lu";
import ProductCard from "@/components/sheard/ProductCard";
import { useLanguage } from "@/context/LanguageContext";

const DesignTemplatePage = () => {
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [templates, setTemplates] = useState([]);
    const [categories, setCategories] = useState([]);

    // Fetch design templates from API
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/design-templates?limit=50`);
                const data = await res.json();
                if (data.success) {
                    setTemplates(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCats = async () => {
            try {
                const res = await fetch(`${API_URL}/categories?type=design-template`);
                const data = await res.json();
                if (data.success && data.data) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchTemplates();
        fetchCats();
    }, []);

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = (template.title || template.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" ||
            template.category?._id === selectedCategory ||
            template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-[#020202]">
            {/* Minimal Header Inspired by Dribbble/Pinterest */}
            <header className="pt-32 pb-12 border-b border-slate-100 dark:border-white/5 bg-white dark:bg-[#020202]">
                <div className="container mx-auto px-4 max-w-7xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className={`text-4xl md:text-5xl font-heading font-normal tracking-tight mb-4 text-slate-900 dark:text-white ${bengaliClass}`}>
                            {language === 'bn' ? 'গ্রাফিক টেম্পলেট' : 'Graphic Template'}
                        </h1>
                        <p className={`text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed ${bengaliClass}`}>
                            {language === 'bn'
                                ? '১৪৪টি অনুপ্রেরণামূলক ডিজাইন, ইলাস্ট্রেশন এবং গ্রাফিক এলিমেন্ট বিশ্বের সেরা ডিজাইনারদের থেকে।'
                                : '144 inspirational designs, illustrations, and graphic elements from the world\'s best designers.'}
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Filter & Search Bar */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#020202]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 py-4">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Category Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide no-scrollbar w-full md:w-auto">
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`whitespace-nowrap px-4 py-2 rounded-md text-[11px] font-normal transition-all ${selectedCategory === "all"
                                        ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
                                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                {language === 'bn' ? 'সবগুলো' : 'All Templates'}
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat._id}
                                    onClick={() => setSelectedCategory(cat._id)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-md text-[11px] font-normal transition-all ${selectedCategory === cat._id
                                            ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
                                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                >
                                    {language === 'bn' ? (cat.nameBn || cat.name) : cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-64 group">
                            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={language === 'bn' ? 'সার্চ করুন...' : 'Search designs...'}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-transparent rounded-md text-[11px] outline-none focus:bg-white dark:focus:bg-white/10 focus:border-slate-200 dark:focus:border-white/10 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid - 4 Columns Desktop */}
            <main className="py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="animate-pulse bg-slate-50 dark:bg-white/5 rounded-md aspect-[16/10]"></div>
                                    <div className="h-3 bg-slate-50 dark:bg-white/5 rounded w-1/2 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredTemplates.length === 0 ? (
                        <div className="text-center py-32">
                            <LuPalette className="mx-auto text-slate-200 mb-6" size={48} />
                            <h3 className="text-lg font-normal text-slate-800 dark:text-white mb-2">No templates found</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                            {filteredTemplates.map((template) => (
                                <ProductCard
                                    key={template._id}
                                    product={template}
                                    type="design-template"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DesignTemplatePage;
