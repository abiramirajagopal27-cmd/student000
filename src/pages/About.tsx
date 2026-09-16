import {
  GraduationCap,
  Database,
  Layers,
  CheckCircle2,
  Code2,
  Server,
  Globe,
  ShieldCheck,
} from 'lucide-react';

export default function About() {
  const features = [
    'Complete CRUD operations (Create, Read, Update, Delete)',
    'Student Profile Management with 9 fields',
    'Dashboard with real-time statistics from the database',
    'Search by name, department, or skills',
    'Filter by department and year',
    'Frontend + backend validation with clear error messages',
    'Responsive design for desktop, tablet, and mobile',
    'RESTful API with Django REST Framework',
  ];

  const stack = [
    { icon: Code2, label: 'React.js', desc: 'Frontend UI' },
    { icon: Server, label: 'Django REST', desc: 'Backend API' },
    { icon: Database, label: 'SQLite', desc: 'Database' },
    { icon: Globe, label: 'Axios', desc: 'HTTP Client' },
  ];

  const endpoints = [
    ['POST', '/api/students/', 'Create a student'],
    ['GET', '/api/students/', 'List all students'],
    ['GET', '/api/students/{id}/', 'Get a single student'],
    ['PUT', '/api/students/{id}/', 'Update a student'],
    ['PATCH', '/api/students/{id}/', 'Partial update'],
    ['DELETE', '/api/students/{id}/', 'Delete a student'],
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 p-8 text-white shadow-lg sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Student Career & Education Management System</h2>
            <p className="mt-1 text-sm text-blue-200">A full-stack CRUD college project</p>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-blue-100">
          This application manages student profiles with career and education information.
          It demonstrates a complete full-stack architecture: a React frontend communicating
          with a Django REST API backed by a SQLite database. All data is real — no dummy
          records or localStorage.
        </p>
      </div>

      {/* Tech stack */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stack.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <s.icon className="h-6 w-6 text-blue-600" />
            </div>
            <p className="mt-3 text-sm font-bold text-gray-900">{s.label}</p>
            <p className="text-xs text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Features + Architecture */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-bold text-gray-900">Key Features</h3>
          </div>
          <ul className="space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">API Endpoints</h3>
          </div>
          <div className="space-y-2">
            {endpoints.map(([method, path, desc]) => (
              <div key={path} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2">
                <span className={`rounded px-2 py-0.5 text-xs font-bold ${
                  method === 'GET' ? 'bg-blue-100 text-blue-700' :
                  method === 'POST' ? 'bg-emerald-100 text-emerald-700' :
                  method === 'PUT' || method === 'PATCH' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>{method}</span>
                <code className="text-xs font-mono text-gray-700">{path}</code>
                <span className="ml-auto text-xs text-gray-400">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture flow */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h3 className="mb-4 text-base font-bold text-gray-900">System Architecture</h3>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          {['User', 'React Frontend', 'Axios', 'Django REST API', 'Django ORM', 'SQLite'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
                {step}
              </div>
              {i < arr.length - 1 && <span className="text-gray-300">↓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
