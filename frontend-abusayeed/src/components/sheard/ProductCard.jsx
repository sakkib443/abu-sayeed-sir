'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import {
    LuShoppingCart,
    LuEye,
    LuCheck,
    LuClock,
    LuUsers,
    LuLayoutGrid,
    LuLayers,
    LuList,
    LuHeart,
    LuPlay,
    LuSparkles
} from 'react-icons/lu';
import { FaStar, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, type, view = "grid" }) => {
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { isDark } = useTheme();
    const { language } = useLanguage();
    const bengaliClass = language === "bn" ? "hind-siliguri" : "";

    const detailUrl = `/${type}/${product._id || product.id}`;

    // Get first image from images array or fallback
    const productImage = product.images?.[0] || product.image || "/images/placeholder.png";

    // Calculate discount percentage
    const hasDiscount = product.offerPrice && product.offerPrice > 0 && product.offerPrice < product.price;

    // Display Price logic
    const displayPrice = hasDiscount ? product.offerPrice : product.price;
    const originalPrice = product.price;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({
            id: product._id || product.id,
            title: product.title || product.name,
            price: displayPrice,
            image: productImage,
            type: type
        }));
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    // Fields
    const title = product.title || product.name || "Untitled Product";
    const categoryName = product.category?.name || product.templateType || (type === 'website' ? 'Website' : 'Design');
    const version = product.version || 'v1.0';
    const sales = product.salesCount || product.totalSales || 0;
    const rating = product.rating || 5;
    const reviewsCount = product.reviewCount || product.reviews?.length || 0;

    const colors = {
        darkRed: "#300000",
        gold: "#D4AF37",
    };

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
            className="group w-full flex flex-col"
        >
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100 dark:bg-zinc-900 mb-3 shadow-sm group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all duration-500">
                <Link href={detailUrl} className="block w-full h-full">
                    <img
                        src={productImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                </Link>

                {/* Hover UI */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none"
                        >
                            <Link href={detailUrl} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                                <LuEye size={20} />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <div className="px-2 py-0.5 bg-black/20 backdrop-blur-md rounded-md border border-white/10">
                        <p className="text-[7px] font-normal text-white uppercase tracking-widest">Premium</p>
                    </div>
                </div>
            </div>

            {/* Content info below image */}
            <div className="px-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                        <LuSparkles size={10} className="text-[#003ECB]" />
                    </div>
                    <Link href={detailUrl}>
                        <h4 className={`text-[11px] font-normal text-slate-800 dark:text-white hover:text-[#003ECB] transition-colors truncate max-w-[150px] ${bengaliClass}`}>
                            {title}
                        </h4>
                    </Link>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1">
                        <LuHeart size={12} className="cursor-pointer hover:text-red-500 transition-colors" />
                        <span className="text-[9px] font-normal tracking-tighter">1.2k</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
