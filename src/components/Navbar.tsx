import { Menu, Search } from 'lucide-react';
import type { PageKey } from '@/types/student';

interface NavbarProps {
  onOpenMobile: () => void;
  current: PageKey;
  search: string;
  onSearch: (v: string) => void;
  onNavigate: (page: PageKey) => void;
}

const titles: Record<PageKey, string> = {
  dashboard: 'Dashboard',
  students: 'Students',
  add: 'Add Student',
  edit: 'Edit Student',
  details: 'Student Details',
  about: 'About',
};

export default function Navbar({ onOpenMobile, current, search, onSearch, onNavigate }: NavbarProps) {
  const showSearch = current === 'students';
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-md lg:px-8">
      <button
        onClick={onOpenMobile}
        className="text-gray-600 hover:text-gray-900 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <h2 className="text-lg font-bold text-gray-900">{titles[current]}</h2>

      <div className="ml-auto flex items-center gap-3">
        {showSearch && (
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search students..."
              className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}
        <button
          onClick={() => onNavigate('add')}
          className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:flex"
        >
          <span className="text-base leading-none">+</span> Add Student
        </button>
      </div>
    </header>
  );
}
