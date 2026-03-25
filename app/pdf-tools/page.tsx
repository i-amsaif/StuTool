import Link from "next/link";

const tools = [
  {
    id: "merge",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document.",
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
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Adjust orientation and margins. Convert your images to PDFs in seconds.",
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
    id: "pages-per-sheet",
    title: "Pages per Sheet",
    description: "Print multiple pages on a single sheet of paper to save resources.",
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
    id: "extract-pages",
    title: "Extract Pages",
    description: "Extract specific pages from your PDF file into a new document.",
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
    id: "compress",
    title: "Compress PDF",
    description: "Significantly reduce your PDF file size locally in your browser to make it easier to share.",
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

export default function PdfToolsPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <section className="w-full flex flex-col items-center pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
        <h1 className="animate-fade-in opacity-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="text-gradient">PDF</span> Tools
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-100 mt-3 sm:mt-5 text-center text-base sm:text-lg md:text-xl text-surface-200 max-w-2xl leading-relaxed">
          Select a tool below to quickly edit, merge, or convert your PDF files directly in your browser.
        </p>
      </section>

      {/* Tools Grid matching Home Page */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-24" id="pdf-tools-grid">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {tools.map((tool, i) => (
            <Link
              key={tool.id}
              href={`/pdf-tools/${tool.id}`}
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
