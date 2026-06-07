import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calculator } from 'lucide-react';

interface InteractiveComponentProps {
  type: string;
  lessonId: string;
}

export default function InteractiveComponent({ type, lessonId }: InteractiveComponentProps) {
  switch (type) {
    case 'buy-sell-simulator':
      return <BuySellSimulator />;
    case 'pip-calculator':
      return <PipCalculator />;
    default:
      return <DefaultInteractive />;
  }
}

function BuySellSimulator() {
  const [position, setPosition] = useState<'buy' | 'sell' | null>(null);
  const [entryPrice, setEntryPrice] = useState(1.1000);
  const [currentPrice, setCurrentPrice] = useState(1.1000);
  const [profit, setProfit] = useState(0);

  const handleBuy = () => {
    setPosition('buy');
    setEntryPrice(currentPrice);
    setProfit(0);
  };

  const handleSell = () => {
    setPosition('sell');
    setEntryPrice(currentPrice);
    setProfit(0);
  };

  const handlePriceChange = (change: number) => {
    const newPrice = currentPrice + change;
    setCurrentPrice(newPrice);

    if (position === 'buy') {
      setProfit((newPrice - entryPrice) * 10000);
    } else if (position === 'sell') {
      setProfit((entryPrice - newPrice) * 10000);
    }
  };

  const handleClose = () => {
    setPosition(null);
    setProfit(0);
  };

  return (
    <div className="card bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Buy/Sell Simulyatori
      </h3>

      {/* Current Price */}
      <div className="card bg-white dark:bg-slate-900 mb-6">
        <div className="text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            EUR/USD Joriy Narx
          </div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white">
            {currentPrice.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Position Info */}
      {position && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`card mb-6 ${
            position === 'buy'
              ? 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800'
              : 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Pozitsiya
              </div>
              <div className="text-xl font-bold">
                {position === 'buy' ? '📈 BUY' : '📉 SELL'}
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Kirish narxi
              </div>
              <div className="text-xl font-bold">{entryPrice.toFixed(4)}</div>
            </div>
          </div>
          <div className="text-center py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Profit/Loss (pips)
            </div>
            <div
              className={`text-3xl font-bold ${
                profit > 0
                  ? 'text-success-600'
                  : profit < 0
                  ? 'text-danger-600'
                  : 'text-slate-600'
              }`}
            >
              {profit > 0 ? '+' : ''}
              {profit.toFixed(1)}
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="space-y-4">
        {!position ? (
          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleBuy} className="btn-success py-6">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold">BUY</div>
              <div className="text-xs opacity-80">Narx oshadi deb o'ylaysiz</div>
            </button>
            <button onClick={handleSell} className="btn-danger py-6">
              <TrendingDown className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold">SELL</div>
              <div className="text-xs opacity-80">Narx tushadi deb o'ylaysiz</div>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handlePriceChange(-0.0010)}
                className="btn-secondary py-3"
              >
                -10 pips
              </button>
              <button
                onClick={() => handlePriceChange(-0.0001)}
                className="btn-secondary py-3"
              >
                -1 pip
              </button>
              <button
                onClick={() => handlePriceChange(-0.0050)}
                className="btn-secondary py-3"
              >
                -50 pips
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handlePriceChange(0.0010)}
                className="btn-secondary py-3"
              >
                +10 pips
              </button>
              <button
                onClick={() => handlePriceChange(0.0001)}
                className="btn-secondary py-3"
              >
                +1 pip
              </button>
              <button
                onClick={() => handlePriceChange(0.0050)}
                className="btn-secondary py-3"
              >
                +50 pips
              </button>
            </div>
            <button onClick={handleClose} className="btn-primary w-full">
              Pozitsiyani Yopish
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function PipCalculator() {
  const [lotSize, setLotSize] = useState('1');
  const [pips, setPips] = useState('10');

  const calculateValue = () => {
    const lot = parseFloat(lotSize) || 0;
    const pipCount = parseFloat(pips) || 0;
    return (lot * pipCount * 10).toFixed(2);
  };

  return (
    <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
        <Calculator className="w-6 h-6 mr-2" />
        Pip Kalkulyatori
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Lot Hajmi
          </label>
          <select
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
            className="input"
          >
            <option value="0.01">0.01 (Micro)</option>
            <option value="0.1">0.1 (Mini)</option>
            <option value="1">1.0 (Standard)</option>
            <option value="10">10.0 (Large)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Pip miqdori
          </label>
          <input
            type="number"
            value={pips}
            onChange={(e) => setPips(e.target.value)}
            className="input"
            placeholder="Pip miqdorini kiriting"
          />
        </div>

        <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white">
          <div className="text-center">
            <div className="text-sm opacity-80 mb-2">Pip Qiymati (USD)</div>
            <div className="text-4xl font-bold">${calculateValue()}</div>
            <div className="text-sm opacity-80 mt-2">
              {lotSize} lot × {pips} pips = ${calculateValue()}
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
          <p>💡 <strong>Eslatma:</strong></p>
          <p>• 1 Standard lot (1.0) = 100,000 units</p>
          <p>• EUR/USD da 1 pip = $10 (standard lot)</p>
          <p>• Mini lot (0.1) uchun: 1 pip = $1</p>
          <p>• Micro lot (0.01) uchun: 1 pip = $0.10</p>
        </div>
      </div>
    </div>
  );
}

function DefaultInteractive() {
  return (
    <div className="card bg-slate-50 dark:bg-slate-900 text-center py-12">
      <p className="text-slate-600 dark:text-slate-400">
        Interaktiv komponent tayyorlanmoqda...
      </p>
    </div>
  );
}
