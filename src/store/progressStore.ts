import { create } from 'zustand';
import { getAllProgress, getModuleProgress } from '../lib/db';

interface ProgressState {
  overallProgress: number;
  moduleProgress: Record<number, number>;
  loading: boolean;
  loadProgress: () => Promise<void>;
  refreshModuleProgress: (moduleId: number) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  overallProgress: 0,
  moduleProgress: {},
  loading: false,
  
  loadProgress: async () => {
    set({ loading: true });
    try {
      const progress = await getAllProgress();
      const moduleProgress: Record<number, number> = {};
      
      progress.modules.forEach((m) => {
        moduleProgress[m.moduleId] = m.percentage;
      });
      
      set({
        overallProgress: progress.overall.percentage,
        moduleProgress,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading progress:', error);
      set({ loading: false });
    }
  },
  
  refreshModuleProgress: async (moduleId: number) => {
    try {
      const progress = await getModuleProgress(moduleId);
      set((state) => ({
        moduleProgress: {
          ...state.moduleProgress,
          [moduleId]: progress.percentage,
        },
      }));
      
      // Refresh overall progress
      await get().loadProgress();
    } catch (error) {
      console.error('Error refreshing module progress:', error);
    }
  },
}));
