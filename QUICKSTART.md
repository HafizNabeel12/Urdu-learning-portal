# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: `http://localhost:3000`

### Step 4: Login
- Student ID: `STD001`
- Password: `demo123`

## 📹 Adding Your Own Videos

### Quick Method:
1. Create folder: `public/videos`
2. Add your videos: `chapter1.mp4`, `chapter2.mp4`, etc.
3. Videos will automatically work!

### Video Requirements:
- Format: MP4
- Recommended: 720p or 1080p
- Max size: No strict limit (but keep under 500MB for performance)

## ✏️ Editing Quiz Questions

Open: `src/data/demoData.ts`

Find the chapter and add/edit MCQs:

```typescript
mcqs: [
  {
    id: 'Q1',
    question: 'آپ کا سوال؟',  // Your question in Urdu
    options: ['جواب 1', 'جواب 2', 'جواب 3', 'جواب 4'],
    correctAnswer: 0,  // 0 = first option, 1 = second, etc.
    points: 10,
  },
]
```

## 🎨 Customizing the Look

### Change Colors:
Edit `tailwind.config.js` - change the color codes

### Change Fonts:
Edit `tailwind.config.js` - update font families

### Change Logo:
The logo is text-based. Edit the logo letter in:
- `src/app/page.tsx` (login page)
- `src/app/dashboard/page.tsx` (dashboard)

## 🔧 Common Issues

### Videos Not Playing?
- Make sure video files are in `public/videos/`
- Check that filenames match those in `demoData.ts`
- Try using `.mp4` format

### Quiz Not Showing?
- Check `timeInSeconds` in checkpoint matches video timing
- Make sure video has audio/content at that timestamp

### Login Not Working?
- Clear browser cache
- Use exact credentials: `STD001` and `demo123`
- Check browser console for errors

## 📱 Testing on Mobile

1. Find your computer's local IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. On your phone's browser, go to:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

3. Make sure your phone and computer are on the same WiFi network

## 🌐 Deploying Online

### Deploy to Vercel (Free, Easiest):

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Click "Import Project"

4. Select your GitHub repository

5. Click "Deploy"

Done! Your site will be live in 2 minutes.

### Note: For videos on Vercel
- If videos are large, upload them to YouTube/Vimeo instead
- Update `videoUrl` in `demoData.ts` with the public URL

## 🎯 Next Steps

### For Your Presentation:
1. ✅ The app is ready to demonstrate
2. ✅ Use demo credentials to show features
3. ✅ Highlight the quiz checkpoint system
4. ✅ Show the leaderboard feature

### To Make It Production-Ready:
1. Add real backend (Node.js + MongoDB)
2. Implement proper authentication
3. Add teacher admin panel
4. Create database for students and progress
5. Add more chapters and content

### Future Enhancements:
- Certificate generation on completion
- Email notifications
- Progress analytics and charts
- Mobile app version
- Voice narration
- Pronunciation checker
- Group study features
- Parent/teacher reports

## 💡 Pro Tips

1. **Test First**: Try all features before presenting
2. **Have Backup**: Keep demo credentials written down
3. **Prepare Videos**: Have 1-2 short test videos ready
4. **Show Flow**: Login → Dashboard → Chapter → Quiz → Completion
5. **Highlight Innovation**: Emphasize the auto-pause quiz system

## 📞 Need Help?

Check these resources:
- README.md - Full documentation
- Next.js Docs - https://nextjs.org/docs
- The code has comments explaining each section

---

Good luck with your presentation! 🎉
