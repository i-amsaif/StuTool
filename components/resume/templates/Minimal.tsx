import React from "react";
import { ResumeData, DEGREE_VISIBLE_LEVELS } from "@/lib/resumeSchema";

interface MinimalTemplateProps {
  data: ResumeData;
}

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

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personal, careerObjective, education, experience, projects, skills, declaration, sectionOrder } = data;

  const hasContactInfo =
    personal.email ||
    personal.phone ||
    personal.location ||
    personal.linkedin ||
    personal.github;

  const hasExtras =
    personal.dob || personal.gender || (personal.languages && personal.languages.length > 0) || personal.maritalStatus;

  // Determine render order from sectionOrder, excluding 'personal' (always header)
  const orderedSections = (sectionOrder || []).filter((s) => s !== "personal");

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "careerObjective":
        return careerObjective ? (
          <section key="objective" className="mb-7">
            <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
              Career Objective
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              {careerObjective}
            </p>
          </section>
        ) : null;

      case "education":
        if (!education || education.length === 0) return null;
        return (
          <section key="education" className="mb-7">
            <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 rounded-lg"
                  onClick={() =>
                    document
                      .getElementById(`input-edu-institution-${edu.id}`)
                      ?.focus()
                  }
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {edu.institution || "Institution Name"}
                    </h3>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-2">
                      {edu.year || "Year"}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    {DEGREE_VISIBLE_LEVELS.includes(edu.level) && edu.degree && (
                      <span className="text-sm text-gray-700 italic">
                        {edu.degree}
                      </span>
                    )}
                    {!(DEGREE_VISIBLE_LEVELS.includes(edu.level) && edu.degree) && edu.level && (
                      <span className="text-sm text-gray-700 italic">
                        {edu.level}
                      </span>
                    )}
                    {edu.board && (
                      <>
                        <span className="text-gray-400 text-xs">|</span>
                        <span className="text-sm text-gray-600">
                          {edu.board}
                        </span>
                      </>
                    )}
                    {edu.marks && (
                      <>
                        <span className="text-gray-400 text-xs">|</span>
                        <span className="text-sm text-gray-700 font-semibold">
                          {formatMarks(edu)}
                        </span>
                      </>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
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
          <section key="experience" className="mb-7">
            <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
              Experience
            </h2>
            <div className="flex flex-col gap-5">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 fill-transparent rounded-lg"
                  onClick={() =>
                    document
                      .getElementById(`input-exp-position-${exp.id}`)
                      ?.focus()
                  }
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {exp.position || "Position / Title"}
                    </h3>
                    <span className="text-sm text-gray-600 font-medium">
                      {exp.startDate || "Start"}{" "}
                      {((exp.startDate && exp.endDate) ||
                        (!exp.startDate && exp.endDate)) &&
                        "-"}{" "}
                      {exp.endDate ||
                        (exp.startDate && "Present") ||
                        "End"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 italic mb-2">
                    {exp.company || "Company Name"}
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
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
          <section key="skills" className="mb-7">
            <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
              Skills
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed font-medium break-words">
              {skills.join(" • ")}
            </div>
          </section>
        );

      case "projects":
        return projects && projects.length > 0 ? (
          <section key="projects" className="mb-7">
            <h2 className="text-[1.1rem] font-bold border-b border-gray-400 mb-4 pb-1 uppercase tracking-wider text-gray-800">
              Projects
            </h2>
            <div className="flex flex-col gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 rounded-lg"
                  onClick={() =>
                    document
                      .getElementById(`input-proj-name-${proj.id}`)
                      ?.focus()
                  }
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {proj.name || "Project Name"}
                    </h3>
                    {proj.link && (
                      <span className="text-xs text-gray-500 ml-2">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case "declaration":
        return declaration?.enabled ? (
          <section
            key="declaration"
            className="mt-8 pt-4 border-t border-gray-300"
          >
            <h2 className="text-[1.1rem] font-bold mb-3 uppercase tracking-wider text-gray-800">
              Declaration
            </h2>
            <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
              I hereby declare that the above information is true to the
              best of my knowledge and belief.
            </p>
            <div className="flex justify-between items-end">
              <div className="text-sm text-gray-700">
                {declaration.place && (
                  <div>
                    <span className="font-medium">Place:</span>{" "}
                    {declaration.place}
                  </div>
                )}
                {declaration.date && (
                  <div>
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(declaration.date)}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-800 font-semibold text-right">
                ({personal.name || "Your Name"})
              </div>
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="bg-white text-black p-8 sm:p-12 w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-lg">
      {/* Contact Info */}
      <header
        className="text-center mb-8 hover:bg-gray-50 transition-colors rounded-xl p-2 -mx-2 cursor-pointer group"
        onClick={() =>
          document.getElementById("input-personal-name")?.focus()
        }
      >
        <h1 className="text-3xl font-bold mb-2 group-hover:text-brand-600 transition-colors break-words">
          {personal.name || "Your Name"}
        </h1>
        {hasContactInfo ? (
          <>
            <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2">
              {personal.email && <span>{personal.email}</span>}
              {personal.email && personal.phone && (
                <span className="text-gray-400">•</span>
              )}
              {personal.phone && <span>{personal.phone}</span>}
              {(personal.email || personal.phone) &&
                personal.location && (
                  <span className="text-gray-400">•</span>
                )}
              {personal.location && <span>{personal.location}</span>}
            </div>
            <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2 mt-1">
              {personal.linkedin && (
                <span>LinkedIn: {personal.linkedin}</span>
              )}
              {personal.linkedin && personal.github && (
                <span className="text-gray-400">•</span>
              )}
              {personal.github && (
                <span>GitHub: {personal.github}</span>
              )}
            </div>
            {hasExtras && (
              <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2 mt-1">
                {personal.dob && <span>DOB: {formatDate(personal.dob)}</span>}
                {personal.dob && personal.gender && (
                  <span className="text-gray-400">•</span>
                )}
                {personal.gender && <span>{personal.gender}</span>}
                {(personal.dob || personal.gender) && personal.maritalStatus && (
                  <span className="text-gray-400">•</span>
                )}
                {personal.maritalStatus && <span>{personal.maritalStatus}</span>}
                {(personal.dob || personal.gender || personal.maritalStatus) &&
                  personal.languages &&
                  personal.languages.length > 0 && (
                    <span className="text-gray-400">•</span>
                  )}
                {personal.languages && personal.languages.length > 0 && (
                  <span>Languages: {personal.languages.join(", ")}</span>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-brand-500 italic font-medium">
            Click here to add your contact details
          </p>
        )}
      </header>

      {/* Render sections in order */}
      {orderedSections.map((sectionId) => renderSection(sectionId))}
    </div>
  );
}
