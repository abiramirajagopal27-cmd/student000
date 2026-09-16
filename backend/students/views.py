"""
DRF views for the Student resource.
Uses ModelViewSet to provide all CRUD operations:
  POST   /api/students/        → create
  GET    /api/students/        → list
  GET    /api/students/{id}/   → retrieve
  PUT    /api/students/{id}/   → update
  PATCH  /api/students/{id}/   → partial_update
  DELETE /api/students/{id}/   → destroy
"""
from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by("id")
    serializer_class = StudentSerializer
