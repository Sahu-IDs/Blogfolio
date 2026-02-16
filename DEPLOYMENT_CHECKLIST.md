# ✅ Render.com Deployment Checklist

## 🎯 Quick Reference for Deployment

### Before You Start
- [ ] Code tested locally and working
- [ ] MongoDB Atlas account ready
- [ ] GitHub account ready
- [ ] Render.com account created (free)

---

## 📋 Step-by-Step Checklist

### 1. GitHub Setup (5 minutes)
```bash
- [ ] git init
- [ ] git add .
- [ ] git commit -m "Initial commit"
- [ ] Create repo on GitHub
- [ ] git remote add origin YOUR_REPO_URL
- [ ] git push -u origin main
```

### 2. MongoDB Atlas (2 minutes)
- [ ] Go to Network Access
- [ ] Add IP: 0.0.0.0/0 (Allow all)
- [ ] Verify database user credentials
- [ ] Copy connection string

### 3. Backend Deployment (10 minutes)
- [ ] Go to Render.com → New Web Service
- [ ] Connect GitHub repo
- [ ] Configure:
  ```
  Name: blogfolio-backend
  Root Directory: server
  Build: npm install
  Start: npm start
  ```
- [ ] Add Environment Variables (copy from server/.env):
  ```
  ATLASDB_URL=mongodb+srv://...
  ACCESS_SECRET_KEY=...
  REFRESH_SECRET_KEY=...
  SECRET=...
  NODE_ENV=production
  (and all others from .env)
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment
- [ ] Copy backend URL: https://blogfolio-backend.onrender.com

### 4. Update Frontend API URL (2 minutes)
- [ ] Open Blog/.env.production
- [ ] Update: VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com
- [ ] Save file
- [ ] Commit and push:
  ```bash
  git add .
  git commit -m "Update production API URL"
  git push origin main
  ```

### 5. Frontend Deployment (10 minutes)
- [ ] Go to Render.com → New Static Site
- [ ] Connect same GitHub repo
- [ ] Configure:
  ```
  Name: blogfolio-frontend
  Root Directory: Blog
  Build: npm install && npm run build
  Publish: dist
  ```
- [ ] Add Environment Variable:
  ```
  VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com
  ```
- [ ] Click "Create Static Site"
- [ ] Wait for deployment
- [ ] Copy frontend URL: https://blogfolio-frontend.onrender.com

### 6. Update CORS (5 minutes)
- [ ] Open server/index.js
- [ ] Add frontend URL to CORS origins:
  ```javascript
  origin: [
    'http://localhost:5173',
    'https://YOUR-FRONTEND-URL.onrender.com'
  ]
  ```
- [ ] Commit and push:
  ```bash
  git add .
  git commit -m "Update CORS for production"
  git push origin main
  ```
- [ ] Wait for auto-redeploy

### 7. Testing (5 minutes)
- [ ] Visit backend URL → Should show "Server is running"
- [ ] Visit frontend URL → Should load homepage
- [ ] Test signup/login
- [ ] Test blog creation
- [ ] Test portfolio creation
- [ ] Test file upload
- [ ] Check MongoDB → Data should save

---

## 🔐 Environment Variables Reference

### Backend (.env):
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
FRONTEND_URL=https://YOUR-FRONTEND-URL.onrender.com
LOG_LEVEL=info
MAX_FILE_SIZE=10
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm
```

### Frontend (.env.production):
```
VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Backend Not Starting
**Solution:**
- Check Render logs
- Verify all environment variables are set
- Check MongoDB connection string

### Issue 2: CORS Error
**Solution:**
- Add frontend URL to CORS origins in server/index.js
- Redeploy backend

### Issue 3: Frontend Not Loading
**Solution:**
- Check build logs on Render
- Verify VITE_API_URL is set correctly
- Check publish directory is "dist"

### Issue 4: Backend Sleeping
**Solution:**
- Free tier sleeps after 15 min
- First request takes 30-50 sec
- Use cron-job.org to keep alive

---

## 🚀 Your Live URLs

After deployment:
```
Frontend: https://blogfolio-frontend.onrender.com
Backend:  https://blogfolio-backend.onrender.com
Database: MongoDB Atlas (Cloud)
```

---

## 📞 Need Help?

1. Check DEPLOYMENT_GUIDE.md for detailed instructions
2. Review Render logs for errors
3. Verify environment variables
4. Check MongoDB Atlas connection

---

## ⏱️ Estimated Time

- Total: 30-45 minutes
- GitHub Setup: 5 min
- MongoDB: 2 min
- Backend Deploy: 10 min
- Frontend Deploy: 10 min
- CORS Update: 5 min
- Testing: 5 min

---

**Ready? Let's deploy! 🚀**

Follow the checklist step by step and you'll be live in under an hour!
