export interface Student {
  id: number;
  student_id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  cgpa: number;
  skills: string;
  interests: string;
  career_goal: string;
  created_at?: string;
  updated_at?: string;
}

export type StudentInput = Omit<Student, 'id' | 'created_at' | 'updated_at'>;

export interface DashboardStats {
  totalStudents: number;
  totalDepartments: number;
  averageCgpa: number;
  careerGoalsCount: number;
  departmentBreakdown: { department: string; count: number }[];
  yearBreakdown: { year: number; count: number }[];
  careerGoalBreakdown: { goal: string; count: number }[];
}

export type PageKey =
  | 'dashboard'
  | 'students'
  | 'add'
  | 'edit'
  | 'details'
  | 'about';

export interface FieldErrors {
  student_id?: string;
  name?: string;
  email?: string;
  department?: string;
  year?: string;
  cgpa?: string;
  skills?: string;
  interests?: string;
  career_goal?: string;
}
