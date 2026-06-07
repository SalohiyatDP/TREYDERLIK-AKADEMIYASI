import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function downloadFile(data: string, filename: string, type: string) {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function parseJSON<T>(value: string | null, fallback: T): T {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

// Trading specific utilities
export function calculatePipValue(
  lotSize: number,
  pair: string = 'EUR/USD'
): number {
  // For standard lot (1.0)
  const baseValue = 10;
  return lotSize * baseValue;
}

export function calculateProfit(
  entryPrice: number,
  exitPrice: number,
  lotSize: number,
  type: 'buy' | 'sell'
): number {
  const priceDifference = type === 'buy' 
    ? exitPrice - entryPrice 
    : entryPrice - exitPrice;
  
  const pips = priceDifference * 10000;
  const pipValue = calculatePipValue(lotSize);
  
  return pips * pipValue;
}

export function calculateWinRate(wins: number, losses: number): number {
  const total = wins + losses;
  if (total === 0) return 0;
  return (wins / total) * 100;
}

export function calculateProfitFactor(
  totalWins: number,
  totalLosses: number
): number {
  if (totalLosses === 0) return totalWins;
  return totalWins / Math.abs(totalLosses);
}

export function calculateDrawdown(
  balance: number,
  peak: number
): number {
  if (peak === 0) return 0;
  return ((peak - balance) / peak) * 100;
}

export function calculateRiskReward(
  stopLoss: number,
  takeProfit: number
): number {
  if (stopLoss === 0) return 0;
  return takeProfit / stopLoss;
}
