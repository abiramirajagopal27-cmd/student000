import { useEffect, useMemo, useState } from 'react';
import { getStudents, deleteStudent } from '@/services/api';
import type { Student } from '@/types/student';
import StudentTable from '@/components/StudentTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useToast } from '@/components/ToastProvider';
import { Search, Filter, X, Plus } from 'lucide-react';

interface StudentsProps {
  search: string;
  onSearch: (v: string) => void;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onNavigateAdd: () => void;
}

export default function Students({ search, onSearch, onView, onEdit, onNavigateAdd }: StudentsProps) {
  const { show } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [toDelete, setToDelete] = useState<Student | null>(null);

  function load() {
    setLoading(true);
    setError('');
    getStudents()
      .then(setStudents)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load students.'))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const departments = useMemo(
    () => [...new Set(students.map((s) => s.department))].sort(),
    [students],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return students.filter((s) => {
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.skills.toLowerCase().includes(q);
      const matchDept = !deptFilter || s.department === deptFilter;
      const matchYear = !yearFilter || String(s.year) === yearFilter;
      return matchSearch && matchDept && matchYear;
    });
  }, [students, search, deptFilter, yearFilter]);

  function clearFilters() {
    onSearch('');
    setDeptFilter('');
    setYearFilter('');
  }

  const hasFilters = search || deptFilter || yearFilter;

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await deleteStudent(toDelete.id);
      setStudents((prev) => prev.filter((s) => s.id !== toDelete.id));
      show('Student deleted successfully.', 'success');
    } catch (err) {
      show(err instanceof Error ? err.message : 'Failed to delete student.', 'error');
    } finally {
      setToDelete(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Filters bar */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Mobile search */}
          <div className="relative sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search name, dept, skills..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Filter className="h-4 w-4" /> Filters
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Years</option>
            {[1, 2, 3, 4].map((y) => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" /> Clear Filters
            </button>
          )}

          <div className="lg:ml-auto">
            <button
              onClick={onNavigateAdd}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors lg:w-auto"
            >
              <Plus className="h-4 w-4" /> Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of{' '}
          <span className="font-semibold text-gray-700">{students.length}</span> students
        </p>
      </div>

      {/* Table or states */}
      {loading ? (
        <LoadingSpinner label="Loading students..." />
      ) : error ? (
        <div className="rounded-2xl bg-rose-50 p-6 text-rose-700 ring-1 ring-rose-100">{error}</div>
      ) : (
        <StudentTable
          students={filtered}
          onView={onView}
          onEdit={onEdit}
          onDelete={setToDelete}
        />
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${toDelete?.name} (${toDelete?.student_id})? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
