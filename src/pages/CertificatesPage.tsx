import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Calendar } from 'lucide-react';
import { getCertificates } from '../lib/db';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    const certs = await getCertificates();
    setCertificates(certs);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Sertifikatlar
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Yakunlangan modullar uchun sertifikatlaringiz
        </p>
      </motion.div>

      {certificates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card text-center py-16"
        >
          <Award className="w-20 h-20 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Hali sertifikatlar yo'q
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Modullarni tugating va professional sertifikatlar oling
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-sm font-bold">1</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Barcha darslarni tugating
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-sm font-bold">2</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Yakuniy imtihondan 80%+ ball bilan o'ting
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-sm font-bold">3</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                PDF sertifikat avtomatik yaratiladi
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="module-card"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg p-6 mb-4">
                <Award className="w-12 h-12 text-white mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white text-center">
                  {cert.moduleName}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Sana
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {new Date(cert.completionDate).toLocaleDateString('uz-UZ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Ball
                  </span>
                  <span className="font-semibold text-success-600">
                    {cert.score}%
                  </span>
                </div>
              </div>

              <button className="btn-primary w-full mt-4">
                <Download className="w-4 h-4 mr-2" />
                Yuklab Olish
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Achievement Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mt-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800"
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          🎯 Yutuqlar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-8 h-8 text-slate-400 dark:text-slate-600" />
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Birinchi Dars
            </div>
          </div>
          <div className="text-center opacity-50">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-8 h-8 text-slate-400 dark:text-slate-600" />
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Birinchi Modul
            </div>
          </div>
          <div className="text-center opacity-50">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-8 h-8 text-slate-400 dark:text-slate-600" />
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Professional
            </div>
          </div>
          <div className="text-center opacity-50">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-8 h-8 text-slate-400 dark:text-slate-600" />
            </div>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Master Trader
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
