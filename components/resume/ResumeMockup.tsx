"use client";

import React from "react";

export const ResumeMockup = () => (
  <div className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[1/1.414] bg-white rounded-md shadow-2xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-out border border-white/20 select-none pointer-events-none mx-auto">
    {/* Header */}
    <div className="border-b border-gray-200 pb-2 sm:pb-3">
      <div className="h-4 sm:h-5 w-1/2 bg-gray-300 rounded mb-1.5 sm:mb-2"></div>
      <div className="h-1.5 sm:h-2 w-1/3 bg-gray-200 rounded"></div>
    </div>
    {/* Body */}
    <div className="flex-1 flex flex-col gap-4 sm:gap-5">
      <div>
        <div className="h-2.5 sm:h-3 w-1/4 bg-brand-500/20 rounded mb-2 sm:mb-2.5"></div>
        <div className="space-y-1.5 sm:space-y-2">
          <div className="h-2 sm:h-2.5 w-full bg-gray-100 rounded"></div>
          <div className="h-2 sm:h-2.5 w-5/6 bg-gray-100 rounded"></div>
          <div className="h-2 sm:h-2.5 w-4/6 bg-gray-100 rounded"></div>
        </div>
      </div>
      <div>
        <div className="h-2.5 sm:h-3 w-1/4 bg-brand-500/20 rounded mb-2 sm:mb-2.5"></div>
        <div className="space-y-1.5 sm:space-y-2">
          <div className="h-2 sm:h-2.5 w-full bg-gray-100 rounded"></div>
          <div className="h-2 sm:h-2.5 w-full bg-gray-100 rounded"></div>
          <div className="h-2 sm:h-2.5 w-3/4 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
    
    {/* Decorative blur blob */}
    <div className="absolute -inset-4 bg-brand-500/20 blur-2xl -z-10 rounded-full"></div>
  </div>
);
