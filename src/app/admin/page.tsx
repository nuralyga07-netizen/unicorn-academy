"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, GraduationCap, Star, Megaphone, Settings, LogOut, Menu, X, Bell, Eye, Activity, ChevronRight, BarChart3, MessageSquare, Video, FileText, Shield } from "lucide-react";

const sidebarLinks = [
  { label: "Аналитика", href: "/admin", icon: BarChart3 },
  { label: "Кабинеты", href: "/admin/classrooms", icon: Video },
  { label: "Преподаватели", href: "/admin/teachers", icon: GraduationCap },
  { label: "Ученики", href: "/admin/students", icon: Users },
  { label: "Курсы", href: "/admin/courses", icon: BookOpen },
  { label: "Отзывы", href: "/admin/reviews", icon: Star },
  { label: "Объявления", href: "/admin/notifications", icon: Megaphone },
  { label: "Контент", href: "/admin/content", icon: FileText },
  { label: "Настройки", href: "/admin/settings", icon: Settings },
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const weekData = [45, 52, 38, 65, 72, 48, 30];

const recentStudents = [
  { name: "Азамат К.", time: "10:23", status: "online", device: "Windows" },
  { name: "Мария П.", time: "09:45", status: "online", device: "Mac" },
  { name: "Ержан М.", time: "08:30", status: "offline", device: "iPhone" },
  { name: "Дана Б.", time: "11:12", status: "online", device: "Android" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 lg:w-72 bg-[#0a0a1a] border-r border-indigo-500/10 z-50 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-indigo-500/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="font-semibold text-white">Unicorn<span className="text-indigo-400">Admin</span></span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-indigo-200/60 hover:text-white hover:bg-indigo-500/10 transition-all">
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-indigo-500/10">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="lg:ml-72 min-h-screen bg-[#0a0a1a]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-indigo-500/10">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-10 h-10 rounded-xl hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white hidden sm:block">Аналитика</h1>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-xl hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm">Н</div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Всего посетителей", value: "1,247", icon: Users, change: "+12%" },
              { label: "Сейчас онлайн", value: "8", icon: Activity, change: "+3" },
              { label: "Входов сегодня", value: "64", icon: LogOut, change: "+18%" },
              { label: "Кабинеты активны", value: "7/10", icon: Video, change: "70%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-indigo-200/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">Посещения за неделю</h3>
              <div className="flex items-end justify-between gap-2 h-40">
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
            </div>

            {/* Online students */}
            <div className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4">Активные ученики</h3>
              <div className="space-y-3">
                {recentStudents.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.status === "online" ? "bg-emerald-500" : "bg-indigo-200/20"}`} />
                    <div className="flex-1">
                      <p className="text-sm text-white">{s.name}</p>
                      <p className="text-xs text-indigo-200/40">{s.time} · {s.device}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${s.status === "online" ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-200/10 text-indigo-200/40"}`}>{s.status === "online" ? "Онлайн" : "Офлайн"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4">Быстрые действия</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Создать кабинет", icon: Video, href: "/admin/classrooms" },
                { label: "Добавить преподавателя", icon: GraduationCap, href: "/admin/teachers" },
                { label: "Сделать объявление", icon: Megaphone, href: "/admin/notifications" },
                { label: "Редактировать сайт", icon: FileText, href: "/admin/content" },
              ].map((action) => (
                <Link key={action.label} href={action.href} className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 transition-all border border-indigo-500/10">
                  <action.icon className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm text-white">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
