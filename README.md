# CodeRefine 
### Generative AI–Powered Code Review & Optimization Engine

CodeRefine is a full-stack application that helps developers and students improve their code quality using **Generative AI**.  
It provides automated code review, optimization suggestions, complexity analysis, and stores full submission history for each user.

This project is built using **Node.js + Express** for backend, **Supabase PostgreSQL** for database, **Supabase Auth** for authentication, and **Gemini LLM** for AI-powered code analysis.

---

## 🔥 Key Features

1. Supabase Authentication (Secure Login/Signup)  
2. Submit code for review and optimization  
3. AI-generated bug detection and best practices suggestions  
4. Time & Space Complexity Analysis  
5. AI-generated optimized code output  
6. User Project Management (Organize submissions into projects)  
7. Submission History Tracking  
8. AI Trace Logs stored for transparency  
9. Dashboard Stats (Total submissions, projects, most used language)  
10. Secure Database with Row Level Security (RLS)

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- Supabase PostgreSQL
- Supabase Auth
- Gemini LLM API
- dotenv
- CORS

### Database
- PostgreSQL (Supabase)
- JSONB storage for AI output

---

## 📌 Database Design (Tables)

The database consists of 7 main tables:

1. `users`  
2. `projects`  
3. `code_submissions`  
4. `review_results`  
5. `optimization_results`  
6. `ai_review_logs`  
7. `user_activity`  

Each user has their own isolated data access using Supabase RLS policies.

---

## ⚙️ Backend Architecture Flow

1. User signs up / logs in using Supabase Auth  
2. Frontend receives a JWT access token  
3. Token is sent in backend API requests as:

Authorization: Bearer <token>

4. Backend verifies token using Supabase
5. Code submission is stored in PostgreSQL
6. Backend sends code to Gemini LLM for analysis
7. AI output is stored in database:
- review results
- optimized code
- AI logs
8. User can view complete history anytime

---

## 📂 Project Folder Structure


```bash
coderefine-backend/

│── src/
│ ├── config/
│ │ ├── supabaseClient.js
│ │ └── geminiClient.js
│ ├── controllers/
│ │ ├── aiController.js
│ │ ├── dashboardController.js
│ │ ├── historyController.js
│ │ ├── projectController.js
│ │ └── submissionController.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── routes/
│ │ ├── aiRoutes.js
│ │ ├── dashboardRoutes.js
│ │ ├── historyRoutes.js
│ │ ├── projectRoutes.js
│ │ └── submissionRoutes.js
│ ├── utils/
│ │ ├── activityLogger.js
│ │ └── jsonCleaner.js
│ └── server.js
│── package.json
│── package-lock.json
│── .env (ignored)


---

## 🔗 API Endpoints

### Projects
- `POST /api/projects/create`
- `GET /api/projects`

### Submissions
- `POST /api/submissions/create`
- `GET /api/submissions`
- `GET /api/submissions/:id`
- `DELETE /api/submissions/:id`

### AI Analysis
- `POST /api/ai/analyze`

### History
- `GET /api/history`

### Dashboard
- `GET /api/dashboard/stats`

---
