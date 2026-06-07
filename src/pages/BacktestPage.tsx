import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function BacktestPage() {
  const [results, setResults] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Backtest Simulyatori
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Strategiyangizni test qiling va statistika oling
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Backtest Sozlamalari
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Valyuta Jufti
                </label>
                <select className="input">
                  <option>EUR/USD</option>
                  <option>GBP/USD</option>
                  <option>USD/JPY</option>
                  <option>XAU/USD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Timeframe
                </label>
                <select className="input">
                  <option>1 minut</option>
                  <option>5 minut</option>
                  <option>15 minut</option>
                  <option>1 soat</option>
                  <option>4 soat</option>
                  <option>1 kun</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Boshlang'ich Balans
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="10000"
                  defaultValue="10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Risk % (har bir treyd)
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="1"
                  defaultValue="1"
                  step="0.1"
                />
              </div>

              <button className="btn-primary w-full">
                <LineChart className="w-5 h-5 mr-2" />
                Backtestni Boshlash
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="card mb-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="text-center py-12">
              <LineChart className="w-20 h-20 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Backtest Tayyorlanmoqda
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Tez orada strategiyangizni test qila olasiz
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <TrendingUp className="w-8 h-8 text-success-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">--</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Win Rate</div>
            </div>
            <div className="card text-center">
              <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">--</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Profit Factor</div>
            </div>
            <div className="card text-center">
              <TrendingDown className="w-8 h-8 text-danger-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">--</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Max Drawdown</div>
            </div>
            <div className="card text-center">
              <LineChart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">--</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Trades</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
