"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Monitor,
  Calendar,
  GraduationCap,
  BookOpen,
  Star,
  FileText,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";

const sidebarLinks = [
  { label: "Аналитика", href: "/admin", icon: BarChart3 },
  { label: "Кабинеты", href: "/admin/classrooms", icon: Monitor },
  { label: "Расписание", href: "/admin/schedule", icon: Calendar },
  { label: "Преподаватели", href: "/admin/teachers", icon: GraduationCap },
  { label: "Курсы", href: "/admin/courses", icon: BookOpen },
  { label: "Отзывы", href: "/admin/reviews", icon: Star },
  { label: "Контент", href: "/admin/content", icon: FileText },
  { label: "Объявления", href: "/admin/notifications", icon: Megaphone },
  { label: "Настройки", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 lg:w-72 bg-[#0a0a1a] border-r border-indigo-500/10 z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-indigo-500/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div>
              <span className="font-bold text-white text-lg">Unicorn</span>
              <span className="text-indigo-400 font-bold text-lg">Admin</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/15 to-purple-500/10 text-white font-medium border border-indigo-500/20"
                    : "text-indigo-200/60 hover:text-white hover:bg-indigo-500/10"
                }`}
              >
                <link.icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : ""}`} />
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"
                  />
                )}
              </Link>
            );
          })}

          {/* Logout */}
          <div className="pt-4 mt-4 border-t border-indigo-500/10">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="lg:ml-72 min-h-screen bg-[#0a0a1a]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-indigo-500/10">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-indigo-200/40">
                <span>Unicorn Academy</span>
                <ChevronDown className="w-3 h-3 -rotate-90" />
                <span className="text-indigo-200/80">
                  {sidebarLinks.find((l) => l.href === pathname)?.label || "Панель управления"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-xl hover:bg-indigo-500/10 flex items-center justify-center text-indigo-200 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0a0a1a]" />
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                Н
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
