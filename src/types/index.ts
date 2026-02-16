export interface Student {
  id: string;
  name: string;
  password: string;
  score: number;
  chaptersCompleted: string[];
  currentProgress: {
    chapterId: string;
    videoProgress: number;
    quizzesPassed: number;
  } | null;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizCheckpoint {
  timeInSeconds: number;
  mcqs: MCQ[];
}

export interface Chapter {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  videoUrl: string;
  duration: number;
  checkpoints: QuizCheckpoint[];
  totalPoints: number;
}

export interface LeaderboardEntry {
  studentId: string;
  studentName: string;
  totalScore: number;
  chaptersCompleted: number;
  rank: number;
}
