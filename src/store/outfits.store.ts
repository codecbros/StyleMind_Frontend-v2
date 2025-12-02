import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type GenerationMode = 'selection' | 'ai' | 'manual' | 'quick';

interface OutfitState {
  mode: GenerationMode;
  setMode: (mode: GenerationMode) => void;
}

export const useOutfitStore = create<OutfitState>()(
  persist(
    (set) => ({
      mode: 'selection',
      setMode: (mode) => set({ mode }),
    }),
    { name: 'outfit-selection' }
  )
);
