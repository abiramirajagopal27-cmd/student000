import { useToast } from '@/components/ToastProvider';
import StudentForm from '@/components/StudentForm';
import type { StudentInput } from '@/types/student';
import { createStudent } from '@/services/api';

interface AddStudentProps {
  onDone: () => void;
}

export default function AddStudent({ onDone }: AddStudentProps) {
  const { show } = useToast();

  async function handleSubmit(data: StudentInput) {
    await createStudent(data);
    show('Student added successfully.', 'success');
    onDone();
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill in all fields below. Fields marked with * are required.
        </p>
      </div>
      <StudentForm submitLabel="Add Student" onSubmit={handleSubmit} onCancel={onDone} />
    </div>
  );
}
