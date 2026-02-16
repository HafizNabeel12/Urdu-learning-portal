'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { Student, Chapter, MCQ, QuizCheckpoint } from '@/types';
import { getStudentFromSession, updateStudentProgress } from '@/lib/auth';
import { demoChapters } from '@/data/demoData';

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [student, setStudent] = useState<Student | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentCheckpoint, setCurrentCheckpoint] = useState<QuizCheckpoint | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [passedCheckpoints, setPassedCheckpoints] = useState<number[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const currentStudent = getStudentFromSession();
    if (!currentStudent) {
      router.push('/');
      return;
    }
    
    const currentChapter = demoChapters.find(c => c.id === params.chapterId);
    if (!currentChapter) {
      router.push('/dashboard');
      return;
    }
    
    setStudent(currentStudent);
    setChapter(currentChapter);
    
    // Load progress if exists
    if (currentStudent.currentProgress?.chapterId === currentChapter.id) {
      setScore(currentStudent.currentProgress.quizzesPassed * 10);
      setPassedCheckpoints(
        Array.from({ length: currentStudent.currentProgress.quizzesPassed }, (_, i) => i)
      );
    }
  }, [params.chapterId, router]);

  useEffect(() => {
    if (!chapter || !videoRef.current) return;

    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      
      // Check for checkpoint
      chapter.checkpoints.forEach((checkpoint, index) => {
        if (
          Math.abs(time - checkpoint.timeInSeconds) < 0.5 &&
          !passedCheckpoints.includes(index) &&
          !showQuiz
        ) {
          video.pause();
          setIsPlaying(false);
          setCurrentCheckpoint(checkpoint);
          setCurrentQuizIndex(0);
          setShowQuiz(true);
          setSelectedAnswer(null);
          setIsCorrect(null);
        }
      });
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [chapter, passedCheckpoints, showQuiz]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isCorrect !== null) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentCheckpoint!.mcqs[currentQuizIndex].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      const points = currentCheckpoint!.mcqs[currentQuizIndex].points;
      setScore(prev => prev + points);
      
      // Mark question as answered
      setAnsweredQuestions(prev => new Set([...prev, currentCheckpoint!.mcqs[currentQuizIndex].id]));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < currentCheckpoint!.mcqs.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // All questions answered in this checkpoint
      const checkpointIndex = chapter!.checkpoints.findIndex(
        cp => cp.timeInSeconds === currentCheckpoint!.timeInSeconds
      );
      setPassedCheckpoints(prev => [...prev, checkpointIndex]);
      setShowQuiz(false);
      setCurrentCheckpoint(null);
      
      // Check if chapter is completed
      if (passedCheckpoints.length + 1 >= chapter!.checkpoints.length) {
        handleChapterCompletion();
      } else {
        videoRef.current?.play();
      }
    }
  };

  const handleChapterCompletion = () => {
    if (!student || !chapter) return;
    
    const updatedStudent: Student = {
      ...student,
      score: student.score + score,
      chaptersCompleted: student.chaptersCompleted.includes(chapter.id)
        ? student.chaptersCompleted
        : [...student.chaptersCompleted, chapter.id],
      currentProgress: null,
    };
    
    updateStudentProgress(updatedStudent);
    setStudent(updatedStudent);
    setShowCompletionModal(true);
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  if (!student || !chapter) {
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
        className="glass-effect border-b border-urdu-primary/20 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBackToDashboard}
                className="w-10 h-10 rounded-full bg-urdu-secondary/20 hover:bg-urdu-secondary/30 flex items-center justify-center transition-colors"
              >
                ←
              </motion.button>
              
              <div>
                <h1 className="text-lg font-bold text-urdu-primary">{chapter.title}</h1>
                <p className="text-sm urdu-text text-urdu-secondary">{chapter.titleUrdu}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-urdu-secondary">Current Score</p>
                <p className="text-2xl font-bold text-urdu-accent">{score}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-urdu-secondary">Progress</p>
                <p className="text-lg font-bold text-urdu-primary">
                  {passedCheckpoints.length}/{chapter.checkpoints.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-3xl overflow-hidden shadow-2xl mb-8"
          >
            <div className="relative bg-black aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                controlsList="nodownload"
              >
                <source src={chapter.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {!isPlaying && !showQuiz && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-urdu-accent rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => videoRef.current?.play()}
                  >
                    <span className="text-white text-3xl">▶</span>
                  </motion.div>
                </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="p-4 bg-white/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-urdu-secondary">Video Progress</span>
                <span className="text-sm font-bold text-urdu-primary">
                  {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / 
                  {Math.floor(chapter.duration / 60)}:{(Math.floor(chapter.duration % 60)).toString().padStart(2, '0')}
                </span>
              </div>
              
              <div className="relative h-2 bg-urdu-primary/20 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-urdu-primary to-urdu-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentTime / chapter.duration) * 100}%` }}
                />
                
                {/* Checkpoint markers */}
                {chapter.checkpoints.map((checkpoint, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 bottom-0 w-1 ${
                      passedCheckpoints.includes(index) ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ left: `${(checkpoint.timeInSeconds / chapter.duration) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chapter Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-urdu-primary mb-3">About this chapter</h2>
            <p className="text-urdu-secondary mb-4">{chapter.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-urdu-primary/5 rounded-xl p-4">
                <p className="text-sm text-urdu-secondary mb-1">Total Points</p>
                <p className="text-2xl font-bold text-urdu-accent">{chapter.totalPoints}</p>
              </div>
              
              <div className="bg-urdu-accent/5 rounded-xl p-4">
                <p className="text-sm text-urdu-secondary mb-1">Quiz Checkpoints</p>
                <p className="text-2xl font-bold text-urdu-primary">{chapter.checkpoints.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && currentCheckpoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-effect rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-urdu-accent"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-urdu-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-urdu-primary mb-2">Quiz Checkpoint!</h2>
                <p className="text-urdu-secondary">
                  Question {currentQuizIndex + 1} of {currentCheckpoint.mcqs.length}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-urdu-primary mb-6 urdu-text text-center">
                  {currentCheckpoint.mcqs[currentQuizIndex].question}
                </h3>

                <div className="space-y-3">
                  {currentCheckpoint.mcqs[currentQuizIndex].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isCorrect !== null}
                      className={`w-full p-4 rounded-xl text-left font-semibold transition-all urdu-text ${
                        selectedAnswer === index
                          ? isCorrect
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-red-500 text-white shadow-lg'
                          : isCorrect !== null && index === currentCheckpoint.mcqs[currentQuizIndex].correctAnswer
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-white/70 hover:bg-white text-urdu-primary border-2 border-urdu-primary/20'
                      } disabled:cursor-not-allowed`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={`p-4 rounded-xl mb-4 ${
                    isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                  }`}>
                    <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                    </p>
                    <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect 
                        ? `You earned ${currentCheckpoint.mcqs[currentQuizIndex].points} points!`
                        : 'Try to remember the correct answer for next time.'}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextQuestion}
                    className="w-full bg-gradient-to-r from-urdu-primary to-urdu-accent text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
                  >
                    {currentQuizIndex < currentCheckpoint.mcqs.length - 1
                      ? 'Next Question →'
                      : 'Continue Video →'}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-effect rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-2 border-urdu-accent"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 bg-gradient-to-br from-urdu-accent to-urdu-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-5xl">🎉</span>
              </motion.div>

              <h2 className="text-3xl font-bold text-urdu-primary mb-3">Chapter Completed!</h2>
              <p className="text-lg urdu-text text-urdu-secondary mb-6 font-semibold">
                {chapter.titleUrdu}
              </p>

              <div className="bg-urdu-accent/10 rounded-2xl p-6 mb-6">
                <p className="text-sm text-urdu-secondary mb-2">Your Score</p>
                <p className="text-5xl font-bold text-urdu-accent mb-2">{score}</p>
                <p className="text-sm text-urdu-secondary">
                  out of {chapter.totalPoints} points
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToDashboard}
                className="w-full bg-gradient-to-r from-urdu-primary to-urdu-accent text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
              >
                Back to Dashboard
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
