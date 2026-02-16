import { Student, Chapter } from '@/types';

// Demo students
export const demoStudents: Student[] = [
  {
    id: 'STD001',
    name: 'احمد علی',
    password: 'demo123',
    score: 0,
    chaptersCompleted: [],
    currentProgress: null,
  },
  {
    id: 'STD002',
    name: 'فاطمہ خان',
    password: 'demo123',
    score: 0,
    chaptersCompleted: [],
    currentProgress: null,
  },
  {
    id: 'STD003',
    name: 'عمر حسن',
    password: 'demo123',
    score: 0,
    chaptersCompleted: [],
    currentProgress: null,
  },
];

// Demo chapters with sample data
export const demoChapters: Chapter[] = [
  {
    id: 'CH001',
    title: 'عالمگیر کا انصاف',
    titleUrdu: 'عالمگیر کا انصاف',
    description: 'Learn about the basics of Urdu poetry and its beautiful forms',
    videoUrl: '/videos/chapter1.mp4', // You will replace this with your actual video
    duration: 900, // 15 minutes in seconds
    totalPoints: 100,
    checkpoints: [
      {
        timeInSeconds: 100, // 5 minutes
        mcqs: [
          {
            id: 'Q1',
            question: 'اسبق اورنگزیب عالمگیر کے مصنف کون ہیں؟',
            options: ['سلیمان ندوی', 'سر سید احمد خان', 'شبلی نعمانی', 'محمد حسین آزاد'],
            correctAnswer: 2,
            points: 10,
          },
          {
            id: 'Q2',
            question: 'عالمگیر کو شدت سے احساس تھا کہ کسی شخص کا نہ ہونے پائے',
            options: ['برا', 'بال بیکا', 'دل شکستہ', 'نقصان'],
            correctAnswer: 1,
            points: 10,
          },
        ],
      },
      {
        timeInSeconds: 600, // 10 minutes
        mcqs: [
          {
            id: 'Q3',
            question: 'اردو شاعری میں "ردیف" کیا ہے؟',
            options: [
              'شعر کا پہلا مصرع',
              'دوہرانے والا لفظ',
              'شاعر کا نام',
              'کتاب کا عنوان',
            ],
            correctAnswer: 1,
            points: 15,
          },
          {
            id: 'Q4',
            question: 'مشہور شاعر "غالب" کا پورا نام کیا ہے؟',
            options: [
              'مرزا اسد اللہ خان غالب',
              'اقبال احمد',
              'فیض احمد فیض',
              'احمد فراز',
            ],
            correctAnswer: 0,
            points: 15,
          },
        ],
      },
    ],
  },
  {
    id: 'CH002',
    title: 'Famous Urdu Poets',
    titleUrdu: 'مشہور اردو شعراء',
    description: 'Explore the lives and works of legendary Urdu poets',
    videoUrl: '/videos/chapter2.mp4',
    duration: 1200, // 20 minutes
    totalPoints: 150,
    checkpoints: [
      {
        timeInSeconds: 300,
        mcqs: [
          {
            id: 'Q5',
            question: 'علامہ اقبال کو کیا کہا جاتا ہے؟',
            options: ['شاعر مشرق', 'شاعر انقلاب', 'شاعر رومان', 'شاعر غم'],
            correctAnswer: 0,
            points: 15,
          },
          {
            id: 'Q6',
            question: 'فیض احمد فیض کی مشہور نظم کون سی ہے؟',
            options: ['دست صبا', 'مجھ سے پہلی سی محبت', 'لب پہ آتی ہے دعا', 'ہم دیکھیں گے'],
            correctAnswer: 3,
            points: 15,
          },
        ],
      },
      {
        timeInSeconds: 600,
        mcqs: [
          {
            id: 'Q7',
            question: 'مومن خان مومن کس دور کے شاعر تھے؟',
            options: ['قدیم دور', 'جدید دور', 'عہد وسطی', 'معاصر دور'],
            correctAnswer: 0,
            points: 20,
          },
        ],
      },
    ],
  },
  {
    id: 'CH003',
    title: 'Urdu Prose Literature',
    titleUrdu: 'اردو نثری ادب',
    description: 'Discover the richness of Urdu prose writing',
    videoUrl: '/videos/chapter3.mp4',
    duration: 1080, // 18 minutes
    totalPoints: 120,
    checkpoints: [
      {
        timeInSeconds: 360,
        mcqs: [
          {
            id: 'Q8',
            question: 'اردو ناول کے بانی کون ہیں؟',
            options: ['پریم چند', 'مرزا ہادی رسوا', 'عبدالحلیم شرر', 'سب درست ہیں'],
            correctAnswer: 3,
            points: 15,
          },
          {
            id: 'Q9',
            question: '"امراؤ جان ادا" کس نے لکھا؟',
            options: ['پریم چند', 'مرزا ہادی رسوا', 'اشفاق احمد', 'ابن صفی'],
            correctAnswer: 1,
            points: 15,
          },
        ],
      },
      {
        timeInSeconds: 720,
        mcqs: [
          {
            id: 'Q10',
            question: 'اردو افسانے کا بانی کسے کہا جاتا ہے؟',
            options: ['منٹو', 'پریم چند', 'عصمت چغتائی', 'کرشن چندر'],
            correctAnswer: 1,
            points: 20,
          },
        ],
      },
    ],
  },
];
