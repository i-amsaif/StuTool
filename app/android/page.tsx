"use client";

import Image from "next/image";
import { useRef } from "react";
import { APP_CONFIG } from "@/lib/constants";

const screenshots = [
  "/android-assets/stutoolart0.png",
  "/android-assets/stutoolart1.png",
  "/android-assets/stutoolart2.png",
  "/android-assets/stutoolart3.png",
  "/android-assets/stutoolart4.png",
];

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "PDF Tools",
    desc: "Merge, compress, extract pages, and convert images to PDF.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Resume Builder",
    desc: "Create ATS-friendly professional resumes instantly.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    title: "Document Scanner",
    desc: "Scan documents using your camera with auto-edge detection.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "PDF Viewer",
    desc: "Fast, lightweight PDF viewer with search and bookmarks.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Privacy First",
    desc: "All processing happens locally on your device.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Lightweight",
    desc: `Only ${APP_CONFIG.android.size} — fast to download and install.`,
  },
];

export default function AndroidPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />

      <main className="min-h-screen bg-[#0f0f0f] text-white font-[Inter]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

          {/* ── App Header ── */}
          <section className="flex flex-col sm:flex-row items-start gap-5 sm:gap-7 animate-fade-in opacity-0">
            <div className="shrink-0">
              <Image
                src="/android-assets/ic_launcher.png"
                alt="StuTool App Icon"
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg pointer-events-none select-none"
                priority
                draggable={false}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight animate-fade-in opacity-0 animate-delay-100">
                StuTool
              </h1>
              <p className="text-surface-300 mt-1 text-sm sm:text-base animate-fade-in opacity-0 animate-delay-200">
                i-amsaif
              </p>

              {/* Metadata chips */}
              <div className="flex flex-wrap gap-2 mt-4 animate-fade-in opacity-0 animate-delay-300">
                {[
                  { label: APP_CONFIG.android.version },
                  { label: APP_CONFIG.android.size },
                  { label: `Updated ${APP_CONFIG.android.lastUpdated}` },
                  { label: "Android 8.0+" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center rounded-full bg-surface-800/60 border border-surface-700/50 px-3 py-1 text-xs text-surface-300"
                  >
                    {chip.label}
                  </span>
                ))}
              </div>

              {/* Download buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6 animate-fade-in opacity-0 animate-delay-400">
                <a
                  href={APP_CONFIG.android.downloadUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-green-500 hover:bg-green-400 text-surface-900 font-semibold text-sm sm:text-base transition-colors duration-200 shadow-lg shadow-green-500/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download APK
                </a>

                <a 
                  href="https://indusapp.store/pl3q2rxo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-12 hover:opacity-90 transition-opacity"
                >
                  <Image 
                    src="/android-assets/badge-black-background-english.png"
                    alt="Get it on Indus App Store"
                    width={160}
                    height={48}
                    className="h-full w-auto object-contain pointer-events-none select-none"
                    draggable={false}
                    priority
                  />
                </a>
              </div>
            </div>
          </section>

          {/* ── Divider ── */}
          <hr className="border-surface-800/60 my-10 sm:my-14" />

          {/* ── Screenshots Carousel ── */}
          <section className="animate-slide-up opacity-0 animate-delay-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl sm:text-2xl font-bold">Screenshots</h2>

              {/* Desktop arrows */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                  className="p-2 rounded-xl bg-surface-800/60 border border-surface-700/50 hover:bg-surface-700/60 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-surface-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                  className="p-2 rounded-xl bg-surface-800/60 border border-surface-700/50 hover:bg-surface-700/60 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-surface-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="hide-scrollbar flex gap-4 overflow-x-auto pb-2"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {screenshots.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[240px] sm:w-[280px] rounded-2xl overflow-hidden border border-surface-800/60 bg-surface-900/40"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Image
                    src={src}
                    alt={`StuTool screenshot ${i + 1}`}
                    width={280}
                    height={560}
                    className="w-full h-auto object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Divider ── */}
          <hr className="border-surface-800/60 my-10 sm:my-14" />

          {/* ── About Section ── */}
          <section className="animate-slide-up opacity-0 animate-delay-300">
            <h2 className="text-xl sm:text-2xl font-bold mb-5">About this app</h2>
            <div className="glass-card rounded-2xl p-5 sm:p-7">
              <p className="text-surface-300 leading-relaxed text-sm sm:text-base">
                StuTool is your all-in-one student productivity toolkit. Create
                professional resumes, merge and compress PDFs, convert images to
                PDF, extract pages, and more — all from your Android device.
              </p>
            </div>
          </section>

          {/* ── Divider ── */}
          <hr className="border-surface-800/60 my-10 sm:my-14" />

          {/* ── Feature Highlights ── */}
          <section className="animate-slide-up opacity-0 animate-delay-400">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Features</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 animate-slide-up opacity-0"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E90302] to-[#ff4f4e] flex items-center justify-center text-white mb-4 shadow-lg shadow-[#E90302]/20">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">
                    {f.title}
                  </h3>
                  <p className="text-surface-400 text-xs sm:text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Bottom spacing ── */}
          <div className="h-16" />
        </div>
      </main>
    </>
  );
}
