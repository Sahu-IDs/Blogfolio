# 🚀 Render.com Deployment Guide - BlogFolio

## 📋 Prerequisites

- [x] GitHub account
- [x] Render.com account (free tier available)
- [x] MongoDB Atlas account (already have)
- [x] Project code ready

---

## 🎯 Deployment Strategy

### Architecture:
```
Frontend (Vite/React) → Render Static Site
Backend (Node.js)     → Render Web Service
Database (MongoDB)    → MongoDB Atlas (Cloud)
```

---

## 📦 Part 1: Prepare Your Project

### Step 1: Create GitHub Repository

1. **Initialize Git** (if not already done):
```bash
cd c:\Users\sandeep\Desktop\DeltaReact
git init
git add .
git commit -m "Initial commit - BlogFolio MERN App"
```

2. **Create GitHub Repo:**
   - Go to: https://github.com/new
   - Repository name: `blogfolio`
   - Description: "Full-Stack MERN Blog & Portfolio Platform"
   - **Keep it Private** (recommended for now)
   - Click "Create repository"

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/blogfolio.git
git branch -M main
git push -u origin main
```

---

## 🔧 Part 2: Backend Deployment (Render Web Service)

### Step 1: Prepare Backend for Deployment

**Update `server/package.json`:**

Add this to scripts section:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

**Create `server/render.yaml`:**
```yaml
services:
  - type: web
    name: blogfolio-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

### Step 2: Deploy Backend on Render

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com/
   - Click "New +" → "Web Service"

2. **Connect GitHub:**
   - Select your `blogfolio` repository
   - Click "Connect"

3. **Configure Web Service:**
   ```
   Name: blogfolio-backend
   Region: Singapore (closest to India)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   Add these (from your `.env` file):
   ```
   ATLASDB_URL=mongodb+srv://student:Sandeep1260@cluster0.owvpojw.mongodb.net/blog?retryWrites=true&w=majority
   ACCESS_SECRET_KEY=your_access_secret_key_12345
   REFRESH_SECRET_KEY=your_refresh_secret_key_67890
   SECRET=mysupersecretcode
   NODE_ENV=production
   PORT=8000
   EMAIL_USER=vaibhav12679@gmail.com
   EMAIL_PASSWORD=dhbfgzgbgnkyohpv
   OWNER_EMAIL=vaibhav12679@gmail.com
   DEFAULT_RECIPIENT_EMAIL=vaibhav12679@gmail.com
   OWNER_USER_ID=697b9fcebc927aa3691a0231
   FRONTEND_URL=https://YOUR_FRONTEND_URL.onrender.com
   LOG_LEVEL=info
   MAX_FILE_SIZE=10
   ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm
   ```

5. **Click "Create Web Service"**

6. **Wait for deployment** (5-10 minutes)

7. **Copy Backend URL:**
   - Example: `https://blogfolio-backend.onrender.com`
   - Save this URL!

---

## 🎨 Part 3: Frontend Deployment (Render Static Site)

### Step 1: Update Frontend API URL

**Update `Blog/src/service/api.js`:**

Find the API URL and update:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

**Create `Blog/.env.production`:**
```env
VITE_API_URL=https://blogfolio-backend.onrender.com
```

**Update `Blog/vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

### Step 2: Deploy Frontend on Render

1. **Go to Render Dashboard:**
   - Click "New +" → "Static Site"

2. **Connect Same Repository:**
   - Select `blogfolio` repository

3. **Configure Static Site:**
   ```
   Name: blogfolio-frontend
   Branch: main
   Root Directory: Blog
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variables:**
   ```
   VITE_API_URL=https://blogfolio-backend.onrender.com
   ```

5. **Click "Create Static Site"**

6. **Wait for deployment** (3-5 minutes)

7. **Your Frontend URL:**
   - Example: `https://blogfolio-frontend.onrender.com`

---

## 🔄 Part 4: Update CORS Settings

**Update `server/index.js`:**

```javascript
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'https://blogfolio-frontend.onrender.com', // Add your frontend URL
        'https://YOUR_CUSTOM_DOMAIN.com' // If you have custom domain
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
}));
```

**Commit and push:**
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-deploy the changes!

---

## 🗄️ Part 5: MongoDB Atlas Configuration

1. **Go to MongoDB Atlas:**
   - https://cloud.mongodb.com/

2. **Network Access:**
   - Click "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

3. **Database User:**
   - Already configured: `student` / `Sandeep1260`
   - Keep it as is

---

## ✅ Part 6: Testing Deployment

### Test Backend:
```bash
# Visit in browser:
https://blogfolio-backend.onrender.com/

# Should show: "Server is running successfully"
```

### Test Frontend:
```bash
# Visit in browser:
https://blogfolio-frontend.onrender.com/

# Should load your homepage
```

### Test Full Flow:
1. Open frontend URL
2. Try to login/signup
3. Create a blog post
4. Check if it saves to MongoDB
5. Test portfolio creation

---

## 🎯 Important Notes

### Free Tier Limitations:
- ⚠️ **Backend sleeps after 15 min inactivity**
- ⚠️ **First request takes 30-50 seconds to wake up**
- ✅ **750 hours/month free** (enough for demo)
- ✅ **Unlimited static sites**

### Solutions:
1. **Keep Backend Alive:**
   - Use cron-job.org to ping every 10 minutes
   - URL to ping: `https://blogfolio-backend.onrender.com/`

2. **Upgrade to Paid:**
   - $7/month for always-on backend
   - No sleep, faster performance

---

## 🔐 Security Checklist

- [x] `.env` file in `.gitignore`
- [x] Environment variables set on Render
- [x] MongoDB Atlas IP whitelist configured
- [x] CORS properly configured
- [x] Sensitive files hidden (.gitignore)
- [x] Production mode enabled

---

## 🐛 Troubleshooting

### Backend Not Starting:
```bash
# Check Render logs:
Dashboard → Your Service → Logs

# Common issues:
- Missing environment variables
- MongoDB connection error
- Port binding issues
```

### Frontend Not Loading:
```bash
# Check build logs
# Common issues:
- API URL not configured
- Build command failed
- Wrong publish directory
```

### CORS Errors:
```bash
# Update server/index.js with correct frontend URL
# Redeploy backend
```

### MongoDB Connection Failed:
```bash
# Check:
1. IP whitelist (0.0.0.0/0)
2. Database credentials
3. Connection string format
```

---

## 📱 Custom Domain (Optional)

### Add Custom Domain:

1. **Buy Domain** (Namecheap, GoDaddy, etc.)

2. **On Render:**
   - Go to your Static Site
   - Click "Settings" → "Custom Domains"
   - Add your domain
   - Follow DNS instructions

3. **Update DNS:**
   - Add CNAME record pointing to Render

---

## 🚀 Deployment Commands Summary

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# After changes
git add .
git commit -m "Your commit message"
git push origin main

# Render auto-deploys on push!
```

---

## 📊 Deployment Checklist

### Before Deployment:
- [x] Code tested locally
- [x] `.env` in `.gitignore`
- [x] MongoDB Atlas configured
- [x] GitHub repository created
- [x] Code pushed to GitHub

### During Deployment:
- [ ] Backend deployed on Render
- [ ] Environment variables added
- [ ] Backend URL copied
- [ ] Frontend API URL updated
- [ ] Frontend deployed on Render
- [ ] CORS updated with frontend URL

### After Deployment:
- [ ] Backend URL working
- [ ] Frontend URL working
- [ ] Login/Signup working
- [ ] Blog creation working
- [ ] Portfolio creation working
- [ ] File upload working
- [ ] MongoDB data saving

---

## 🎉 Your Live URLs

After deployment, you'll have:

```
Frontend: https://blogfolio-frontend.onrender.com
Backend:  https://blogfolio-backend.onrender.com
Database: MongoDB Atlas (Cloud)
```

Share the **Frontend URL** with teachers and friends!

---

## 💡 Pro Tips

1. **Keep Backend Warm:**
   - Use UptimeRobot or cron-job.org
   - Ping every 10 minutes

2. **Monitor Logs:**
   - Check Render dashboard regularly
   - Fix errors quickly

3. **Environment Variables:**
   - Never commit `.env`
   - Always use Render's environment variables

4. **Auto-Deploy:**
   - Render auto-deploys on git push
   - No manual deployment needed

5. **SSL Certificate:**
   - Render provides free SSL
   - Your site will be HTTPS automatically

---

## 📞 Support

### Render Documentation:
- https://render.com/docs

### MongoDB Atlas:
- https://docs.atlas.mongodb.com/

### Issues?
- Check Render logs
- Check MongoDB Atlas logs
- Review CORS settings
- Verify environment variables

---

**Ready to deploy? Follow the steps above! 🚀**

**Estimated Time:** 30-45 minutes for complete deployment
