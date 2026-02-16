# Video Files Setup

## 📹 Where to Add Your Videos

Place your MP4 video files in the `public/videos/` directory:

```
public/
└── videos/
    ├── chapter1.mp4  (for Chapter 1)
    ├── chapter2.mp4  (for Chapter 2)
    └── chapter3.mp4  (for Chapter 3)
```

## 🎬 Video Requirements

### Format:
- **Container:** MP4
- **Video Codec:** H.264
- **Audio Codec:** AAC
- **Resolution:** 720p or 1080p (recommended)
- **Frame Rate:** 24, 25, or 30 fps

### Size Guidelines:
- **5-minute video:** 50-100 MB
- **10-minute video:** 100-200 MB
- **15-minute video:** 150-300 MB

## 🔄 Using External Videos

If you want to use videos hosted elsewhere (YouTube, Vimeo, etc.):

1. Upload your video to the platform
2. Get the direct video URL (for YouTube, you'll need to use an embed URL or extract the video)
3. Update `src/data/demoData.ts`:

```typescript
videoUrl: 'https://your-video-url.com/video.mp4'
```

### Note for YouTube:
YouTube doesn't allow direct video embedding in HTML5 video players. You have two options:
1. Use YouTube's iframe embed (requires modifying the player component)
2. Host videos elsewhere (Vimeo, AWS S3, Google Drive public link, etc.)

## 🎥 Creating Test Videos

If you don't have videos yet, you can:

1. **Use Screen Recording:**
   - Windows: Win+G (Game Bar)
   - Mac: Cmd+Shift+5
   - Record a PowerPoint presentation with voiceover

2. **Use Online Tools:**
   - Loom (free screen recording)
   - OBS Studio (advanced, free)
   - QuickTime (Mac)

3. **Use Animation Tools:**
   - Canva (has video maker)
   - Powtoon (animation maker)
   - Adobe Spark (simple videos)

## ⚙️ Converting Videos to MP4

If your videos are in different formats:

### Using VLC Media Player (Free):
1. Open VLC
2. Media → Convert/Save
3. Add your file
4. Choose Profile: "Video - H.264 + MP3 (MP4)"
5. Start conversion

### Using Online Converters:
- CloudConvert.com
- Online-Convert.com
- Zamzar.com

### Using FFmpeg (Advanced):
```bash
ffmpeg -i input.mov -c:v libx264 -c:a aac -strict experimental output.mp4
```

## 🎯 Recommended Video Structure

For educational content, structure your videos like this:

### Introduction (0:00 - 1:00)
- Welcome message
- What will be covered
- Learning objectives

### Main Content (1:00 - 5:00)
- First concept/topic
- Examples and explanations
- Visual aids

**CHECKPOINT 1 - Quiz appears at 5:00**

### Continued Learning (5:00 - 10:00)
- Second concept/topic
- More examples
- Practical applications

**CHECKPOINT 2 - Quiz appears at 10:00**

### Summary (10:00 - 15:00)
- Recap main points
- Key takeaways
- Next steps

**CHECKPOINT 3 - Final quiz at 15:00**

## 🚨 Important Notes

1. **Video Duration Must Match Code:**
   - Update `duration` in `demoData.ts` to match actual video length
   - Duration is in seconds (15 minutes = 900 seconds)

2. **Checkpoint Timing:**
   - Place checkpoints at natural breaks
   - Every 5 minutes is recommended
   - Can adjust based on your content

3. **File Size:**
   - Keep videos under 500MB for better performance
   - Compress if needed
   - Consider hosting large files externally

4. **Testing:**
   - Always test videos play correctly
   - Check audio works
   - Verify checkpoint timing
   - Test on target devices

## 📝 Example Video Script (5 minutes)

```
[0:00] "السلام علیکم! Welcome to Introduction to Urdu Poetry"
[0:15] "Today we'll learn about the beautiful world of Urdu Ghazals"
[0:30] "Ghazal is the most popular form of Urdu poetry..."
[1:00] "It consists of couplets, each called a 'sher'..."
[2:00] "Let's look at an example from Mirza Ghalib..."
[3:00] "Notice how each couplet is complete in itself..."
[4:00] "Now let's understand what 'radif' and 'qafia' mean..."
[4:45] "Great! Now let's test your understanding..."

[5:00] ** QUIZ CHECKPOINT **

Questions for this section:
1. What is the most popular form of Urdu poetry?
2. What is a 'sher'?
3. Who is a famous Urdu poet?
```

## ✅ Checklist Before Adding Videos

- [ ] Videos are in MP4 format
- [ ] Audio is clear and audible
- [ ] Video quality is good (at least 720p)
- [ ] File names match: chapter1.mp4, chapter2.mp4, etc.
- [ ] Placed in public/videos/ directory
- [ ] Updated duration in demoData.ts
- [ ] Tested that videos play in browser
- [ ] Verified checkpoint timing matches content

---

Good luck with your video creation! 🎬
