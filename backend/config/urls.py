"""
Root URL configuration for the Student Career & Education Management System.
All API routes live under /api/ and are served by the students app.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("students.urls")),
]
