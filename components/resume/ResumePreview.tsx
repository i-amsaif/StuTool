import React from "react";
import { ResumeData } from "@/lib/resumeSchema";
import MinimalTemplate from "./templates/Minimal";
import ModernTemplate from "./templates/Modern";
import ClassicTemplate from "./templates/Classic";

// Template registry
const templates: Record<string, React.FC<{ data: ResumeData }>> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
};

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const TemplateComponent = templates[template] || templates.minimal;

  return (
    <div className="w-full h-full">
      <TemplateComponent data={data} />
    </div>
  );
}
