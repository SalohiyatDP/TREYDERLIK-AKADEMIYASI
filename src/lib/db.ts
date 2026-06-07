import Dexie, { Table } from 'dexie';

// Interfaces
export interface UserProgress {
  id?: number;
  moduleId: number;
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: Date;
}

export interface TestResult {
  id?: number;
  moduleId: number;
  testId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: Record<string, string>;
  completedAt: Date;
}

export interface BacktestResult {
  id?: number;
  name: string;
  symbol: string;
  timeframe: string;
  startDate: Date;
  endDate: Date;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  netProfit: number;
  averageWin: number;
  averageLoss: number;
  riskRewardRatio: number;
  trades: BacktestTrade[];
  createdAt: Date;
}

export interface BacktestTrade {
  id: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  exitPrice: number;
  entryDate: Date;
  exitDate: Date;
  profit: number;
  profitPercent: number;
  reason: string;
}

export interface JournalEntry {
  id?: number;
  date: Date;
  symbol: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  exitPrice: number;
  stopLoss: number;
  takeProfit: number;
  lotSize: number;
  profit: number;
  profitPercent: number;
  result: 'win' | 'loss' | 'breakeven';
  screenshot?: string; // base64 image
  notes: string;
  strategy: string;
  emotions: string[];
  createdAt: Date;
}

export interface Certificate {
  id?: number;
  moduleId: number;
  moduleName: string;
  completionDate: Date;
  score: number;
  certificateData: string; // base64 PDF
}

export interface UserSettings {
  id?: number;
  theme: 'light' | 'dark';
  language: 'uz';
  notifications: boolean;
  soundEffects: boolean;
}

// Database Class
class TradingAcademyDB extends Dexie {
  userProgress!: Table<UserProgress>;
  testResults!: Table<TestResult>;
  backtestResults!: Table<BacktestResult>;
  journalEntries!: Table<JournalEntry>;
  certificates!: Table<Certificate>;
  userSettings!: Table<UserSettings>;

  constructor() {
    super('TradingAcademyDB');
    
    this.version(1).stores({
      userProgress: '++id, moduleId, lessonId, completed',
      testResults: '++id, moduleId, testId, completedAt',
      backtestResults: '++id, name, createdAt',
      journalEntries: '++id, date, symbol, result, createdAt',
      certificates: '++id, moduleId, completionDate',
      userSettings: '++id'
    });
  }
}

// Create database instance
export const db = new TradingAcademyDB();

// Helper functions
export const initializeSettings = async () => {
  const settings = await db.userSettings.toArray();
  if (settings.length === 0) {
    await db.userSettings.add({
      theme: 'dark',
      language: 'uz',
      notifications: true,
      soundEffects: true
    });
  }
};

export const getUserProgress = async (moduleId: number) => {
  return await db.userProgress
    .where('moduleId')
    .equals(moduleId)
    .toArray();
};

export const updateLessonProgress = async (
  moduleId: number,
  lessonId: string,
  completed: boolean,
  score?: number
) => {
  const existing = await db.userProgress
    .where({ moduleId, lessonId })
    .first();

  if (existing) {
    await db.userProgress.update(existing.id!, {
      completed,
      score,
      completedAt: new Date()
    });
  } else {
    await db.userProgress.add({
      moduleId,
      lessonId,
      completed,
      score,
      completedAt: new Date()
    });
  }
};

export const getModuleProgress = async (moduleId: number) => {
  const progress = await getUserProgress(moduleId);
  const completed = progress.filter(p => p.completed).length;
  const total = progress.length;
  return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
};

export const getAllProgress = async () => {
  const modules = [1, 2, 3, 4, 5, 6, 7, 8];
  const progressData = await Promise.all(
    modules.map(async (moduleId) => {
      const progress = await getModuleProgress(moduleId);
      return { moduleId, ...progress };
    })
  );
  
  const totalCompleted = progressData.reduce((sum, p) => sum + p.completed, 0);
  const totalLessons = progressData.reduce((sum, p) => sum + p.total, 0);
  
  return {
    modules: progressData,
    overall: {
      completed: totalCompleted,
      total: totalLessons,
      percentage: totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0
    }
  };
};

export const saveTestResult = async (result: Omit<TestResult, 'id'>) => {
  return await db.testResults.add(result);
};

export const getTestResults = async (moduleId: number) => {
  return await db.testResults
    .where('moduleId')
    .equals(moduleId)
    .reverse()
    .sortBy('completedAt');
};

export const saveBacktestResult = async (result: Omit<BacktestResult, 'id'>) => {
  return await db.backtestResults.add(result);
};

export const getBacktestResults = async () => {
  return await db.backtestResults
    .reverse()
    .sortBy('createdAt');
};

export const saveJournalEntry = async (entry: Omit<JournalEntry, 'id'>) => {
  return await db.journalEntries.add(entry);
};

export const getJournalEntries = async () => {
  return await db.journalEntries
    .reverse()
    .sortBy('createdAt');
};

export const getJournalStatistics = async () => {
  const entries = await db.journalEntries.toArray();
  
  const wins = entries.filter(e => e.result === 'win');
  const losses = entries.filter(e => e.result === 'loss');
  const breakevens = entries.filter(e => e.result === 'breakeven');
  
  const totalProfit = entries.reduce((sum, e) => sum + e.profit, 0);
  const winProfit = wins.reduce((sum, e) => sum + e.profit, 0);
  const lossProfit = Math.abs(losses.reduce((sum, e) => sum + e.profit, 0));
  
  return {
    totalTrades: entries.length,
    wins: wins.length,
    losses: losses.length,
    breakevens: breakevens.length,
    winRate: entries.length > 0 ? (wins.length / entries.length) * 100 : 0,
    totalProfit,
    profitFactor: lossProfit > 0 ? winProfit / lossProfit : winProfit,
    averageWin: wins.length > 0 ? winProfit / wins.length : 0,
    averageLoss: losses.length > 0 ? lossProfit / losses.length : 0
  };
};

export const saveCertificate = async (certificate: Omit<Certificate, 'id'>) => {
  return await db.certificates.add(certificate);
};

export const getCertificates = async () => {
  return await db.certificates
    .reverse()
    .sortBy('completionDate');
};

// Initialize settings on app start
initializeSettings();
