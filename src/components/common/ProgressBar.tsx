import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export default function ProgressBar({
  progress,
  showLabel = false,
  height = 'md',
  color = 'primary',
}: ProgressBarProps) {
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    primary: 'from-primary-500 to-primary-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-orange-500 to-orange-600',
    danger: 'from-danger-500 to-danger-600',
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-slate-600 dark:text-slate-400">Progress</span>
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      <div className={`progress-bar ${heights[height]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
}
