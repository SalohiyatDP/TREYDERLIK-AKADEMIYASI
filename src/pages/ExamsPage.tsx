import { motion } from 'framer-motion';
import { FileText, Award, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ExamsPage() {
  const exams = [
    { moduleId: 1, title: 'Treyding Asoslari', questions: 50, duration: 60, passed: false },
    { moduleId: 2, title: 'Grafiklar', questions: 50, duration: 60, passed: false },
    { moduleId: 3, title: 'Price Action', questions: 50, duration: 60, passed: false },
    { moduleId: 4, title: 'Likvidlik', questions: 50, duration: 60, passed: false },
    { moduleId: 5, title: 'Smart Money Concepts', questions: 50, duration: 60, passed: false },
    { moduleId: 6, title: 'Order Block', questions: 50, duration: 60, passed: false },
    { moduleId: 7, title: 'Fair Value Gap', questions: 50, duration: 60, passed: false },
    { moduleId: 8, title: 'ICT Concepts', questions: 50, duration: 60, passed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Imtihonlar
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Har bir modul bo'yicha bilimingizni tekshiring
        </p>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 mb-8"
      >
        <div className="flex items-start space-x-4">
          <Award className="w-12 h-12 text-primary-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Imtihon Qoidalari
            </h2>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li>✅ Har bir imtihonda 50 ta savol</li>
              <li>✅ Vaqt chegarasi: 60 daqiqa</li>
              <li>✅ O'tish bali: 80%</li>
              <li>✅ Imtihonni cheksiz marta topshirish mumkin</li>
              <li>✅ Barcha imtihonlardan o'tgach sertifikat olasiz</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam, index) => (
          <motion.div
            key={exam.moduleId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="module-card relative">
              {exam.passed && (
                <div className="absolute top-4 right-4 bg-success-600 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                    MODUL {exam.moduleId}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {exam.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Savollar soni
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {exam.questions} ta
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Vaqt
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {exam.duration} daqiqa
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    O'tish bali
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    80%
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-center py-4 text-slate-600 dark:text-slate-400">
                  Tez orada qo'shiladi
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
