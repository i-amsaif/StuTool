import Link from "next/link";
import { ResumeMockup } from "@/components/resume/ResumeMockup";

const pdfTools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document.",
    href: "/pdf-tools/merge",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="8" height="14" rx="1" />
        <rect x="14" y="3" width="8" height="14" rx="1" />
        <path d="M10 14h4" />
      </svg>
    ),
    gradient: "from-brand-500 to-red-700",
  },
  {
    title: "Image to PDF",
    description: "Adjust orientation and margins. Convert your images to PDFs in seconds.",
    href: "/pdf-tools/image-to-pdf",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    gradient: "from-red-600 to-brand-500",
  },
  {
    title: "Pages per Sheet",
    description: "Print multiple pages on a single sheet of paper to save resources.",
    href: "/pdf-tools/pages-per-sheet",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
    gradient: "from-brand-500 to-rose-600",
  },
  {
    title: "Extract Pages",
    description: "Extract specific pages from your PDF file into a new document.",
    href: "/pdf-tools/extract-pages",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    gradient: "from-red-800 to-brand-500",
  },
  {
    title: "Compress PDF",
    description: "Significantly reduce your PDF file size locally in your browser.",
    href: "/pdf-tools/compress",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    ),
    gradient: "from-brand-500 to-red-500",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Mobile-First Hero Section indicating Resume Builder */}
      <section className="w-full relative flex flex-col md:flex-row items-center justify-between gap-10 pt-10 sm:pt-16 md:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto min-h-[60vh]">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fade-in opacity-0">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-brand-500"></span>
            </span>
            StuTool Resume Builder
          </div>
          
          <h1 className="animate-fade-in opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Build Your Resume <br className="hidden md:block"/> in <span className="text-gradient">Seconds</span>
          </h1>
          <p className="animate-fade-in opacity-0 animate-delay-100 text-lg sm:text-xl md:text-2xl text-surface-200 mb-8 sm:mb-10 max-w-xl">
            Free, fast, no signup required. Create a professional design, ready for ATS.
          </p>
          
          <Link 
            href="/resume-builder"
            className="animate-fade-in opacity-0 animate-delay-200 inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-brand-600 to-red-600 rounded-full hover:from-brand-500 hover:to-red-500 transition-all transform hover:scale-105 shadow-xl hover:shadow-brand-500/30 w-full sm:w-auto"
          >
            Create Resume
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm text-surface-300 animate-fade-in opacity-0 animate-delay-300">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              ATS-Friendly
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              Instant PDF
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
               <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              No Login
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center items-center mt-8 md:mt-0 animate-slide-up opacity-0 animate-delay-200 z-10 md:pl-10 relative">
          <ResumeMockup />
        </div>
      </section>

      {/* Tools Section (Secondary) */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-24" id="tools-grid">
        <div className="mb-6 sm:mb-10 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 sm:mb-3">Other Tools</h2>
          <p className="text-surface-200 text-sm sm:text-base">Everything else you need to manage your documents format.</p>
        </div>
        
        {/* 2 columns on mobile, 3 on tablet/desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {pdfTools.map((tool, i) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 group transition-all hover:bg-white/[0.04] animate-slide-up opacity-0"
              style={{ animationDelay: `${(i + 2) * 50}ms` }}
              id={`tool-card-${tool.title.toLowerCase().replace(/ /g, "-")}`}
            >
              <div
                className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg text-white mb-3 sm:mb-4 transition-transform group-hover:scale-110`}
              >
                {tool.icon}
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 tracking-tight">
                {tool.title}
              </h3>
              <p className="text-surface-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
