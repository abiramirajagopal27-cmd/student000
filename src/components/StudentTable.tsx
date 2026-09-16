import { Eye, Pencil, Trash2, AlertCircle } from 'lucide-react';
import type { Student } from '@/types/student';

interface StudentTableProps {
  students: Student[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (student: Student) => void;
}

export default function StudentTable({ students, onView, onEdit, onDelete }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white py-20 ring-1 ring-gray-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-base font-semibold text-gray-700">No students found</p>
        <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {['Student ID', 'Name', 'Email', 'Dept', 'Year', 'CGPA', 'Skills', 'Interests', 'Career Goal', 'Actions'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-blue-50/30">
                <td className="px-4 py-3 text-sm font-semibold text-blue-700">{s.student_id}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{s.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {s.department}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Yr {s.year}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-bold ${s.cgpa >= 8 ? 'text-emerald-600' : s.cgpa >= 6 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {s.cgpa.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-[160px] truncate" title={s.skills}>{s.skills}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-[160px] truncate" title={s.interests}>{s.interests}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-[140px] truncate" title={s.career_goal}>{s.career_goal}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView(s.id)}
                      className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(s.id)}
                      className="rounded-lg p-1.5 text-amber-600 hover:bg-amber-50 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(s)}
                      className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-gray-50 lg:hidden">
        {students.map((s) => (
          <div key={s.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-blue-700">{s.student_id}</span>
                  <span className="inline-flex rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-700">
                    {s.department}
                  </span>
                  <span className="text-xs text-gray-500">Yr {s.year}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-500 truncate">{s.email}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="font-semibold">CGPA:</span>
                  <span className={`font-bold ${s.cgpa >= 8 ? 'text-emerald-600' : s.cgpa >= 6 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {s.cgpa.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600"><span className="font-semibold">Skills:</span> {s.skills}</p>
                <p className="mt-0.5 text-xs text-gray-600"><span className="font-semibold">Goal:</span> {s.career_goal}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => onView(s.id)} className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </button>
                <button onClick={() => onEdit(s.id)} className="rounded-lg p-1.5 text-amber-600 hover:bg-amber-50">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(s)} className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
