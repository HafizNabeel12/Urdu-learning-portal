'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Student, Chapter, LeaderboardEntry } from '@/types';
import { getStudentFromSession, clearStudentSession, getAllStudents } from '@/lib/auth';
import { demoChapters } from '@/data/demoData';

export default function DashboardPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    const currentStudent = getStudentFromSession();
    if (!currentStudent) {
      router.push('/');
    } else {
      setStudent(currentStudent);
      calculateLeaderboard();
    }
  }, [router]);

  const calculateLeaderboard = () => {
    const allStudents = getAllStudents();
    const entries: LeaderboardEntry[] = allStudents
      .map((s) => ({
        studentId: s.id,
        studentName: s.name,
        totalScore: s.score,
        chaptersCompleted: s.chaptersCompleted.length,
        rank: 0,
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
    
    setLeaderboard(entries);
  };

  const handleLogout = () => {
    clearStudentSession();
    router.push('/');
  };

  const handleChapterSelect = (chapterId: string) => {
    router.push(`/learn/${chapterId}`);
  };

  if (!student) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-urdu-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-effect border-b border-urdu-primary/20 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-urdu-primary to-urdu-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl urdu-text text-white font-bold">ا</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-urdu-primary">Smart Urdu Learning</h1>
                <p className="text-sm urdu-text text-urdu-secondary">{student.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="px-4 py-2 bg-urdu-accent text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                🏆 Leaderboard
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-urdu-secondary text-white rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="glass-effect rounded-2xl p-6 shadow-xl border-l-4 border-urdu-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-urdu-secondary mb-1">Total Score</p>
                <p className="text-3xl font-bold text-urdu-primary">{student.score}</p>
              </div>
              <div className="w-14 h-14 bg-urdu-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 shadow-xl border-l-4 border-urdu-accent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-urdu-secondary mb-1">Chapters Completed</p>
                <p className="text-3xl font-bold text-urdu-accent">{student.chaptersCompleted.length}</p>
              </div>
              <div className="w-14 h-14 bg-urdu-accent/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 shadow-xl border-l-4 border-urdu-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-urdu-secondary mb-1">Your Rank</p>
                <p className="text-3xl font-bold text-urdu-secondary">
                  #{leaderboard.find(e => e.studentId === student.id)?.rank || '-'}
                </p>
              </div>
              <div className="w-14 h-14 bg-urdu-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏅</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chapters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-display font-bold text-urdu-primary mb-6 text-shadow-gold">
            Available Chapters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoChapters.map((chapter, index) => {
              const isCompleted = student.chaptersCompleted.includes(chapter.id);
              const isInProgress = student.currentProgress?.chapterId === chapter.id;
              
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-effect rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => handleChapterSelect(chapter.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-urdu-primary to-urdu-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      
                      {isCompleted && (
                        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                          ✓ Completed
                        </span>
                      )}
                      {isInProgress && !isCompleted && (
                        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                          In Progress
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-urdu-primary mb-2 group-hover:text-urdu-accent transition-colors">
                      {chapter.title}
                    </h3>
                    
                    <p className="text-lg urdu-text text-urdu-secondary mb-3 font-semibold">
                      {chapter.titleUrdu}
                    </p>
                    
                    <p className="text-sm text-urdu-secondary/70 mb-4">
                      {chapter.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-urdu-primary/10">
                      <span className="text-sm text-urdu-secondary flex items-center">
                        <span className="mr-2">⏱️</span>
                        {Math.floor(chapter.duration / 60)} mins
                      </span>
                      <span className="text-sm text-urdu-accent font-semibold flex items-center">
                        <span className="mr-2">⭐</span>
                        {chapter.totalPoints} pts
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-urdu-primary to-urdu-accent p-3 text-center">
                    <span className="text-white font-semibold text-sm">
                      {isCompleted ? 'Replay Chapter' : isInProgress ? 'Continue Learning' : 'Start Learning'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-display font-bold text-urdu-primary">🏆 Leaderboard</h2>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="w-10 h-10 rounded-full bg-urdu-secondary/20 hover:bg-urdu-secondary/30 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                {leaderboard.map((entry, index) => {
                  const isCurrentStudent = entry.studentId === student.id;
                  
                  return (
                    <motion.div
                      key={entry.studentId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isCurrentStudent
                          ? 'bg-urdu-accent/10 border-urdu-accent'
                          : 'bg-white/50 border-urdu-primary/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-amber-700' :
                            'bg-urdu-secondary'
                          }`}>
                            {entry.rank}
                          </div>
                          
                          <div>
                            <p className={`font-bold urdu-text ${
                              isCurrentStudent ? 'text-urdu-accent' : 'text-urdu-primary'
                            }`}>
                              {entry.studentName}
                              {isCurrentStudent && ' (You)'}
                            </p>
                            <p className="text-sm text-urdu-secondary">
                              {entry.chaptersCompleted} chapters completed
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-urdu-accent">{entry.totalScore}</p>
                          <p className="text-xs text-urdu-secondary">points</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
