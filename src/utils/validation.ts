import type { StudentInput, FieldErrors } from '@/types/student';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStudent(data: StudentInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.student_id.trim()) {
    errors.student_id = 'Student ID is required';
  }

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.department.trim()) {
    errors.department = 'Department is required';
  }

  if (data.year === undefined || data.year === null || Number.isNaN(data.year)) {
    errors.year = 'Year is required';
  } else if (data.year < 1 || data.year > 4) {
    errors.year = 'Year must be between 1 and 4';
  }

  if (data.cgpa === undefined || data.cgpa === null || Number.isNaN(data.cgpa)) {
    errors.cgpa = 'CGPA is required';
  } else if (data.cgpa < 0 || data.cgpa > 10) {
    errors.cgpa = 'CGPA must be between 0 and 10';
  }

  if (!data.skills.trim()) {
    errors.skills = 'Skills are required';
  }

  if (!data.interests.trim()) {
    errors.interests = 'Interests are required';
  }

  if (!data.career_goal.trim()) {
    errors.career_goal = 'Career goal is required';
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some((v) => v !== undefined && v !== '');
}
