"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  BookOpen,
  Check,
  X,
  Star,
  Users,
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  isActive: boolean;
  students: number;
  rating: number;
  duration: string;
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: "Общий английский",
    description: "Комплексная программа изучения английского языка для всех уровней — от Beginner до Advanced. Включает грамматику, разговорную практику, аудирование и письмо.",
    price: "20,000₸",
    features: ["Групповые занятия 3 раза в неделю", "Доступ к учебным материалам", "Разговорный клуб", "Домашние задания с проверкой", "Сертификат об окончании"],
    isActive: true,
    students: 89,
    rating: 4.7,
    duration: "3 месяца",
  },
  {
    id: 2,
    title: "IELTS Preparation",
    description: "Интенсивная подготовка к IELTS Academic и General. Полный разбор всех секций: Listening, Reading, Writing, Speaking.",
    price: "25,000₸",
    features: ["Индивидуальный план подготовки", "Пробные тесты каждую неделю", "Разбор Writing с экспертом", "Speaking практика 1-on-1", "Гарантия результата 6.0+"],
    isActive: true,
    students: 67,
    rating: 4.9,
    duration: "4 месяца",
  },
  {
    id: 3,
    title: "Индивидуальные занятия",
    description: "Персональная программа обучения с преподавателем. Полная адаптация под ваши цели, темп и график.",
    price: "35,000₸",
    features: ["Индивидуальный график", "Программа под ваш запрос", "Фокус на слабые места", "Обратная связь 24/7", "Материалы для самостоятельной работы"],
    isActive: true,
    students: 34,
    rating: 5.0,
    duration: "Гибкая",
  },
  {
    id: 4,
    title: "Business English",
    description: "Деловой английский для профессионалов. Переговоры, презентации, деловая переписка и собеседования.",
    price: "28,000₸",
    features: ["Бизнес-лексика", "Ролевые игры переговоров", "Написание отчетов и писем", "Подготовка к презентациям"],
    isActive: true,
    students: 42,
    rating: 4.8,
    duration: "3 месяца",
  },
  {
    id: 5,
    title: "Разговорный клуб",
    description: "Еженедельные встречи для практики разговорного английского с носителями языка и преподавателями.",
    price: "12,000₸",
    features: ["5 встреч в месяц", "Темы на выбор", "Группы по уровням", "Запись встреч"],
    isActive: false,
    students: 28,
    rating: 4.6,
    duration: "1 месяц",
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [editing, setEditing] = useState<Course | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const toggleCourse = (id: number) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  const addCourse = (data: Course) => {
    const id = Math.max(...courses.map((c) => c.id), 0) + 1;
    setCourses((prev) => [...prev, { ...data, id }]);
    setShowAdd(false);
  };

  const updateCourse = (id: number, data: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    setEditing(null);
  };

  const deleteCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Курсы</h1>
          <p className="text-sm text-indigo-200/40 mt-1">Управление курсами и ценами</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Добавить курс
        </button>
      </motion.div>

      {/* Courses List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {courses.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6 hover:border-indigo-500/20 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                    <button
                      onClick={() => toggleCourse(c.id)}
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                        c.isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-indigo-200/10 text-indigo-200/40"
                      }`}
                    >
                      {c.isActive ? "Активен" : "Архив"}
                    </button>
                  </div>
                  <p className="text-sm text-indigo-200/60 mt-2 line-clamp-2">{c.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-indigo-200/40">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      {c.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {c.students}
                    </div>
                    <span>{c.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.features.map((f) => (
                      <span key={f} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/5 text-emerald-400/80 text-xs border border-emerald-500/10">
                        <Check className="w-2.5 h-2.5" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-2xl font-bold text-white">{c.price}</span>
                <span className="text-xs text-indigo-200/40">в месяц</span>
                <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditing(c)}
                    className="w-8 h-8 rounded-lg hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200/40 hover:text-indigo-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCourse(c.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-red-400/40 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add/Edit Modal */}
      {(showAdd || editing) && (
        <CourseModal
          title={editing ? "Редактировать курс" : "Добавить курс"}
          course={editing || { id: 0, title: "", description: "", price: "", features: [], isActive: true, students: 0, rating: 0, duration: "" }}
          onSave={(data) => (editing ? updateCourse(editing.id, data) : addCourse(data as Course))}
          onClose={() => { setEditing(null); setShowAdd(false); }}
        />
      )}
    </div>
  );
}

function CourseModal({
  title,
  course,
  onSave,
  onClose,
}: {
  title: string;
  course: Course;
  onSave: (data: Partial<Course>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(course);
  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    if (featureInput.trim() && !form.features.includes(featureInput.trim())) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (f: string) => {
    setForm({ ...form, features: form.features.filter((feat) => feat !== f) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-[#12122a] border border-indigo-500/10 rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-500/10">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200/40">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Название курса</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
            />
          </div>
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Описание</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Цена</label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="20,000₸"
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Длительность</label>
              <input
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="3 месяца"
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Преимущества</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.features.map((f) => (
                <span key={f} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/5 text-emerald-400/80 text-xs border border-emerald-500/10">
                  <Check className="w-2.5 h-2.5" />
                  {f}
                  <button onClick={() => removeFeature(f)} className="ml-0.5 hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFeature()}
                placeholder="Введите преимущество"
                className="flex-1 h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30"
              />
              <button onClick={addFeature} className="px-3 rounded-xl bg-indigo-500/10 text-indigo-300 text-sm hover:bg-indigo-500/20">
                Добавить
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-indigo-500/10">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-indigo-200/60 hover:text-white hover:bg-indigo-500/10 transition-all">
            Отмена
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium"
          >
            Сохранить
          </button>
        </div>
      </motion.div>
    </div>
  );
}
