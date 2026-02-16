# Smart Urdu Learning Portal

An interactive educational web application built with Next.js and TypeScript where students learn Urdu through animated videos with interactive quiz checkpoints.

## 🎯 Features

### Core Features
- **Student Authentication System**: Demo login with unique student IDs
- **Chapter-Based Learning**: Multiple Urdu chapters with animated video content
- **Interactive Quiz Checkpoints**: Video automatically pauses every 5 minutes for MCQ quizzes
- **Progressive Unlocking**: Students must answer correctly to continue watching
- **Scoring System**: Points awarded for correct answers with accuracy tracking
- **Leaderboard**: Real-time ranking system showing top students
- **Progress Tracking**: Track completed chapters and current progress
- **Responsive Design**: Beautiful, modern UI that works on all devices

### Technical Features
- Built with **Next.js 14** and **TypeScript**
- **Framer Motion** for smooth animations
- **Tailwind CSS** for styling with custom Urdu-themed design
- **Session Storage** for authentication
- **Local Storage** for persistent data
- Server-side rendering ready
- Production-grade code architecture

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Extract the project files** to your desired location

2. **Navigate to the project directory**:
   ```bash
   cd urdu-learning-portal
   ```

3. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 👥 Demo Credentials

Use these credentials to login:

- **Student ID**: `STD001`, `STD002`, or `STD003`
- **Password**: `demo123`

## 📹 Adding Your Videos

### Option 1: Local Videos (Recommended for Development)

1. Create a `public/videos` folder in the project root:
   ```bash
   mkdir -p public/videos
   ```

2. Add your MP4 video files:
   ```
   public/videos/chapter1.mp4
   public/videos/chapter2.mp4
   public/videos/chapter3.mp4
   ```

3. The video URLs in `src/data/demoData.ts` are already configured to use these paths.

### Option 2: External URLs

1. Upload your videos to a hosting service (YouTube, Vimeo, cloud storage)

2. Update the video URLs in `src/data/demoData.ts`:
   ```typescript
   videoUrl: 'https://your-video-url.com/video.mp4'
   ```

## ✏️ Customizing Content

### Adding/Editing Chapters

Edit `src/data/demoData.ts`:

```typescript
export const demoChapters: Chapter[] = [
  {
    id: 'CH001',
    title: 'Your Chapter Title',
    titleUrdu: 'آپ کا باب عنوان',
    description: 'Chapter description',
    videoUrl: '/videos/your-video.mp4',
    duration: 900, // duration in seconds
    totalPoints: 100,
    checkpoints: [
      {
        timeInSeconds: 300, // when to show quiz (5 minutes)
        mcqs: [
          {
            id: 'Q1',
            question: 'آپ کا سوال یہاں',
            options: ['جواب 1', 'جواب 2', 'جواب 3', 'جواب 4'],
            correctAnswer: 0, // index of correct answer (0-3)
            points: 10,
          },
        ],
      },
    ],
  },
];
```

### Adding Students

Edit `src/data/demoData.ts`:

```typescript
export const demoStudents: Student[] = [
  {
    id: 'STD004',
    name: 'نیا طالب علم',
    password: 'demo123',
    score: 0,
    chaptersCompleted: [],
    currentProgress: null,
  },
];
```

## 📁 Project Structure

```
urdu-learning-portal/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Dashboard page
│   │   ├── learn/[chapterId]/  # Video learning page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Login page
│   ├── components/             # Reusable components
│   ├── data/
│   │   └── demoData.ts         # Demo data (students & chapters)
│   ├── lib/
│   │   └── auth.ts             # Authentication utilities
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── public/
│   └── videos/                 # Video files go here
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Design Features

- **Elegant Urdu Typography**: Using Noto Nastaliq Urdu font
- **Gold & Green Theme**: Traditional colors associated with Urdu culture
- **Glass Morphism**: Modern UI with frosted glass effects
- **Smooth Animations**: Framer Motion for delightful interactions
- **Islamic Patterns**: Subtle background patterns
- **Responsive Design**: Works on mobile, tablet, and desktop

## 🛠️ Build for Production

1. **Create production build**:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start production server**:
   ```bash
   npm run start
   # or
   yarn start
   ```

## 🌟 Features Workflow

### Student Journey:
1. **Login** with Student ID and password
2. **View Dashboard** with available chapters and stats
3. **Select Chapter** to start learning
4. **Watch Video** - video plays normally
5. **Quiz Checkpoint** - video pauses at 5-minute intervals
6. **Answer MCQs** - must answer correctly to continue
7. **Earn Points** - accumulate score based on correct answers
8. **Complete Chapter** - receive completion certificate
9. **Check Leaderboard** - see ranking among peers

## 🎓 Educational Benefits

- **Active Learning**: Quiz checkpoints ensure engagement
- **Progress Tracking**: Students can monitor their improvement
- **Gamification**: Points and leaderboard increase motivation
- **Self-Paced**: Students can learn at their own speed
- **Immediate Feedback**: Instant validation of answers
- **Competition**: Healthy competition through leaderboard

## 🔒 Security Note

This is a **demo version** with simplified authentication. For production use, you should:
- Implement proper backend authentication
- Use secure password hashing
- Add JWT tokens or session management
- Connect to a real database
- Add API endpoints for data management

## 📝 Customization Tips

### Changing Colors:
Edit `tailwind.config.js`:
```javascript
colors: {
  urdu: {
    primary: '#2D5F4C',    // Main green
    secondary: '#8B6E4E',   // Brown
    accent: '#D4AF37',      // Gold
    light: '#F5F1E8',       // Background
    dark: '#1A1A1A',        // Text
  },
}
```

### Changing Fonts:
Edit `tailwind.config.js` and `globals.css`

### Adding More Features:
- Teacher admin panel
- Progress analytics
- Certificate generation
- Voice narration
- Pronunciation practice

## 🤝 Support

For issues or questions, refer to:
- Next.js Documentation: https://nextjs.org/docs
- TypeScript Documentation: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

## 📄 License

This project is created for educational purposes.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
