import { Metadata } from 'next';
import { Shield, Lock, FileText, Camera, Share2, Wifi } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - StuTool Android App',
  description: 'Privacy Policy for the StuTool Android App. Learn how we handle your data with a strict offline-first approach.',
};

export default function AndroidPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12 mt-8 md:mt-16">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            StuTool respects your privacy. Our Android app is designed to function with a strict offline-first approach, ensuring minimal data collection.
          </p>
        </header>

        <section className="bg-white dark:bg-gray-800/60 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700/50 backdrop-blur-xl">
          <div className="space-y-10">
            {/* 1. Introduction */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">1</span>
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed ml-11">
                StuTool respects your privacy. This app is designed to function with a strict offline-first approach, ensuring minimal data collection.
              </p>
            </div>

            {/* 2. Data Collection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">2</span>
                Data Collection & Processing
              </h2>
              <ul className="space-y-3 ml-11">
                {[
                  "No account or sign-in required.",
                  "All PDF processing, generation, and Document Scanner tasks occur offline and locally on your device.",
                  "Resume Builder data is processed locally.",
                  "No personal data or documents are stored on remote servers."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Permissions */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">3</span>
                Permissions & File Access
              </h2>
              <ul className="space-y-3 ml-11">
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Storage/Media permissions are used only to read files you explicitly select and to save the processed files back to your device.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Camera permissions are used solely for the Document Scanner feature to capture images locally.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Share2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Sharing or exporting files is initiated only by your explicit action using the system share sheet.</span>
                </li>
              </ul>
            </div>

            {/* 4. AI Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">4</span>
                AI Features & Internet Usage
              </h2>
              <p className="text-gray-600 dark:text-gray-300 ml-11 mb-4">
                StuTool operates entirely offline with one exception: AI Enhance.
              </p>
              <ul className="space-y-3 ml-11">
                <li className="flex items-start gap-3">
                  <Wifi className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">The text you enter (e.g., career objective) is sent to third-party AI services when you explicitly request enhancement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wifi className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">This requires internet access to generate improved content.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">No other personal data, resumes, or PDFs are ever uploaded.</span>
                </li>
              </ul>
            </div>

            {/* 5. Third-Party Services */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">5</span>
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 ml-11">
                When using AI Enhance, StuTool may use services such as Google AI Studio (Gemini), GroqCloud, and OpenRouter. 
                <br /><br />
                <span className="font-medium text-gray-900 dark:text-gray-100">These services only process the specific text input you provide.</span>
              </p>
            </div>

            {/* 6. Security */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">6</span>
                Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 ml-11 flex items-start gap-3">
                <Lock className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                <span>
                  By keeping document processing entirely local, your files remain fully secure on your device. We aim to protect user data, but external AI services follow their own policies for the text you choose to enhance.
                </span>
              </p>
            </div>

            {/* 7. Changes */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">7</span>
                Changes
              </h2>
              <p className="text-gray-600 dark:text-gray-300 ml-11">
                This privacy policy may be updated in future versions to reflect new offline tools or features.
              </p>
            </div>
          </div>
        </section>
        
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </footer>
      </div>
    </div>
  );
}
