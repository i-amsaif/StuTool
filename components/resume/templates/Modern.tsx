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

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, careerObjective, education, experience, projects, skills, declaration, sectionOrder } = data;

  const hasExtras =
    personal.dob || personal.gender || (personal.languages && personal.languages.length > 0) || personal.maritalStatus;

  // Separate sections into left vs right column content
  // Left column: contact, personal extras, skills
  // Right column: objective, then ordered sections (education, experience, projects), declaration last

  const rightSections = (sectionOrder || []).filter(
    (s) => s !== "personal" && s !== "skills" && s !== "declaration"
  );

  return (
    <div
      className="bg-white text-gray-800 w-[210mm] min-h-[297mm] shadow-lg flex flex-row overflow-hidden mx-auto box-border print:shadow-none print:m-0"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Left Column */}
      <div className="w-[35%] bg-slate-100 p-8 flex flex-col gap-8 border-r border-slate-200 print:bg-slate-100 shrink-0">
        <div
          className="flex flex-col gap-2 cursor-pointer hover:bg-slate-200/50 p-2 -m-2 rounded transition-colors group"
          onClick={() =>
            document.getElementById("input-personal-name")?.focus()
          }
        >
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 uppercase break-words group-hover:text-brand-600 transition-colors">
            {personal.name || "Your Name"}
          </h1>
          <div className="h-1.5 w-12 bg-blue-600 mt-2"></div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 text-sm mt-2">
          <h2 className="text-base font-bold uppercase tracking-widest text-slate-800 mb-1">
            Contact
          </h2>
          {personal.email && (
            <div className="break-all">
              <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                Email
              </span>
              {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="break-all">
              <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                Phone
              </span>
              {personal.phone}
            </div>
          )}
          {personal.location && (
            <div className="break-all">
              <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                Location
              </span>
              {personal.location}
            </div>
          )}
          {personal.linkedin && (
            <div className="break-all">
              <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                LinkedIn
              </span>
              {personal.linkedin}
            </div>
          )}
          {personal.github && (
            <div className="break-all">
              <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                GitHub
              </span>
              {personal.github}
            </div>
          )}

          {!(
            personal.email ||
            personal.phone ||
            personal.location ||
            personal.linkedin ||
            personal.github
          ) && (
            <p className="text-xs text-brand-500 italic font-medium">
              Click here to add contact info
            </p>
          )}
        </div>

        {/* Personal Extras */}
        {hasExtras && (
          <div className="flex flex-col gap-3 text-sm">
            <h2 className="text-base font-bold uppercase tracking-widest text-slate-800 mb-1">
              Personal
            </h2>
            {personal.dob && (
              <div>
                <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                  Date of Birth
                </span>
                {formatDate(personal.dob)}
              </div>
            )}
            {personal.gender && (
              <div>
                <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                  Gender
                </span>
                {personal.gender}
              </div>
            )}
            {personal.maritalStatus && (
              <div>
                <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                  Marital Status
                </span>
                {personal.maritalStatus}
              </div>
            )}
            {personal.languages && personal.languages.length > 0 && (
              <div>
                <span className="font-semibold block text-slate-500 text-[10px] uppercase tracking-wider">
                  Languages
                </span>
                {personal.languages.join(", ")}
              </div>
            )}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="flex flex-col gap-3 text-sm mt-2">
            <h2 className="text-base font-bold uppercase tracking-widest text-slate-800 mb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs font-semibold print:bg-slate-200 break-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-[65%] p-8 flex flex-col gap-8 bg-white print:bg-white shrink-0">
        {rightSections.map((sectionId) => {
          switch (sectionId) {
            case "careerObjective":
              return careerObjective ? (
                <section key="objective">
                  <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] print:bg-blue-100 print:color-adjust-exact">
                      🎯
                    </span>{" "}
                    Career Objective
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    {careerObjective}
                  </p>
                </section>
              ) : null;

            case "education":
              if (!education || education.length === 0) return null;
              return (
                <section key="education">
                  <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] print:bg-blue-100 print:color-adjust-exact">
                      🎓
                    </span>{" "}
                    Education
                  </h2>
                  <div className="flex flex-col gap-5">
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        className="break-inside-avoid cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded transition-colors"
                        onClick={() =>
                          document
                            .getElementById(
                              `input-edu-institution-${edu.id}`
                            )
                            ?.focus()
                        }
                      >
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-base font-bold text-slate-800">
                            {edu.institution || "Institution"}
                          </h3>
                          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded print:text-blue-700 print:bg-blue-50 print:color-adjust-exact whitespace-nowrap ml-2">
                            {edu.year || "Year"}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                          {DEGREE_VISIBLE_LEVELS.includes(edu.level) &&
                            edu.degree && (
                              <span className="text-sm font-medium text-blue-700">
                                {edu.degree}
                              </span>
                            )}
                          {!(DEGREE_VISIBLE_LEVELS.includes(edu.level) && edu.degree) && edu.level && (
                            <span className="text-sm font-medium text-blue-700">
                              {edu.level}
                            </span>
                          )}
                          {edu.board && (
                            <>
                              <span className="text-slate-400 text-xs">
                                |
                              </span>
                              <span className="text-sm text-slate-600">
                                {edu.board}
                              </span>
                            </>
                          )}
                          {edu.marks && (
                            <>
                              <span className="text-slate-400 text-xs">
                                |
                              </span>
                              <span className="text-sm text-slate-700 font-semibold">
                                {formatMarks(edu)}
                              </span>
                            </>
                          )}
                        </div>
                        {edu.description && (
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
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
                <section key="experience">
                  <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] print:bg-blue-100 print:color-adjust-exact">
                      💼
                    </span>{" "}
                    Experience
                  </h2>
                  <div className="flex flex-col gap-6">
                    {experience.map((exp) => (
                      <div
                        key={exp.id}
                        className="break-inside-avoid cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded transition-colors"
                        onClick={() =>
                          document
                            .getElementById(
                              `input-exp-company-${exp.id}`
                            )
                            ?.focus()
                        }
                      >
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-base font-bold text-slate-800">
                            {exp.position || "Position"}
                          </h3>
                          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded print:text-blue-700 print:bg-blue-50 print:color-adjust-exact whitespace-nowrap ml-2">
                            {exp.startDate || "Start"}{" "}
                            {((exp.startDate && exp.endDate) ||
                              (!exp.startDate && exp.endDate)) &&
                              "-"}{" "}
                            {exp.endDate ||
                              (exp.startDate && "Present")}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-slate-600 mb-2">
                          {exp.company || "Company"}
                        </div>
                        {exp.description && (
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case "projects":
              return projects && projects.length > 0 ? (
                <section key="projects">
                  <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] print:bg-blue-100 print:color-adjust-exact">
                      🚀
                    </span>{" "}
                    Projects
                  </h2>
                  <div className="flex flex-col gap-5">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="break-inside-avoid cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded transition-colors"
                        onClick={() =>
                          document
                            .getElementById(
                              `input-proj-name-${proj.id}`
                            )
                            ?.focus()
                        }
                      >
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-base font-bold text-slate-800">
                            {proj.name || "Project Name"}
                          </h3>
                          {proj.link && (
                            <a
                              href={proj.link}
                              className="text-xs font-medium text-blue-600 hover:underline"
                            >
                              {proj.link}
                            </a>
                          )}
                        </div>
                        {proj.description && (
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mt-1">
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
        })}

        {/* Declaration — always last in right column */}
        {declaration?.enabled && (
          <section className="mt-8 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] print:bg-blue-100 print:color-adjust-exact">
                📜
              </span>{" "}
              Declaration
            </h2>
            <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
              I hereby declare that the above information is true to the
              best of my knowledge and belief.
            </p>
            <div className="flex justify-between items-end">
              <div className="text-sm text-slate-700">
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
              <div className="text-sm text-slate-800 font-semibold text-right">
                ({personal.name || "Your Name"})
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
