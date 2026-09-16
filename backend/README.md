# Student Career & Education Management System — Backend (Django)

## Requirements

```
Django>=4.2
djangorestframework>=3.14
django-cors-headers>=4.2
```

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install django djangorestframework django-cors-headers
python manage.py makemigrations students
python manage.py migrate
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/students/`.

## Endpoints

| Method   | URL                     | Description          |
|----------|-------------------------|----------------------|
| POST     | /api/students/          | Create a student     |
| GET      | /api/students/          | List all students     |
| GET      | /api/students/{id}/     | Get a single student  |
| PUT      | /api/students/{id}/     | Update a student      |
| PATCH    | /api/students/{id}/     | Partial update        |
| DELETE   | /api/students/{id}/     | Delete a student      |
