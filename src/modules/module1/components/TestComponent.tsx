import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { TestConfig } from '../../../types';
import { saveTestResult } from '../../../lib/db';

interface TestComponentProps {
  test: TestConfig;
  onComplete: (score: number) => void;
}

export default function TestComponent({ test, onComplete }: TestComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const question = test.questions[currentQuestion];
  const selectedAnswer = answers[question.id];
  const isLastQuestion = currentQuestion === test.questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateResults = async () => {
    let correctCount = 0;
    test.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = (correctCount / test.questions.length) * 100;
    const passed = score >= test.passingScore;

    // Save to database
    await saveTestResult({
      moduleId: test.moduleId,
      testId: test.testId,
      score,
      totalQuestions: test.questions.length,
      correctAnswers: correctCount,
      answers,
      completedAt: new Date(),
    });

    setShowResults(true);
    setTestCompleted(true);

    if (passed) {
      onComplete(score);
    }
  };

  if (showResults) {
    const correctCount = test.questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    const score = (correctCount / test.questions.length) * 100;
    const passed = score >= test.passingScore;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        {passed ? (
          <div className="space-y-6">
            <div className="w-24 h-24 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-12 h-12 text-success-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Tabriklaymiz! 🎉
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Siz testdan muvaffaqiyatli o'tdingiz
            </p>
            <div className="card inline-block bg-gradient-to-br from-success-50 to-green-50 dark:from-success-900/20 dark:to-green-900/20 border-success-200 dark:border-success-800">
              <div className="text-5xl font-bold text-success-600 mb-2">
                {Math.round(score)}%
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                {correctCount} / {test.questions.length} to'g'ri javob
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-24 h-24 bg-danger-100 dark:bg-danger-900/30 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-danger-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Test topshirilmadi
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Kamida {test.passingScore}% ball to'plash kerak
            </p>
            <div className="card inline-block bg-gradient-to-br from-danger-50 to-red-50 dark:from-danger-900/20 dark:to-red-900/20 border-danger-200 dark:border-danger-800">
              <div className="text-5xl font-bold text-danger-600 mb-2">
                {Math.round(score)}%
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                {correctCount} / {test.questions.length} to'g'ri javob
              </div>
            </div>
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
                setTestCompleted(false);
              }}
              className="btn-primary"
            >
              Qayta Urinish
            </button>
          </div>
        )}

        {/* Detailed Results */}
        <div className="mt-12 text-left">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Batafsil Natijalar
          </h3>
          <div className="space-y-4">
            {test.questions.map((q, index) => {
              const isCorrect = answers[q.id] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`card ${
                    isCorrect
                      ? 'border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/10'
                      : 'border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-900/10'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCorrect
                          ? 'bg-success-600'
                          : 'bg-danger-600'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <XCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 dark:text-white mb-2">
                        {index + 1}. {q.question}
                      </div>
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="text-slate-600 dark:text-slate-400">
                            Sizning javobingiz:{' '}
                          </span>
                          <span
                            className={
                              isCorrect
                                ? 'text-success-600 font-medium'
                                : 'text-danger-600 font-medium'
                            }
                          >
                            {answers[q.id] || 'Javob berilmagan'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div>
                            <span className="text-slate-600 dark:text-slate-400">
                              To'g'ri javob:{' '}
                            </span>
                            <span className="text-success-600 font-medium">
                              {q.correctAnswer}
                            </span>
                          </div>
                        )}
                        <div className="text-slate-600 dark:text-slate-400 italic">
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Savol {currentQuestion + 1} / {test.questions.length}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            O'tish bali: {test.passingScore}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / test.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        >
          <div className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            {question.question}
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === option
                    ? 'border-primary-600 bg-primary-100 dark:bg-primary-900/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option
                        ? 'border-primary-600 bg-primary-600'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {selectedAnswer === option && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-slate-900 dark:text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Orqaga
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastQuestion ? 'Yakunlash' : 'Keyingi'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
