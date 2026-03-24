import React, { forwardRef } from "react";
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

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template }, ref) => {
    const TemplateComponent = templates[template] || templates.minimal;

    return (
      <div className="w-full flex justify-center items-start">
        <div className="w-full max-w-[210mm] overflow-x-auto bg-surface-900 md:bg-transparent p-2 sm:p-4 md:p-0 rounded-xl md:rounded-none overflow-hidden">
          {/* scaling for responsive preview but not printing */}
          <div className="min-w-[210mm] scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top flex justify-center print:scale-100 print:min-w-0">
            {/* The ref is attached heavily scoped here so printing catches exactly the resume without outer scales */}
            <div ref={ref} className="print:m-0 print:p-0 print:border-none print:shadow-none">
              <TemplateComponent data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
