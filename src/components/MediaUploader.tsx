import React, { useCallback, useRef, useState } from 'react';
import { Upload, X, FileVideo, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MediaUploaderProps {
  accept?: string;
  multiple?: boolean;
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
  className?: string;
}

export function MediaUploader({ accept = 'video/*,image/*', multiple = true, label, files, onChange, className }: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    onChange(multiple ? [...files, ...arr] : arr.slice(0, 1));
  }, [files, multiple, onChange]);

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-medium">{label}</p>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Arraste arquivos ou clique para selecionar</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li key={i} className="flex items-center gap-2 rounded-md border bg-card p-2 text-sm">
              {file.type.startsWith('video/') ? (
                <FileVideo className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <ImageIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className="truncate flex-1">{file.name}</span>
              <span className="text-muted-foreground text-xs shrink-0">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(i)}>
                <X className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
