import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Builder — StuTool",
  description:
    "Build a professional resume in minutes. Choose from modern templates, customize easily, and export to PDF.",
};

const steps = [
  {
    step: "01",
    title: "Choose a Template",
    description: "Pick from a curated collection of modern, ATS-friendly resume templates.",
  },
  {
    step: "02",
    title: "Fill in Details",
    description: "Add your experience, education, skills, and projects with our guided form.",
  },
  {
    step: "03",
    title: "Export to PDF",
    description: "Download your polished resume as a professional PDF — ready to send.",
  },
];

const templates = [
  { name: "Classic", accent: "from-brand-500 to-brand-600" },
  { name: "Modern", accent: "from-red-700 to-brand-500" },
  { name: "Minimal", accent: "from-surface-200 to-surface-700" },
  { name: "Creative", accent: "from-brand-500 to-rose-600" },
];

export default function ResumeBuilderPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <section className="w-full flex flex-col items-center pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-10 md:pb-12 px-4 sm:px-6">
        <div className="animate-fade-in opacity-0 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-4 sm:mb-6">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          Professional templates
        </div>
        <h1 className="animate-fade-in opacity-0 animate-delay-100 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="text-gradient">Resume</span> Builder
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-200 mt-3 sm:mt-4 text-center text-base sm:text-lg text-surface-200 max-w-xl">
          Create a stunning resume that gets you noticed — no design skills needed.
        </p>
      </section>

      {/* How it works */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-16" id="how-it-works">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="glass-card rounded-2xl p-5 sm:p-6 text-center animate-slide-up opacity-0"
              style={{ animationDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-gradient mb-2 sm:mb-3">
                {s.step}
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5 sm:mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-surface-200 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Template preview area */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24" id="templates">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center animate-fade-in opacity-0 animate-delay-300">
          Choose Your Template
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {templates.map((t, i) => (
            <button
              key={t.name}
              className="glass-card rounded-xl overflow-hidden group cursor-pointer animate-slide-up opacity-0"
              style={{ animationDelay: `${(i + 6) * 80}ms` }}
              id={`template-${t.name.toLowerCase()}`}
            >
              {/* Fake resume preview */}
              <div className="aspect-[3/4] p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 relative">
                {/* Accent stripe */}
                <div className={`absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r ${t.accent}`} />

                {/* Avatar placeholder */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 mt-1.5 sm:mt-2" />

                {/* Name lines */}
                <div className="h-1.5 sm:h-2 w-3/4 rounded-full bg-white/10 mt-0.5 sm:mt-1" />
                <div className="h-1 sm:h-1.5 w-1/2 rounded-full bg-white/[0.06]" />

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] my-0.5 sm:my-1" />

                {/* Content lines */}
                <div className="h-1 sm:h-1.5 w-full rounded-full bg-white/[0.06]" />
                <div className="h-1 sm:h-1.5 w-5/6 rounded-full bg-white/[0.06]" />
                <div className="h-1 sm:h-1.5 w-4/6 rounded-full bg-white/[0.06]" />
                <div className="h-px w-full bg-white/[0.06] my-0.5 sm:my-1" />
                <div className="h-1 sm:h-1.5 w-full rounded-full bg-white/[0.06]" />
                <div className="h-1 sm:h-1.5 w-3/4 rounded-full bg-white/[0.06]" />
                <div className="h-1 sm:h-1.5 w-5/6 rounded-full bg-white/[0.06]" />
              </div>

              {/* Label */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-white/[0.06]">
                <span className="text-xs sm:text-sm font-medium text-surface-200 group-hover:text-white transition-colors">
                  {t.name}
                </span>
                <span className="block text-[10px] sm:text-xs text-surface-200/50 mt-0.5 group-hover:text-brand-400 transition-colors">
                  Coming soon
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
