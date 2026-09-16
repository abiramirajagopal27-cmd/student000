import {
  LayoutDashboard,
  Users,
  UserPlus,
  Info,
  GraduationCap,
  X,
} from 'lucide-react';
import type { PageKey } from '@/types/student';

interface SidebarProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'students', label: 'Students', icon: Users },
  { key: 'add', label: 'Add Student', icon: UserPlus },
  { key: 'about', label: 'About', icon: Info },
];

export default function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo header */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-white leading-tight">Student Career</h1>
            <p className="text-xs text-blue-200">& Education Management</p>
          </div>
          <button
            onClick={onCloseMobile}
            className="text-blue-200 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-4 py-6">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Menu
          </p>
          {navItems.map((item) => {
            const active = current === item.key || (item.key === 'students' && (current === 'edit' || current === 'details'));
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  active
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer card */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-white">College Project</p>
            <p className="mt-1 text-xs text-blue-200">
              React + Django REST + SQLite
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
