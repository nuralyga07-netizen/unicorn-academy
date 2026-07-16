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

const recentStudents = [
  { name: "Азамат К.", time: "10:23", status: "online", device: "Windows" },
  { name: "Мария П.", time: "09:45", status: "online", device: "Mac" },
  { name: "Ержан М.", time: "08:30", status: "offline", device: "iPhone" },
  { name: "Дана Б.", time: "11:12", status: "online", device: "Android" },
];

const stats = [
  { label: "Всего посетителей", value: "1,247", icon: Users, change: "+12%" },
  { label: "Сейчас онлайн", value: "8", icon: Activity, change: "+3" },
  { label: "Входов сегодня", value: "64", icon: LogOut, change: "+18%" },
  { label: "Кабинеты активны", value: "7/10", icon: Video, change: "70%" },
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

        {/* Online students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <h3 className="font-semibold text-white mb-4">Активные ученики</h3>
          <div className="space-y-4">
            {recentStudents.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    s.status === "online" ? "bg-emerald-500" : "bg-indigo-200/20"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-white">{s.name}</p>
                  <p className="text-xs text-indigo-200/40">
                    {s.time} · {s.device}
                  </p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    s.status === "online"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-indigo-200/10 text-indigo-200/40"
                  }`}
                >
                  {s.status === "online" ? "Онлайн" : "Офлайн"}
                </span>
              </div>
            ))}
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
