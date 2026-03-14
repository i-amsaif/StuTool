"use client";

import { useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

export interface PdfFile {
  id: string;
  file: File;
  previewUrl?: string;
}

interface FileUploaderProps {
  files: PdfFile[];
  onFilesChange: (files: PdfFile[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  title?: string;
  description?: string;
  iconColor?: string;
}

// Internal component for the sortable list item
function SortablePdfItem({ item, onRemove }: { item: PdfFile; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 mb-2 rounded-xl bg-slate-800/50 border border-white/[0.06] hover:border-brand-500/30 transition-colors group"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Drag Handle */}
        <div {...attributes} {...listeners} className="cursor-grab text-slate-500 hover:text-white shrink-0 p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </div>
        <div className="shrink-0 h-10 w-10 bg-brand-500/20 text-brand-400 rounded-lg flex items-center justify-center overflow-hidden">
          {item.previewUrl ? (
            <img src={item.previewUrl} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          )}
        </div>
        <div className="truncate pr-4">
          <p className="text-sm font-medium text-white truncate">{item.file.name}</p>
          <p className="text-xs text-slate-400">{(item.file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10 shrink-0"
        aria-label="Remove file"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function FileUploader({
  files,
  onFilesChange,
  accept = "application/pdf",
  multiple = true,
  maxFiles,
  title = "Select or drop files here",
  description = "Add files to begin processing.",
  iconColor = "group-hover:text-brand-400 group-hover:bg-brand-500/10",
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addFiles = (newFiles: File[]) => {
    let validFiles = newFiles;
    
    // Filter by accept type if specified (simplified check for generic mime types)
    if (accept && accept !== "*") {
      const acceptedTypes = accept.split(",").map(t => t.trim());
      validFiles = validFiles.filter(f => 
        acceptedTypes.some(type => {
          if (type.endsWith("/*")) {
            return f.type.startsWith(type.replace("/*", ""));
          }
          if (type.startsWith(".")) {
             return f.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return f.type === type;
        })
      );
    }

    if (maxFiles && files.length + validFiles.length > maxFiles) {
      validFiles = validFiles.slice(0, maxFiles - files.length);
      if (validFiles.length === 0) {
        alert(`You can only upload up to ${maxFiles} file(s).`);
        return;
      }
    }

    const newItems = validFiles.map((f) => ({
      id: Math.random().toString(36).substr(2, 9),
      file: f,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));
    
    onFilesChange([...files, ...newItems]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = files.findIndex((i) => i.id === active.id);
      const newIndex = files.findIndex((i) => i.id === over?.id);
      onFilesChange(arrayMove(files, oldIndex, newIndex));
    }
  };

  const removeFile = (id: string) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };
  
  const isUploadDisabled = maxFiles ? files.length >= maxFiles : false;

  return (
    <div className="flex flex-col gap-6">
      {/* Drag & Drop Area */}
      <div
        onDragOver={isUploadDisabled ? undefined : handleDragOver}
        onDragEnter={isUploadDisabled ? undefined : handleDragEnter}
        onDragLeave={isUploadDisabled ? undefined : handleDragLeave}
        onDrop={isUploadDisabled ? undefined : handleDrop}
        onClick={() => !isUploadDisabled && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 sm:p-12 text-center transition-all duration-300 flex flex-col items-center justify-center group ${
          isUploadDisabled 
            ? "border-slate-800 opacity-50 cursor-not-allowed bg-slate-900/50" 
            : isDragging 
              ? "border-brand-400 bg-brand-500/10 scale-[1.02]" 
              : "border-slate-600 hover:border-brand-400 cursor-pointer bg-slate-900/50"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
          disabled={isUploadDisabled}
        />
        <div className={`h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 transition-all duration-300 ${isUploadDisabled ? "" : "group-hover:scale-110 " + iconColor}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-slate-400 transition-colors ${isUploadDisabled ? "" : iconColor.split(' ')[0]}`}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold mb-2 transition-colors ${isUploadDisabled ? "text-slate-500" : "text-white " + iconColor.split(' ')[0]}`}>
          {isUploadDisabled ? `Maximum of ${maxFiles} files reached` : title}
        </h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-slate-900/30 rounded-2xl p-4 border border-white/[0.05]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h4 className="text-sm font-semibold text-slate-300">
              Files uploaded ({files.length}{maxFiles ? ` / ${maxFiles}` : ""})
            </h4>
            <span className="text-xs text-slate-500">Drag to reorder</span>
          </div>
          
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={files.map(f => f.id)} strategy={verticalListSortingStrategy}>
              {files.map((file) => (
                <SortablePdfItem key={file.id} item={file} onRemove={() => removeFile(file.id)} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
