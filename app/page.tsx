import Link from "next/link";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one single document.",
    href: "/pdf-tools",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="8" height="14" rx="1" />
        <rect x="14" y="3" width="8" height="14" rx="1" />
        <path d="M10 14h4" />
      </svg>
    ),
    gradient: "from-rose-500 to-pink-500",
  },

  {
    title: "Image to PDF",
    description: "Adjust orientation and margins. Convert your images to PDFs in seconds.",
    href: "/pdf-tools",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Pages per Sheet",
    description: "Print multiple pages on a single sheet of paper to save resources.",
    href: "/pdf-tools",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-500",
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
    gradient: "from-brand-500 to-purple-500",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Header Section */}
      <section className="w-full flex flex-col items-center pt-20 pb-16 px-4 sm:px-6 text-center">
        <h1 className="animate-fade-in opacity-0 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Tools for <span className="text-gradient">Students</span>
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-100 mt-5 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Everything you need to succeed. Manage documents and craft your professional profile — all secure, right in your browser.
        </p>
      </section>

      {/* Grid Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-24" id="tools-grid">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`glass-card rounded-2xl p-8 group animate-slide-up opacity-0`}
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
              id={`tool-card-${tool.title.toLowerCase().replace(/ /g, "-")}`}
            >
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg text-white mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {tool.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
