import { useState } from 'react';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';
import type { StudentInput, FieldErrors } from '@/types/student';
import { validateStudent, hasErrors } from '@/utils/validation';

interface StudentFormProps {
  initial?: Partial<StudentInput>;
  submitLabel: string;
  onSubmit: (data: StudentInput) => Promise<void>;
  onCancel: () => void;
}

const DEPARTMENTS = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'BME', 'AIDS'];

export default function StudentForm({ initial, submitLabel, onSubmit, onCancel }: StudentFormProps) {
  const [form, setForm] = useState<StudentInput>({
    student_id: initial?.student_id ?? '',
    name: initial?.name ?? '',
    email: initial?.email ?? '',
    department: initial?.department ?? '',
    year: initial?.year ?? 3,
    cgpa: initial?.cgpa ?? 0,
    skills: initial?.skills ?? '',
    interests: initial?.interests ?? '',
    career_goal: initial?.career_goal ?? '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function setField<K extends keyof StudentInput>(key: K, value: StudentInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    const v = validateStudent(form);
    setErrors(v);
    if (hasErrors(v)) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2';
  const ok = 'border-gray-200 focus:border-blue-400 focus:ring-blue-100';
  const bad = 'border-rose-300 focus:border-rose-400 focus:ring-rose-100';

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      {serverError && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <p className="text-sm font-medium text-rose-700">{serverError}</p>
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Student ID */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Student ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.student_id}
              onChange={(e) => setField('student_id', e.target.value)}
              placeholder="STU001"
              className={`${inputClass} ${errors.student_id ? bad : ok}`}
            />
            {errors.student_id && <p className="mt-1 text-xs text-rose-600">{errors.student_id}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="Abirami"
              className={`${inputClass} ${errors.name ? bad : ok}`}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              placeholder="student@example.com"
              className={`${inputClass} ${errors.email ? bad : ok}`}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Department <span className="text-rose-500">*</span>
            </label>
            <select
              value={form.department}
              onChange={(e) => setField('department', e.target.value)}
              className={`${inputClass} ${errors.department ? bad : ok}`}
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.department && <p className="mt-1 text-xs text-rose-600">{errors.department}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Year <span className="text-rose-500">*</span>
            </label>
            <select
              value={form.year}
              onChange={(e) => setField('year', Number(e.target.value))}
              className={`${inputClass} ${errors.year ? bad : ok}`}
            >
              {[1, 2, 3, 4].map((y) => (
                <option key={y} value={y}>Year {y}</option>
              ))}
            </select>
            {errors.year && <p className="mt-1 text-xs text-rose-600">{errors.year}</p>}
          </div>

          {/* CGPA */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              CGPA <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={form.cgpa}
              onChange={(e) => setField('cgpa', parseFloat(e.target.value))}
              placeholder="8.50"
              className={`${inputClass} ${errors.cgpa ? bad : ok}`}
            />
            {errors.cgpa && <p className="mt-1 text-xs text-rose-600">{errors.cgpa}</p>}
          </div>

          {/* Skills */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Skills <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.skills}
              onChange={(e) => setField('skills', e.target.value)}
              placeholder="Java, HTML, CSS"
              className={`${inputClass} ${errors.skills ? bad : ok}`}
            />
            {errors.skills && <p className="mt-1 text-xs text-rose-600">{errors.skills}</p>}
          </div>

          {/* Interests */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Interests <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.interests}
              onChange={(e) => setField('interests', e.target.value)}
              placeholder="Web Development, AI"
              className={`${inputClass} ${errors.interests ? bad : ok}`}
            />
            {errors.interests && <p className="mt-1 text-xs text-rose-600">{errors.interests}</p>}
          </div>

          {/* Career Goal — full width */}
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Career Goal <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={form.career_goal}
              onChange={(e) => setField('career_goal', e.target.value)}
              placeholder="Software Developer"
              className={`${inputClass} ${errors.career_goal ? bad : ok}`}
            />
            {errors.career_goal && <p className="mt-1 text-xs text-rose-600">{errors.career_goal}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {submitting ? 'Saving...' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
