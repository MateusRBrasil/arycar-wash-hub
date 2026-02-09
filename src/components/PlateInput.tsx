import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { normalizePlate, isValidPlate } from '@/lib/plate';
import { cn } from '@/lib/utils';

interface PlateInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
}

export function PlateInput({ value, onChange, className, error }: PlateInputProps) {
  const [touched, setTouched] = useState(false);
  const normalized = normalizePlate(value);
  const valid = normalized.length === 0 || isValidPlate(normalized);
  const showError = touched && normalized.length > 0 && !valid;

  return (
    <div className={cn('space-y-1', className)}>
      <Input
        value={value}
        onChange={(e) => onChange(normalizePlate(e.target.value))}
        onBlur={() => setTouched(true)}
        placeholder="ABC1D23"
        maxLength={7}
        className={cn(
          'font-mono text-lg tracking-widest uppercase',
          showError && 'border-destructive focus-visible:ring-destructive'
        )}
      />
      {(showError || error) && (
        <p className="text-sm text-destructive">
          {error || 'Placa inválida. Use AAA0A00 (Mercosul) ou AAA0000 (antiga).'}
        </p>
      )}
    </div>
  );
}
