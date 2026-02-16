# Troubleshooting Guide

## 🔧 Common Issues and Solutions

### 1. Installation Issues

#### Error: "command not found: npm"
**Problem:** Node.js is not installed
**Solution:**
1. Download Node.js from https://nodejs.org
2. Install the LTS version
3. Restart your terminal
4. Verify: `node --version` and `npm --version`

#### Error: "Cannot find module..."
**Problem:** Dependencies not installed
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Port 3000 is already in use"
**Problem:** Another app is using port 3000
**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001

# OR kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

---

### 2. Video Issues

#### Videos Not Playing
**Problem:** Video files not found
**Solutions:**

1. **Check file location:**
   ```bash
   # Create the directory if missing
   mkdir -p public/videos
   ```

2. **Verify file names match:**
   - Files: `chapter1.mp4`, `chapter2.mp4`, `chapter3.mp4`
   - Check `src/data/demoData.ts` for correct paths

3. **Check video format:**
   - Use MP4 format
   - Codec: H.264
   - Container: MP4

4. **File permissions:**
   ```bash
   # Mac/Linux - make sure files are readable
   chmod 644 public/videos/*.mp4
   ```

#### Video Plays but No Audio
**Problem:** Audio codec not supported
**Solution:**
- Re-encode video with AAC audio codec
- Use online converter or VLC media player
- Recommended settings:
  - Video: H.264
  - Audio: AAC
  - Container: MP4

#### Video Loads Slowly
**Problem:** Large file size
**Solutions:**
1. Compress video:
   - Use HandBrake or FFmpeg
   - Target 720p resolution
   - Lower bitrate to 2-3 Mbps

2. Use external hosting:
   - Upload to YouTube/Vimeo
   - Use public URL in `demoData.ts`

---

### 3. Quiz/Checkpoint Issues

#### Quiz Doesn't Show Up
**Problem:** Checkpoint timing mismatch
**Solutions:**

1. **Check video duration:**
   ```javascript
   // In demoData.ts
   duration: 900, // Must match actual video length in seconds
   ```

2. **Verify checkpoint timing:**
   ```javascript
   checkpoints: [
     {
       timeInSeconds: 300, // 5 minutes = 300 seconds
       // Must be less than video duration
     }
   ]
   ```

3. **Test with shorter time:**
   ```javascript
   // For testing, use 10 seconds
   timeInSeconds: 10,
   ```

#### Quiz Shows Multiple Times
**Problem:** State not being tracked correctly
**Solution:**
1. Clear browser cache
2. Check `passedCheckpoints` state
3. Restart the video from beginning

#### Wrong Answer Doesn't Show Correct Answer
**Problem:** Logic issue
**Solution:**
The correct answer is shown after selecting. Check:
```typescript
correctAnswer: 0, // 0 = first option, 1 = second, etc.
```

---

### 4. Login Issues

#### "Invalid Student ID or Password"
**Solutions:**
1. **Use exact credentials:**
   - ID: `STD001` (case-sensitive)
   - Password: `demo123`

2. **Check for extra spaces:**
   - Don't copy-paste with spaces
   - Type manually

3. **Clear browser data:**
   - Clear cache and cookies
   - Try incognito/private mode

#### Login Works but Dashboard is Blank
**Problem:** Session storage issue
**Solution:**
1. Open browser console (F12)
2. Clear session storage:
   ```javascript
   sessionStorage.clear()
   ```
3. Clear local storage:
   ```javascript
   localStorage.clear()
   ```
4. Refresh page and login again

---

### 5. Progress/Score Issues

#### Score Not Updating
**Problem:** Storage not persisting
**Solutions:**

1. **Check browser settings:**
   - Enable cookies
   - Enable local storage
   - Disable private browsing

2. **Test storage:**
   ```javascript
   // In browser console
   localStorage.setItem('test', 'works')
   localStorage.getItem('test') // Should return 'works'
   ```

#### Leaderboard Not Showing
**Problem:** No data in localStorage
**Solution:**
```javascript
// In browser console
localStorage.clear()
// Then refresh and login again
```

#### Progress Lost After Refresh
**Problem:** Using sessionStorage instead of localStorage
**Note:** This is by design for demo. To persist:
1. Change `sessionStorage` to `localStorage` in `src/lib/auth.ts`
2. OR implement backend database

---

### 6. Design/Display Issues

#### Text Looks Wrong
**Problem:** Fonts not loading
**Solutions:**
1. Check internet connection (fonts load from Google)
2. Wait 5-10 seconds for fonts to load
3. If offline, fonts will fall back to defaults

#### Urdu Text Shows as Boxes
**Problem:** Urdu font not loading
**Solution:**
1. Install Noto Nastaliq Urdu font on system
2. Or wait for Google Fonts to load

#### Page Looks Broken
**Problem:** Styles not loading
**Solutions:**
1. Check terminal for build errors
2. Restart dev server:
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

#### Animations Not Working
**Problem:** JavaScript disabled or Framer Motion issue
**Solutions:**
1. Enable JavaScript in browser
2. Check browser console for errors
3. Update dependencies:
   ```bash
   npm update framer-motion
   ```

---

### 7. Mobile Issues

#### Can't Access on Phone
**Problem:** Network configuration
**Solutions:**

1. **Ensure same WiFi:**
   - Phone and computer must be on same network
   - Not on mobile data

2. **Check firewall:**
   - Allow port 3000
   - Temporarily disable firewall for testing

3. **Find correct IP:**
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address: 192.168.x.x

   # Mac
   ifconfig | grep "inet "
   # Look for 192.168.x.x

   # Linux
   hostname -I
   ```

4. **Access using IP:**
   ```
   http://192.168.1.100:3000
   ```

#### Layout Broken on Mobile
**Problem:** Responsive design issue
**Solution:**
- This shouldn't happen (design is responsive)
- Clear browser cache on phone
- Try different mobile browser

---

### 8. Build/Deployment Issues

#### Build Fails
**Problem:** TypeScript or build errors
**Solutions:**

1. **Check errors in terminal**
2. **Fix TypeScript errors:**
   ```bash
   npm run build
   # Read error messages carefully
   ```

3. **Clear cache and rebuild:**
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

#### Vercel Deployment Fails
**Problem:** Various deployment issues
**Solutions:**

1. **Check build logs** in Vercel dashboard
2. **Environment variables:** None needed for demo
3. **Node version:**
   - Add to `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

---

### 9. Performance Issues

#### App is Slow
**Solutions:**

1. **Optimize videos:**
   - Compress to smaller size
   - Use 720p instead of 1080p

2. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)

3. **Check system resources:**
   - Close other applications
   - Check RAM usage

#### High CPU Usage
**Problem:** Video decoding
**Solution:**
- Use hardware-accelerated video format (H.264)
- Close other browser tabs
- Use production build instead of dev

---

### 10. Browser Compatibility

#### Works in Chrome but not Safari
**Problem:** Browser-specific features
**Solutions:**

1. **Use modern browser:**
   - Chrome (recommended)
   - Firefox
   - Edge
   - Safari 14+

2. **Update browser** to latest version

3. **Check console** for specific errors

---

## 🆘 Emergency Quick Fixes

### Nuclear Option - Start Fresh:
```bash
# 1. Stop the server (Ctrl+C)
# 2. Delete everything and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev

# 3. Clear browser data
# - Open browser console (F12)
# - Application tab → Clear storage
# - Check all boxes → Clear data
```

### Before Presentation:
```bash
# Test everything works:
1. npm install
2. npm run dev
3. Open http://localhost:3000
4. Login with STD001 / demo123
5. Test one complete chapter
6. Check leaderboard
7. Logout and login as different student
```

---

## 📞 Getting Help

### Check These in Order:

1. **Browser Console (F12)**
   - Look for red error messages
   - Copy exact error text

2. **Terminal Output**
   - Look for error messages
   - Check for warnings

3. **README.md**
   - Contains detailed documentation

4. **QUICKSTART.md**
   - Step-by-step setup guide

### Reporting Issues:

When asking for help, provide:
- Error message (exact text)
- What you were trying to do
- What happened instead
- Browser and OS version
- Steps to reproduce

---

## ✅ Pre-Presentation Checklist

Run this 24 hours before presentation:

- [ ] All dependencies installed
- [ ] Dev server starts without errors
- [ ] Login works with demo credentials
- [ ] At least one video file added
- [ ] Videos play correctly
- [ ] Quiz appears at correct time
- [ ] Answers can be submitted
- [ ] Score updates correctly
- [ ] Leaderboard displays
- [ ] Tested on presentation computer
- [ ] Internet connection works (for fonts)
- [ ] Backup plan ready

---

## 🎯 Day-of-Presentation Tips

1. **Arrive Early** - Test on presentation computer
2. **Have Backup** - USB drive with entire project
3. **Know Credentials** - Write down login details
4. **Test Connection** - Verify WiFi works
5. **Close Tabs** - Only have app open
6. **Zoom Level** - Set to 100% or 110%
7. **Have Fun!** - You built something amazing

---

Remember: Most issues have simple solutions. Stay calm, check the basics first, and you'll be fine! 💪
