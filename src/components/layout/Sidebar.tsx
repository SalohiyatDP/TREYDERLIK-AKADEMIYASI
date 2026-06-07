import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  LineChart,
  BookMarked,
  FileText,
  Award,
  TrendingUp,
} from 'lucide-react';
import { useProgressStore } from '../../store/progressStore';

const menuItems = [
  { path: '/', icon: Home, label: 'Bosh sahifa' },
  { path: '/modules', icon: BookOpen, label: 'Modullar' },
  { path: '/backtest', icon: LineChart, label: 'Backtest' },
  { path: '/journal', icon: BookMarked, label: 'Jurnal' },
  { path: '/exams', icon: FileText, label: 'Imtihonlar' },
  { path: '/certificates', icon: Award, label: 'Sertifikatlar' },
];

export default function Sidebar() {
  const location = useLocation();
  const { overallProgress } = useProgressStore();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Treyderlik
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Akademiyasi
            </p>
          </div>
        </Link>
      </div>

      {/* Progress */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Umumiy progress
            </span>
            <span className="font-semibold text-primary-600 dark:text-primary-400">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-center text-slate-500 dark:text-slate-400">
          Version 1.0.0
          <br />
          © 2024 Trading Academy
        </p>
      </div>
    </aside>
  );
}
