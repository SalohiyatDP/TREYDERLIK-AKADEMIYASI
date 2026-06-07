import { Moon, Sun, Bell, Settings } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Professional Trading Academy
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          0 dan Professional darajagacha
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        {/* Settings */}
        <button
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-slate-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">TA</span>
        </div>
      </div>
    </header>
  );
}
