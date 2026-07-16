"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  ExternalLink,
  Link2,
  Power,
  PowerOff,
  Monitor,
  X,
  Check,
  Users,
} from "lucide-react";

interface Classroom {
  id: number;
  name: string;
  teacher: string;
  topic: string;
  meetLink: string;
  formLink: string;
  schedule: string;
  isActive: boolean;
  studentCount: number;
}

const initialClassrooms: Classroom[] = [
  { id: 1, name: "Английский A1 — Утренняя группа", teacher: "Айгуль К.", topic: "Общий английский (Beginner)", meetLink: "https://meet.google.com/abc-defg-hij", formLink: "https://forms.google.com/attendance-1", schedule: "Пн, Ср, Пт 09:00-10:30", isActive: true, studentCount: 12 },
  { id: 2, name: "Английский A2 — Дневная группа", teacher: "Сергей М.", topic: "Общий английский (Elementary)", meetLink: "https://meet.google.com/klm-nopq-rst", formLink: "https://forms.google.com/attendance-2", schedule: "Пн, Ср 14:00-15:30", isActive: true, studentCount: 8 },
  { id: 3, name: "IELTS Preparation", teacher: "Динара Б.", topic: "IELTS Preparation", meetLink: "https://meet.google.com/uvw-xyz-123", formLink: "https://forms.google.com/attendance-3", schedule: "Вт, Чт, Сб 11:00-12:30", isActive: true, studentCount: 15 },
  { id: 4, name: "Разговорный клуб Intermediate", teacher: "Айгуль К.", topic: "Разговорная практика", meetLink: "https://meet.google.com/456-789-abc", formLink: "https://forms.google.com/attendance-4", schedule: "Сб 15:00-16:30", isActive: false, studentCount: 6 },
  { id: 5, name: "Business English", teacher: "Сергей М.", topic: "Деловой английский", meetLink: "https://meet.google.com/def-ghi-jkl", formLink: "https://forms.google.com/attendance-5", schedule: "Вт, Чт 16:00-17:30", isActive: true, studentCount: 10 },
  { id: 6, name: "Английский B1 — Вечерняя группа", teacher: "Мария Л.", topic: "Общий английский (Intermediate)", meetLink: "https://meet.google.com/mno-pqr-stu", formLink: "https://forms.google.com/attendance-6", schedule: "Пн, Ср, Пт 18:00-19:30", isActive: true, studentCount: 14 },
  { id: 7, name: "IELTS Writing Intensive", teacher: "Динара Б.", topic: "IELTS Writing", meetLink: "https://meet.google.com/vwx-yz0-123", formLink: "https://forms.google.com/attendance-7", schedule: "Пн, Чт 10:00-11:30", isActive: true, studentCount: 9 },
  { id: 8, name: "Английский для детей 8-12 лет", teacher: "Мария Л.", topic: "Kids English", meetLink: "https://meet.google.com/456-def-ghi", formLink: "https://forms.google.com/attendance-8", schedule: "Сб, Вс 10:00-11:00", isActive: true, studentCount: 7 },
  { id: 9, name: "Grammar Booster", teacher: "Айгуль К.", topic: "Грамматика B1-B2", meetLink: "https://meet.google.com/jkl-mno-pqr", formLink: "https://forms.google.com/attendance-9", schedule: "Ср 17:00-18:00", isActive: false, studentCount: 4 },
  { id: 10, name: "Speaking Club Advanced", teacher: "Динара Б.", topic: "Advanced Speaking", meetLink: "https://meet.google.com/stu-vwx-yz0", formLink: "https://forms.google.com/attendance-10", schedule: "Пт 19:00-20:30", isActive: true, studentCount: 11 },
];

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "closed">("all");
  const [editing, setEditing] = useState<Classroom | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = classrooms.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterActive === "all" ||
      (filterActive === "active" && c.isActive) ||
      (filterActive === "closed" && !c.isActive);
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id: number) => {
    setClassrooms((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const updateClassroom = (id: number, data: Partial<Classroom>) => {
    setClassrooms((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    setEditing(null);
  };

  const addClassroom = (data: Classroom) => {
    const newId = Math.max(...classrooms.map((c) => c.id)) + 1;
    setClassrooms((prev) => [...prev, { ...data, id: newId }]);
    setShowAdd(false);
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
          <h1 className="text-2xl font-bold text-white">Кабинеты</h1>
          <p className="text-sm text-indigo-200/40 mt-1">
            Управление Google Meet кабинетами и формами посещаемости
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Добавить кабинет
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-200/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск кабинетов..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#12122a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterActive(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filterActive === f
                  ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                  : "bg-[#12122a] text-indigo-200/40 border border-indigo-500/10 hover:text-indigo-200/60"
              }`}
            >
              {f === "all" ? "Все" : f === "active" ? "Активные" : "Закрытые"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#12122a] border border-indigo-500/10 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-500/10">
                <th className="text-left text-xs text-indigo-200/40 font-medium px-6 py-4">Кабинет</th>
                <th className="text-left text-xs text-indigo-200/40 font-medium px-6 py-4">Преподаватель</th>
                <th className="text-left text-xs text-indigo-200/40 font-medium px-6 py-4">Google Meet</th>
                <th className="text-left text-xs text-indigo-200/40 font-medium px-6 py-4">Форма</th>
                <th className="text-left text-xs text-indigo-200/40 font-medium px-6 py-4">Статус</th>
                <th className="text-left text-xs text-indigo-200/40 font-medium px-6 py-4">Ученики</th>
                <th className="text-right text-xs text-indigo-200/40 font-medium px-6 py-4">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-indigo-500/5 hover:bg-indigo-500/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{c.name}</p>
                        <p className="text-xs text-indigo-200/40">{c.topic}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-indigo-200/80">{c.teacher}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setEditing(c)}
                      className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span className="max-w-[160px] truncate">{c.meetLink}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setEditing(c)}
                      className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span className="max-w-[160px] truncate">{c.formLink}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(c.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        c.isActive
                          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-indigo-200/10 text-indigo-200/40 hover:bg-indigo-200/20"
                      }`}
                    >
                      {c.isActive ? (
                        <Power className="w-3 h-3" />
                      ) : (
                        <PowerOff className="w-3 h-3" />
                      )}
                      {c.isActive ? "Открыт" : "Закрыт"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-indigo-200/60">
                      <Users className="w-3.5 h-3.5" />
                      {c.studentCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setEditing(c)}
                      className="w-8 h-8 rounded-lg hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200/40 hover:text-indigo-300 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Monitor className="w-10 h-10 mx-auto text-indigo-200/20 mb-3" />
                    <p className="text-sm text-indigo-200/40">Кабинеты не найдены</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {editing && (
        <ClassroomModal
          title="Редактировать кабинет"
          classroom={editing}
          onSave={(data) => updateClassroom(editing.id, data)}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Add Modal */}
      {showAdd && (
        <ClassroomModal
          title="Добавить кабинет"
          classroom={{
            id: 0,
            name: "",
            teacher: "",
            topic: "",
            meetLink: "",
            formLink: "",
            schedule: "",
            isActive: true,
            studentCount: 0,
          }}
          onSave={(data) => addClassroom(data as Classroom)}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

function ClassroomModal({
  title,
  classroom,
  onSave,
  onClose,
}: {
  title: string;
  classroom: Classroom;
  onSave: (data: Partial<Classroom>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(classroom);

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
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200/40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Название кабинета</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Преподаватель</label>
              <input
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Тема курса</label>
              <input
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Google Meet ссылка</label>
            <input
              value={form.meetLink}
              onChange={(e) => setForm({ ...form, meetLink: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
            />
          </div>
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Google Form ссылка</label>
            <input
              value={form.formLink}
              onChange={(e) => setForm({ ...form, formLink: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
            />
          </div>
          <div>
            <label className="block text-sm text-indigo-200/60 mb-1.5">Расписание</label>
            <input
              value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-indigo-500/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-indigo-200/60 hover:text-white hover:bg-indigo-500/10 transition-all"
          >
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
