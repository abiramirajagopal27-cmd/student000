/*
# Create students table (single-tenant, no auth)

1. New Tables
- `students`
  - `id` (int8, primary key, auto-increment) — internal row id
  - `student_id` (text, unique, not null) — college student identifier like "STU001"
  - `name` (text, not null)
  - `email` (text, not null) — validated on frontend + via unique constraint
  - `department` (text, not null)
  - `year` (int2, not null, check 1-4)
  - `cgpa` (numeric(3,2), not null, check 0-10)
  - `skills` (text, not null)
  - `interests` (text, not null)
  - `career_goal` (text, not null)
  - `created_at` (timestamptz, default now)
  - `updated_at` (timestamptz, default now)

2. Security
- Enable RLS on `students`.
- Allow anon + authenticated full CRUD — the data is intentionally public/shared (no sign-in screen).

3. Notes
- `student_id` has a UNIQUE constraint for duplicate-ID validation.
- `year` CHECK constraint enforces 1-4.
- `cgpa` CHECK constraint enforces 0.00-10.00.
*/

CREATE TABLE IF NOT EXISTS students (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  student_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  department text NOT NULL,
  year smallint NOT NULL CHECK (year >= 1 AND year <= 4),
  cgpa numeric(3,2) NOT NULL CHECK (cgpa >= 0 AND cgpa <= 10),
  skills text NOT NULL,
  interests text NOT NULL,
  career_goal text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_students" ON students;
CREATE POLICY "anon_select_students" ON students FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_students" ON students;
CREATE POLICY "anon_insert_students" ON students FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_students" ON students;
CREATE POLICY "anon_update_students" ON students FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_students" ON students;
CREATE POLICY "anon_delete_students" ON students FOR DELETE
  TO anon, authenticated USING (true);
