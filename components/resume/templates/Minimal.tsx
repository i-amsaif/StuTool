import React from "react";
import { ResumeData } from "@/lib/resumeSchema";

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personal, education, experience, skills } = data;

  const hasContactInfo = personal.email || personal.phone || personal.location || personal.linkedin || personal.github;

  return (
    <div className="bg-white text-black p-8 sm:p-12 w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-lg">
      {/* Contact Info */}
      <header className="text-center mb-8 hover:bg-gray-50 transition-colors rounded-xl p-2 -mx-2 cursor-pointer group" onClick={() => document.getElementById('input-personal-name')?.focus()}>
        <h1 className="text-3xl font-bold mb-2 group-hover:text-brand-600 transition-colors">{personal.name || "Your Name"}</h1>
        {hasContactInfo ? (
          <>
            <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.email && personal.phone && <span className="text-gray-400">•</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {(personal.email || personal.phone) && personal.location && <span className="text-gray-400">•</span>}
              {personal.location && <span>{personal.location}</span>}
            </div>
            <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2 mt-1">
              {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
              {personal.linkedin && personal.github && <span className="text-gray-400">•</span>}
              {personal.github && <span>GitHub: {personal.github}</span>}
            </div>
          </>
        ) : (
          <p className="text-sm text-brand-500 italic font-medium">Click here to add your contact details</p>
        )}
      </header>

      {/* Experience */}
      <section className="mb-7">
        <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
          Experience
        </h2>
        
        {(!experience || experience.length === 0) ? (
          <p className="text-sm text-gray-400 italic">No experience added yet. <span className="text-brand-500 font-medium">Add roles to showcase your history.</span></p>
        ) : (
          <div className="flex flex-col gap-5">
            {experience.map((exp) => (
              <div key={exp.id} className="cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 fill-transparent rounded-lg" onClick={() => document.getElementById(`input-exp-position-${exp.id}`)?.focus()}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position || "Position / Title"}</h3>
                  <span className="text-sm text-gray-600 font-medium">
                    {exp.startDate || "Start"} {((exp.startDate && exp.endDate) || (!exp.startDate && exp.endDate)) && "-"} {exp.endDate || (exp.startDate && "Present") || "End"}
                  </span>
                </div>
                <div className="text-sm text-gray-700 italic mb-2">{exp.company || "Company Name"}</div>
                {exp.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Education */}
      <section className="mb-7">
        <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
          Education
        </h2>
        
        {(!education || education.length === 0) ? (
          <p className="text-sm text-gray-400 italic">No education added. <span className="text-brand-500 font-medium">Highlight your academic background.</span></p>
        ) : (
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 rounded-lg" onClick={() => document.getElementById(`input-edu-school-${edu.id}`)?.focus()}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.school || "School / University Name"}</h3>
                  <span className="text-sm text-gray-600 font-medium">
                    {edu.startDate || "Start"} {((edu.startDate && edu.endDate) || (!edu.startDate && edu.endDate)) && "-"} {edu.endDate || (edu.startDate && "Present") || "End"}
                  </span>
                </div>
                <div className="text-sm text-gray-700 italic mb-2">{edu.degree || "Degree or Certification"}</div>
                {edu.description && (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Skills */}
      <section className="mb-7">
        <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
          Skills
        </h2>
        
        {(!skills || skills.length === 0) ? (
          <p className="text-sm text-gray-400 italic">No skills added. <span className="text-brand-500 font-medium">List keywords to beat ATS systems.</span></p>
        ) : (
          <div className="text-sm text-gray-700 leading-relaxed font-medium">
            {skills.join(" • ")}
          </div>
        )}
      </section>
    </div>
  );
}
