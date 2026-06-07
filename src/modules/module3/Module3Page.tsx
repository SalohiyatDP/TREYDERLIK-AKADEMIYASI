import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Module3Page() {
  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/modules" className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span>Modullar ro'yxatiga qaytish</span>
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card bg-gradient-to-br from-purple-500 to-purple-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-purple-100 text-sm mb-2">MODUL 3</div>
            <h1 className="text-3xl font-bold mb-2">Price Action</h1>
            <p className="text-purple-100">Trend, Range, Breakout, Pullback, Reversal</p>
          </div>
          <TrendingUp className="w-20 h-20 text-purple-300 opacity-50" />
        </div>
      </motion.div>
      <div className="card mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Modul tayyorlanmoqda...</h2>
        <p className="text-slate-600 dark:text-slate-400">Price Action strategiyalari va interaktiv grafiklar bilan.</p>
      </div>
    </div>
  );
}
