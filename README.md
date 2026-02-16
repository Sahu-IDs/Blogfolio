# BlogFolio - Role-Based Multi-User Blogging & Portfolio Platform 🚀

**BlogFolio** is a full-stack MERN (MongoDB, Express, React, Node.js) application that unifies personal portfolio management and public blogging into a single, scalable platform. It features a secure **Role-Based Access Control (RBAC)** system, allowing multiple users to sign up, create profiles, and manage their own content, while Administrators maintain oversight.

---

## ⚡ Quick Start

### Windows Users (Easiest):
```bash
# Just double-click this file:
start.bat
```

### Command Line:
```bash
# Install all dependencies
npm run install-all

# Run both frontend and backend
npm run dev
```

**Access:** Open http://localhost:5173 in your browser

---

## 🌟 Key Features

### 1. **Public Platform Architecture**
- **Multi-User System:** Any developer can sign up and create a profile.
- **Data Isolation:** Users can only edit/delete their *own* content.
- **Public Viewing:** All blogs and portfolios are publicly accessible.

### 2. **Role-Based Access Control (RBAC)**
- **Admin Role:** 
  - Access to a dedicated **Admin Dashboard**.
  - View platform statistics (Total Users, Admins).
  - Manage all users and content.
- **User Role:** 
  - Manage personal Blog posts.
  - Manage personal Portfolio items.
  - Restricted from administrative actions.

### 3. **Integrated Portfolio & Blog**
- **Dual-Purpose:** Seamlessly switch between reading blogs and viewing developer portfolios.
- **Rich Content:** WYSIWYG editor for blogs.
- **Dynamic Portfolios:** Add/Edit/Delete projects, skills, education, and social links.

### 4. **Modern UI/UX**
- **Glassmorphism Design:** Premium look with translucent cards and vibrant gradients.
- **Responsive Layout:** Fully optimized for Mobile, Tablet, and Desktop.
- **Interactive Elements:** Smooth animations, hover effects, and tooltips.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Material-UI (MUI), Context API
- **Backend:** Node.js, Express.js (RESTful API)
- **Database:** MongoDB Atlas (Cloud NoSQL)
- **Authentication:** JSON Web Tokens (JWT), BCrypt
- **Image Handling:** Multer (GridFS or Local Storage)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas URI

### Installation

#### **Option 1: Single Command (Recommended)**
```bash
# Install all dependencies (root, server, and client)
npm run install-all

# Run both frontend and backend together
npm run dev
```

#### **Option 2: Manual Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BlogFolio.git
   cd BlogFolio
   ```

2. **Server Setup**
   ```bash
   cd server
   npm install
   # Create a .env file with:
   # DB_USERNAME=...
   # DB_PASSWORD=...
   # ACCESS_SECRET_KEY=...
   # REFRESH_SECRET_KEY=...
   npm start
   ```

3. **Client Setup**
   ```bash
   cd ../Blog
   npm install
   npm run dev
   ```

4. **Access the App**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8000](http://localhost:8000)

---

## 📁 Project Structure

```
BlogFolio/
├── Blog/                    # React Frontend
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── service/         # API Service Layer
│   │   ├── constants/       # Configuration
│   │   └── utils/           # Helper Functions
│   └── package.json
│
├── server/                  # Node.js Backend
│   ├── controllers/         # Business Logic
│   ├── models/              # MongoDB Schemas
│   ├── views/               # Route Definitions
│   ├── config/              # Database Config
│   ├── middleware/          # Auth Middleware
│   └── package.json
│
├── package.json             # Root Package (Run Both)
└── README.md
```

---

## 🚀 Deployment

### Quick Deploy to Render.com (Free):
1. Follow **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** for step-by-step guide
2. Detailed instructions in **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

### Deployment Summary:
- **Backend:** Render Web Service (Node.js)
- **Frontend:** Render Static Site (React/Vite)
- **Database:** MongoDB Atlas (Cloud)
- **Time:** ~30-45 minutes
- **Cost:** Free tier available

---

## 🛡️ Admin Access
To access the Admin Dashboard:
1. Log in with an account that has the `role: 'admin'`.
2. Click the **Shield Icon** in the header or navigate to `/admin`.

---

## 🔮 Future Roadmap
- **AI Integration:** Resume parsing and content suggestions.
- **Mobile App:** React Native version.
- **Social Features:** Comments, Likes (Already partially implemented).

---
*Developed by Sandeep | 2026*
