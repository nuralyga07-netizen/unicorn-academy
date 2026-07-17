"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, CalendarDays, Clock, Save } from "lucide-react";

interface Lesson {
  id: number;
  day: string;
  time: string;
  classroom: string;
  name: string;
  teacher: string;
}

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const times = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const initialLessons: Lesson[] = [
  { id: 1, day: "Пн", time: "09:00", classroom: "Английский A1 — Утренняя", name: "Общий английский A1", teacher: "—" },
  { id: 2, day: "Пн", time: "10:00", classroom: "IELTS Writing Intensive", name: "IELTS Writing", teacher: "—" },
  { id: 3, day: "Пн", time: "14:00", classroom: "Английский A2 — Дневная", name: "Общий английский A2", teacher: "—" },
  { id: 4, day: "Пн", time: "18:00", classroom: "Английский B1 — Вечерняя", name: "Общий английский B1", teacher: "—" },
  { id: 5, day: "Вт", time: "11:00", classroom: "IELTS Preparation", name: "IELTS Prep", teacher: "—" },
  { id: 6, day: "Вт", time: "16:00", classroom: "Business English", name: "Деловой английский", teacher: "—" },
  { id: 7, day: "Ср", time: "09:00", classroom: "Английский A1 — Утренняя", name: "Общий английский A1", teacher: "—" },
  { id: 8, day: "Ср", time: "14:00", classroom: "Английский A2 — Дневная", name: "Общий английский A2", teacher: "—" },
  { id: 9, day: "Ср", time: "17:00", classroom: "Grammar Booster", name: "Grammar B1-B2", teacher: "—" },
  { id: 10, day: "Ср", time: "18:00", classroom: "Английский B1 — Вечерняя", name: "Общий английский B1", teacher: "—" },
  { id: 11, day: "Чт", time: "10:00", classroom: "IELTS Writing Intensive", name: "IELTS Writing", teacher: "—" },
  { id: 12, day: "Чт", time: "11:00", classroom: "IELTS Preparation", name: "IELTS Prep", teacher: "—" },
  { id: 13, day: "Чт", time: "16:00", classroom: "Business English", name: "Деловой английский", teacher: "—" },
  { id: 14, day: "Пт", time: "09:00", classroom: "Английский A1 — Утренняя", name: "Общий английский A1", teacher: "—" },
  { id: 15, day: "Пт", time: "18:00", classroom: "Английский B1 — Вечерняя", name: "Общий английский B1", teacher: "—" },
  { id: 16, day: "Пт", time: "19:00", classroom: "Speaking Club Advanced", name: "Advanced Speaking", teacher: "—" },
  { id: 17, day: "Сб", time: "11:00", classroom: "IELTS Preparation", name: "IELTS Prep", teacher: "—" },
  { id: 18, day: "Сб", time: "15:00", classroom: "Разговорный клуб Intermediate", name: "Разговорный клуб", teacher: "—" },
];

export default function SchedulePage() {
  const [lessons, setLessons] = useState(initialLessons);
  const [showAdd, setShowAdd] = useState(false);
  const [newLesson, setNewLesson] = useState({
    day: "Пн",
    time: "09:00",
    classroom: "",
    name: "",
    teacher: "",
  });
  const [saved, setSaved] = useState(false);

  const addLesson = () => {
    if (!newLesson.name || !newLesson.classroom) return;
    const id = Math.max(...lessons.map((l) => l.id), 0) + 1;
    setLessons((prev) => [...prev, { ...newLesson, id }]);
    setNewLesson({ day: "Пн", time: "09:00", classroom: "", name: "", teacher: "" });
    setShowAdd(false);
    setSaved(false);
  };

  const removeLesson = (id: number) => {
    setLessons((prev) => prev.filter((l) => l.id !== id));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getLessonsForDay = (day: string) =>
    lessons.filter((l) => l.day === day).sort((a, b) => times.indexOf(a.time) - times.indexOf(b.time));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Расписание</h1>
          <p className="text-sm text-indigo-200/40 mt-1">
            Управление еженедельным расписанием занятий
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
          >
            <Save className="w-4 h-4" />
            {saved ? "Сохранено!" : "Сохранить"}
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            Добавить урок
          </button>
        </div>
      </motion.div>

      {/* Add lesson form */}
      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">Новый урок</h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs text-indigo-200/60 mb-1.5">День</label>
              <select
                value={newLesson.day}
                onChange={(e) => setNewLesson({ ...newLesson, day: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              >
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-indigo-200/60 mb-1.5">Время</label>
              <select
                value={newLesson.time}
                onChange={(e) => setNewLesson({ ...newLesson, time: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              >
                {times.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-indigo-200/60 mb-1.5">Кабинет</label>
              <input
                value={newLesson.classroom}
                onChange={(e) => setNewLesson({ ...newLesson, classroom: e.target.value })}
                placeholder="Название кабинета"
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-xs text-indigo-200/60 mb-1.5">Название урока</label>
              <input
                value={newLesson.name}
                onChange={(e) => setNewLesson({ ...newLesson, name: e.target.value })}
                placeholder="Название"
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-xs text-indigo-200/60 mb-1.5">Преподаватель</label>
              <input
                value={newLesson.teacher}
                onChange={(e) => setNewLesson({ ...newLesson, teacher: e.target.value })}
                placeholder="ФИО"
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 rounded-xl text-sm text-indigo-200/60 hover:text-white hover:bg-indigo-500/10 transition-all"
            >
              Отмена
            </button>
            <button
              onClick={addLesson}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium"
            >
              Добавить
            </button>
          </div>
        </motion.div>
      )}

      {/* Weekly Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        {days.map((day, di) => {
          const dayLessons = getLessonsForDay(day);
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: di * 0.05 }}
              className="bg-[#12122a] border border-indigo-500/10 rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-3 border-b border-indigo-500/10">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-semibold text-white">{day}</span>
                </div>
                <span className="text-xs text-indigo-200/40">
                  {dayLessons.length} {dayLessons.length === 1 ? "урок" : "уроков"}
                </span>
              </div>
              <div className="p-3 space-y-2 min-h-[200px]">
                {dayLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="group relative bg-[#0a0a1a] border border-indigo-500/10 rounded-xl p-3 hover:border-indigo-500/20 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{lesson.name}</p>
                        <p className="text-xs text-indigo-200/40 mt-0.5 truncate">{lesson.classroom}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          <span className="text-xs text-indigo-300">{lesson.time}</span>
                          <span className="text-xs text-indigo-200/40">· {lesson.teacher}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeLesson(lesson.id)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {dayLessons.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[160px] text-indigo-200/20">
                    <CalendarDays className="w-8 h-8 mb-2" />
                    <p className="text-xs">Нет уроков</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
