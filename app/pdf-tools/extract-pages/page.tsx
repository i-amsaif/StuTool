import Link from "next/link";
import ExtractPagesTool from "@/components/tools/ExtractPagesTool";

export default function ExtractPagesPage() {
  const title = "Extract Pages";
  const instructions = "Upload a PDF document and quickly split out the exact pages you need into a focused file.";
  const gradient = "from-red-800 to-brand-500";
  
  return (
    <div className="flex flex-col items-center pt-6 sm:pt-12 md:pt-20 pb-10 sm:pb-16">
      <section className="w-full max-w-4xl mx-auto px-3 sm:px-6 pb-12 sm:pb-24 animate-slide-up" id="active-tool-panel">
        <Link href="/pdf-tools" className="inline-flex items-center text-surface-200 hover:text-white mb-4 sm:mb-6 text-sm transition-colors group">
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tools
        </Link>

        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-white/[0.1] shadow-2xl relative overflow-hidden">
          <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br ${gradient} blur-[100px] opacity-20 pointer-events-none`} />

          <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6">
              <div className={`shrink-0 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg text-white`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
                <p className="text-xs sm:text-sm text-surface-200 mt-1">{instructions}</p>
              </div>
            </div>

            <ExtractPagesTool />
          </div>
        </div>
      </section>
    </div>
  );
}
