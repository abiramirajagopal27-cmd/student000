"""
URL routes for the students API.
Registered with the DRF DefaultRouter which provides:
  /api/students/         GET, POST
  /api/students/{id}/    GET, PUT, PATCH, DELETE
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet

router = DefaultRouter()
router.register(r"students", StudentViewSet, basename="student")

urlpatterns = [
    path("", include(router.urls)),
]
