# CodeRefine 🚀  
### Generative AI–Powered Code Review & Optimization Engine

CodeRefine is a full-stack application that helps developers and students improve their code quality using **Generative AI**.  
It provides automated code review, optimization suggestions, complexity analysis, and stores full submission history for each user.

This project is built using **Node.js + Express** for backend, **Supabase PostgreSQL** for database, **Supabase Auth** for authentication, and **Gemini LLM** for AI-powered code analysis.

---

## 🔥 Key Features

✅ Supabase Authentication (Secure Login/Signup)  
✅ Submit code for review and optimization  
✅ AI-generated bug detection and best practices suggestions  
✅ Time & Space Complexity Analysis  
✅ AI-generated optimized code output  
✅ User Project Management (Organize submissions into projects)  
✅ Submission History Tracking  
✅ AI Trace Logs stored for transparency  
✅ Dashboard Stats (Total submissions, projects, most used language)  
✅ Secure Database with Row Level Security (RLS)

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
