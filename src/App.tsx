import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { ToastProvider } from '@/components/ToastProvider';
import Dashboard from '@/pages/Dashboard';
import Students from '@/pages/Students';
import AddStudent from '@/pages/AddStudent';
import EditStudent from '@/pages/EditStudent';
import StudentDetails from '@/pages/StudentDetails';
import About from '@/pages/About';
import type { PageKey } from '@/types/student';

function App() {
  const [page, setPage] = useState<PageKey>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);

  function navigate(p: PageKey) {
    setPage(p);
    setMobileOpen(false);
  }

  function viewStudent(id: number) {
    setDetailId(id);
    setPage('details');
  }

  function editStudent(id: number) {
    setEditId(id);
    setPage('edit');
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar
          current={page}
          onNavigate={navigate}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            current={page}
            onOpenMobile={() => setMobileOpen(true)}
            search={search}
            onSearch={setSearch}
            onNavigate={navigate}
          />

          <main className="flex-1 p-4 lg:p-8">
            {page === 'dashboard' && <Dashboard />}
            {page === 'students' && (
              <Students
                search={search}
                onSearch={setSearch}
                onView={viewStudent}
                onEdit={editStudent}
                onNavigateAdd={() => navigate('add')}
              />
            )}
            {page === 'add' && <AddStudent onDone={() => navigate('students')} />}
            {page === 'edit' && editId !== null && (
              <EditStudent studentId={editId} onDone={() => navigate('students')} />
            )}
            {page === 'details' && detailId !== null && (
              <StudentDetails
                studentId={detailId}
                onBack={() => navigate('students')}
                onEdit={editStudent}
              />
            )}
            {page === 'about' && <About />}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
