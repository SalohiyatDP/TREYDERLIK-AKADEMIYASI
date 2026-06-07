import { Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Module7Page() {
  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/modules" className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span>Modullar ro'yxatiga qaytish</span>
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card bg-gradient-to-br from-indigo-500 to-indigo-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-indigo-100 text-sm mb-2">MODUL 7</div>
            <h1 className="text-3xl font-bold mb-2">Fair Value Gap</h1>
            <p className="text-indigo-100">FVG, IFVG, BISI, SIBI va animatsiyalar</p>
          </div>
          <Layers className="w-20 h-20 text-indigo-300 opacity-50" />
        </div>
      </motion.div>
      <div className="card mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Modul tayyorlanmoqda...</h2>
        <p className="text-slate-600 dark:text-slate-400">FVG tushunchalari va interaktiv animatsiyalar bilan.</p>
      </div>
    </div>
  );
}
