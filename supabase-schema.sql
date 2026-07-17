-- ============================================================
-- Unicorn Academy — Supabase SQL Schema
-- Online English Academy Platform
-- ============================================================
-- This file is idempotent: safe to run multiple times.
-- ============================================================

-- ============================================================
-- 1. Extensions
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto"  WITH SCHEMA extensions;  -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm"   WITH SCHEMA extensions; -- fuzzy text search

-- ============================================================
-- 2. Enum Types
-- ============================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- 3. Tables
-- ============================================================

-- -----------------------------------------------------------
-- 3.1 Profiles (extends auth.users)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role          user_role NOT NULL DEFAULT 'student',
    full_name     TEXT NOT NULL,
    phone         TEXT,
    avatar        TEXT,
    bio           TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.profiles IS 'Extends auth.users with role and profile metadata';
COMMENT ON COLUMN public.profiles.role IS 'student | teacher | admin';

-- -----------------------------------------------------------
-- 3.2 Teachers
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.teachers (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id    UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    ielts_score   NUMERIC(4,2),
    subjects      TEXT[] NOT NULL DEFAULT '{}',
    biography     TEXT,
    schedule      JSONB NOT NULL DEFAULT '{}'::jsonb,
    photo_url     TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.teachers IS 'Teacher-specific data extending profiles';
COMMENT ON COLUMN public.teachers.subjects  IS 'Array of subjects this teacher can teach, e.g. {"IELTS","General English"}';
COMMENT ON COLUMN public.teachers.schedule  IS 'Weekly schedule as JSON, e.g. {"monday":{"09:00":"available","14:00":"busy"}}';

-- -----------------------------------------------------------
-- 3.3 Courses
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.courses (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          TEXT NOT NULL,
    slug          TEXT NOT NULL UNIQUE,
    description   TEXT,
    price         NUMERIC(10,2) NOT NULL DEFAULT 0,
    price_label   TEXT,                       -- e.g. '₸/мес' or '₸/час'
    schedule      TEXT,                       -- e.g. '2 раза в неделю'
    is_active     BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  public.courses IS 'Course offerings with pricing';
COMMENT ON COLUMN public.courses.price_label IS 'Display label for the price unit, e.g. ₸/мес or ₸/час';

-- -----------------------------------------------------------
-- 3.4 Classrooms
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.classrooms (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    teacher_id      UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
    course_id       UUID REFERENCES public.courses(id) ON DELETE SET NULL,
    google_meet_link TEXT,
    zoom_link       TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    topics          TEXT[] NOT NULL DEFAULT '{}',
    description     TEXT,
    date            DATE,
    time            TIME,
    max_students    INTEGER NOT NULL DEFAULT 20,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.classrooms IS 'Group or individual class sessions';

-- -----------------------------------------------------------
-- 3.5 Enrollments
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enrollments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    classroom_id    UUID NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
    enrolled_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(student_id, classroom_id)
);

COMMENT ON TABLE public.enrollments IS 'Links students (profiles with role=student) to classrooms';

-- -----------------------------------------------------------
-- 3.6 Reviews
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name    TEXT NOT NULL,
    text            TEXT NOT NULL,
    rating          INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    is_approved     BOOLEAN NOT NULL DEFAULT false,
    is_hidden       BOOLEAN NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.reviews IS 'Student testimonials shown on the site';

-- -----------------------------------------------------------
-- 3.7 Site Content (CMS)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_content (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page            TEXT NOT NULL,            -- e.g. 'home', 'about', 'courses'
    section         TEXT NOT NULL,            -- e.g. 'hero', 'stats', 'features'
    key             TEXT NOT NULL,            -- e.g. 'hero_title', 'about_text'
    value           TEXT NOT NULL DEFAULT '',
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(page, section, key)
);

COMMENT ON TABLE public.site_content IS 'Editable content blocks rendered on the frontend';

-- -----------------------------------------------------------
-- 3.8 Banners
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.banners (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    text            TEXT,
    image_url       TEXT,
    link_url        TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    scheduled_at    TIMESTAMPTZ,              -- NULL = show immediately
    expires_at      TIMESTAMPTZ,              -- NULL = no expiry
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.banners IS 'Promotional banners shown on the site';

-- -----------------------------------------------------------
-- 3.9 Announcements
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    text            TEXT NOT NULL,
    created_by      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.announcements IS 'Admin-created announcements for students and teachers';

-- -----------------------------------------------------------
-- 3.10 Analytics — Visits
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.analytics_visits (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    page            TEXT NOT NULL,
    ip              TEXT,
    device          TEXT,
    browser         TEXT,
    os              TEXT,
    country         TEXT,
    duration_seconds INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.analytics_visits IS 'Anonymous page visit analytics';

-- -----------------------------------------------------------
-- 3.11 Admin Logs
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action          TEXT NOT NULL,            -- e.g. 'update_course', 'approve_review', 'create_banner'
    details         JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.admin_logs IS 'Audit trail for admin actions';

-- -----------------------------------------------------------
-- 3.12 Student Activity
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_activity (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    classroom_id    UUID REFERENCES public.classrooms(id) ON DELETE SET NULL,
    login_time      TIMESTAMPTZ NOT NULL DEFAULT now(),
    logout_time     TIMESTAMPTZ,
    ip              TEXT,
    device          TEXT,
    browser         TEXT,
    os              TEXT,
    country         TEXT
);

COMMENT ON TABLE public.student_activity IS 'Student login/logout tracking per classroom';

-- ============================================================
-- 4. Indexes
-- ============================================================

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_user_id     ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role        ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_full_name   ON public.profiles USING gin (full_name gin_trgm_ops);

-- Teachers
CREATE INDEX IF NOT EXISTS idx_teachers_profile_id  ON public.teachers(profile_id);
CREATE INDEX IF NOT EXISTS idx_teachers_subjects    ON public.teachers USING gin (subjects);

-- Courses
CREATE INDEX IF NOT EXISTS idx_courses_slug         ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_is_active    ON public.courses(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_courses_display_order ON public.courses(display_order);

-- Classrooms
CREATE INDEX IF NOT EXISTS idx_classrooms_teacher_id ON public.classrooms(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classrooms_course_id  ON public.classrooms(course_id);
CREATE INDEX IF NOT EXISTS idx_classrooms_active_date ON public.classrooms(is_active, date)
    WHERE is_active = true;

-- Enrollments
CREATE INDEX IF NOT EXISTS idx_enrollments_student    ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_classroom  ON public.enrollments(classroom_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_enrolled_at ON public.enrollments(enrolled_at DESC);

-- Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_approved   ON public.reviews(is_approved, is_hidden)
    WHERE is_approved = true AND is_hidden = false;
CREATE INDEX IF NOT EXISTS idx_reviews_rating      ON public.reviews(rating DESC);

-- Site Content
CREATE INDEX IF NOT EXISTS idx_site_content_page   ON public.site_content(page);

-- Banners
CREATE INDEX IF NOT EXISTS idx_banners_active      ON public.banners(is_active)
    WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_banners_schedule    ON public.banners(scheduled_at, expires_at);

-- Announcements
CREATE INDEX IF NOT EXISTS idx_announcements_created ON public.announcements(created_at DESC);

-- Analytics
CREATE INDEX IF NOT EXISTS idx_analytics_visits_page      ON public.analytics_visits(page);
CREATE INDEX IF NOT EXISTS idx_analytics_visits_created   ON public.analytics_visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_visits_user      ON public.analytics_visits(user_id);

-- Admin Logs
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id  ON public.admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_action    ON public.admin_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created   ON public.admin_logs(created_at DESC);

-- Student Activity
CREATE INDEX IF NOT EXISTS idx_student_activity_student    ON public.student_activity(student_id);
CREATE INDEX IF NOT EXISTS idx_student_activity_classroom  ON public.student_activity(classroom_id);
CREATE INDEX IF NOT EXISTS idx_student_activity_login      ON public.student_activity(login_time DESC);

-- ============================================================
-- 5. Row-Level Security
-- ============================================================

-- Helper: get the current user's role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role
LANGUAGE SQL STABLE SECURITY DEFINER
AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- ---------- 5.1 Profiles ----------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
    FOR SELECT USING (
        auth.uid() = user_id
        OR public.current_user_role() = 'admin'
    );

CREATE POLICY "profiles_insert_admin_only" ON public.profiles
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "profiles_delete_admin_only" ON public.profiles
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.2 Teachers ----------
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teachers_select_public" ON public.teachers
    FOR SELECT USING (true);

CREATE POLICY "teachers_insert_admin_only" ON public.teachers
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "teachers_update_own_or_admin" ON public.teachers
    FOR UPDATE USING (
        auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
        OR public.current_user_role() = 'admin'
    );

CREATE POLICY "teachers_delete_admin_only" ON public.teachers
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.3 Courses ----------
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_select_public" ON public.courses
    FOR SELECT USING (true);

CREATE POLICY "courses_insert_admin_only" ON public.courses
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "courses_update_admin_only" ON public.courses
    FOR UPDATE USING (public.current_user_role() = 'admin');

CREATE POLICY "courses_delete_admin_only" ON public.courses
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.4 Classrooms ----------
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "classrooms_select_enrolled_or_admin" ON public.classrooms
    FOR SELECT USING (
        is_active = true
        OR public.current_user_role() = 'admin'
        OR auth.uid() IN (
            SELECT p.user_id FROM public.enrollments e
            JOIN public.profiles p ON p.id = e.student_id
            WHERE e.classroom_id = classrooms.id
        )
    );

CREATE POLICY "classrooms_insert_admin_only" ON public.classrooms
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "classrooms_update_admin_or_teacher" ON public.classrooms
    FOR UPDATE USING (
        public.current_user_role() IN ('admin', 'teacher')
    );

CREATE POLICY "classrooms_delete_admin_only" ON public.classrooms
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.5 Enrollments ----------
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select_own_or_admin" ON public.enrollments
    FOR SELECT USING (
        student_id = auth.uid()
        OR public.current_user_role() = 'admin'
    );

CREATE POLICY "enrollments_insert_self_or_admin" ON public.enrollments
    FOR INSERT WITH CHECK (
        student_id = auth.uid()
        OR public.current_user_role() = 'admin'
    );

CREATE POLICY "enrollments_delete_own_or_admin" ON public.enrollments
    FOR DELETE USING (
        student_id = auth.uid()
        OR public.current_user_role() = 'admin'
    );

-- ---------- 5.6 Reviews ----------
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_approved" ON public.reviews
    FOR SELECT USING (is_approved = true AND is_hidden = false);

CREATE POLICY "reviews_select_all_admin" ON public.reviews
    FOR SELECT USING (public.current_user_role() = 'admin');

CREATE POLICY "reviews_insert_public" ON public.reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "reviews_update_admin_only" ON public.reviews
    FOR UPDATE USING (public.current_user_role() = 'admin');

CREATE POLICY "reviews_delete_admin_only" ON public.reviews
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.7 Site Content ----------
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_content_select_public" ON public.site_content
    FOR SELECT USING (true);

CREATE POLICY "site_content_insert_admin_only" ON public.site_content
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "site_content_update_admin_only" ON public.site_content
    FOR UPDATE USING (public.current_user_role() = 'admin');

CREATE POLICY "site_content_delete_admin_only" ON public.site_content
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.8 Banners ----------
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "banners_select_active" ON public.banners
    FOR SELECT USING (
        is_active = true
        AND (scheduled_at IS NULL OR scheduled_at <= now())
        AND (expires_at IS NULL OR expires_at > now())
    );

CREATE POLICY "banners_select_all_admin" ON public.banners
    FOR SELECT USING (public.current_user_role() = 'admin');

CREATE POLICY "banners_insert_admin_only" ON public.banners
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "banners_update_admin_only" ON public.banners
    FOR UPDATE USING (public.current_user_role() = 'admin');

CREATE POLICY "banners_delete_admin_only" ON public.banners
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.9 Announcements ----------
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "announcements_select_all" ON public.announcements
    FOR SELECT USING (true);

CREATE POLICY "announcements_insert_admin_only" ON public.announcements
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "announcements_update_admin_only" ON public.announcements
    FOR UPDATE USING (public.current_user_role() = 'admin');

CREATE POLICY "announcements_delete_admin_only" ON public.announcements
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.10 Analytics Visits ----------
ALTER TABLE public.analytics_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "analytics_visits_insert_public" ON public.analytics_visits
    FOR INSERT WITH CHECK (true);

CREATE POLICY "analytics_visits_select_admin" ON public.analytics_visits
    FOR SELECT USING (public.current_user_role() = 'admin');

CREATE POLICY "analytics_visits_delete_admin_only" ON public.analytics_visits
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.11 Admin Logs ----------
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_logs_select_admin_only" ON public.admin_logs
    FOR SELECT USING (public.current_user_role() = 'admin');

CREATE POLICY "admin_logs_insert_admin_only" ON public.admin_logs
    FOR INSERT WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "admin_logs_delete_admin_only" ON public.admin_logs
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ---------- 5.12 Student Activity ----------
ALTER TABLE public.student_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "student_activity_select_own" ON public.student_activity
    FOR SELECT USING (
        student_id = auth.uid()
        OR public.current_user_role() = 'admin'
    );

CREATE POLICY "student_activity_insert_system" ON public.student_activity
    FOR INSERT WITH CHECK (true);

CREATE POLICY "student_activity_delete_admin_only" ON public.student_activity
    FOR DELETE USING (public.current_user_role() = 'admin');

-- ============================================================
-- 6. Auth Trigger — Auto-create profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
    _full_name TEXT;
    _phone     TEXT;
    _avatar    TEXT;
    _role      user_role;
BEGIN
    _full_name := COALESCE(
        NEW.raw_user_meta_data ->> 'full_name',
        NEW.raw_user_meta_data ->> 'name',
        NEW.email
    );
    _phone  := NEW.raw_user_meta_data ->> 'phone';
    _avatar := NEW.raw_user_meta_data ->> 'avatar_url';
    _role   := COALESCE(
        (NEW.raw_user_meta_data ->> 'role')::user_role,
        'student'::user_role
    );

    INSERT INTO public.profiles (user_id, role, full_name, phone, avatar)
    VALUES (NEW.id, _role, _full_name, _phone, _avatar);

    -- If the new user is a teacher, auto-create a teachers row
    IF _role = 'teacher' THEN
        INSERT INTO public.teachers (profile_id)
        VALUES (
            (SELECT id FROM public.profiles WHERE user_id = NEW.id)
        );
    END IF;

    RETURN NEW;
END;
$$;

-- Drop the trigger first if it exists (idempotent setup)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 7. Auto-update updated_at columns
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

DO $$
DECLARE
    tbl TEXT;
    tables_with_updated_at TEXT[] := ARRAY[
        'profiles', 'teachers', 'courses', 'classrooms'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables_with_updated_at
    LOOP
        EXECUTE format(
            'DROP TRIGGER IF EXISTS trg_%s_updated_at ON public.%I;',
            tbl, tbl
        );
        EXECUTE format(
            'CREATE TRIGGER trg_%s_updated_at
                BEFORE UPDATE ON public.%I
                FOR EACH ROW
                EXECUTE FUNCTION public.set_updated_at();',
            tbl, tbl
        );
    END LOOP;
END;
$$;

-- ============================================================
-- 8. Seed Data
-- ============================================================

-- ---------- 8.1 Courses ----------
INSERT INTO public.courses (name, slug, description, price, price_label, schedule, display_order, is_active)
VALUES
    (
        'Общий английский',
        'general-english',
        'Комплексный курс общего английского для всех уровней. Развитие разговорных навыков, грамматики, аудирования и письма.',
        20000.00,
        '₸/мес',
        '2 раза в неделю по 60 мин',
        1,
        true
    ),
    (
        'IELTS',
        'ielts',
        'Интенсивная подготовка к IELTS. Все модули: Listening, Reading, Writing, Speaking. Стратегии и практические тесты.',
        25000.00,
        '₸/мес',
        '3 раза в неделю по 90 мин',
        2,
        true
    ),
    (
        'Индивидуальные занятия',
        'private-lessons',
        'Персональные занятия с преподавателем по индивидуальной программе. Гибкий график и фокус на ваши цели.',
        35000.00,
        '₸/мес',
        'По согласованию',
        3,
        true
    )
ON CONFLICT (slug) DO NOTHING;

-- ---------- 8.2 Site Content (Home Page) ----------
INSERT INTO public.site_content (page, section, key, value) VALUES
    -- Hero section
    ('home', 'hero', 'hero_title',    'Unicorn Academy — учи английский с удовольствием'),
    ('home', 'hero', 'hero_subtitle', 'Современная онлайн-академия английского языка с опытными преподавателями и индивидуальным подходом'),
    -- About section
    ('home', 'about', 'about_text',   'Unicorn Academy — это онлайн-школа английского языка, где каждый ученик уникален. Мы сочетаем проверенные методики преподавания с современными технологиями, чтобы сделать изучение английского эффективным и увлекательным. Наши преподаватели — сертифицированные специалисты с международными сертификатами и богатым опытом.'),
    -- Stats section
    ('home', 'stats', 'students',     '500+'),
    ('home', 'stats', 'teachers',     '15'),
    ('home', 'stats', 'lessons',      '1000+'),
    ('home', 'stats', 'years',        '5'),
    -- Features section
    ('home', 'features', 'feature_1_title', 'Опытные преподаватели'),
    ('home', 'features', 'feature_1_text',  'Сертифицированные педагоги с международными дипломами и опытом работы от 3 лет'),
    ('home', 'features', 'feature_2_title', 'Индивидуальный подход'),
    ('home', 'features', 'feature_2_text',  'Программа обучения подстраивается под ваш уровень, цели и темп'),
    ('home', 'features', 'feature_3_title', 'Удобный формат'),
    ('home', 'features', 'feature_3_text',  'Онлайн-занятия из любой точки мира на современных платформах'),
    ('home', 'features', 'feature_4_title', 'Прогресс и результат'),
    ('home', 'features', 'feature_4_text',  'Регулярный мониторинг успеваемости и гарантированный рост уровня')
ON CONFLICT (page, section, key) DO NOTHING;

-- ============================================================
-- 9. Grants
-- ============================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Allow anon (unauthenticated) to read public-facing data
GRANT SELECT ON TABLE public.courses      TO anon;
GRANT SELECT ON TABLE public.teachers     TO anon;
GRANT SELECT ON TABLE public.site_content TO anon;
GRANT SELECT ON TABLE public.reviews      TO anon, authenticated;
GRANT SELECT ON TABLE public.banners      TO anon;
GRANT SELECT ON TABLE public.announcements TO anon;

-- Allow anon to insert reviews and analytics
GRANT INSERT ON TABLE public.reviews            TO anon;
GRANT INSERT ON TABLE public.analytics_visits   TO anon;
GRANT INSERT ON TABLE public.student_activity   TO anon;

-- Allow authenticated to read/update their own data (RLS handles the rest)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
