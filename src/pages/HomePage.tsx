import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  TrendingUp,
  Award,
  Target,
  LineChart,
  BookMarked,
} from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

export default function HomePage() {
  const { overallProgress, moduleProgress } = useProgressStore();

  const features = [
    {
      icon: BookOpen,
      title: '8 ta Professional Modul',
      description: 'Treyding asoslaridan ICT gacha to\'liq bilim',
      color: 'text-blue-500',
    },
    {
      icon: LineChart,
      title: 'Interaktiv Simulyatorlar',
      description: 'Chart, Candle va Backtest simulyatorlari',
      color: 'text-green-500',
    },
    {
      icon: Target,
      title: 'Amaliy Mashqlar',
      description: 'Real treyd vaziyatlarini simulyatsiya qilish',
      color: 'text-purple-500',
    },
    {
      icon: BookMarked,
      title: 'Trading Journal',
      description: 'Treydlaringizni qayd qiling va tahlil qiling',
      color: 'text-orange-500',
    },
    {
      icon: Award,
      title: 'Sertifikatlar',
      description: 'Har bir modul uchun professional sertifikat',
      color: 'text-pink-500',
    },
    {
      icon: TrendingUp,
      title: '100% Offline',
      description: 'Internet talab qilinmaydi, barcha ma\'lumotlar local',
      color: 'text-cyan-500',
    },
  ];

  const quickStats = [
    {
      label: 'Modullar',
      value: '8',
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      label: 'Darslar',
      value: '120+',
      icon: Target,
      color: 'bg-green-500',
    },
    {
      label: 'Testlar',
      value: '400+',
      icon: Award,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              Treyderlik Akademiyasiga Xush Kelibsiz! 🎓
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              0 dan professional treyder darajasigacha bosqichma-bosqich o'rganish platformasi
            </p>
            <div className="flex space-x-4">
              <Link to="/modules" className="btn-primary bg-white text-primary-700 hover:bg-slate-100">
                Boshlash
              </Link>
              <Link to="/backtest" className="btn-secondary bg-primary-700 hover:bg-primary-800 text-white">
                Backtest Simulyatori
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <TrendingUp className="w-48 h-48 text-primary-300 opacity-50" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 pt-8 border-t border-primary-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-primary-100">Umumiy Progress</span>
            <span className="text-2xl font-bold">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-4 bg-primary-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center space-x-4">
                <div className={`${stat.color} p-4 rounded-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Platformaning Imkoniyatlari
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <Icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Module Progress Overview */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Modullar Bo'yicha Progress
        </h2>
        <div className="card">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((moduleId) => {
              const progress = moduleProgress[moduleId] || 0;
              const moduleNames = [
                'Treyding Asoslari',
                'Grafiklar',
                'Price Action',
                'Likvidlik',
                'Smart Money Concepts',
                'Order Block',
                'Fair Value Gap',
                'ICT',
              ];

              return (
                <div key={moduleId}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {moduleId}-Modul: {moduleNames[moduleId - 1]}
                    </span>
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="card bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center"
      >
        <Award className="w-16 h-16 mx-auto mb-4 text-purple-200" />
        <h2 className="text-2xl font-bold mb-4">
          Professional Treyder Bo'ling!
        </h2>
        <p className="text-purple-100 mb-6">
          Barcha modullarni tugatib, professional sertifikat oling
        </p>
        <Link
          to="/modules"
          className="btn-primary bg-white text-purple-700 hover:bg-purple-50 inline-flex items-center"
        >
          Hoziroq Boshlash
        </Link>
      </motion.div>
    </div>
  );
}
