import { Metadata } from 'next';
import { Shield, Lock, FileText, Camera, Share2, Wifi, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - StuTool Android App',
  description: 'Privacy Policy for the StuTool Android App. Learn how we handle your data with a strict offline-first approach.',
};

export default function AndroidPrivacyPolicy() {
  return (
    <div className="flex flex-col items-center pt-10 sm:pt-16 md:pt-24 pb-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto w-full">
      
      <div className="flex-1 flex flex-col items-center text-center z-10 w-full mb-12">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fade-in opacity-0">
          <Shield className="w-4 h-4" />
          Android App
        </div>
        
        <h1 className="animate-fade-in opacity-0 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        <p className="animate-fade-in opacity-0 animate-delay-100 text-lg sm:text-xl text-surface-200 max-w-2xl mx-auto">
          StuTool respects your privacy. Our Android app is designed to function with a strict offline-first approach, ensuring minimal data collection.
        </p>
      </div>

      <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 space-y-10 w-full animate-slide-up opacity-0 animate-delay-200 z-10 text-left">
        
        {/* 1. Introduction */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">1</span>
            Introduction
          </h2>
          <p className="text-surface-200 leading-relaxed sm:ml-11">
            StuTool respects your privacy. This app is designed to function with a strict offline-first approach, ensuring minimal data collection.
          </p>
        </div>

        {/* 2. Data Collection */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">2</span>
            Data Collection & Processing
          </h2>
          <ul className="space-y-4 sm:ml-11">
            {[
              "No account or sign-in required.",
              "All PDF processing, generation, and Document Scanner tasks occur offline and locally on your device.",
              "Resume Builder data is processed locally.",
              "No personal data or documents are stored on remote servers."
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <span className="text-surface-200">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Permissions */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">3</span>
            Permissions & File Access
          </h2>
          <ul className="space-y-4 sm:ml-11">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
              <span className="text-surface-200">Storage/Media permissions are used only to read files you explicitly select and to save the processed files back to your device.</span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
              <span className="text-surface-200">Camera permissions are used solely for the Document Scanner feature to capture images locally.</span>
            </li>
            <li className="flex items-start gap-3">
              <Share2 className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
              <span className="text-surface-200">Sharing or exporting files is initiated only by your explicit action using the system share sheet.</span>
            </li>
          </ul>
        </div>

        {/* 4. AI Features */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">4</span>
            AI Features & Internet Usage
          </h2>
          <p className="text-surface-200 sm:ml-11 mb-4">
            StuTool operates entirely offline with one exception: AI Enhance.
          </p>
          <ul className="space-y-4 sm:ml-11">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
              <span className="text-surface-200">The text you enter (e.g., career objective) is sent to third-party AI services when you explicitly request enhancement.</span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
              <span className="text-surface-200">This requires internet access to generate improved content.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
              <span className="text-surface-200">No other personal data, resumes, or PDFs are ever uploaded.</span>
            </li>
          </ul>
        </div>

        {/* 5. Third-Party Services */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">5</span>
            Third-Party Services
          </h2>
          <p className="text-surface-200 sm:ml-11">
            When using AI Enhance, StuTool may use services such as Google AI Studio (Gemini), GroqCloud, and OpenRouter. 
            <br /><br />
            <span className="font-semibold text-white">These services only process the specific text input you provide.</span>
          </p>
        </div>

        {/* 6. Security */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">6</span>
            Security
          </h2>
          <p className="text-surface-200 sm:ml-11 flex items-start gap-3">
            <Lock className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
            <span>
              By keeping document processing entirely local, your files remain fully secure on your device. We aim to protect user data, but external AI services follow their own policies for the text you choose to enhance.
            </span>
          </p>
        </div>

        {/* 7. Changes */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">7</span>
            Changes
          </h2>
          <p className="text-surface-200 sm:ml-11">
            This privacy policy may be updated in future versions to reflect new offline tools or features.
          </p>
        </div>

        {/* 8. Contact Us */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm border border-brand-500/30">8</span>
            Contact Us
          </h2>
          <p className="text-surface-200 sm:ml-11 mb-2">
            If you have any questions about this Privacy Policy, you can contact us:
          </p>
          <ul className="space-y-3 sm:ml-11">
            <li className="flex items-center gap-3 text-surface-200">
              <span className="font-semibold text-white min-w-24">Developer:</span> 
              Mohammed Saif
            </li>
            <li className="flex items-center gap-3 text-surface-200">
              <span className="font-semibold text-white min-w-24">Email:</span> 
              <a href="mailto:i.am.mohd.saif2006@gmail.com" className="text-brand-400 hover:underline flex items-center gap-2">
                <Mail className="w-4 h-4" /> i.am.mohd.saif2006@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-surface-200">
              <span className="font-semibold text-white min-w-24">Website:</span> 
              <a href="https://www.stutool.in" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:underline">
                https://www.stutool.in
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <footer className="text-center text-surface-300 text-sm mt-12 animate-fade-in opacity-0 animate-delay-300">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </footer>
    </div>
  );
}
