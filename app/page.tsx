import Link from "next/link";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document.",
    href: "/pdf-tools/merge",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    description: "Significantly reduce your PDF file size locally in your browser to make it easier to share.",
    href: "/pdf-tools/compress",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    ),
    gradient: "from-brand-500 to-red-500",
  },
  {
    title: "Resume Builder",
    description: "Create a modern, professional resume in minutes with our templates.",
    href: "/resume-builder",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    gradient: "from-red-700 to-brand-500",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 text-center">
        <h1 className="animate-fade-in opacity-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Tools for <span className="text-gradient">Students</span>
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-100 mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-surface-200 max-w-2xl leading-relaxed">
          Everything you need to succeed. Manage documents and craft your professional profile — all secure, right in your browser.
        </p>
      </section>

      {/* Grid Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24" id="tools-grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool, i) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`glass-card rounded-2xl p-5 sm:p-8 group animate-slide-up opacity-0`}
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
              id={`tool-card-${tool.title.toLowerCase().replace(/ /g, "-")}`}
            >
              <div
                className={`inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg text-white mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
                {tool.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                {tool.title}
              </h3>
              <p className="text-surface-200 leading-relaxed text-sm">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
