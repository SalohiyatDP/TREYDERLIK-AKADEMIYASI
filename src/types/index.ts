// Module Types
export interface Module {
  id: number;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  totalLessons: number;
  color: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'theory' | 'animation' | 'interactive' | 'test' | 'practice';
  duration: number; // minutes
  content?: LessonContent;
}

export interface LessonContent {
  sections: ContentSection[];
}

export interface ContentSection {
  type: 'text' | 'image' | 'animation' | 'interactive' | 'video' | 'quiz';
  content: any;
  title?: string;
}

// Trading Types
export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface TrendLine {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  width: number;
  type: 'trend' | 'support' | 'resistance' | 'horizontal';
}

export interface ChartAnnotation {
  id: string;
  type: 'arrow' | 'text' | 'rectangle' | 'circle';
  x: number;
  y: number;
  text?: string;
  color: string;
}

// Test Types
export interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'true-false';
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
  image?: string;
}

export interface TestConfig {
  moduleId: number;
  testId: string;
  title: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // minutes
}

// Strategy Types
export interface Strategy {
  id: string;
  name: string;
  description: string;
  rules: StrategyRule[];
  riskManagement: RiskManagement;
}

export interface StrategyRule {
  id: string;
  condition: string;
  action: 'buy' | 'sell' | 'close';
  description: string;
}

export interface RiskManagement {
  stopLoss: number; // percentage
  takeProfit: number; // percentage
  riskRewardRatio: number;
  maxPositionSize: number; // percentage of balance
}

// Chart Pattern Types
export type ChartPattern =
  | 'bullish-engulfing'
  | 'bearish-engulfing'
  | 'hammer'
  | 'shooting-star'
  | 'doji'
  | 'morning-star'
  | 'evening-star'
  | 'three-white-soldiers'
  | 'three-black-crows';

// SMC Types
export interface OrderBlock {
  id: string;
  type: 'bullish' | 'bearish';
  high: number;
  low: number;
  time: number;
  mitigated: boolean;
}

export interface FairValueGap {
  id: string;
  type: 'bullish' | 'bearish';
  top: number;
  bottom: number;
  startTime: number;
  endTime: number;
  filled: boolean;
}

export interface LiquidityZone {
  id: string;
  type: 'buy-side' | 'sell-side';
  price: number;
  strength: 'weak' | 'medium' | 'strong';
  swept: boolean;
}

export interface StructureBreak {
  id: string;
  type: 'BOS' | 'CHOCH' | 'MSS';
  price: number;
  time: number;
  direction: 'bullish' | 'bearish';
}

// Animation Types
export interface AnimationStep {
  id: string;
  description: string;
  duration: number;
  action: () => void;
}

// Statistics Types
export interface TradeStatistics {
  totalTrades: number;
  wins: number;
  losses: number;
  breakevens: number;
  winRate: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  totalProfit: number;
  maxDrawdown: number;
  sharpeRatio?: number;
}

// Chart Drawing Tool Types
export type DrawingTool =
  | 'none'
  | 'trend-line'
  | 'horizontal-line'
  | 'vertical-line'
  | 'rectangle'
  | 'fibonacci'
  | 'text'
  | 'arrow';

export interface DrawingObject {
  id: string;
  tool: DrawingTool;
  points: { time: number; price: number }[];
  color: string;
  text?: string;
  lineWidth?: number;
  style?: 'solid' | 'dashed' | 'dotted';
}
