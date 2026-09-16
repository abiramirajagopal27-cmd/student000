import { useEffect, useState } from 'react';
import { useToast } from '@/components/ToastProvider';
import StudentForm from '@/components/StudentForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { StudentInput } from '@/types/student';
import { getStudent, updateStudent } from '@/services/api';

interface EditStudentProps {
  studentId: number;
  onDone: () => void;
}

export default function EditStudent({ studentId, onDone }: EditStudentProps) {
  const { show } = useToast();
  const [initial, setInitial] = useState<StudentInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudent(studentId)
      .then((s) => {
        setInitial({
          student_id: s.student_id,
          name: s.name,
          email: s.email,
          department: s.department,
          year: s.year,
          cgpa: s.cgpa,
          skills: s.skills,
          interests: s.interests,
          career_goal: s.career_goal,
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load student.'))
      .finally(() => setLoading(false));
  }, [studentId]);

  async function handleSubmit(data: StudentInput) {
    await updateStudent(studentId, data);
    show('Student updated successfully.', 'success');
    onDone();
  }

  if (loading) return <LoadingSpinner label="Loading student data..." />;
  if (error)
    return (
      <div className="rounded-2xl bg-rose-50 p-6 text-rose-700 ring-1 ring-rose-100">{error}</div>
    );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Edit Student</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update the student information below and save your changes.
        </p>
      </div>
      {initial && (
        <StudentForm
          initial={initial}
          submitLabel="Update Student"
          onSubmit={handleSubmit}
          onCancel={onDone}
        />
      )}
    </div>
  );
}
