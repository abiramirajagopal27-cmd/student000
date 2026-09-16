# Student Career & Education Management System

A full-stack CRUD web application for managing student profiles with career and education information. Built with a React frontend, Django REST Framework backend, and SQLite database.

---

## 1. Problem Statement

Educational institutions need a centralized system to manage student academic and career information. Without a proper system, student data is scattered across spreadsheets and documents, making it difficult to search, update, and analyze. This project provides a complete solution for managing student records with full CRUD operations, search, filtering, and a real-time statistics dashboard.

---

## 2. Objectives

- Provide a web-based interface for managing student profiles
- Implement complete CRUD operations (Create, Read, Update, Delete)
- Validate data on both frontend and backend
- Enable search and filtering of student records
- Display real-time dashboard statistics calculated from database data
- Demonstrate full-stack architecture: React → Axios → Django REST → ORM → SQLite

---

## 3. Features

- **Student Profile Management** — Full CRUD with 9 fields (Student ID, Name, Email, Department, Year, CGPA, Skills, Interests, Career Goal)
- **Dashboard** — Total Students, Total Departments, Average CGPA, Career Goals (all calculated from real API data)
- **Search** — Search by name, department, or skills
- **Filters** — Filter by department and year with a Clear Filters button
- **Validation** — Frontend + backend validation with clear error messages
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Error Handling** — Handles invalid input, duplicate IDs, network errors, and backend unavailability
- **Loading Indicators** — Shows spinners during API requests
- **Toast Notifications** — Success and error messages for all operations

---

## 4. Technology Stack

| Layer       | Technology               |
|-------------|--------------------------|
| Frontend    | React.js + TypeScript    |
| HTTP Client | Axios                   |
| Backend     | Django + Django REST Framework |
| Database    | SQLite                   |
| API Testing | Postman                  |

---

## 5. System Architecture

```
User
  ↓
React Frontend (Axios)
  ↓
Django REST API
  ↓
Django ORM
  ↓
SQLite Database
```

The React frontend sends HTTP requests via Axios to the Django REST API. Django processes requests through URL routes, views, serializers, and the ORM, then reads/writes to the SQLite database.

---

## 6. Database Design

### `students` table

| Column        | Type         | Constraints                          |
|---------------|--------------|--------------------------------------|
| id            | INTEGER PK   | Auto-increment                       |
| student_id    | TEXT         | NOT NULL, UNIQUE                     |
| name          | TEXT         | NOT NULL                             |
| email         | TEXT         | NOT NULL                              |
| department    | TEXT         | NOT NULL                             |
| year          | SMALLINT     | NOT NULL, CHECK (1-4)                |
| cgpa          | DECIMAL(3,2) | NOT NULL, CHECK (0-10)               |
| skills        | TEXT         | NOT NULL                             |
| interests     | TEXT         | NOT NULL                             |
| career_goal   | TEXT         | NOT NULL                             |
| created_at    | TIMESTAMP    | DEFAULT now()                        |
| updated_at    | TIMESTAMP    | DEFAULT now()                        |

---

## 7. Project Structure

```
student-career-management/
├── backend/
│   ├── manage.py
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── students/
│       ├── __init__.py
│       ├── admin.py
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── migrations/
│           └── __init__.py
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── StudentForm.tsx
│   │   ├── StudentTable.tsx
│   │   ├── StatCard.tsx
│   │   ├── ToastProvider.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── LoadingSpinner.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Students.tsx
│   │   ├── AddStudent.tsx
│   │   ├── EditStudent.tsx
│   │   ├── StudentDetails.tsx
│   │   └── About.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── student.ts
│   ├── utils/
│   │   └── validation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── README.md
```

---

## 8. CRUD Operations

### CREATE — Add Student
- **Form**: `AddStudent` page with all 9 fields
- **API**: `POST /api/students/`
- **Success**: "Student added successfully." toast notification
- **Validation**: Frontend checks all fields; backend enforces unique `student_id`

### READ — List Students
- **Page**: `Students` page with table view
- **API**: `GET /api/students/`
- **Display**: Table with Student ID, Name, Email, Department, Year, CGPA, Skills, Interests, Career Goal, Actions

### READ — Student Details
- **Page**: `StudentDetails` page
- **API**: `GET /api/students/{id}/`
- **Display**: Full profile card with all fields

### UPDATE — Edit Student
- **Form**: `EditStudent` page, pre-filled with existing data
- **API**: `PUT /api/students/{id}/`
- **Success**: "Student updated successfully." toast notification

### DELETE — Remove Student
- **Confirmation**: Dialog asking "Are you sure?"
- **API**: `DELETE /api/students/{id}/`
- **Success**: "Student deleted successfully." toast notification

---

## 9. API Documentation

### Base URL: `http://127.0.0.1:8000/api`

| Method   | Endpoint              | Description          | Status Codes        |
|----------|-----------------------|----------------------|---------------------|
| POST     | /api/students/        | Create a student     | 201, 400            |
| GET      | /api/students/        | List all students    | 200                 |
| GET      | /api/students/{id}/   | Get a single student | 200, 404            |
| PUT      | /api/students/{id}/   | Update a student     | 200, 400, 404       |
| PATCH    | /api/students/{id}/   | Partial update       | 200, 400, 404       |
| DELETE   | /api/students/{id}/   | Delete a student     | 204, 404            |

### Sample Request Body

```json
{
  "student_id": "STU001",
  "name": "Abirami",
  "email": "student@example.com",
  "department": "ECE",
  "year": 3,
  "cgpa": 8.5,
  "skills": "Java, HTML, CSS",
  "interests": "Web Development, AI",
  "career_goal": "Software Developer"
}
```

---

## 10. Validation

### Frontend (React)
- **Student ID**: Required, must be unique (server-validated)
- **Name**: Required
- **Email**: Required, valid email format
- **Department**: Required (dropdown)
- **Year**: Required, between 1 and 4
- **CGPA**: Required, between 0 and 10
- **Skills**: Required
- **Interests**: Required
- **Career Goal**: Required

### Backend (Django)
- **Student ID**: `unique=True` on model + serializer check
- **Email**: `EmailField` validates format
- **Year**: `MinValueValidator(1)`, `MaxValueValidator(4)`
- **CGPA**: `MinValueValidator(0)`, `MaxValueValidator(10)`
- All fields: `required=True` via model constraints

Error messages from the backend are displayed in the form and as toast notifications.

---

## 11. Postman Testing

### 1. Create Student
- **Method**: POST
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Body**:
```json
{
  "student_id": "STU001",
  "name": "Abirami",
  "email": "student@example.com",
  "department": "ECE",
  "year": 3,
  "cgpa": 8.5,
  "skills": "Java, HTML, CSS",
  "interests": "Web Development, AI",
  "career_goal": "Software Developer"
}
```
- **Expected Response** (201 Created):
```json
{
  "id": 1,
  "student_id": "STU001",
  "name": "Abirami",
  "email": "student@example.com",
  "department": "ECE",
  "year": 3,
  "cgpa": "8.50",
  "skills": "Java, HTML, CSS",
  "interests": "Web Development, AI",
  "career_goal": "Software Developer",
  "created_at": "2026-09-16T10:00:00Z",
  "updated_at": "2026-09-16T10:00:00Z"
}
```

### 2. Get All Students
- **Method**: GET
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Body**: None
- **Expected Response** (200 OK): Array of student objects
- **Status Code**: 200

### 3. Get Student by ID
- **Method**: GET
- **URL**: `http://127.0.0.1:8000/api/students/1/`
- **Body**: None
- **Expected Response** (200 OK): Single student object
- **Status Code**: 200

### 4. Update Student
- **Method**: PUT
- **URL**: `http://127.0.0.1:8000/api/students/1/`
- **Body**:
```json
{
  "student_id": "STU001",
  "name": "Abirami R",
  "email": "abirami@example.com",
  "department": "ECE",
  "year": 4,
  "cgpa": 9.0,
  "skills": "Java, Python, React",
  "interests": "AI, Web Development",
  "career_goal": "Full Stack Developer"
}
```
- **Expected Response** (200 OK): Updated student object
- **Status Code**: 200

### 5. Delete Student
- **Method**: DELETE
- **URL**: `http://127.0.0.1:8000/api/students/1/`
- **Body**: None
- **Expected Response**: No content
- **Status Code**: 204

### 6. Invalid Email
- **Method**: POST
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Body**:
```json
{
  "student_id": "STU002",
  "name": "Test",
  "email": "not-an-email",
  "department": "CSE",
  "year": 2,
  "cgpa": 7.5,
  "skills": "Python",
  "interests": "AI",
  "career_goal": "Engineer"
}
```
- **Expected Response** (400 Bad Request):
```json
{"email": ["Enter a valid email address."]}
```
- **Status Code**: 400

### 7. Missing Required Field
- **Method**: POST
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Body**:
```json
{
  "student_id": "STU003",
  "name": "Test",
  "email": "test@example.com",
  "department": "",
  "year": 2,
  "cgpa": 7.5,
  "skills": "Python",
  "interests": "AI",
  "career_goal": "Engineer"
}
```
- **Expected Response** (400 Bad Request):
```json
{"department": ["This field is required."]}
```
- **Status Code**: 400

### 8. Invalid CGPA
- **Method**: POST
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Body**:
```json
{
  "student_id": "STU004",
  "name": "Test",
  "email": "test@example.com",
  "department": "CSE",
  "year": 2,
  "cgpa": 15,
  "skills": "Python",
  "interests": "AI",
  "career_goal": "Engineer"
}
```
- **Expected Response** (400 Bad Request):
```json
{"cgpa": ["CGPA must be between 0 and 10."]}
```
- **Status Code**: 400

### 9. Duplicate Student ID
- **Method**: POST
- **URL**: `http://127.0.0.1:8000/api/students/`
- **Body** (with an ID that already exists):
```json
{
  "student_id": "STU001",
  "name": "Another",
  "email": "another@example.com",
  "department": "CSE",
  "year": 1,
  "cgpa": 6.0,
  "skills": "HTML",
  "interests": "Design",
  "career_goal": "Designer"
}
```
- **Expected Response** (400 Bad Request):
```json
{"student_id": ["A student with this Student ID already exists."]}
```
- **Status Code**: 400

### 10. Invalid Student ID (Not Found)
- **Method**: GET
- **URL**: `http://127.0.0.1:8000/api/students/999/`
- **Body**: None
- **Expected Response** (404 Not Found):
```json
{"detail": "Not found."}
```
- **Status Code**: 404

---

## 12. Installation

### Prerequisites
- **Node.js** 18+ (for the frontend)
- **Python** 3.10+ (for the backend)
- **VS Code** (recommended editor)
- **Postman** (for API testing)

### Clone the Repository
```bash
git clone https://github.com/your-username/student-career-management.git
cd student-career-management
```

---

## 13. Backend Setup

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Create a virtual environment
python -m venv venv

# 3. Activate the virtual environment
#    Windows:
venv\Scripts\activate
#    macOS/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install django djangorestframework django-cors-headers

# 5. Create migrations
python manage.py makemigrations students

# 6. Apply migrations (creates SQLite database)
python manage.py migrate

# 7. (Optional) Create an admin user
python manage.py createsuperuser

# 8. Start the Django server
python manage.py runserver
```

The backend API will be running at `http://127.0.0.1:8000/api/students/`.

---

## 14. Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
# 1. Navigate to the project root (where package.json is)
cd student-career-management

# 2. Install dependencies
npm install

# 3. Set the API base URL
#    Create a .env file in the project root:
#    VITE_API_BASE_URL=http://127.0.0.1:8000/api

# 4. Start the React dev server
npm run dev
```

The frontend will be running at `http://localhost:5173`.

---

## 15. How to Run

You need **two terminals** running simultaneously:

**Terminal 1 — Backend:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Connecting Frontend to Django

Create a `.env` file in the project root:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

When this variable is set, all Axios requests go to your Django backend.
When it is not set, the app uses the bundled Supabase REST fallback so the UI is functional in preview environments.

---

## 16. GitHub Instructions

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Student Career & Education Management System - full-stack CRUD app"

# Create a repository on GitHub, then:
git remote add origin https://github.com/your-username/student-career-management.git
git branch -M main
git push -u origin main
```

### .gitignore (create this file)
```
node_modules/
dist/
.env
backend/db.sqlite3
backend/venv/
__pycache__/
*.pyc
```

---

## 17. Future Enhancements

- User authentication (login/signup for admin and students)
- Student profile photos / file uploads
- Export student data to CSV/PDF
- Email notifications for profile updates
- Charts and analytics with a charting library (Chart.js / Recharts)
- Pagination for large student datasets
- Batch import of students via CSV upload
- Role-based access control (admin vs. student views)
