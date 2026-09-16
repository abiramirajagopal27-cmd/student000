import axios from 'axios';
import type { Student, StudentInput } from '@/types/student';

/**
 * Student Career & Education Management System — API service layer.
 *
 * The college spec calls for a Django REST backend at http://127.0.0.1:8000/api.
 * When VITE_API_BASE_URL is set, all requests go there (Django mode).
 * When it is not set (the hosted preview), requests fall back to the
 * Supabase REST endpoint so the app is fully functional in this environment.
 *
 * Every function below maps to the exact CRUD verbs from the spec:
 *   getStudents()        → GET    /api/students/
 *   getStudent(id)        → GET    /api/students/{id}/
 *   createStudent(data)  → POST   /api/students/
 *   updateStudent(id,d)  → PUT    /api/students/{id}/
 *   deleteStudent(id)    → DELETE /api/students/{id}/
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

// ---- Django mode (Axios → Django REST Framework) ---------------------------
const djangoApi = axios.create({
  baseURL: API_BASE_URL ?? '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ---- Supabase fallback mode ------------------------------------------------
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabaseTable = `${SUPABASE_URL}/rest/v1/students`;
const supabaseHeaders: Record<string, string> = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

const useSupabase = !API_BASE_URL;

// Normalise Supabase row → Student shape (snake_case already matches)
function fromRow(row: Record<string, unknown>): Student {
  return {
    id: Number(row.id),
    student_id: String(row.student_id ?? ''),
    name: String(row.name ?? ''),
    email: String(row.email ?? ''),
    department: String(row.department ?? ''),
    year: Number(row.year ?? 0),
    cgpa: Number(row.cgpa ?? 0),
    skills: String(row.skills ?? ''),
    interests: String(row.interests ?? ''),
    career_goal: String(row.career_goal ?? ''),
    created_at: row.created_at as string | undefined,
    updated_at: row.updated_at as string | undefined,
  };
}

/** Map a low-level error into a user-friendly message. */
function friendlyError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;
    // Django REST Framework validation error: { field: ["msg"] }
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const firstKey = Object.keys(data)[0];
      const val = (data as Record<string, unknown>)[firstKey];
      if (Array.isArray(val) && val.length) {
        return `${firstKey}: ${val[0]}`;
      }
      if (typeof val === 'string') return `${firstKey}: ${val}`;
    }
    if (status === 404) return 'Student not found.';
    if (status === 400) return 'Invalid data — please check the form.';
    if (status === 0 || !err.response) return 'Cannot reach the server. Is the backend running?';
    return `Request failed (${status}).`;
  }
  if (err instanceof Error) return err.message;
  return 'An unexpected error occurred.';
}

// ---- Public API functions --------------------------------------------------

export async function getStudents(): Promise<Student[]> {
  try {
    if (useSupabase) {
      const res = await axios.get(supabaseTable, {
        headers: supabaseHeaders,
        params: { order: 'id.asc' },
      });
      return (res.data as Record<string, unknown>[]).map(fromRow);
    }
    const res = await djangoApi.get<Student[]>('/students/');
    return res.data;
  } catch (err) {
    throw new Error(friendlyError(err));
  }
}

export async function getStudent(id: number | string): Promise<Student> {
  try {
    if (useSupabase) {
      const res = await axios.get(supabaseTable, {
        headers: supabaseHeaders,
        params: { id: `eq.${id}` },
      });
      const rows = res.data as Record<string, unknown>[];
      if (!rows.length) throw new Error('Student not found.');
      return fromRow(rows[0]);
    }
    const res = await djangoApi.get<Student>(`/students/${id}/`);
    return res.data;
  } catch (err) {
    throw new Error(friendlyError(err));
  }
}

export async function createStudent(data: StudentInput): Promise<Student> {
  try {
    if (useSupabase) {
      const res = await axios.post(supabaseTable, data, {
        headers: { ...supabaseHeaders, Prefer: 'return=representation' },
      });
      const rows = res.data as Record<string, unknown>[];
      return fromRow(rows[0]);
    }
    const res = await djangoApi.post<Student>('/students/', data);
    return res.data;
  } catch (err) {
    throw new Error(friendlyError(err));
  }
}

export async function updateStudent(id: number | string, data: StudentInput): Promise<Student> {
  try {
    if (useSupabase) {
      const res = await axios.patch(
        supabaseTable,
        data,
        {
          headers: { ...supabaseHeaders, Prefer: 'return=representation' },
          params: { id: `eq.${id}` },
        },
      );
      const rows = res.data as Record<string, unknown>[];
      if (!rows.length) throw new Error('Student not found.');
      return fromRow(rows[0]);
    }
    const res = await djangoApi.put<Student>(`/students/${id}/`, data);
    return res.data;
  } catch (err) {
    throw new Error(friendlyError(err));
  }
}

export async function deleteStudent(id: number | string): Promise<void> {
  try {
    if (useSupabase) {
      await axios.delete(supabaseTable, {
        headers: supabaseHeaders,
        params: { id: `eq.${id}` },
      });
      return;
    }
    await djangoApi.delete(`/students/${id}/`);
  } catch (err) {
    throw new Error(friendlyError(err));
  }
}
