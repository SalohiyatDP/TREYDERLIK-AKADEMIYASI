import { Lesson } from '../../types';

export const module1Lessons: Lesson[] = [
  {
    id: '1-1',
    title: 'Treyding nima?',
    description: 'Treydingning asosiy tushunchasi va printsiplari',
    type: 'theory',
    duration: 15,
  },
  {
    id: '1-2',
    title: 'Broker nima?',
    description: 'Broker va uning vazifasi haqida',
    type: 'theory',
    duration: 12,
  },
  {
    id: '1-3',
    title: 'Forex nima?',
    description: 'Valyuta bozori va uning xususiyatlari',
    type: 'theory',
    duration: 18,
  },
  {
    id: '1-4',
    title: 'CFD nima?',
    description: 'Contract for Difference tushunchasi',
    type: 'theory',
    duration: 15,
  },
  {
    id: '1-5',
    title: 'Crypto nima?',
    description: 'Cryptocurrency va blockchain asoslari',
    type: 'theory',
    duration: 20,
  },
  {
    id: '1-6',
    title: 'Indekslar nima?',
    description: 'Fond indekslari va ularning treydlashi',
    type: 'theory',
    duration: 15,
  },
  {
    id: '1-7',
    title: 'Volatility',
    description: 'Narx o\'zgaruvchanlik va uning ahamiyati',
    type: 'interactive',
    duration: 18,
  },
  {
    id: '1-8',
    title: 'Buy va Sell',
    description: 'Sotib olish va sotish operatsiyalari',
    type: 'interactive',
    duration: 20,
  },
  {
    id: '1-9',
    title: 'Spread',
    description: 'Bid va Ask narx farqi',
    type: 'theory',
    duration: 12,
  },
  {
    id: '1-10',
    title: 'Pip',
    description: 'Narx o\'zgarishining eng kichik birligi',
    type: 'interactive',
    duration: 15,
  },
  {
    id: '1-11',
    title: 'Lot',
    description: 'Treyd hajmi va lot tushunchasi',
    type: 'interactive',
    duration: 18,
  },
  {
    id: '1-12',
    title: 'Margin',
    description: 'Margin va leverage bog\'liqligi',
    type: 'theory',
    duration: 20,
  },
  {
    id: '1-13',
    title: 'Leverage',
    description: 'Kaldıraç va uning xavflari',
    type: 'interactive',
    duration: 22,
  },
  {
    id: '1-14',
    title: 'Equity va Balance',
    description: 'Hisob balansi va equity farqi',
    type: 'interactive',
    duration: 18,
  },
  {
    id: '1-15',
    title: 'Drawdown',
    description: 'Yo\'qotishlar va drawdown boshqaruvi',
    type: 'theory',
    duration: 20,
  },
  {
    id: '1-16',
    title: 'Modul Testi',
    description: '1-Modul bo\'yicha yakuniy test',
    type: 'test',
    duration: 30,
  },
];

export const lessonContents: Record<string, any> = {
  '1-1': {
    title: 'Treyding nima?',
    sections: [
      {
        type: 'text',
        content: `
# Treyding nima?

**Treyding** - bu moliyaviy bozorda aktivlar (valyutalar, aksiyalar, tovarlar) ni sotib olish va sotish orqali foyda olish jarayoni.

## Asosiy Tushunchalar:

### 1. Trader (Treyder)
Moliyaviy bozorda aktivlar bilan savdo qiluvchi shaxs.

### 2. Trading (Treyding)
Qisqa muddatli savdo operatsiyalari orqali foyda olish.

### 3. Investment (Investitsiya)
Uzoq muddatli maqsadda aktivlarni sotib olish.

## Treydingning Turlari:

**Day Trading** - Bir kun ichida ochilgan va yopilgan treydlar
**Swing Trading** - Bir necha kundan bir necha haftagacha
**Position Trading** - Bir necha hafta va oylar
**Scalping** - Juda qisqa muddatli (daqiqalar, soniyalar)

## Treydingda Muvaffaqiyat Kalitlari:

✅ Bilim va ta'lim
✅ Risk boshqaruvi
✅ Psixologik barqarorlik
✅ To'g'ri strategiya
✅ Sabr va distsiplina
        `,
      },
      {
        type: 'animation',
        content: {
          type: 'buy-sell-animation',
          description: 'Buy va Sell operatsiyalarining vizualizatsiyasi',
        },
      },
    ],
  },
  '1-2': {
    title: 'Broker nima?',
    sections: [
      {
        type: 'text',
        content: `
# Broker nima?

**Broker** - bu treyder va moliyaviy bozor o'rtasidagi vositachi kompaniya.

## Brokerning Vazifasi:

### 1. Platform Ta'minlash
Treydlar uchun trading platformasi (MetaTrader, cTrader, va boshqalar)

### 2. Likvidlik
Bozor likvidligini ta'minlash

### 3. Xizmatlar
- Charting tools
- Technical indicators  
- News feed
- Educational materials

## Broker Turlari:

### ECN Broker
- To'g'ridan-to'g'ri bozorga ulanish
- Spread past
- Komissiya mavjud
- Tezkor ijro

### Market Maker
- Broker o'zi narx yaratadi
- Spread keng
- Komissiya yo'q
- Ba'zan re-quote

## To'g'ri Broker Tanlash:

✅ Regulyatsiya (FCA, CySEC, ASIC)
✅ Spread va komissiya
✅ Ijro tezligi
✅ Depozit/Withdraw oson
✅ Yaxshi support
        `,
      },
    ],
  },
  '1-3': {
    title: 'Forex nima?',
    sections: [
      {
        type: 'text',
        content: `
# Forex (Foreign Exchange)

**Forex** - bu dunyo bo'yicha valyutalar savdo qilinadigan eng katta moliyaviy bozor.

## Statistika:

📊 Kunlik aylanma: **$7.5 trillion**
🌍 24/5 ochiq
🏦 Markazlashtirilmagan bozor

## Valyuta Juftliklari:

### Major Pairs (Asosiy)
- EUR/USD (Euro / US Dollar)
- GBP/USD (British Pound / US Dollar)
- USD/JPY (US Dollar / Japanese Yen)
- USD/CHF (US Dollar / Swiss Franc)

### Minor Pairs
- EUR/GBP
- EUR/CHF
- GBP/JPY

### Exotic Pairs
- USD/TRY (Turkish Lira)
- USD/ZAR (South African Rand)

## Forex Sessiyalari:

**Sydney:** 02:00 - 11:00 (GMT+5)
**Tokyo:** 04:00 - 13:00 (GMT+5)
**London:** 13:00 - 22:00 (GMT+5) 🔥
**New York:** 18:00 - 03:00 (GMT+5) 🔥

## Afzalliklari:

✅ Yuqori likvidlik
✅ 24/5 trading
✅ Kichik kapital bilan boshlash
✅ Leverage imkoniyati
✅ Yuqori va past volatility

## Xavflari:

⚠️ Leverage xavfi
⚠️ Volatillik
⚠️ Makroiqtisodiy omillar
        `,
      },
    ],
  },
  '1-8': {
    title: 'Buy va Sell',
    sections: [
      {
        type: 'text',
        content: `
# Buy va Sell

Treydingda ikkita asosiy operatsiya mavjud:

## BUY (Sotib olish) - LONG

Narx **ko'tarilishiga** ishonchingiz komil bo'lsa, **BUY** qilasiz.

### Misol:
- EUR/USD = 1.1000 da BUY
- Narx 1.1050 ga ko'tarildi
- **+50 pip profit** 📈

## SELL (Sotish) - SHORT

Narx **tushishiga** ishonchingiz komil bo'lsa, **SELL** qilasiz.

### Misol:
- EUR/USD = 1.1000 da SELL
- Narx 1.0950 ga tushdi
- **+50 pip profit** 📉

## Qoidalar:

✅ BUY = narx oshishidan foyda
✅ SELL = narx tushishidan foyda
✅ Har doim Stop Loss qo'ying
✅ Take Profit maqsadingizni belgilang
        `,
      },
      {
        type: 'interactive',
        content: {
          type: 'buy-sell-simulator',
        },
      },
    ],
  },
  '1-10': {
    title: 'Pip',
    sections: [
      {
        type: 'text',
        content: `
# Pip (Percentage in Point)

**Pip** - narx o'zgarishining eng kichik birligi.

## Hisoblash:

### Ko'pchilik valyuta juftliklari:
- **0.0001** = 1 pip
- EUR/USD: 1.1050 → 1.1051 = **1 pip**

### JPY juftliklari:
- **0.01** = 1 pip  
- USD/JPY: 110.50 → 110.51 = **1 pip**

## Pipette (Fractional Pip)

Ba'zi brokerlar 5 xonali narx ko'rsatadi:
- **0.00001** = 0.1 pip (pipette)

## Pip Qiymati:

### Standart Lot (100,000 units):
- 1 pip = **$10** (EUR/USD)

### Mini Lot (10,000 units):
- 1 pip = **$1**

### Micro Lot (1,000 units):
- 1 pip = **$0.10**

## Misol:

EUR/USD 1.1000 dan 1.1050 ga o'zgarsa:
- **50 pip** o'zgarish
- 1 standart lot = 50 × $10 = **$500**
        `,
      },
      {
        type: 'interactive',
        content: {
          type: 'pip-calculator',
        },
      },
    ],
  },
};

export const module1Test = {
  moduleId: 1,
  testId: 'module-1-final',
  title: '1-Modul: Treyding Asoslari - Yakuniy Test',
  passingScore: 80,
  timeLimit: 30,
  questions: [
    {
      id: 'q1',
      question: 'Treyding nima?',
      type: 'single' as const,
      options: [
        'Uzoq muddatli investitsiya',
        'Qisqa muddatli savdo operatsiyalari',
        'Bank depoziti',
        'Kriptovalyuta mayningi',
      ],
      correctAnswer: 'Qisqa muddatli savdo operatsiyalari',
      explanation:
        'Treyding - bu qisqa muddatli savdo operatsiyalari orqali foyda olish jarayoni.',
    },
    {
      id: 'q2',
      question: 'Broker nima?',
      type: 'single' as const,
      options: [
        'Moliyaviy maslahatchi',
        'Treyder va bozor o\'rtasidagi vositachi',
        'Bank xodimi',
        'Valyuta almashuv punkti',
      ],
      correctAnswer: 'Treyder va bozor o\'rtasidagi vositachi',
      explanation:
        'Broker - treyder va moliyaviy bozor o\'rtasidagi vositachi kompaniya.',
    },
    {
      id: 'q3',
      question: 'Forex bozorining kunlik aylanmasi qancha?',
      type: 'single' as const,
      options: ['$1 trillion', '$7.5 trillion', '$100 billion', '$500 billion'],
      correctAnswer: '$7.5 trillion',
      explanation: 'Forex - kunlik aylanmasi $7.5 trillion bo\'lgan eng katta bozor.',
    },
    {
      id: 'q4',
      question: '1 pip qancha (EUR/USD)?',
      type: 'single' as const,
      options: ['0.01', '0.001', '0.0001', '0.00001'],
      correctAnswer: '0.0001',
      explanation: 'Ko\'pchilik valyuta juftliklarida 1 pip = 0.0001',
    },
    {
      id: 'q5',
      question: 'Spread nima?',
      type: 'single' as const,
      options: [
        'Narx o\'zgarishi',
        'Bid va Ask farqi',
        'Leverage miqdori',
        'Profit miqdori',
      ],
      correctAnswer: 'Bid va Ask farqi',
      explanation: 'Spread - bu Bid (sotish) va Ask (sotib olish) narxlari orasidagi farq.',
    },
    {
      id: 'q6',
      question: 'Standart lot nechta unit?',
      type: 'single' as const,
      options: ['1,000', '10,000', '100,000', '1,000,000'],
      correctAnswer: '100,000',
      explanation: 'Standart lot = 100,000 unit valyuta',
    },
    {
      id: 'q7',
      question: 'Leverage nima uchun ishlatiladi?',
      type: 'single' as const,
      options: [
        'Spread kamaytirish',
        'Kichik kapital bilan katta pozitsiya ochish',
        'Volatillik oshirish',
        'Pip qiymatini kamaytirish',
      ],
      correctAnswer: 'Kichik kapital bilan katta pozitsiya ochish',
      explanation:
        'Leverage - kichik kapital bilan katta pozitsiya ochish imkonini beradi.',
    },
    {
      id: 'q8',
      question: 'BUY (Long) pozitsiyada qachon foyda olasiz?',
      type: 'single' as const,
      options: [
        'Narx tushganda',
        'Narx o\'zgarmasa',
        'Narx ko\'tarilganda',
        'Har qanday holatda',
      ],
      correctAnswer: 'Narx ko\'tarilganda',
      explanation: 'BUY pozitsiyasida narx ko\'tarilganda foyda olasiz.',
    },
    {
      id: 'q9',
      question: 'Equity va Balance farqi nima?',
      type: 'single' as const,
      options: [
        'Farq yo\'q',
        'Equity = Balance + Floating P/L',
        'Balance = Equity + Floating P/L',
        'Equity = Balance - Margin',
      ],
      correctAnswer: 'Equity = Balance + Floating P/L',
      explanation:
        'Equity - bu Balance + ochiq pozitsiyalaringizning floating profit/loss.',
    },
    {
      id: 'q10',
      question: 'CFD nima?',
      type: 'single' as const,
      options: [
        'Central Finance Department',
        'Contract for Difference',
        'Currency for Day trading',
        'Crypto Financial Derivative',
      ],
      correctAnswer: 'Contract for Difference',
      explanation:
        'CFD (Contract for Difference) - narx farqi bo\'yicha shartnoma.',
    },
  ],
};
