# CodeRefine API Documentation 🚀

This document contains the API endpoints for **CodeRefine – Generative AI Powered Code Review & Optimization Engine**.

Base URL (Local Development):

http://localhost:5000


All endpoints require authentication using **Supabase JWT Token**.

---

# 🔐 Authentication

Frontend must include the access token in request headers:

Authorization: Bearer <SUPABASE_ACCESS_TOKEN>
Content-Type: application/json


If token is missing or invalid, backend returns:

```json
{
  "message": "No token provided"
}
or

{
  "message": "Invalid token"
}
📌 1) Projects API
✅ Create Project
POST /api/projects/create

Request Body
{
  "title": "DSA Practice",
  "description": "All my DSA related code submissions"
}
Response
{
  "message": "Project created successfully",
  "project": {
    "id": "uuid",
    "user_id": "uuid",
    "title": "DSA Practice",
    "description": "All my DSA related code submissions",
    "created_at": "timestamp"
  }
}
✅ Get All Projects
GET /api/projects

Response
{
  "projects": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "title": "DSA Practice",
      "description": "All my DSA related code submissions",
      "created_at": "timestamp"
    }
  ]
}
📌 2) Code Submissions API
✅ Create Submission
POST /api/submissions/create

Request Body
{
  "project_id": "uuid (optional)",
  "language": "Java",
  "code_input": "public class Main { ... }",
  "submission_type": "review"
}
Allowed values for submission_type:

review

optimize

both

Response
{
  "message": "Code submission stored successfully",
  "submission": {
    "id": "uuid",
    "user_id": "uuid",
    "project_id": "uuid",
    "language": "Java",
    "code_input": "....",
    "submission_type": "review",
    "created_at": "timestamp"
  }
}
✅ Get All Submissions
GET /api/submissions

Response
{
  "submissions": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "project_id": "uuid",
      "language": "Java",
      "code_input": "....",
      "submission_type": "review",
      "created_at": "timestamp"
    }
  ]
}
✅ Get Submission By ID (Full Details)
GET /api/submissions/:id

Response
{
  "submission": {
    "id": "uuid",
    "user_id": "uuid",
    "project_id": "uuid",
    "language": "Java",
    "code_input": "....",
    "submission_type": "review",
    "created_at": "timestamp"
  },
  "review": {
    "id": "uuid",
    "submission_id": "uuid",
    "issues_found": [],
    "suggestions": [],
    "complexity_analysis": {
      "time": "O(n^2)",
      "space": "O(1)"
    },
    "score": 0.8,
    "created_at": "timestamp"
  },
  "optimization": {
    "id": "uuid",
    "submission_id": "uuid",
    "optimized_code": "....",
    "improvements_summary": "....",
    "performance_gain": {},
    "created_at": "timestamp"
  }
}
✅ Delete Submission
DELETE /api/submissions/:id

Response
{
  "message": "Submission deleted successfully"
}
📌 3) AI Analysis API
✅ Analyze Submission (Gemini LLM)
POST /api/ai/analyze

Request Body
{
  "submission_id": "uuid"
}
Response
{
  "message": "AI analysis generated successfully",
  "submission": {
    "id": "uuid",
    "language": "Java",
    "code_input": "...."
  },
  "review": {
    "issues_found": [],
    "suggestions": [],
    "complexity_analysis": {
      "time": "O(n^2)",
      "space": "O(1)"
    },
    "score": 0.85
  },
  "optimization": {
    "optimized_code": "....",
    "improvements_summary": "...."
  },
  "ai_log": {
    "model_name": "gemini-1.5-flash",
    "prompt_version": "v1",
    "confidence_score": 0.85
  }
}
Error (Duplicate Analysis)
{
  "message": "AI analysis already generated for this submission"
}
📌 4) History API
✅ Get Full User History
GET /api/history

Response
{
  "history": [
    {
      "id": "uuid",
      "language": "Java",
      "submission_type": "review",
      "created_at": "timestamp",
      "review_results": [
        {
          "issues_found": [],
          "suggestions": [],
          "score": 0.8
        }
      ],
      "optimization_results": [
        {
          "optimized_code": "...."
        }
      ]
    }
  ]
}
📌 5) Dashboard API
✅ Get Dashboard Stats
GET /api/dashboard/stats

Response
{
  "totalProjects": 3,
  "totalSubmissions": 12,
  "mostUsedLanguage": "Java",
  "lastActivity": {
    "id": "uuid",
    "action": "submit_code",
    "metadata": {
      "language": "Java",
      "submission_type": "review"
    },
    "created_at": "timestamp"
  }
}
