"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  FileText,
  Clock,
  Users,
  Calendar,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  GraduationCap,
  Lock,
  Unlock,
  Key,
} from "lucide-react";

type ClassroomStatus = "live" | "upcoming" | "finished";

interface Classroom {
  id: string;
  name: string;
  teacher: string;
  teacherAvatar: string;
  course: string;
  level: string;
  meetLink: string;
  formLink: string;
  schedule: string;
  time: string;
  day: string;
  currentLesson: string;
  nextLesson: string;
  status: ClassroomStatus;
  students: number;
  maxStudents: number;
}

const classrooms: Classroom[] = [];

// Classroom passwords will be set through the admin panel

const statusConfig: Record<ClassroomStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  live: {
    label: "Live",
    icon: Loader2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
  upcoming: {
    label: "Предстоит",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
  finished: {
    label: "Завершён",
    icon: CheckCircle2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
};

function PasswordModal({
  classroom,
  onSuccess,
  onClose,
}: {
  classroom: Classroom;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Passwords will be configured via admin panel — no demo passwords
    setError(true);
  };

  const classroomNumber = classroom.id.padStart(3, "0");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-indigo-500/20 bg-indigo-950/60 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">{classroom.name}</h3>
          <p className="text-indigo-200/80 text-sm mt-1">Кабинет №{classroomNumber}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">
              Введите пароль для входа
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="••••"
                className={`w-full h-12 pl-10 pr-4 rounded-xl bg-indigo-950/80 border text-white text-sm focus:outline-none transition-all ${
                  error
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-indigo-500/20 focus:border-indigo-500/50"
                }`}
                autoFocus
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1.5 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Неверный пароль
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            <Unlock className="w-4 h-4" />
            Войти в кабинет
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-indigo-200/40 hover:text-indigo-200/60 transition-colors py-2"
          >
            Отмена
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function ClassroomsPage() {
  const [filter, setFilter] = React.useState<ClassroomStatus | "all">("all");
  const [unlockedRooms, setUnlockedRooms] = React.useState<Set<string>>(new Set());
  const [selectedRoom, setSelectedRoom] = React.useState<Classroom | null>(null);

  const filteredClassrooms =
    filter === "all"
      ? classrooms
      : classrooms.filter((c) => c.status === filter);

  const counts = {
    all: classrooms.length,
    live: classrooms.filter((c) => c.status === "live").length,
    upcoming: classrooms.filter((c) => c.status === "upcoming").length,
    finished: classrooms.filter((c) => c.status === "finished").length,
  };

  const handlePasswordSuccess = () => {
    if (selectedRoom) {
      setUnlockedRooms((prev) => new Set(prev).add(selectedRoom.id));
      setSelectedRoom(null);
    }
  };

  const handleCardClick = (room: Classroom) => {
    if (!unlockedRooms.has(room.id)) {
      setSelectedRoom(room);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-400 mb-6"
            >
              <Video className="w-4 h-4" />
              <span>Онлайн-кабинеты</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Наши кабинеты
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Все занятия проходят в Google Meet. Присоединяйтесь к уроку, смотрите расписание и
              отмечайте посещаемость.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Всего кабинетов", value: classrooms.length, icon: Video },
              { label: "Сейчас идёт", value: counts.live, icon: Play },
              { label: "В расписании", value: counts.upcoming, icon: Clock },
              { label: "Всего студентов", value: "—", icon: Users },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-lg p-5 text-center"
              >
                <stat.icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "all" as const, label: "Все", count: counts.all },
              { key: "live" as const, label: "Live", count: counts.live },
              { key: "upcoming" as const, label: "Предстоит", count: counts.upcoming },
              { key: "finished" as const, label: "Завершённые", count: counts.finished },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f.key
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "glass text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/20 dark:hover:bg-indigo-950/30"
                }`}
              >
                {f.label}
                <span className="ml-1.5 opacity-60">({f.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Classroom cards */}
      <section className="py-8 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredClassrooms.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <GraduationCap className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Нет кабинетов с таким статусом</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {filteredClassrooms.map((room, i) => {
                const status = statusConfig[room.status];
                const StatusIcon = status.icon;
                const isUnlocked = unlockedRooms.has(room.id);
                const classroomNumber = room.id.padStart(3, "0");

                return (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={isUnlocked ? { y: -2 } : { y: -2 }}
                    onClick={() => handleCardClick(room)}
                    className={`group relative rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden ${
                      !isUnlocked ? "cursor-pointer" : ""
                    }`}
                  >
                    {/* Status bar */}
                    <div
                      className={`flex items-center justify-between px-5 py-2.5 border-b ${status.bg}`}
                    >
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={`w-4 h-4 ${status.color} ${room.status === "live" ? "animate-pulse" : ""}`}
                        />
                        <span className={`text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isUnlocked ? (
                          <span className="text-xs flex items-center gap-1 text-amber-400">
                            <Lock className="w-3 h-3" />
                            №{classroomNumber}
                          </span>
                        ) : (
                          <span className="text-xs flex items-center gap-1 text-emerald-400">
                            <Unlock className="w-3 h-3" />
                            №{classroomNumber}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">{room.day}</span>
                      </div>
                    </div>

                    {isUnlocked ? (
                      /* Unlocked content */
                      <div className="p-5 lg:p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{room.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {room.course} · Уровень {room.level}
                            </p>
                          </div>
                        </div>

                        {/* Teacher */}
                        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/5">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {room.teacherAvatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{room.teacher}</p>
                            <p className="text-xs text-muted-foreground">Преподаватель</p>
                          </div>
                        </div>

                        {/* Schedule */}
                        <div className="space-y-2.5 mb-5">
                          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            <span>{room.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            <span>{room.time}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <Users className="w-4 h-4 text-indigo-500" />
                            <span>
                              {room.students}/{room.maxStudents} студентов
                            </span>
                          </div>
                        </div>

                        {/* Current / Next lesson */}
                        <div className="space-y-2 mb-5 p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/10">
                          <div className="flex items-start gap-2">
                            <Play className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground font-medium">Текущий урок</p>
                              <p className="text-sm font-medium">{room.currentLesson}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground font-medium">Следующий</p>
                              <p className="text-sm">{room.nextLesson}</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          {room.status !== "finished" ? (
                            <a
                              href={room.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                                room.status === "live"
                                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30 animate-pulse"
                                  : "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-xl"
                              }`}
                            >
                              <Video className="w-4 h-4" />
                              {room.status === "live" ? "Войти в урок" : "Google Meet"}
                            </a>
                          ) : (
                            <div className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-500/5 text-muted-foreground text-sm font-medium border border-indigo-500/10">
                              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                              Урок завершён
                            </div>
                          )}
                          <a
                            href={room.formLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-indigo-600/20 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/10 text-sm font-medium transition-all"
                          >
                            <FileText className="w-4 h-4" />
                            ДЗ / Форма
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* Locked overlay - show preview */
                      <div className="p-5 lg:p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{room.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {room.course} · Уровень {room.level}
                            </p>
                          </div>
                        </div>

                        {/* Teacher */}
                        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/5">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {room.teacherAvatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{room.teacher}</p>
                            <p className="text-xs text-muted-foreground">Преподаватель</p>
                          </div>
                        </div>

                        {/* Schedule preview */}
                        <div className="space-y-2.5 mb-5">
                          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 text-indigo-500" />
                            <span>{room.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            <span>{room.time}</span>
                          </div>
                        </div>

                        {/* Locked notice */}
                        <div className="flex flex-col items-center justify-center gap-3 py-4">
                          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-amber-400" />
                          </div>
                          <p className="text-sm text-muted-foreground text-center">
                            Нажмите, чтобы ввести пароль
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Password Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <PasswordModal
            classroom={selectedRoom}
            onSuccess={handlePasswordSuccess}
            onClose={() => setSelectedRoom(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
