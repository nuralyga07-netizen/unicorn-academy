"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Activity,
  LogOut,
  Video,
  GraduationCap,
  Megaphone,
  FileText,
  BarChart3,
} from "lucide-react";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const weekData = [45, 52, 38, 65, 72, 48, 30];

const stats = [
  { label: "Всего посетителей", value: "—", icon: Users, change: "—" },
  { label: "Сейчас онлайн", value: "—", icon: Activity, change: "—" },
  { label: "Входов сегодня", value: "—", icon: LogOut, change: "—" },
  { label: "Кабинеты активны", value: "—", icon: Video, change: "—" },
];

const quickActions = [
  { label: "Создать кабинет", icon: Video, href: "/admin/classrooms" },
  { label: "Добавить преподавателя", icon: GraduationCap, href: "/admin/teachers" },
  { label: "Сделать объявление", icon: Megaphone, href: "/admin/notifications" },
  { label: "Редактировать сайт", icon: FileText, href: "/admin/content" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-5 hover:border-indigo-500/20 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-xs text-emerald-400 font-medium">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-indigo-200/40 mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2 bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Посещения за неделю</h3>
            <div className="flex items-center gap-2 text-xs text-indigo-200/40">
              <BarChart3 className="w-4 h-4" />
              <span>За последние 7 дней</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-44">
            {weekData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-indigo-200/40">{v}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / 80) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="w-full rounded-lg bg-gradient-to-t from-indigo-500 to-indigo-400 max-w-[32px]"
                />
                <span className="text-xs text-indigo-200/40">{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Online students — placeholder for live data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <h3 className="font-semibold text-white mb-4">Активные ученики</h3>
          <div className="flex flex-col items-center justify-center py-8 text-indigo-200/20">
            <Users className="w-12 h-12 mb-3" />
            <p className="text-sm text-indigo-200/40">Нет данных</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
      >
        <h3 className="font-semibold text-white mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 transition-all border border-indigo-500/10 group"
            >
              <action.icon className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-white">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
