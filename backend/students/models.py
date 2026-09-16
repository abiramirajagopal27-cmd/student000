"""
Student model — maps to the SQLite database via Django ORM.

Fields:
  student_id    — college identifier (e.g. STU001), must be unique
  name          — full name
  email         — email address
  department    — department code (CSE, ECE, etc.)
  year          — year of study (1-4)
  cgpa          — cumulative GPA (0.00 - 10.00)
  skills        — comma-separated skills
  interests     — comma-separated interests
  career_goal   — target career
"""
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    department = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(4)]
    )
    cgpa = models.DecimalField(
        max_digits=3, decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
    )
    skills = models.TextField()
    interests = models.TextField()
    career_goal = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id"]
        db_table = "students"

    def __str__(self):
        return f"{self.student_id} — {self.name}"
