import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle, Lock } from 'lucide-react';
import { module1Lessons } from './data';
import LessonView from './components/LessonView';
import { useProgressStore } from '../../store/progressStore';
import { useEffect, useState } from 'react';
import { getUserProgress } from '../../lib/db';

export default function Module1Page() {
  const location = useLocation();
  const { moduleProgress, refreshModuleProgress } = useProgressStore();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  
  const progress = moduleProgress[1] || 0;
  const isModuleView = location.pathname === '/modules/1';

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const userProgress = await getUserProgress(1);
    const completed = new Set(
      userProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );
    setCompletedLessons(completed);
  };

  const handleLessonComplete = async () => {
    await loadProgress();
    await refreshModuleProgress(1);
  };

  if (!isModuleView) {
    return (
      <Routes>
        <Route
          path=":lessonId"
          element={<LessonView lessons={module1Lessons} moduleId={1} onComplete={handleLessonComplete} />}
        />
      </Routes>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/modules"
          className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modullar ro'yxatiga qaytish</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-700 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-blue-100 text-sm mb-2">MODUL 1</div>
              <h1 className="text-3xl font-bold mb-2">Treyding Asoslari</h1>
              <p className="text-blue-100">
                16 ta dars: Treydingning asosiy tushunchalari
              </p>
            </div>
            <BookOpen className="w-20 h-20 text-blue-300 opacity-50" />
          </div>

          {/* Progress */}
          <div className="mt-6 pt-6 border-t border-blue-400">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-100">Progress</span>
              <span className="text-2xl font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-blue-600 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {module1Lessons.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          const prevLesson = module1Lessons[index - 1];
          const isLocked = index > 0 && !completedLessons.has(prevLesson.id);

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={isLocked ? '#' : `/modules/1/${lesson.id}`}
                className={`card relative h-full hover:shadow-xl transition-all ${
                  isLocked ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                onClick={(e) => isLocked && e.preventDefault()}
              >
                {/* Lock or Check Icon */}
                <div className="absolute top-4 right-4">
                  {isLocked ? (
                    <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-full">
                      <Lock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </div>
                  ) : isCompleted ? (
                    <div className="bg-success-600 p-2 rounded-full">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  ) : null}
                </div>

                {/* Lesson Number */}
                <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  DARS {index + 1}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {lesson.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                  <span className="capitalize">{getLessonTypeLabel(lesson.type)}</span>
                  <span>⏱ {lesson.duration} min</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function getLessonTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    theory: 'Nazariya',
    interactive: 'Interaktiv',
    animation: 'Animatsiya',
    test: 'Test',
    practice: 'Amaliyot',
  };
  return labels[type] || type;
}
