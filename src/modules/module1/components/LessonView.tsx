import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Lesson } from '../../../types';
import { lessonContents, module1Test } from '../data';
import { updateLessonProgress } from '../../../lib/db';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import TestComponent from './TestComponent';
import InteractiveComponent from './InteractiveComponent';

interface LessonViewProps {
  lessons: Lesson[];
  moduleId: number;
  onComplete?: () => void;
}

export default function LessonView({ lessons, moduleId, onComplete }: LessonViewProps) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const currentLesson = lessons[currentIndex];
  const nextLesson = lessons[currentIndex + 1];
  const prevLesson = lessons[currentIndex - 1];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!currentLesson) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">Dars topilmadi</p>
        <Link to={`/modules/${moduleId}`} className="btn-primary mt-4 inline-block">
          Orqaga
        </Link>
      </div>
    );
  }

  const handleComplete = async (score?: number) => {
    await updateLessonProgress(moduleId, lessonId!, true, score);
    setCompleted(true);
    onComplete?.();
  };

  const handleNext = () => {
    if (nextLesson) {
      navigate(`/modules/${moduleId}/${nextLesson.id}`);
    } else {
      navigate(`/modules/${moduleId}`);
    }
  };

  const lessonContent = lessonContents[lessonId!];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/modules/${moduleId}`}
          className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modulga qaytish</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                DARS {currentIndex + 1} / {lessons.length}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {currentLesson.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {currentLesson.description}
              </p>
            </div>
            {completed && (
              <div className="bg-success-100 dark:bg-success-900/30 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card mb-6"
      >
        {currentLesson.type === 'test' ? (
          <TestComponent
            test={module1Test}
            onComplete={(score) => handleComplete(score)}
          />
        ) : lessonContent ? (
          <div className="space-y-6">
            {lessonContent.sections.map((section: any, index: number) => (
              <div key={index}>
                {section.type === 'text' && (
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>
                )}
                {section.type === 'interactive' && (
                  <InteractiveComponent
                    type={section.content.type}
                    lessonId={lessonId!}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Dars materiali tayyorlanmoqda...
            </p>
          </div>
        )}

        {/* Complete Button */}
        {currentLesson.type !== 'test' && !completed && lessonContent && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <button onClick={() => handleComplete()} className="btn-success">
              <CheckCircle className="w-5 h-5 mr-2" />
              Darsni Tugatish
            </button>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            prevLesson
              ? navigate(`/modules/${moduleId}/${prevLesson.id}`)
              : navigate(`/modules/${moduleId}`)
          }
          className="btn-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {prevLesson ? 'Oldingi Dars' : 'Modulga Qaytish'}
        </button>

        {nextLesson && (
          <button onClick={handleNext} className="btn-primary">
            Keyingi Dars
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
