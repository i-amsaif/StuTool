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
    gradient: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-500/20",
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
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
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
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
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
    gradient: "from-violet-500 to-fuchsia-500",
    shadow: "shadow-violet-500/20",
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
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
];

export default function PdfToolsPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <section className="w-full flex flex-col items-center pt-20 pb-16 px-4 sm:px-6">
        <h1 className="animate-fade-in opacity-0 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="text-gradient">PDF</span> Tools
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-100 mt-4 text-center text-lg text-slate-400 max-w-xl">
          Select a tool below to quickly edit, merge, or convert your PDF files directly in your browser.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-24" id="pdf-tools-grid">
        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((tool, i) => {
            return (
              <Link
                key={tool.id}
                href={`/pdf-tools/${tool.id}`}
                className="glass-card rounded-2xl p-8 text-left group transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
                style={{ animation: `slide-up 0.5s ease-out ${(i + 2) * 100}ms forwards`, opacity: 0 }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} ${tool.shadow} shadow-lg text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
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
