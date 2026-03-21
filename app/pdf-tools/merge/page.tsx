import Link from "next/link";
import MergePdfTool from "@/components/tools/MergePdfTool";

export default function MergePdfPage() {
  const title = "Merge PDF";
  const instructions = "Drag and drop two or more PDF files below. They will be merged in the order they appear.";
  const gradient = "from-rose-500 to-pink-500";
  
  return (
    <div className="flex flex-col items-center pt-20 pb-16">
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-24 animate-slide-up" id="active-tool-panel">
        <Link href="/pdf-tools" className="inline-flex items-center text-slate-400 hover:text-white mb-6 text-sm transition-colors group">
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tools
        </Link>

        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/[0.1] shadow-2xl relative overflow-hidden">
          <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br ${gradient} blur-[100px] opacity-20 pointer-events-none`} />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg text-white`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="8" height="14" rx="1" />
                  <rect x="14" y="3" width="8" height="14" rx="1" />
                  <path d="M10 14h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                <p className="text-sm text-slate-300 mt-1">{instructions}</p>
              </div>
            </div>

            <MergePdfTool />
          </div>
        </div>
      </section>
    </div>
  );
}
