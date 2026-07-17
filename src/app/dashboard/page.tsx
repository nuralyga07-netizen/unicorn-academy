"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  User,
  Calendar,
  BarChart3,
  Award,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  Clock,
  TrendingUp,
  Video,
  Menu,
  LogOut,
  Star,
  Play,
  MessageCircle,
} from "lucide-react";

const TELEGRAM_LINK =
  "https://t.me/Nu_wwx?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20the%20courses%20at%20Unicorn%20Academy.";

// ---------- Tab configuration ----------

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

const tabs: DashboardTab[] = [
  { id: "courses", label: "Мои курсы", icon: BookOpen },
  { id: "homework", label: "Домашнее задание", icon: ClipboardList },
  { id: "profile", label: "Кабинет", icon: User },
  { id: "schedule", label: "Расписание", icon: Calendar },
  { id: "attendance", label: "Посещаемость", icon: BarChart3 },
  { id: "progress", label: "Прогресс", icon: TrendingUp },
  { id: "certificates", label: "Сертификаты", icon: Award },
];

// ---------- Mock data will be loaded from the database ----------

const myCourses: {
  name: string;
  teacher: string;
  progress: number;
  nextLesson: string;
  nextDate: string;
  grade: string;
  color: string;
}[] = [];

const homeworkItems: {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  description: string;
}[] = [];

const scheduleEvents: {
  day: string;
  time: string;
  course: string;
  teacher: string;
  room: string;
}[] = [];

const attendanceData: {
  month: string;
  attended: number;
  total: number;
  percent: number;
}[] = [];

// Announcements removed — real announcements will come from the database

// ---------- Tab content components ----------

function CoursesTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Мои курсы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {myCourses.map((course, i) => (
          <motion.div
            key={course.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
          >
            {/* Gradient header */}
            <div className={`bg-gradient-to-r ${course.color} p-5 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <GraduationCap className="w-6 h-6 opacity-80" />
                <span className="text-xs bg-white/20 rounded-lg px-2.5 py-1 font-medium">
                  {course.grade}
                </span>
              </div>
              <h3 className="text-lg font-bold">{course.name}</h3>
              <p className="text-sm opacity-80 mt-1">{course.teacher}</p>
            </div>

            {/* Progress */}
            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                  />
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{course.nextLesson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{course.nextDate}</span>
                </div>
              </div>

              <a
                href="/classrooms"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium transition-all shadow-lg shadow-indigo-500/25"
              >
                <Video className="w-4 h-4" />
                Перейти в кабинет
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HomeworkTab() {
  const statusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <Clock className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Домашнее задание</h2>
      <div className="space-y-4">
        {homeworkItems.map((hw, i) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-lg p-5 lg:p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5">{statusIcon(hw.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{hw.title}</h3>
                    <p className="text-sm text-muted-foreground">{hw.course}</p>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium ${
                      hw.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : hw.status === "in_progress"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-indigo-500/10 text-indigo-500"
                    }`}
                  >
                    {hw.status === "completed"
                      ? "Выполнено"
                      : hw.status === "in_progress"
                      ? "В процессе"
                      : "Ожидает"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{hw.description}</p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Сдать до: {hw.dueDate}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Личный кабинет</h2>
      <div className="rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xl p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-indigo-500/20">
            У
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-2xl font-bold">—</h3>
            <p className="text-muted-foreground">—</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { label: "Курсов", value: "—" },
                { label: "Уроков", value: "—" },
                { label: "Дней в академии", value: "—" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-4 py-2 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/5 text-center"
                >
                  <div className="font-bold text-lg">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white hover:bg-sky-600 font-medium text-sm transition-all shadow-lg shadow-sky-500/25 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Связаться
          </a>
        </div>
      </div>
    </div>
  );
}

function ScheduleTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Расписание</h2>
      <div className="rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-500/10 bg-indigo-500/5">
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">День</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Время</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Курс</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Преподаватель</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Кабинет</th>
              </tr>
            </thead>
            <tbody>
              {scheduleEvents.map((event, i) => (
                <tr
                  key={i}
                  className="border-b border-indigo-500/5 hover:bg-indigo-500/5 transition-colors"
                >
                  <td className="p-4">
                    <span className="font-semibold">{event.day}</span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{event.time}</td>
                  <td className="p-4 text-sm font-medium">{event.course}</td>
                  <td className="p-4 text-sm text-muted-foreground">{event.teacher}</td>
                  <td className="p-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-medium">
                      {event.room}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AttendanceTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Посещаемость</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {attendanceData.map((month, i) => (
          <motion.div
            key={month.month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-lg p-5 text-center"
          >
            <h3 className="font-semibold mb-3">{month.month}</h3>
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-indigo-500/10" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 40 * (1 - month.percent / 100),
                  }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className={
                    month.percent >= 80
                      ? "text-emerald-500"
                      : month.percent >= 60
                      ? "text-amber-500"
                      : "text-indigo-500"
                  }
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">{month.percent}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {month.attended}/{month.total} занятий
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProgressTab() {
  const progressData: {
    label: string;
    value: number;
    color: string;
  }[] = [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Прогресс</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressData.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-lg p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{item.label}</span>
              <span className="text-sm font-bold">{item.value}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CertificatesTab() {
  const certificates: {
    name: string;
    date: string;
    grade: string;
    status: string;
  }[] = [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Сертификаты</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border p-6 backdrop-blur-xl shadow-lg transition-all ${
              cert.status === "completed"
                ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/5"
                : "border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30"
            }`}
          >
            <Award
              className={`w-12 h-12 mb-4 ${
                cert.status === "completed" ? "text-emerald-500" : "text-muted-foreground/40"
              }`}
            />
            <h3 className="font-semibold">{cert.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {cert.status === "completed" ? `Выдан: ${cert.date}` : cert.date}
            </p>
            {cert.status === "completed" && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                  Оценка: {cert.grade}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------- Tab content map ----------

const tabContent: Record<string, React.ReactNode> = {
  courses: <CoursesTab />,
  homework: <HomeworkTab />,
  profile: <ProfileTab />,
  schedule: <ScheduleTab />,
  attendance: <AttendanceTab />,
  progress: <ProgressTab />,
  certificates: <CertificatesTab />,
};

// ---------- Main component ----------

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("courses");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-emerald-50/30 dark:from-[#0a0a1a] dark:via-indigo-950/20 dark:to-[#0a0a1a]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 lg:w-72 z-50 bg-white/80 dark:bg-[#0a0a1a]/95 backdrop-blur-2xl border-r border-indigo-500/10 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-indigo-500/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="font-semibold">
              Unicorn
              <span className="text-indigo-600 dark:text-indigo-400 ml-1">Academy</span>
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-indigo-500/10">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-[#0a0a1a]/70 backdrop-blur-2xl border-b border-indigo-500/10">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl hover:bg-indigo-500/10 flex items-center justify-center text-muted-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-lg font-semibold hidden sm:block">
              {tabs.find((t) => t.id === activeTab)?.label || "Кабинет"}
            </h1>

            <div className="flex items-center gap-3">
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 text-sm font-medium transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Поддержка
              </a>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                У
              </div>
            </div>
          </div>
        </header>

        {/* Free trial lesson banner */}
        <div className="p-4 lg:p-8 pb-0 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 shadow-xl shadow-indigo-500/20"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-2xl" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Star className="w-7 h-7 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Пробный урок и определение уровня — бесплатно!
                  </h3>
                  <p className="text-indigo-200/80 text-sm sm:text-base mt-1 max-w-xl">
                    Запишитесь на бесплатное занятие, познакомьтесь с преподавателем и узнайте свой уровень английского
                  </p>
                </div>
              </div>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-sm transition-all shadow-lg shrink-0 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Записаться на пробный
              </a>
            </div>
          </motion.div>
        </div>

        {/* Tab content */}
        <main className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabContent[activeTab] || <CoursesTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
