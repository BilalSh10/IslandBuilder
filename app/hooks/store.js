import { create } from 'zustand';

export const useStore = create((set) => ({
  objects: [],
  addObject: (pos, model) => 
    set((state) => ({ objects: [...state.objects, { pos, model }] })),
}));