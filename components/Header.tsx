"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "PDF Tools", href: "/pdf-tools" },
  { name: "Resume Builder", href: "/resume-builder" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomePage = pathname === "/";

  const scrollToDownload = useCallback(() => {
    const section = document.getElementById("download-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/[0.06]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="header-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="StuTool Logo"
            width={36}
            height={36}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="transition-transform duration-300 group-hover:scale-110 select-none pointer-events-none"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            Stu<span className="text-gradient">Tool</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.name.toLowerCase().replace(" ", "-")}`}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white bg-white/[0.08]"
                    : "text-surface-200 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-gradient-to-r from-brand-500 to-red-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
          {/* Mobile-only Download Button — visible only on homepage */}
          {isHomePage && (
            <button
              onClick={scrollToDownload}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-gradient-to-r from-brand-600 to-red-600 text-white text-[11px] sm:text-xs font-semibold shadow-sm hover:from-brand-500 hover:to-red-500 transition-all duration-300 active:scale-95"
              aria-label="Download StuTool APK"
              id="header-download-btn"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-btn"
          >
            <span
              className={`block h-[2px] w-5 rounded-full bg-surface-200 transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-surface-200 transition-all duration-300 mt-1 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-surface-200 transition-all duration-300 mt-1 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
        id="mobile-nav"
      >
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/[0.08]"
                    : "text-surface-200 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
