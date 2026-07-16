"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Video,
  FileText,
  Clock,
  Users,
  MapPin,
  Calendar,
  Play,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  GraduationCap,
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

const classrooms: Classroom[] = [
  {
    id: "1",
    name: "General English A2",
    teacher: "Айгерим Нурланова",
    teacherAvatar: "АН",
    course: "Общий английский",
    level: "A2",
    meetLink: "https://meet.google.com/abc-defg-hij",
    formLink: "https://forms.gle/example1",
    schedule: "Пн / Ср / Пт",
    time: "10:00 – 11:30",
    day: "Сегодня",
    currentLesson: "Unit 8: Present Perfect vs Past Simple",
    nextLesson: "Unit 9: Conditionals",
    status: "live",
    students: 8,
    maxStudents: 12,
  },
  {
    id: "2",
    name: "IELTS Prep Band 6.5+",
    teacher: "Michael Johnson",
    teacherAvatar: "MJ",
    course: "IELTS",
    level: "B2–C1",
    meetLink: "https://meet.google.com/def-ghij-klm",
    formLink: "https://forms.gle/example2",
    schedule: "Вт / Чт / Сб",
    time: "14:00 – 16:00",
    day: "Сегодня",
    currentLesson: "IELTS Writing Task 2: Essay Structure",
    nextLesson: "IELTS Speaking Part 2: Cue Cards",
    status: "live",
    students: 10,
    maxStudents: 12,
  },
  {
    id: "3",
    name: "General English B1",
    teacher: "Диана Сабитова",
    teacherAvatar: "ДС",
    course: "Общий английский",
    level: "B1",
    meetLink: "https://meet.google.com/ghi-jklm-nop",
    formLink: "https://forms.gle/example3",
    schedule: "Пн / Ср / Пт",
    time: "16:00 – 17:30",
    day: "Сегодня",
    currentLesson: "Unit 12: Reported Speech",
    nextLesson: "Unit 13: Passive Voice",
    status: "upcoming",
    students: 7,
    maxStudents: 12,
  },
  {
    id: "4",
    name: "Conversation Club B1+",
    teacher: "Michael Johnson",
    teacherAvatar: "MJ",
    course: "Разговорный клуб",
    level: "B1+",
    meetLink: "https://meet.google.com/jkl-mnop-qrs",
    formLink: "https://forms.gle/example4",
    schedule: "Сб",
    time: "11:00 – 12:30",
    day: "Завтра",
    currentLesson: "Topic: Travel & Cultural Differences",
    nextLesson: "Topic: Technology & Society",
    status: "upcoming",
    students: 11,
    maxStudents: 15,
  },
  {
    id: "5",
    name: "General English A1",
    teacher: "Айгерим Нурланова",
    teacherAvatar: "АН",
    course: "Общий английский",
    level: "A1",
    meetLink: "https://meet.google.com/mno-pqrs-tuv",
    formLink: "https://forms.gle/example5",
    schedule: "Вт / Чт",
    time: "09:00 – 10:30",
    day: "Понедельник",
    currentLesson: "Unit 5: My Daily Routine",
    nextLesson: "Unit 6: Describing People",
    status: "finished",
    students: 6,
    maxStudents: 10,
  },
  {
    id: "6",
    name: "IELTS Speaking Focus",
    teacher: "Michael Johnson",
    teacherAvatar: "MJ",
    course: "IELTS",
    level: "B2–C1",
    meetLink: "https://meet.google.com/pqr-stuv-wxy",
    formLink: "https://forms.gle/example6",
    schedule: "Ср / Пт",
    time: "18:00 – 19:30",
    day: "Среда",
    currentLesson: "Speaking Part 1: Introduction",
    nextLesson: "Speaking Part 3: Discussion",
    status: "finished",
    students: 5,
    maxStudents: 8,
  },
  {
    id: "7",
    name: "Business English B2",
    teacher: "Диана Сабитова",
    teacherAvatar: "ДС",
    course: "Деловой английский",
    level: "B2",
    meetLink: "https://meet.google.com/stu-vwxy-zab",
    formLink: "https://forms.gle/example7",
    schedule: "Пн / Ср",
    time: "19:00 – 20:30",
    day: "Понедельник",
    currentLesson: "Unit 3: Negotiations & Persuasion",
    nextLesson: "Unit 4: Presentations & Public Speaking",
    status: "finished",
    students: 9,
    maxStudents: 12,
  },
  {
    id: "8",
    name: "General English C1",
    teacher: "Айгерим Нурланова",
    teacherAvatar: "АН",
    course: "Общий английский",
    level: "C1",
    meetLink: "https://meet.google.com/vwx-yzab-cde",
    formLink: "https://forms.gle/example8",
    schedule: "Пн / Ср / Пт",
    time: "11:00 – 12:30",
    day: "Понедельник",
    currentLesson: "Unit 15: Advanced Grammar Review",
    nextLesson: "Unit 16: Academic Writing",
    status: "finished",
    students: 4,
    maxStudents: 10,
  },
  {
    id: "9",
    name: "IELTS Writing Workshop",
    teacher: "Michael Johnson",
    teacherAvatar: "MJ",
    course: "IELTS",
    level: "B2–C1",
    meetLink: "https://meet.google.com/yza-bcde-fgh",
    formLink: "https://forms.gle/example9",
    schedule: "Сб / Вс",
    time: "15:00 – 17:00",
    day: "Суббота",
    currentLesson: "Task 1: Academic Graphs",
    nextLesson: "Task 2: Opinion Essays",
    status: "upcoming",
    students: 12,
    maxStudents: 12,
  },
  {
    id: "10",
    name: "Kids English 8–10",
    teacher: "Диана Сабитова",
    teacherAvatar: "ДС",
    course: "Детский английский",
    level: "Starter",
    meetLink: "https://meet.google.com/bcd-efgh-ijk",
    formLink: "https://forms.gle/example10",
    schedule: "Вт / Чт / Сб",
    time: "10:00 – 11:00",
    day: "Вторник",
    currentLesson: "Unit 4: My Family & Friends",
    nextLesson: "Unit 5: Animals & Nature",
    status: "upcoming",
    students: 6,
    maxStudents: 8,
  },
];

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

export default function ClassroomsPage() {
  const [filter, setFilter] = React.useState<ClassroomStatus | "all">("all");

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
              { label: "Всего студентов", value: classrooms.reduce((a, c) => a + c.students, 0), icon: Users },
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

                return (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="group relative rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
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
                      <span className="text-xs text-muted-foreground">{room.day}</span>
                    </div>

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
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
