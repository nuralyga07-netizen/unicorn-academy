// ============================================================
// Unicorn Academy — Type Definitions
// ============================================================

// --- Enums & Literal Unions ---

export type UserRole = 'student' | 'teacher' | 'admin';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';

export type CourseStatus = 'draft' | 'published' | 'archived';

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

// --- Core Entities ---

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  role: UserRole;
  bio?: string | null;
  phone?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  title?: string | null;
  bio?: string | null;
  specializations: string[];
  experience_years: number;
  rating: number;
  total_students: number;
  is_verified: boolean;
  social_links?: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

export interface Classroom {
  id: string;
  name: string;
  description?: string | null;
  teacher_id: string;
  teacher_name?: string;
  course_id: string;
  student_count: number;
  max_students: number;
  schedule?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description?: string | null;
  thumbnail_url?: string | null;
  banner_url?: string | null;
  category: string;
  level: CourseLevel;
  status: CourseStatus;
  price: number;
  discount_price?: number | null;
  duration_hours: number;
  lessons_count: number;
  teacher_id: string;
  teacher_name?: string;
  rating: number;
  review_count: number;
  total_enrolled: number;
  tags: string[];
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  course_id: string;
  user_id: string;
  user_name?: string;
  user_avatar?: string | null;
  rating: ReviewRating;
  title?: string | null;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

// --- Content & Marketing ---

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  locale: string;
  is_html: boolean;
  created_at: string;
  updated_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  image_url: string;
  mobile_image_url?: string | null;
  link_url?: string | null;
  link_label?: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  is_active: boolean;
  starts_at: string;
  expires_at?: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// --- Analytics ---

export interface AnalyticsVisit {
  id: string;
  page: string;
  referrer?: string | null;
  user_agent?: string | null;
  ip_address?: string | null;
  user_id?: string | null;
  duration_seconds?: number | null;
  country?: string | null;
  device_type?: string | null;
  visited_at: string;
}

// --- Admin & Logging ---

export interface AdminLog {
  id: string;
  admin_id: string;
  admin_name?: string;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  details?: Record<string, unknown> | null;
  ip_address?: string | null;
  created_at: string;
}

export interface StudentActivity {
  id: string;
  user_id: string;
  user_name?: string;
  course_id?: string | null;
  course_title?: string | null;
  activity_type: 'enrollment' | 'lesson_complete' | 'quiz_attempt' | 'review' | 'login' | 'certificate';
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

// --- API Response Helpers ---

export interface PaginationParams {
  page: number;
  page_size: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}
