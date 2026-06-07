import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  BarChart3,
  TrendingUp,
  Droplets,
  Brain,
  Package,
  Layers,
  Zap,
  Lock,
  CheckCircle,
} from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

const modules = [
  {
    id: 1,
    title: 'Treyding Asoslari',
    description: '16 ta mavzu: Treyding, Broker, Forex, CFD, Crypto va boshqalar',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-700',
    lessons: 16,
    duration: '4 soat',
  },
  {
    id: 2,
    title: 'Grafiklar',
    description: 'Line Chart, Candlestick va Interactive Simulator',
    icon: BarChart3,
    color: 'from-green-500 to-green-700',
    lessons: 8,
    duration: '3 soat',
  },
  {
    id: 3,
    title: 'Price Action',
    description: 'Trend, Range, Breakout, Pullback, Reversal',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-700',
    lessons: 10,
    duration: '3.5 soat',
  },
  {
    id: 4,
    title: 'Likvidlik',
    description: 'Buy/Sell Side Liquidity, Stop Hunt, Liquidity Grab',
    icon: Droplets,
    color: 'from-cyan-500 to-cyan-700',
    lessons: 12,
    duration: '4 soat',
  },
  {
    id: 5,
    title: 'Smart Money Concepts',
    description: 'BOS, CHOCH, MSS, Internal/External Structure',
    icon: Brain,
    color: 'from-orange-500 to-orange-700',
    lessons: 15,
    duration: '5 soat',
  },
  {
    id: 6,
    title: 'Order Block',
    description: 'Bullish/Bearish OB, Mitigation, Chart Simulator',
    icon: Package,
    color: 'from-pink-500 to-pink-700',
    lessons: 10,
    duration: '4 soat',
  },
  {
    id: 7,
    title: 'Fair Value Gap',
    description: 'FVG, IFVG, BISI, SIBI va animatsiyalar',
    icon: Layers,
    color: 'from-indigo-500 to-indigo-700',
    lessons: 12,
    duration: '4.5 soat',
  },
  {
    id: 8,
    title: 'ICT Concepts',
    description: 'PD Arrays, OTE, Silver Bullet, Kill Zones',
    icon: Zap,
    color: 'from-red-500 to-red-700',
    lessons: 20,
    duration: '8 soat',
    advanced: true,
  },
];

export default function ModulesPage() {
  const { moduleProgress } = useProgressStore();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          O'quv Modullar
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          8 ta professional modul orqali treydingni chuqur o'rganing
        </p>
      </motion.div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const progress = moduleProgress[module.id] || 0;
          const isCompleted = progress === 100;
          const isLocked = module.id > 1 && (moduleProgress[module.id - 1] || 0) < 100;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={isLocked ? '#' : `/modules/${module.id}`}
                className={`module-card relative ${
                  isLocked ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                onClick={(e) => isLocked && e.preventDefault()}
              >
                {/* Locked Badge */}
                {isLocked && (
                  <div className="absolute top-4 right-4 bg-slate-900 dark:bg-slate-700 p-2 rounded-full">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Completed Badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4 bg-success-600 p-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Module Number */}
                <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  MODUL {module.id}
                  {module.advanced && (
                    <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded">
                      Advanced
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  {module.description}
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{module.lessons} dars</span>
                  </div>
                  <div>⏱ {module.duration}</div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">
                      Progress
                    </span>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Action */}
                {!isLocked && (
                  <div className="mt-4">
                    <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                      {progress === 0
                        ? 'Boshlash →'
                        : progress === 100
                        ? 'Qayta ko\'rish →'
                        : 'Davom etish →'}
                    </span>
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 card bg-gradient-to-r from-primary-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 border-primary-200 dark:border-slate-700"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          📚 O'qish Yo'li
        </h2>
        <div className="space-y-3 text-slate-700 dark:text-slate-300">
          <p>✅ Har bir modulni ketma-ket tugatish tavsiya etiladi</p>
          <p>✅ Har bir darsda test va amaliy mashqlar mavjud</p>
          <p>✅ Modulni tugatish uchun kamida 80% to'g'ri javob kerak</p>
          <p>✅ Barcha modullarni tugatgach professional sertifikat oling</p>
        </div>
      </motion.div>
    </div>
  );
}
