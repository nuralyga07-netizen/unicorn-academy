"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  GraduationCap,
  Search,
  Star,
  Award,
  BookOpen,
  X,
  Globe,
} from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  subjects: string[];
  bio: string;
  ieltsScore: string;
  photoUrl: string;
  rating: number;
  students: number;
  experience: string;
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: "Айгуль К.",
    subjects: ["Общий английский", "Грамматика", "Разговорный клуб"],
    bio: "Сертифицированный преподаватель с 8-летним опытом. Специализируется на обучении взрослых и подростков. Использует коммуникативную методику.",
    ieltsScore: "7.5",
    photoUrl: "",
    rating: 4.8,
    students: 156,
    experience: "8 лет",
  },
  {
    id: 2,
    name: "Сергей М.",
    subjects: ["Business English", "Общий английский"],
    bio: "Эксперт в области делового английского. 6 лет преподавания в международных компаниях. MBA степень.",
    ieltsScore: "8.0",
    photoUrl: "",
    rating: 4.9,
    students: 98,
    experience: "6 лет",
  },
  {
    id: 3,
    name: "Динара Б.",
    subjects: ["IELTS Preparation", "Academic Writing"],
    bio: "Сертифицированный IELTS эксперт. Подготовила более 200 студентов к сдаче IELTS. Средний балл студентов — 6.5.",
    ieltsScore: "8.5",
    photoUrl: "",
    rating: 4.9,
    students: 210,
    experience: "10 лет",
  },
  {
    id: 4,
    name: "Мария Л.",
    subjects: ["Kids English", "Общий английский", "Beginner"],
    bio: "Преподаватель с опытом работы с детьми и взрослыми. Использует игровые методики и интерактивные материалы.",
    ieltsScore: "7.0",
    photoUrl: "",
    rating: 4.7,
    students: 134,
    experience: "5 лет",
  },
  {
    id: 5,
    name: "Елена Р.",
    subjects: ["Английский для путешествий", "Разговорный клуб"],
    bio: "Путешественник и преподаватель. Помогает преодолеть языковой барьер и заговорить уверенно.",
    ieltsScore: "7.5",
    photoUrl: "",
    rating: 4.6,
    students: 87,
    experience: "4 года",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const addTeacher = (data: Teacher) => {
    const id = Math.max(...teachers.map((t) => t.id), 0) + 1;
    setTeachers((prev) => [...prev, { ...data, id }]);
    setShowAdd(false);
  };

  const updateTeacher = (id: number, data: Partial<Teacher>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    setEditing(null);
  };

  const deleteTeacher = (id: number) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
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
          <h1 className="text-2xl font-bold text-white">Преподаватели</h1>
          <p className="text-sm text-indigo-200/40 mt-1">Управление преподавательским составом</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Добавить преподавателя
        </button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-200/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск преподавателей..."
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#12122a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30 transition-all"
        />
      </motion.div>

      {/* Teachers Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6 hover:border-indigo-500/20 transition-all group"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-indigo-500/20">
                {t.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{t.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {t.rating}
                      </div>
                      <span className="text-xs text-indigo-200/40">·</span>
                      <Award className="w-3 h-3 text-indigo-400" />
                      <span className="text-xs text-indigo-200/60">IELTS {t.ieltsScore}</span>
                      <span className="text-xs text-indigo-200/40">·</span>
                      <span className="text-xs text-indigo-200/60">{t.experience}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(t)}
                      className="w-8 h-8 rounded-lg hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200/40 hover:text-indigo-300 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTeacher(t.id)}
                      className="w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-red-400/40 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {t.subjects.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/15"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-indigo-200/60 mt-3 line-clamp-2">{t.bio}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-indigo-200/40">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {t.students} студентов
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="lg:col-span-2 text-center py-16">
            <GraduationCap className="w-12 h-12 mx-auto text-indigo-200/20 mb-3" />
            <p className="text-sm text-indigo-200/40">Преподаватели не найдены</p>
          </div>
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      {(showAdd || editing) && (
        <TeacherModal
          title={editing ? "Редактировать преподавателя" : "Добавить преподавателя"}
          teacher={editing || { id: 0, name: "", subjects: [], bio: "", ieltsScore: "", photoUrl: "", rating: 0, students: 0, experience: "" }}
          onSave={(data) => (editing ? updateTeacher(editing.id, data) : addTeacher(data as Teacher))}
          onClose={() => { setEditing(null); setShowAdd(false); }}
        />
      )}
    </div>
  );
}

function TeacherModal({
  title,
  teacher,
  onSave,
  onClose,
}: {
  title: string;
  teacher: Teacher;
  onSave: (data: Partial<Teacher>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(teacher);
  const [subjectInput, setSubjectInput] = useState("");

  const addSubject = () => {
    if (subjectInput.trim() && !form.subjects.includes(subjectInput.trim())) {
      setForm({ ...form, subjects: [...form.subjects, subjectInput.trim()] });
      setSubjectInput("");
    }
  };

  const removeSubject = (s: string) => {
    setForm({ ...form, subjects: form.subjects.filter((sub) => sub !== s) });
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
              {form.name ? form.name.charAt(0) : "?"}
            </div>
            <div className="flex-1">
              <label className="block text-sm text-indigo-200/60 mb-1.5">ФИО</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Специализации</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.subjects.map((s) => (
                <span key={s} className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/15">
                  {s}
                  <button onClick={() => removeSubject(s)} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSubject()}
                placeholder="Введите предмет и нажмите Enter"
                className="flex-1 h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30"
              />
              <button
                onClick={addSubject}
                className="px-3 rounded-xl bg-indigo-500/10 text-indigo-300 text-sm hover:bg-indigo-500/20 transition-all"
              >
                Добавить
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Биография</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">IELTS Score</label>
              <input
                value={form.ieltsScore}
                onChange={(e) => setForm({ ...form, ieltsScore: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Опыт работы</label>
              <input
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">URL фото</label>
            <input
              value={form.photoUrl}
              onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-indigo-500/10">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-indigo-200/60 hover:text-white hover:bg-indigo-500/10 transition-all">
            Отмена
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            Сохранить
          </button>
        </div>
      </motion.div>
    </div>
  );
}
