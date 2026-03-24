import React from "react";
import { ResumeData } from "@/lib/resumeSchema";

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal, education, experience, projects, skills } = data;

  const hasContactInfo = personal.email || personal.phone || personal.location || personal.linkedin || personal.github;

  return (
    <div className="bg-white text-black p-12 w-[210mm] min-h-[297mm] shadow-lg font-serif box-border mx-auto print:shadow-none print:m-0 print:p-10" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
      <header className="text-center border-b-[2px] border-black pb-4 mb-6 hover:bg-gray-50/80 p-4 -m-4 rounded cursor-pointer transition-colors group" onClick={() => document.getElementById('input-personal-name')?.focus()}>
        <h1 className="text-[2.5rem] font-bold uppercase tracking-wider mb-2 leading-tight group-hover:text-brand-700 transition-colors">{personal.name || "YOUR NAME"}</h1>
        {hasContactInfo ? (
          <>
            <div className="text-sm flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
              {personal.location && <span>{personal.location}</span>}
              {personal.location && (personal.phone || personal.email) && <span>|</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.phone && personal.email && <span>|</span>}
              {personal.email && <span>{personal.email}</span>}
            </div>
            <div className="text-sm flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-1">
              {personal.linkedin && <span>{personal.linkedin}</span>}
              {personal.linkedin && personal.github && <span>|</span>}
              {personal.github && <span>{personal.github}</span>}
            </div>
          </>
        ) : (
          <p className="text-[13px] text-gray-400 italic font-sans font-medium">Click to populate professional contact details</p>
        )}
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Professional Experience</h2>
        {(!experience || experience.length === 0) ? (
          <p className="text-[13px] text-gray-500 italic font-sans font-medium">Add professional roles to your history</p>
        ) : (
          <div className="flex flex-col gap-4">
            {experience.map(exp => (
              <div key={exp.id} className="break-inside-avoid hover:bg-gray-50/80 p-2 -mx-2 rounded cursor-pointer transition-colors" onClick={() => document.getElementById(`input-exp-position-${exp.id}`)?.focus()}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[1.05rem] font-bold">{exp.position || "Position"}</h3>
                  <span className="text-sm font-semibold">{exp.startDate || "Start"} {((exp.startDate && exp.endDate) || (!exp.startDate && exp.endDate)) && "–"} {exp.endDate || (exp.startDate && "Present")}</span>
                </div>
                <div className="text-sm font-bold italic mb-1.5">{exp.company || "Company"}</div>
                {exp.description && <p className="text-[0.9rem] leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Education</h2>
        {(!education || education.length === 0) ? (
          <p className="text-[13px] text-gray-500 italic font-sans font-medium">Add academic degrees or certifications</p>
        ) : (
          <div className="flex flex-col gap-4">
            {education.map(edu => (
              <div key={edu.id} className="break-inside-avoid hover:bg-gray-50/80 p-2 -mx-2 rounded cursor-pointer transition-colors" onClick={() => document.getElementById(`input-edu-school-${edu.id}`)?.focus()}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[1.05rem] font-bold">{edu.school || "School"}</h3>
                  <span className="text-sm font-semibold">{edu.startDate || "Start"} {((edu.startDate && edu.endDate) || (!edu.startDate && edu.endDate)) && "–"} {edu.endDate || (edu.startDate && "Present")}</span>
                </div>
                <div className="text-sm font-bold italic mb-1.5">{edu.degree || "Degree"}</div>
                {edu.description && <p className="text-[0.9rem] leading-relaxed whitespace-pre-wrap">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      {(projects && projects.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Projects</h2>
          <div className="flex flex-col gap-4">
            {projects.map(proj => (
              <div key={proj.id} className="break-inside-avoid hover:bg-gray-50/80 p-2 -mx-2 rounded cursor-pointer transition-colors" onClick={() => document.getElementById(`input-proj-name-${proj.id}`)?.focus()}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[1.05rem] font-bold text-black inline-block">{proj.name || "Project Name"}</h3>
                  {proj.link && <span className="text-xs">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-[0.9rem] leading-relaxed whitespace-pre-wrap mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-6 break-inside-avoid">
        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Skills</h2>
         {(!skills || skills.length === 0) ? (
          <p className="text-[13px] text-gray-500 italic font-sans font-medium">Highlight your ATS keywords here</p>
        ) : (
          <p className="text-[0.9rem] leading-relaxed font-medium">
            {skills.join(" • ")}
          </p>
        )}
      </section>
    </div>
  );
}
