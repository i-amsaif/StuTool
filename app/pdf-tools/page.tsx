import Link from "next/link";

const tools = [
  {
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="8" height="14" rx="1" />
        <rect x="14" y="3" width="8" height="14" rx="1" />
        <path d="M10 14h4" />
      </svg>
    ),
    gradient: "from-brand-500 to-red-700",
    shadow: "shadow-brand-500/20",
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Adjust orientation and margins. Convert your images to PDFs in seconds.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    gradient: "from-red-600 to-brand-500",
    shadow: "shadow-red-500/20",
  },
  {
    id: "pages-per-sheet",
    title: "Pages per Sheet",
    description: "Print multiple pages on a single sheet of paper to save resources.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
    gradient: "from-brand-500 to-rose-600",
    shadow: "shadow-brand-500/20",
  },
  {
    id: "extract-pages",
    title: "Extract Pages",
    description: "Extract specific pages from your PDF file into a new document.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    gradient: "from-red-800 to-brand-500",
    shadow: "shadow-red-500/20",
  },
  {
    id: "compress",
    title: "Compress PDF",
    description: "Significantly reduce your PDF file size locally in your browser to make it easier to share.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    ),
    gradient: "from-brand-500 to-red-500",
    shadow: "shadow-brand-500/20",
  },
];

export default function PdfToolsPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <section className="w-full flex flex-col items-center pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
        <h1 className="animate-fade-in opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="text-gradient">PDF</span> Tools
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-100 mt-3 sm:mt-4 text-center text-base sm:text-lg text-surface-200 max-w-xl">
          Select a tool below to quickly edit, merge, or convert your PDF files directly in your browser.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24" id="pdf-tools-grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {tools.map((tool, i) => {
            return (
              <Link
                key={tool.id}
                href={`/pdf-tools/${tool.id}`}
                className="glass-card rounded-2xl p-5 sm:p-8 text-left group transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
                style={{ animation: `slide-up 0.5s ease-out ${(i + 2) * 100}ms forwards`, opacity: 0 }}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className={`shrink-0 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${tool.gradient} ${tool.shadow} shadow-lg text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    {tool.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-surface-200 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
