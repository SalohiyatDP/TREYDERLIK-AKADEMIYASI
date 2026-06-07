import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Plus, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { getJournalEntries, getJournalStatistics } from '../lib/db';

export default function JournalPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const journalEntries = await getJournalEntries();
    const statistics = await getJournalStatistics();
    setEntries(journalEntries);
    setStats(statistics);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Trading Journal
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Treydlaringizni qayd qiling va tahlil qiling
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yangi Treyd
          </button>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <BookMarked className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats?.totalTrades || 0}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Jami Treydlar
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats ? Math.round(stats.winRate) : 0}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Win Rate
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                ${stats ? stats.totalProfit.toFixed(2) : '0.00'}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Jami Profit
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats ? stats.profitFactor.toFixed(2) : '0.00'}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Profit Factor
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Journal Entries */}
      <div className="card">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <BookMarked className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Hali treydlar yo'q
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Birinchi treydingizni qayd qiling
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Yangi Treyd Qo'shish
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Treyd Tarixi
            </h2>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="card bg-slate-50 dark:bg-slate-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        entry.result === 'win'
                          ? 'bg-success-100 dark:bg-success-900/30'
                          : entry.result === 'loss'
                          ? 'bg-danger-100 dark:bg-danger-900/30'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      {entry.result === 'win' ? (
                        <TrendingUp className="w-6 h-6 text-success-600" />
                      ) : entry.result === 'loss' ? (
                        <TrendingDown className="w-6 h-6 text-danger-600" />
                      ) : (
                        <span className="text-slate-600">═</span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {entry.symbol} - {entry.type.toUpperCase()}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(entry.date).toLocaleDateString('uz-UZ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xl font-bold ${
                        entry.profit > 0
                          ? 'text-success-600'
                          : entry.profit < 0
                          ? 'text-danger-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {entry.profit > 0 ? '+' : ''}${entry.profit.toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {entry.profitPercent > 0 ? '+' : ''}
                      {entry.profitPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
