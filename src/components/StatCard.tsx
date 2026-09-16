import { Users, Building2, GraduationCap, Target, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent: 'blue' | 'green' | 'amber' | 'violet';
}

const accentMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-100' },
};

export default function StatCard({ label, value, icon: Icon, accent }: StatCardProps) {
  const a = accentMap[accent];
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${a.bg} ring-4 ${a.ring}`}>
          <Icon className={`h-7 w-7 ${a.text}`} />
        </div>
      </div>
    </div>
  );
}

export { Users, Building2, GraduationCap, Target };
