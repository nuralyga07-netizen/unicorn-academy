"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Megaphone,
  Send,
  Calendar,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle,
  AlertOctagon,
  X,
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  text: string;
  type: "info" | "warning" | "success" | "urgent";
  date: string;
  publishDate: string;
  published: boolean;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Новый курс Business English",
    text: "Запускаем новый курс делового английского! Старт 1 апреля. Специальная цена для первых 10 студентов.",
    type: "info",
    date: "2024-03-15",
    publishDate: "2024-03-20",
    published: true,
  },
  {
    id: 2,
    title: "Изменение в расписании",
    text: "Уважаемые студенты! С понедельника 18 марта изменится расписание утренней группы A1. Просьба проверить обновленное расписание в кабинете.",
    type: "warning",
    date: "2024-03-14",
    publishDate: "2024-03-14",
    published: true,
  },
  {
    id: 3,
    title: "IELTS Mock Exam",
    text: "Запись на пробный IELTS экзамен открыта! 25 марта в 10:00. Количество мест ограничено.",
    type: "success",
    date: "2024-03-13",
    publishDate: "2024-03-18",
    published: false,
  },
  {
    id: 4,
    title: "Технические работы",
    text: "В субботу 16 марта с 2:00 до 4:00 будут проводиться технические работы на платформе. Возможны временные перебои в доступе.",
    type: "urgent",
    date: "2024-03-12",
    publishDate: "2024-03-15",
    published: true,
  },
  {
    id: 5,
    title: "Розыгрыш 1 месяц бесплатного обучения",
    text: "Делитесь отзывом о нас в Instagram с хештегом #UnicornAcademy и выиграйте месяц бесплатного обучения!",
    type: "success",
    date: "2024-03-11",
    publishDate: "2024-03-25",
    published: false,
  },
];

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  urgent: AlertOctagon,
};

const typeColors = {
  info: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  urgent: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function NotificationsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showCreate, setShowCreate] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    text: "",
    type: "info" as Announcement["type"],
    publishDate: "",
  });

  const createAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.text) return;
    const id = Math.max(...announcements.map((a) => a.id), 0) + 1;
    const today = new Date().toISOString().split("T")[0];
    setAnnouncements((prev) => [
      {
        id,
        title: newAnnouncement.title,
        text: newAnnouncement.text,
        type: newAnnouncement.type,
        date: today,
        publishDate: newAnnouncement.publishDate || today,
        published: false,
      },
      ...prev,
    ]);
    setNewAnnouncement({ title: "", text: "", type: "info", publishDate: "" });
    setShowCreate(false);
  };

  const togglePublished = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, published: !a.published } : a))
    );
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const publishedCount = announcements.filter((a) => a.published).length;
  const draftCount = announcements.filter((a) => !a.published).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Объявления</h1>
          <p className="text-sm text-indigo-200/40 mt-1">
            Создание и управление объявлениями для учеников
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Создать объявление
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-4"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12122a] border border-indigo-500/10">
          <Megaphone className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-white font-medium">{announcements.length}</span>
          <span className="text-sm text-indigo-200/40">всего</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">{publishedCount}</span>
          <span className="text-sm text-emerald-400/60">опубликовано</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-amber-400 font-medium">{draftCount}</span>
          <span className="text-sm text-amber-400/60">черновиков</span>
        </div>
      </motion.div>

      {/* Create form */}
      {showCreate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">Новое объявление</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Заголовок</label>
              <input
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Текст объявления</label>
              <textarea
                value={newAnnouncement.text}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, text: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-indigo-200/60 mb-1.5">Тип</label>
                <select
                  value={newAnnouncement.type}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, type: e.target.value as Announcement["type"] })
                  }
                  className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
                >
                  <option value="info">Информация</option>
                  <option value="warning">Предупреждение</option>
                  <option value="success">Акция/Событие</option>
                  <option value="urgent">Срочно</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-indigo-200/60 mb-1.5">Дата публикации</label>
                <input
                  type="date"
                  value={newAnnouncement.publishDate}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, publishDate: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-xl text-sm text-indigo-200/60 hover:text-white hover:bg-indigo-500/10 transition-all"
            >
              Отмена
            </button>
            <button
              onClick={createAnnouncement}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium"
            >
              <Send className="w-4 h-4" />
              Создать
            </button>
          </div>
        </motion.div>
      )}

      {/* Announcements List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        {announcements.map((a, i) => {
          const TypeIcon = typeIcons[a.type];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`bg-[#12122a] border rounded-2xl p-5 transition-all ${
                a.published ? "border-indigo-500/10" : "border-amber-500/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[a.type]}`}
                >
                  <TypeIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-white font-semibold">{a.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-indigo-200/40">{a.date}</span>
                        <span className="text-xs text-indigo-200/20">·</span>
                        <Calendar className="w-3 h-3 text-indigo-400" />
                        <span className="text-xs text-indigo-200/40">
                          Публикация: {a.publishDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => togglePublished(a.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          a.published
                            ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            : "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                        }`}
                      >
                        {a.published ? "Опубликовано" : "Черновик"}
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(a.id)}
                        className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-red-400/40 hover:text-red-400 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-200/60 mt-2">{a.text}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
        {announcements.length === 0 && (
          <div className="text-center py-16">
            <Megaphone className="w-12 h-12 mx-auto text-indigo-200/20 mb-3" />
            <p className="text-sm text-indigo-200/40">Нет объявлений</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 text-sm text-indigo-400 hover:text-indigo-300"
            >
              Создать первое объявление
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
