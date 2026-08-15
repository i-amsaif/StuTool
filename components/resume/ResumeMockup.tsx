"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export const ResumeMockup = () => {
  const container: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0.3, scaleX: 0.8, originX: 0 },
    show: { 
      opacity: [0.3, 1, 0.3], 
      scaleX: [0.8, 1, 0.8],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
  };
  
  const pulseVariants: Variants = {
    hidden: { opacity: 0.4 },
    show: { 
      opacity: [0.4, 0.8, 0.4], 
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
  };

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[1/1.414] bg-white rounded-md shadow-2xl p-4 sm:p-5 flex flex-col border border-white/20 select-none pointer-events-none mx-auto transform rotate-2 overflow-hidden"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-brand-500"></div>

      {/* Header Profile Area */}
      <motion.div variants={container} initial="hidden" animate="show" className="border-b border-gray-100 pb-3 mb-3 mt-1 sm:mt-2 flex items-center gap-3">
        <motion.div variants={pulseVariants} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 shrink-0"></motion.div>
        <div className="flex-1">
          <motion.div variants={lineVariants} className="h-3 sm:h-4 w-3/4 bg-gray-800 rounded mb-1.5"></motion.div>
          <motion.div variants={lineVariants} className="h-1.5 sm:h-2 w-1/2 bg-brand-500/60 rounded mb-1.5"></motion.div>
          <div className="flex gap-2">
            <motion.div variants={lineVariants} className="h-1 sm:h-1.5 w-1/4 bg-gray-300 rounded"></motion.div>
            <motion.div variants={lineVariants} className="h-1 sm:h-1.5 w-1/4 bg-gray-300 rounded"></motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={container} initial="hidden" animate="show" className="flex-1 flex gap-3 sm:gap-4">
        {/* Left Column (Main Content) */}
        <div className="flex-[2] flex flex-col gap-3 sm:gap-4">
          <div>
            <motion.div variants={pulseVariants} className="h-2 sm:h-2.5 w-1/3 bg-gray-400 rounded mb-2"></motion.div>
            <div className="space-y-1.5">
              <motion.div variants={lineVariants} className="h-1.5 sm:h-2 w-full bg-gray-200 rounded"></motion.div>
              <motion.div variants={lineVariants} className="h-1.5 sm:h-2 w-full bg-gray-200 rounded"></motion.div>
              <motion.div variants={lineVariants} className="h-1.5 sm:h-2 w-5/6 bg-gray-200 rounded"></motion.div>
            </div>
          </div>
          <div>
            <motion.div variants={pulseVariants} className="h-2 sm:h-2.5 w-1/3 bg-gray-400 rounded mb-2"></motion.div>
            <div className="space-y-1.5">
              <motion.div variants={lineVariants} className="h-1.5 sm:h-2 w-full bg-gray-200 rounded"></motion.div>
              <motion.div variants={lineVariants} className="h-1.5 sm:h-2 w-11/12 bg-gray-200 rounded"></motion.div>
              <motion.div variants={lineVariants} className="h-1.5 sm:h-2 w-4/5 bg-gray-200 rounded"></motion.div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="flex-[1] flex flex-col gap-3 sm:gap-4 border-l border-gray-100 pl-3 sm:pl-4">
          <div>
            <motion.div variants={pulseVariants} className="h-2 sm:h-2.5 w-2/3 bg-brand-500/40 rounded mb-2"></motion.div>
            <div className="flex flex-wrap gap-1">
              <motion.div variants={lineVariants} className="h-3 w-8 bg-gray-100 rounded-sm"></motion.div>
              <motion.div variants={lineVariants} className="h-3 w-10 bg-gray-100 rounded-sm"></motion.div>
              <motion.div variants={lineVariants} className="h-3 w-6 bg-gray-100 rounded-sm"></motion.div>
              <motion.div variants={lineVariants} className="h-3 w-12 bg-gray-100 rounded-sm"></motion.div>
              <motion.div variants={lineVariants} className="h-3 w-7 bg-gray-100 rounded-sm"></motion.div>
            </div>
          </div>
          <div>
            <motion.div variants={pulseVariants} className="h-2 sm:h-2.5 w-2/3 bg-brand-500/40 rounded mb-2"></motion.div>
            <div className="space-y-2">
              <div>
                <motion.div variants={lineVariants} className="h-1.5 w-full bg-gray-300 rounded mb-1"></motion.div>
                <motion.div variants={lineVariants} className="h-1 w-2/3 bg-gray-200 rounded"></motion.div>
              </div>
              <div>
                <motion.div variants={lineVariants} className="h-1.5 w-full bg-gray-300 rounded mb-1"></motion.div>
                <motion.div variants={lineVariants} className="h-1 w-2/3 bg-gray-200 rounded"></motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative blur blob */}
      <div className="absolute -inset-4 bg-brand-500/20 blur-2xl -z-10 rounded-full animate-pulse"></div>
    </motion.div>
  );
};
