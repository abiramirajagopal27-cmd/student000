import { useEffect, useState } from 'react';
import { getStudent } from '@/services/api';
import type { Student } from '@/types/student';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  ArrowLeft,
  Pencil,
  Mail,
  Building2,
  Calendar,
  GraduationCap,
  Wrench,
  Heart,
  Target,
  IdCard,
} from 'lucide-react';

interface StudentDetailsProps {
  studentId: number;
  onBack: () => void;
  onEdit: (id: number) => void;
}

export default function StudentDetails({ studentId, onBack, onEdit }: StudentDetailsProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudent(studentId)
      .then(setStudent)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load student.'))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <LoadingSpinner label="Loading student details..." />;
  if (error)
    return (
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Students
        </button>
        <div className="rounded-2xl bg-rose-50 p-6 text-rose-700 ring-1 ring-rose-100">{error}</div>
      </div>
    );
  if (!student) return null;

  const cgpaColor =
    student.cgpa >= 8 ? 'text-emerald-600 bg-emerald-50' : student.cgpa >= 6 ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50';

  const fields = [
    { icon: IdCard, label: 'Student ID', value: student.student_id },
    { icon: Mail, label: 'Email', value: student.email },
    { icon: Building2, label: 'Department', value: student.department },
    { icon: Calendar, label: 'Year', value: `Year ${student.year}` },
    { icon: GraduationCap, label: 'CGPA', value: student.cgpa.toFixed(2) },
    { icon: Wrench, label: 'Skills', value: student.skills },
    { icon: Heart, label: 'Interests', value: student.interests },
    { icon: Target, label: 'Career Goal', value: student.career_goal },
  ];

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Students
      </button>

      {/* Header card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold text-white backdrop-blur-sm">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{student.name}</h2>
                <p className="mt-0.5 text-sm text-blue-100">{student.student_id} · {student.department}</p>
              </div>
            </div>
            <button
              onClick={() => onEdit(student.id)}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
            >
              <Pencil className="h-4 w-4" /> Edit Student
            </button>
          </div>
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-1 gap-px bg-gray-50 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.label} className="bg-white p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <f.icon className="h-4 w-4" />
                {f.label}
              </div>
              {f.label === 'CGPA' ? (
                <p className={`mt-2 inline-flex rounded-lg px-2.5 py-1 text-lg font-bold ${cgpaColor}`}>
                  {f.value}
                </p>
              ) : (
                <p className="mt-2 text-base font-medium text-gray-900">{f.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
