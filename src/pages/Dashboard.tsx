import { useEffect, useState } from 'react';
import { getStudents } from '@/services/api';
import type { Student, DashboardStats } from '@/types/student';
import StatCard from '@/components/StatCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Users, Building2, GraduationCap, Target, TrendingUp, Award } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStudents()
      .then((data) => {
        const total = data.length;
        const departments = new Set(data.map((s) => s.department));
        const avg = total > 0 ? data.reduce((sum, s) => sum + s.cgpa, 0) / total : 0;
        const goals = new Set(data.map((s) => s.career_goal));

        const deptMap = new Map<string, number>();
        data.forEach((s) => deptMap.set(s.department, (deptMap.get(s.department) ?? 0) + 1));
        const yearMap = new Map<number, number>();
        data.forEach((s) => yearMap.set(s.year, (yearMap.get(s.year) ?? 0) + 1));
        const goalMap = new Map<string, number>();
        data.forEach((s) => goalMap.set(s.career_goal, (goalMap.get(s.career_goal) ?? 0) + 1));

        setStats({
          totalStudents: total,
          totalDepartments: departments.size,
          averageCgpa: avg,
          careerGoalsCount: goals.size,
          departmentBreakdown: [...deptMap.entries()].map(([department, count]) => ({ department, count })).sort((a, b) => b.count - a.count),
          yearBreakdown: [...yearMap.entries()].map(([year, count]) => ({ year, count })).sort((a, b) => a.year - b.year),
          careerGoalBreakdown: [...goalMap.entries()].map(([goal, count]) => ({ goal, count })).sort((a, b) => b.count - a.count),
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading dashboard..." />;
  if (error)
    return (
      <div className="rounded-2xl bg-rose-50 p-6 text-rose-700 ring-1 ring-rose-100">
        {error}
      </div>
    );
  if (!stats) return null;

  const maxDept = Math.max(...stats.departmentBreakdown.map((d) => d.count), 1);
  const maxYear = Math.max(...stats.yearBreakdown.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={stats.totalStudents} icon={Users} accent="blue" />
        <StatCard label="Total Departments" value={stats.totalDepartments} icon={Building2} accent="green" />
        <StatCard label="Average CGPA" value={stats.averageCgpa.toFixed(2)} icon={GraduationCap} accent="amber" />
        <StatCard label="Career Goals" value={stats.careerGoalsCount} icon={Target} accent="violet" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Department breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-5 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">Students by Department</h3>
          </div>
          <div className="space-y-3">
            {stats.departmentBreakdown.map((d) => (
              <div key={d.department}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-700">{d.department}</span>
                  <span className="text-gray-500">{d.count}</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${(d.count / maxDept) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Year breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-bold text-gray-900">Students by Year</h3>
          </div>
          <div className="flex items-end justify-around gap-4 pt-4" style={{ height: '180px' }}>
            {stats.yearBreakdown.map((y) => (
              <div key={y.year} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-sm font-bold text-gray-700">{y.count}</span>
                <div className="flex w-full max-w-[60px] flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-500"
                    style={{ height: `${(y.count / maxYear) * 100}%`, minHeight: '8px' }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">Year {y.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career goals breakdown */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex items-center gap-2">
          <Award className="h-5 w-5 text-violet-600" />
          <h3 className="text-base font-bold text-gray-900">Career Goals Distribution</h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {stats.careerGoalBreakdown.map((g) => (
            <div
              key={g.goal}
              className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2"
            >
              <span className="text-sm font-medium text-gray-700">{g.goal}</span>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">
                {g.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
