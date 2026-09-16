"""
Django admin registration for the Student model.
"""
from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("student_id", "name", "email", "department", "year", "cgpa", "career_goal")
    list_filter = ("department", "year")
    search_fields = ("student_id", "name", "email", "skills")
