import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import type React from 'react';
import { Button } from './ui/button';

interface ColorPickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onValueChange?: (value: string) => void;
  allowEmpty?: boolean;
}

export function ColorPicker({
  value,
  onValueChange,
  allowEmpty = false,
  className,
  ...props
}: ColorPickerProps) {
  const hasValue = Boolean(value && value !== '');
  // Solo mostrar el color si hay valor, sino mostrar gris
  // const displayValue = hasValue ? value : '#808080';
  const displayValue = hasValue ? value! : '#000000';

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Si está vacío y se permite vacío, enviar string vacío
    if (!newValue && allowEmpty) {
      onValueChange?.('');
    } else {
      onValueChange?.(newValue);
    }
  };

  const handleClear = () => {
    onValueChange?.('');
  };

  return (
    <div className="flex items-center gap-3">
      {/* Color preview + picker */}
      <div className="relative shrink-0">
        <input
          type="color"
          value={displayValue}
          onChange={handleColorChange}
          className={cn(
            'size-12 cursor-pointer rounded-md border-2 transition-all',
            hasValue
              ? 'border-input'
              : 'border-dashed border-muted-foreground/50',
            'bg-transparent overflow-hidden',
            '[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch-wrapper]:border-0',
            '[&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0',
            '[&::-moz-color-swatch]:rounded-lg [&::-moz-color-swatch]:border-0',
            !hasValue && 'opacity-40',
            className
          )}
          {...props}
        />

        {!hasValue && allowEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="size-0.5 rounded-full bg-muted-foreground" />
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={handleTextChange}
          placeholder={allowEmpty ? 'Sin color' : '#000000'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
            'ring-offset-background placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'uppercase'
          )}
          maxLength={7}
        />

        {allowEmpty && hasValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleClear}
            className="shrink-0"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
