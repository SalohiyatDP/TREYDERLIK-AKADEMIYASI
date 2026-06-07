import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Module6Page() {
  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/modules" className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span>Modullar ro'yxatiga qaytish</span>
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card bg-gradient-to-br from-pink-500 to-pink-700 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-pink-100 text-sm mb-2">MODUL 6</div>
            <h1 className="text-3xl font-bold mb-2">Order Block</h1>
            <p className="text-pink-100">Bullish/Bearish OB, Mitigation, Chart Simulator</p>
          </div>
          <Package className="w-20 h-20 text-pink-300 opacity-50" />
        </div>
      </motion.div>
      <div className="card mt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Modul tayyorlanmoqda...</h2>
        <p className="text-slate-600 dark:text-slate-400">Order Block tushunchalari va Chart Simulator bilan.</p>
      </div>
    </div>
  );
}
