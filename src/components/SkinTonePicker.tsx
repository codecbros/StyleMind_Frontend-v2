import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export type SkinTonePickerProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const skinTones = [
  { name: 'Muy claro', color: '#FFDBAC' },
  { name: 'Claro', color: '#F1C27D' },
  { name: 'Medio claro', color: '#E0AC69' },
  { name: 'Medio', color: '#C68642' },
  { name: 'Medio oscuro', color: '#8D5524' },
  { name: 'Oscuro', color: '#5D4037' },
  { name: 'Muy oscuro', color: '#321911' },
];

export function SkinTonePicker({ value, onChange }: SkinTonePickerProps) {
  return (
    <div className="flex flex-wrap justify-start ml-2 gap-2">
      {skinTones.map((tone) => (
        <Button
          key={tone.color}
          className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            value === tone.color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
          }`}
          style={{ backgroundColor: tone.color }}
          onClick={() => onChange(tone.color)}
          title={tone.name}
          type="button"
        >
          {value === tone.color && (
            <Check className="text-white mx-auto" size={16} />
          )}
          <span className="sr-only">{tone.name}</span>
        </Button>
      ))}
    </div>
  );
}
