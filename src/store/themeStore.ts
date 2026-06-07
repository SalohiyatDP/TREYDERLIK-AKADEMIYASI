import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// Load theme from localStorage
const loadTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('theme-storage');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.state?.theme || 'dark';
    } catch {
      return 'dark';
    }
  }
  return 'dark';
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: loadTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-storage', JSON.stringify({ state: { theme: newTheme } }));
      return { theme: newTheme };
    }),
  setTheme: (theme) => {
    localStorage.setItem('theme-storage', JSON.stringify({ state: { theme } }));
    set({ theme });
  },
}));
