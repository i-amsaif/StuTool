import React, { useState } from "react";
import { ResumeData } from "@/lib/resumeSchema";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2, ChevronDown, ChevronRight, User, Briefcase, GraduationCap, Code, Sparkles, Eye, EyeOff, Wand2, ChevronUp } from "lucide-react";

interface ResumeFormProps {
  data: ResumeData;
  updatePersonal: (field: keyof ResumeData["personal"], value: string) => void;
  updateArrayItem: (section: "education" | "experience" | "projects", id: string, field: string, value: string) => void;
  addArrayItem: (section: "education" | "experience" | "projects") => void;
  removeArrayItem: (section: "education" | "experience" | "projects", id: string) => void;
  reorderArrayItem: (section: "education" | "experience" | "projects", oldIndex: number, newIndex: number) => void;
  updateSkills: (skills: string[]) => void;
  visibleSections: { experience: boolean, education: boolean, projects: boolean, skills: boolean };
  toggleVisibility: (section: "experience" | "education" | "projects" | "skills") => void;
}

const SortableItemWrapper = ({ id, children }: { id: string, children: (dragHandleProps: any) => React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    position: 'relative' as any,
    zIndex: isDragging ? 10 : 1,
  };
  return <div ref={setNodeRef} style={style}>{children({ ...attributes, ...listeners })}</div>;
};

export default function ResumeForm({
  data,
  updatePersonal,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  reorderArrayItem,
  updateSkills,
  visibleSections,
  toggleVisibility
}: ResumeFormProps) {
  // Mobile Optimized Input Classes (text-base stops iOS zoom, py-2.5 gives thumb room)
  const inputClass = "bg-surface-900 border border-surface-700/60 rounded-lg px-3 py-2.5 sm:py-2 text-base sm:text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all w-full placeholder-surface-500";
  const labelClass = "text-[11px] font-bold text-surface-400 mb-1.5 block uppercase tracking-wider";

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    personal: true,
    experience: false,
    education: false,
    projects: false,
    skills: false
  });

  const [skillInput, setSkillInput] = useState("");

  const toggleSection = (sec: string) => setExpanded(p => {
    // Accordion Logic: expand only 1 section, tracking visual scrolling down
    const isCurrentlyOpen = p[sec];
    const newState = { personal: false, experience: false, education: false, projects: false, skills: false };
    newState[sec] = !isCurrentlyOpen;
    return newState;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent, section: "education" | "experience" | "projects") => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = data[section].findIndex(item => item.id === active.id);
      const newIndex = data[section].findIndex(item => item.id === over.id);
      reorderArrayItem(section, oldIndex, newIndex);
    }
  };

  const moveItem = (section: "education" | "experience" | "projects", index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      reorderArrayItem(section, index, index - 1);
    } else if (direction === 'down' && index < data[section].length - 1) {
      reorderArrayItem(section, index, index + 1);
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !data.skills.includes(newSkill)) {
        updateSkills([...data.skills, newSkill]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...data.skills];
    newSkills.splice(index, 1);
    updateSkills(newSkills);
  };

  const handleAIAssist = (section: "experience" | "projects" | "education", id: string, text: string) => {
    if (!text.trim()) return;
    const lines = text.split('\n').map(l => l.trim().replace(/^[-•*☛]\s*/, '')).filter(Boolean);
    const improved = lines.map(l => {
       const capitalized = l.charAt(0).toUpperCase() + l.slice(1);
       return `• ${capitalized}${capitalized.endsWith('.') ? '' : '.'}`;
    }).join('\n');
    updateArrayItem(section, id, "description", improved);
  };

  const SectionHeader = ({ id, title, icon: Icon, isRequired = false }: { id: string, title: string, icon: any, isRequired?: boolean }) => (
    <div className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface-800/40 border-b border-surface-700/50 group cursor-pointer hover:bg-surface-800 transition-colors" onClick={() => toggleSection(id)}>
      <div className="flex items-center gap-3 flex-1">
        <div className="p-2 bg-surface-700/50 rounded-lg text-brand-400">
          <Icon size={18} />
        </div>
        <h2 className="text-[15px] sm:text-base font-bold text-white tracking-tight">{title}</h2>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5">
        {!isRequired && id in visibleSections && (
          <button 
            onClick={(e) => { e.stopPropagation(); toggleVisibility(id as any); }}
            className={`p-2 sm:p-1.5 rounded-md transition-colors ${visibleSections[id as keyof typeof visibleSections] ? "text-brand-400 hover:bg-brand-500/20" : "text-surface-500 hover:bg-surface-700"}`}
            title={visibleSections[id as keyof typeof visibleSections] ? "Visible in preview" : "Hidden from preview"}
          >
            {visibleSections[id as keyof typeof visibleSections] ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
        <div className="text-surface-400 p-2 sm:p-1.5 hover:bg-surface-700/80 rounded-md transition-colors">
          {expanded[id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 w-full max-w-2xl mx-auto pb-12">
      
      {/* Personal Info */}
      <section className="bg-surface-800/20 border border-surface-700/50 rounded-2xl overflow-hidden shadow-lg">
        <SectionHeader id="personal" title="Personal Info" icon={User} isRequired={true} />
        {expanded.personal && (
           <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5 animate-in slide-in-from-top-2 duration-200">
            <div>
              <label className={labelClass}>Full Name</label>
              <input id="input-personal-name" className={inputClass} placeholder="e.g. Jane Doe" value={data.personal.name} onChange={(e) => updatePersonal("name", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input id="input-personal-email" className={inputClass} placeholder="e.g. jane@example.com" type="email" value={data.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input id="input-personal-phone" className={inputClass} placeholder="e.g. +1 (555) 123-4567" type="tel" value={data.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input id="input-personal-location" className={inputClass} placeholder="e.g. New York, NY" value={data.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input id="input-personal-linkedin" className={inputClass} placeholder="e.g. linkedin.com/in/janedoe" value={data.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input id="input-personal-github" className={inputClass} placeholder="e.g. github.com/janedoe" value={data.personal.github} onChange={(e) => updatePersonal("github", e.target.value)} />
            </div>
          </div>
        )}
      </section>

      {/* Experience */}
      <section className={`bg-surface-800/20 border border-surface-700/50 rounded-2xl overflow-hidden shadow-lg transition-opacity ${!visibleSections.experience ? 'opacity-50' : ''}`}>
        <SectionHeader id="experience" title="Professional Experience" icon={Briefcase} />
        {expanded.experience && (
          <div className="p-4 sm:p-5 flex flex-col gap-5 animate-in slide-in-from-top-2 duration-200">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, "experience")}>
              <SortableContext items={data.experience.map(e => e.id)} strategy={verticalListSortingStrategy}>
                {data.experience.map((exp, index) => (
                  <SortableItemWrapper key={exp.id} id={exp.id}>
                    {(dragHandleProps) => (
                      <div className="bg-surface-800/40 p-4 sm:p-5 rounded-xl border border-surface-700 relative flex flex-col gap-4 group">
                        
                        {/* Mobile and Desktop Action Strip */}
                        <div className="flex justify-between items-center absolute top-2 right-2 gap-1.5 bg-surface-800/80 p-1 rounded-md shadow-md sm:bg-transparent sm:shadow-none sm:p-0">
                           <div className="flex md:hidden bg-surface-700/50 rounded overflow-hidden">
                             <button onClick={() => moveItem("experience", index, "up")} disabled={index === 0} className="p-1.5 text-surface-200 disabled:opacity-30 border-r border-surface-600/50 hover:bg-surface-600/50"><ChevronUp size={16}/></button>
                             <button onClick={() => moveItem("experience", index, "down")} disabled={index === data.experience.length - 1} className="p-1.5 text-surface-200 disabled:opacity-30 hover:bg-surface-600/50"><ChevronDown size={16}/></button>
                           </div>
                           <button className="text-red-400 hover:text-red-300 text-xs p-1.5 sm:p-2 rounded-md transition-colors sm:opacity-0 sm:group-hover:opacity-100 bg-surface-700/50 sm:bg-transparent" onClick={() => removeArrayItem("experience", exp.id)}>
                             <Trash2 size={16} />
                           </button>
                           <button {...dragHandleProps} className="text-surface-400 hover:text-white cursor-grab active:cursor-grabbing p-1.5 hidden md:block">
                             <GripVertical size={16} />
                           </button>
                        </div>

                        <h3 className="text-sm font-semibold text-surface-200 mt-6 sm:mt-1 mb-2">Role Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Company Name</label><input id={`input-exp-company-${exp.id}`} className={inputClass} placeholder="Acme Corp" value={exp.company} onChange={(e) => updateArrayItem("experience", exp.id, "company", e.target.value)} /></div>
                          <div><label className={labelClass}>Job Title</label><input id={`input-exp-position-${exp.id}`} className={inputClass} placeholder="Senior Developer" value={exp.position} onChange={(e) => updateArrayItem("experience", exp.id, "position", e.target.value)} /></div>
                          <div><label className={labelClass}>Start Date</label><input className={inputClass} placeholder="Jan 2021" value={exp.startDate} onChange={(e) => updateArrayItem("experience", exp.id, "startDate", e.target.value)} /></div>
                          <div><label className={labelClass}>End Date</label><input className={inputClass} placeholder="Present" value={exp.endDate} onChange={(e) => updateArrayItem("experience", exp.id, "endDate", e.target.value)} /></div>
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 sm:mb-1.5 mt-1 gap-2">
                            <label className={labelClass} style={{marginBottom: 0}}>Description & Achievements</label>
                            <button onClick={() => handleAIAssist("experience", exp.id, exp.description)} className="text-[11px] sm:text-[10px] w-full sm:w-auto justify-center flex items-center gap-1.5 bg-brand-500/10 text-brand-400 hover:bg-brand-500/25 hover:text-brand-300 px-3 py-2 sm:px-2.5 sm:py-1 rounded sm:rounded-full border border-brand-500/20 transition-colors font-semibold">
                              <Wand2 size={12} /> Auto-Format Bullets
                            </button>
                          </div>
                          <textarea id={`input-exp-desc-${exp.id}`} className={`${inputClass} min-h-[120px] resize-y leading-relaxed`} placeholder="- Led a team of..." value={exp.description} onChange={(e) => updateArrayItem("experience", exp.id, "description", e.target.value)} />
                        </div>
                      </div>
                    )}
                  </SortableItemWrapper>
                ))}
              </SortableContext>
            </DndContext>
            <button className="border border-dashed border-surface-600 hover:border-brand-500 hover:bg-brand-500/5 text-surface-300 hover:text-white px-4 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 mt-2" onClick={() => addArrayItem("experience")}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </section>

      {/* Education */}
      <section className={`bg-surface-800/20 border border-surface-700/50 rounded-2xl overflow-hidden shadow-lg transition-opacity ${!visibleSections.education ? 'opacity-50' : ''}`}>
        <SectionHeader id="education" title="Education History" icon={GraduationCap} />
        {expanded.education && (
           <div className="p-4 sm:p-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
             <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, "education")}>
              <SortableContext items={data.education.map(e => e.id)} strategy={verticalListSortingStrategy}>
                {data.education.map((edu, index) => (
                  <SortableItemWrapper key={edu.id} id={edu.id}>
                    {(dragHandleProps) => (
                      <div className="bg-surface-800/40 p-4 sm:p-5 rounded-xl border border-surface-700 relative flex flex-col gap-4 group">
                        
                        <div className="flex justify-between items-center absolute top-2 right-2 gap-1.5 bg-surface-800/80 p-1 rounded-md shadow-md sm:bg-transparent sm:shadow-none sm:p-0">
                           <div className="flex md:hidden bg-surface-700/50 rounded overflow-hidden">
                             <button onClick={() => moveItem("education", index, "up")} disabled={index === 0} className="p-1.5 text-surface-200 disabled:opacity-30 border-r border-surface-600/50 hover:bg-surface-600/50"><ChevronUp size={16}/></button>
                             <button onClick={() => moveItem("education", index, "down")} disabled={index === data.education.length - 1} className="p-1.5 text-surface-200 disabled:opacity-30 hover:bg-surface-600/50"><ChevronDown size={16}/></button>
                           </div>
                           <button className="text-red-400 hover:text-red-300 text-xs p-1.5 sm:p-2 rounded-md transition-colors sm:opacity-0 sm:group-hover:opacity-100 bg-surface-700/50 sm:bg-transparent" onClick={() => removeArrayItem("education", edu.id)}>
                             <Trash2 size={16} />
                           </button>
                           <button {...dragHandleProps} className="text-surface-400 hover:text-white cursor-grab active:cursor-grabbing p-1.5 hidden md:block">
                             <GripVertical size={16} />
                           </button>
                        </div>

                        <h3 className="text-sm font-semibold text-surface-200 mt-6 sm:mt-1 mb-2">School Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>School / University</label><input id={`input-edu-school-${edu.id}`} className={inputClass} placeholder="State University" value={edu.school} onChange={(e) => updateArrayItem("education", edu.id, "school", e.target.value)} /></div>
                          <div><label className={labelClass}>Degree</label><input id={`input-edu-degree-${edu.id}`} className={inputClass} placeholder="B.S. Computer Science" value={edu.degree} onChange={(e) => updateArrayItem("education", edu.id, "degree", e.target.value)} /></div>
                          <div><label className={labelClass}>Start Date</label><input className={inputClass} placeholder="Sep 2016" value={edu.startDate} onChange={(e) => updateArrayItem("education", edu.id, "startDate", e.target.value)} /></div>
                          <div><label className={labelClass}>End Date</label><input className={inputClass} placeholder="May 2020" value={edu.endDate} onChange={(e) => updateArrayItem("education", edu.id, "endDate", e.target.value)} /></div>
                        </div>
                        <div>
                          <label className={labelClass}>Additional Details</label>
                          <textarea className={`${inputClass} min-h-[90px]`} placeholder="GPA: 3.8/4.0, Honors..." value={edu.description} onChange={(e) => updateArrayItem("education", edu.id, "description", e.target.value)} />
                        </div>
                      </div>
                    )}
                  </SortableItemWrapper>
                ))}
              </SortableContext>
            </DndContext>
            <button className="border border-dashed border-surface-600 hover:border-brand-500 hover:bg-brand-500/5 text-surface-300 hover:text-white px-4 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 mt-2" onClick={() => addArrayItem("education")}>
              <Plus size={16} /> Add Education
            </button>
           </div>
        )}
      </section>

      {/* Projects */}
      <section className={`bg-surface-800/20 border border-surface-700/50 rounded-2xl overflow-hidden shadow-lg transition-opacity ${!visibleSections.projects ? 'opacity-50' : ''}`}>
        <SectionHeader id="projects" title="Notable Projects" icon={Code} />
        {expanded.projects && (
           <div className="p-4 sm:p-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
             <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, "projects")}>
              <SortableContext items={data.projects.map(e => e.id)} strategy={verticalListSortingStrategy}>
                {data.projects.map((proj, index) => (
                  <SortableItemWrapper key={proj.id} id={proj.id}>
                    {(dragHandleProps) => (
                      <div className="bg-surface-800/40 p-4 sm:p-5 rounded-xl border border-surface-700 relative flex flex-col gap-4 group">
                        
                        <div className="flex justify-between items-center absolute top-2 right-2 gap-1.5 bg-surface-800/80 p-1 rounded-md shadow-md sm:bg-transparent sm:shadow-none sm:p-0">
                           <div className="flex md:hidden bg-surface-700/50 rounded overflow-hidden">
                             <button onClick={() => moveItem("projects", index, "up")} disabled={index === 0} className="p-1.5 text-surface-200 disabled:opacity-30 border-r border-surface-600/50 hover:bg-surface-600/50"><ChevronUp size={16}/></button>
                             <button onClick={() => moveItem("projects", index, "down")} disabled={index === data.projects.length - 1} className="p-1.5 text-surface-200 disabled:opacity-30 hover:bg-surface-600/50"><ChevronDown size={16}/></button>
                           </div>
                           <button className="text-red-400 hover:text-red-300 text-xs p-1.5 sm:p-2 rounded-md transition-colors sm:opacity-0 sm:group-hover:opacity-100 bg-surface-700/50 sm:bg-transparent" onClick={() => removeArrayItem("projects", proj.id)}>
                             <Trash2 size={16} />
                           </button>
                           <button {...dragHandleProps} className="text-surface-400 hover:text-white cursor-grab active:cursor-grabbing p-1.5 hidden md:block">
                             <GripVertical size={16} />
                           </button>
                        </div>

                        <h3 className="text-sm font-semibold text-surface-200 mt-6 sm:mt-1 mb-2">Project Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className={labelClass}>Project Name</label><input id={`input-proj-name-${proj.id}`} className={inputClass} placeholder="Portfolio API" value={proj.name} onChange={(e) => updateArrayItem("projects", proj.id, "name", e.target.value)} /></div>
                          <div><label className={labelClass}>Link (URL)</label><input className={inputClass} placeholder="https://..." value={proj.link} onChange={(e) => updateArrayItem("projects", proj.id, "link", e.target.value)} /></div>
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 sm:mb-1.5 mt-1 gap-2">
                            <label className={labelClass} style={{marginBottom: 0}}>Description</label>
                            <button onClick={() => handleAIAssist("projects", proj.id, proj.description)} className="text-[11px] sm:text-[10px] w-full sm:w-auto justify-center flex items-center gap-1.5 bg-brand-500/10 text-brand-400 hover:bg-brand-500/25 hover:text-brand-300 px-3 py-2 sm:px-2.5 sm:py-1 rounded sm:rounded-full border border-brand-500/20 transition-colors font-semibold">
                              <Wand2 size={12} /> Auto-Format Bullets
                            </button>
                          </div>
                          <textarea id={`input-proj-desc-${proj.id}`} className={`${inputClass} min-h-[90px]`} placeholder="- Built a REST API..." value={proj.description} onChange={(e) => updateArrayItem("projects", proj.id, "description", e.target.value)} />
                        </div>
                      </div>
                    )}
                  </SortableItemWrapper>
                ))}
              </SortableContext>
            </DndContext>
            <button className="border border-dashed border-surface-600 hover:border-brand-500 hover:bg-brand-500/5 text-surface-300 hover:text-white px-4 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 mt-2" onClick={() => addArrayItem("projects")}>
              <Plus size={16} /> Add Project
            </button>
           </div>
        )}
      </section>

      {/* Skills */}
      <section className={`bg-surface-800/20 border border-surface-700/50 rounded-2xl overflow-hidden shadow-lg transition-opacity ${!visibleSections.skills ? 'opacity-50' : ''}`}>
        <SectionHeader id="skills" title="Technical Skills" icon={Sparkles} />
        {expanded.skills && (
          <div className="p-4 sm:p-5 animate-in slide-in-from-top-2 duration-200">
            <label className={labelClass}>Add a skill (Press Enter)</label>
            <input 
              className={inputClass} 
              placeholder="e.g. React, TypeScript, Python..." 
              value={skillInput} 
              onChange={(e) => setSkillInput(e.target.value)} 
              onKeyDown={handleAddSkill}
            />
            {data.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {data.skills.map((skill, index) => (
                  <div key={`${skill}-${index}`} className="flex items-center gap-2 px-3 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full text-[13px] font-medium text-brand-300 shadow-sm animate-in zoom-in-95 duration-200">
                    <span>{skill}</span>
                    <button onClick={() => removeSkill(index)} className="hover:text-red-400 transition-colors focus:outline-none rounded-full ml-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

    </div>
  );
}
