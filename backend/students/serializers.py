"""
DRF serializer for the Student model.
Handles validation that mirrors the frontend:
  - all fields required
  - year between 1 and 4
  - cgpa between 0 and 10
  - unique student_id (enforced by model constraint, surfaced here)
"""
from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "student_id",
            "name",
            "email",
            "department",
            "year",
            "cgpa",
            "skills",
            "interests",
            "career_goal",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_student_id(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Student ID is required.")
        qs = Student.objects.filter(student_id=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("A student with this Student ID already exists.")
        return value.strip()

    def validate_year(self, value):
        if value is None:
            raise serializers.ValidationError("Year is required.")
        if value < 1 or value > 4:
            raise serializers.ValidationError("Year must be between 1 and 4.")
        return value

    def validate_cgpa(self, value):
        if value is None:
            raise serializers.ValidationError("CGPA is required.")
        if value < 0 or value > 10:
            raise serializers.ValidationError("CGPA must be between 0 and 10.")
        return value
