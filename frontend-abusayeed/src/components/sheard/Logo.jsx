"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Logo = ({ className = "", color = "#003ECB", size = "normal", align = "center", href = "/" }) => {
    const isSmall = size === "small";
    const isLarge = size === "large";
    const alignmentClass = align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center";

    const Content = () => (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className={`flex flex-col ${alignmentClass}`}
        >
            <span
                className={`${isSmall ? 'text-xl' : isLarge ? 'text-3xl' : 'text-2xl lg:text-3xl'} font-heading font-bold leading-none mb-1`}
                style={{ color: color }}
            >
                ABU SAYEED
            </span>
            <div
                className={`${isSmall ? 'w-8' : isLarge ? 'w-16' : 'w-12'} h-[2px]`}
                style={{ backgroundColor: color }}
            />
            <span
                className={`${isSmall ? 'text-[7px]' : isLarge ? 'text-[11px]' : 'text-[8px] lg:text-[9px]'} tracking-[0.5em] font-medium uppercase mt-1.5 opacity-80`}
                style={{ color: color }}
            >
                DESIGNER & TRAINER
            </span>
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className={`group flex flex-col ${alignmentClass} ${className}`}>
                <Content />
            </Link>
        );
    }

    return (
        <div className={`group flex flex-col ${alignmentClass} ${className}`}>
            <Content />
        </div>
    );
};

export default Logo;
