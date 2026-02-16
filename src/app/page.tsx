'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { authenticateStudent, saveStudentToSession, initializeStudents } from '@/lib/auth';

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initializeStudents();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const student = authenticateStudent(studentId, password);
      
      if (student) {
        saveStudentToSession(student);
        router.push('/dashboard');
      } else {
        setError('Invalid Student ID or Password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-urdu-accent/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-urdu-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-urdu-primary to-urdu-accent rounded-2xl flex items-center justify-center mx-auto shadow-2xl transform rotate-3">
              <span className="text-4xl urdu-text text-white font-bold">ا</span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-display font-bold text-urdu-primary mb-2 text-shadow-gold"
          >
            Smart Urdu Learning
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl urdu-text text-urdu-secondary font-semibold"
          >
            تعلیمی پورٹل
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-urdu-secondary/70 mt-2 italic"
          >
            Interactive Digital Classroom
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-3xl p-8 shadow-2xl islamic-pattern"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="studentId" className="block text-sm font-semibold text-urdu-primary mb-2">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-urdu-primary/20 focus:border-urdu-accent focus:outline-none transition-all bg-white/50"
                placeholder="e.g., STD001"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-urdu-primary mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-urdu-primary/20 focus:border-urdu-accent focus:outline-none transition-all bg-white/50"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-urdu-primary to-urdu-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shine-effect"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </motion.button>
          </form>

          {/* Demo credentials info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-urdu-accent/10 rounded-xl border border-urdu-accent/30"
          >
            <p className="text-xs font-semibold text-urdu-primary mb-2">Demo Credentials:</p>
            <div className="text-xs text-urdu-secondary space-y-1">
              <p>ID: <span className="font-mono font-bold">STD001</span> / <span className="font-mono font-bold">STD002</span> / <span className="font-mono font-bold">STD003</span></p>
              <p>Password: <span className="font-mono font-bold">demo123</span></p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-sm text-urdu-secondary/60"
        >
          Powered by Modern Educational Technology
        </motion.p>
      </motion.div>
    </div>
  );
}
