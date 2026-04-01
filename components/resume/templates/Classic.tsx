import React from "react";
import { ResumeData, DEGREE_VISIBLE_LEVELS } from "@/lib/resumeSchema";

function formatMarks(edu: { marksType: string; marks: string }): string {
  if (!edu.marks) return "";
  return edu.marksType === "CGPA"
    ? `CGPA: ${edu.marks}/10`
    : `${edu.marks}%`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal, careerObjective, education, experience, projects, skills, declaration, sectionOrder } = data;

  const hasContactInfo =
    personal.email ||
    personal.phone ||
    personal.location ||
    personal.linkedin ||
    personal.github;

  const hasExtras =
    personal.dob || personal.gender || (personal.languages && personal.languages.length > 0) || personal.maritalStatus;

  const orderedSections = (sectionOrder || []).filter(
    (s) => s !== "personal" && s !== "declaration"
  );

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "careerObjective":
        return careerObjective ? (
          <section key="objective" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">
              Career Objective
            </h2>
            <p className="text-[0.9rem] leading-relaxed italic">
              {careerObjective}
            </p>
          </section>
        ) : null;

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <section key="education" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="break-inside-avoid hover:bg-gray-50/80 p-2 -mx-2 rounded cursor-pointer transition-colors"
                  onClick={() =>
                    document
                      .getElementById(`input-edu-institution-${edu.id}`)
                      ?.focus()
                  }
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[1.05rem] font-bold">
                      {edu.institution || "Institution"}
                    </h3>
                    <span className="text-sm font-semibold whitespace-nowrap ml-2">
                      {edu.year || "Year"}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    {DEGREE_VISIBLE_LEVELS.includes(edu.level) && edu.degree && (
                      <span className="text-sm font-bold italic">
                        {edu.degree}
                      </span>
                    )}
                    {!(DEGREE_VISIBLE_LEVELS.includes(edu.level) && edu.degree) && edu.level && (
                      <span className="text-sm font-bold italic">
                        {edu.level}
                      </span>
                    )}
                    {edu.board && (
                      <>
                        <span className="text-gray-400 text-xs">|</span>
                        <span className="text-sm">{edu.board}</span>
                      </>
                    )}
                    {edu.marks && (
                      <>
                        <span className="text-gray-400 text-xs">|</span>
                        <span className="text-sm font-semibold">
                          {formatMarks(edu)}
                        </span>
                      </>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-[0.9rem] leading-relaxed whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "experience":
        if (!experience || experience.length === 0) return null;
        return (
          <section key="experience" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">
              Professional Experience
            </h2>
            <div className="flex flex-col gap-4">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="break-inside-avoid hover:bg-gray-50/80 p-2 -mx-2 rounded cursor-pointer transition-colors"
                  onClick={() =>
                    document
                      .getElementById(`input-exp-position-${exp.id}`)
                      ?.focus()
                  }
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[1.05rem] font-bold">
                      {exp.position || "Position"}
                    </h3>
                    <span className="text-sm font-semibold">
                      {exp.startDate || "Start"}{" "}
                      {((exp.startDate && exp.endDate) ||
                        (!exp.startDate && exp.endDate)) &&
                        "–"}{" "}
                      {exp.endDate ||
                        (exp.startDate && "Present")}
                    </span>
                  </div>
                  <div className="text-sm font-bold italic mb-1.5">
                    {exp.company || "Company"}
                  </div>
                  {exp.description && (
                    <p className="text-[0.9rem] leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "skills":
        if (!skills || skills.length === 0) return null;
        return (
          <section key="skills" className="mb-6 break-inside-avoid">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">
              Skills
            </h2>
            <p className="text-[0.9rem] leading-relaxed font-medium break-words">
              {skills.join(" • ")}
            </p>
          </section>
        );

      case "projects":
        return projects && projects.length > 0 ? (
          <section key="projects" className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">
              Projects
            </h2>
            <div className="flex flex-col gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="break-inside-avoid hover:bg-gray-50/80 p-2 -mx-2 rounded cursor-pointer transition-colors"
                  onClick={() =>
                    document
                      .getElementById(`input-proj-name-${proj.id}`)
                      ?.focus()
                  }
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[1.05rem] font-bold text-black inline-block">
                      {proj.name || "Project Name"}
                    </h3>
                    {proj.link && (
                      <span className="text-xs">{proj.link}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-[0.9rem] leading-relaxed whitespace-pre-wrap mt-0.5">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white text-black p-12 w-[210mm] min-h-[297mm] shadow-lg font-serif box-border mx-auto print:shadow-none print:m-0 print:p-10"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      <header
        className="text-center border-b-[2px] border-black pb-4 mb-6 hover:bg-gray-50/80 p-4 -m-4 rounded cursor-pointer transition-colors group"
        onClick={() =>
          document.getElementById("input-personal-name")?.focus()
        }
      >
        <h1 className="text-[2.5rem] font-bold uppercase tracking-wider mb-2 leading-tight group-hover:text-brand-700 transition-colors break-words">
          {personal.name || "YOUR NAME"}
        </h1>
        {hasContactInfo ? (
          <>
            <div className="text-sm flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
              {personal.location && <span>{personal.location}</span>}
              {personal.location &&
                (personal.phone || personal.email) && <span>|</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.phone && personal.email && <span>|</span>}
              {personal.email && <span>{personal.email}</span>}
            </div>
            <div className="text-sm flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-1">
              {personal.linkedin && <span>{personal.linkedin}</span>}
              {personal.linkedin && personal.github && <span>|</span>}
              {personal.github && <span>{personal.github}</span>}
            </div>
            {hasExtras && (
              <div className="text-sm flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-1">
                {personal.dob && <span>DOB: {formatDate(personal.dob)}</span>}
                {personal.dob && personal.gender && <span>|</span>}
                {personal.gender && <span>{personal.gender}</span>}
                {(personal.dob || personal.gender) && personal.maritalStatus && <span>|</span>}
                {personal.maritalStatus && <span>{personal.maritalStatus}</span>}
                {(personal.dob || personal.gender || personal.maritalStatus) &&
                  personal.languages &&
                  personal.languages.length > 0 && <span>|</span>}
                {personal.languages && personal.languages.length > 0 && (
                  <span>Languages: {personal.languages.join(", ")}</span>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-[13px] text-gray-400 italic font-sans font-medium">
            Click to populate professional contact details
          </p>
        )}
      </header>

      {/* Render sections in order */}
      {orderedSections.map((sectionId) => renderSection(sectionId))}

      {/* Declaration — always last */}
      {declaration?.enabled && (
        <section className="mt-8 pt-4 border-t-[2px] border-gray-300">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-3 pb-1">
            Declaration
          </h2>
          <p className="text-[0.9rem] leading-relaxed italic mb-6">
            I hereby declare that the above information is true to the
            best of my knowledge and belief.
          </p>
          <div className="flex justify-between items-end">
            <div className="text-sm">
              {declaration.place && (
                <div>
                  <span className="font-bold">Place:</span>{" "}
                  {declaration.place}
                </div>
              )}
              {declaration.date && (
                <div>
                  <span className="font-bold">Date:</span>{" "}
                  {formatDate(declaration.date)}
                </div>
              )}
            </div>
            <div className="text-sm font-bold text-right">
              ({personal.name || "Your Name"})
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
