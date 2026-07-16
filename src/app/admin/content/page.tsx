"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Image, Edit3, Type, BarChart3 } from "lucide-react";

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  stats: { label: string; value: string }[];
  bannerUrl: string;
}

const initialContent: SiteContent = {
  heroTitle: "Премиальная онлайн-академия английского языка",
  heroSubtitle: "Изучайте английский с лучшими преподавателями. IELTS, общий английский, индивидуальные занятия и разговорные клубы.",
  aboutText: "Unicorn Academy — это современная образовательная платформа, объединяющая лучших преподавателей и инновационные методики обучения. Мы специализируемся на подготовке к IELTS, общем английском для всех уровней, бизнес-английском и индивидуальных программах.\n\nНаша миссия — сделать качественное образование доступным каждому. За 5 лет работы мы обучили более 500 студентов, многие из которых успешно сдали IELTS на желаемый балл и достигли своих языковых целей.\n\nМы используем коммуникативную методику, современные интерактивные материалы и регулярно обновляем программу в соответствии с международными стандартами.",
  stats: [
    { label: "Студентов", value: "500+" },
    { label: "Преподавателей", value: "12" },
    { label: "Курсов", value: "8" },
    { label: "Средний балл IELTS", value: "6.8" },
  ],
  bannerUrl: "",
};

export default function ContentPage() {
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(false);
  const [editingBanner, setEditingBanner] = useState(false);
  const [editingStats, setEditingStats] = useState(false);
  const [statsEdit, setStatsEdit] = useState(content.stats);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveStats = () => {
    setContent({ ...content, stats: statsEdit });
    setEditingStats(false);
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
          <h1 className="text-2xl font-bold text-white">Контент сайта</h1>
          <p className="text-sm text-indigo-200/40 mt-1">
            Редактирование содержимого главной страницы
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
        >
          <Save className="w-4 h-4" />
          {saved ? "Сохранено!" : "Сохранить все"}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-white">Hero — Заголовок и подзаголовок</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Заголовок</label>
              <textarea
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Подзаголовок</label>
              <textarea
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30 resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Image className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-white">Баннер</h3>
          </div>
          {content.bannerUrl ? (
            <div className="relative group">
              <img
                src={content.bannerUrl}
                alt="Banner"
                className="w-full h-40 object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <button
                onClick={() => setEditingBanner(true)}
                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/50 hover:bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => setEditingBanner(true)}
              className="w-full h-40 rounded-xl border-2 border-dashed border-indigo-500/20 hover:border-indigo-500/30 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Image className="w-8 h-8 text-indigo-200/30" />
              <span className="text-sm text-indigo-200/40">Загрузить баннер</span>
            </div>
          )}
          {editingBanner && (
            <div className="mt-3">
              <input
                value={content.bannerUrl}
                onChange={(e) => setContent({ ...content, bannerUrl: e.target.value })}
                placeholder="Введите URL изображения баннера"
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm placeholder:text-indigo-200/30 focus:outline-none focus:border-indigo-500/30"
              />
              <button
                onClick={() => setEditingBanner(false)}
                className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
              >
                Готово
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* About Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Edit3 className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-white">Текст «О нас»</h3>
        </div>
        <textarea
          value={content.aboutText}
          onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30 resize-none"
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-white">Статистика на главной</h3>
          </div>
          <button
            onClick={() => {
              setEditingStats(!editingStats);
              setStatsEdit(content.stats);
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300"
          >
            {editingStats ? "Отмена" : "Редактировать"}
          </button>
        </div>
        {editingStats ? (
          <div className="space-y-3">
            {statsEdit.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    value={s.label}
                    onChange={(e) => {
                      const newStats = [...statsEdit];
                      newStats[i] = { ...newStats[i], label: e.target.value };
                      setStatsEdit(newStats);
                    }}
                    className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
                  />
                </div>
                <div className="w-32">
                  <input
                    value={s.value}
                    onChange={(e) => {
                      const newStats = [...statsEdit];
                      newStats[i] = { ...newStats[i], value: e.target.value };
                      setStatsEdit(newStats);
                    }}
                    className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
                  />
                </div>
                <button
                  onClick={() => setStatsEdit(statsEdit.filter((_, j) => j !== i))}
                  className="text-red-400/60 hover:text-red-400 text-sm"
                >
                  Удалить
                </button>
              </div>
            ))}
            <div className="flex gap-3">
              <button
                onClick={() => setStatsEdit([...statsEdit, { label: "", value: "" }])}
                className="px-4 py-2 rounded-xl text-sm text-indigo-400 hover:bg-indigo-500/10 transition-all"
              >
                + Добавить статистику
              </button>
              <button
                onClick={saveStats}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium"
              >
                Сохранить статистику
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {content.stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#0a0a1a] border border-indigo-500/10 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-indigo-200/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Preview hint */}
      <div className="text-center text-xs text-indigo-200/30">
        Все изменения сохраняются локально. Для публикации нажмите «Сохранить все».
      </div>
    </div>
  );
}
