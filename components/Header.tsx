"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "PDF Tools", href: "/pdf-tools" },
  { name: "Resume Builder", href: "/resume-builder" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/[0.06]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="header-logo">
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

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle navigation menu"
          id="mobile-menu-btn"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-surface-200 transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-surface-200 transition-all duration-300 mt-1 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-surface-200 transition-all duration-300 mt-1 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
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
