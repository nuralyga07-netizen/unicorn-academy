"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Globe,
  Bell,
  Shield,
  Database,
  Palette,
  Mail,
  Smartphone,
  Link2,
  User,
  Building2,
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Unicorn Academy",
    siteUrl: "https://unicorn-academy.kz",
    email: "info@unicorn-academy.kz",
    phone: "+7 (700) 123-45-67",
    address: "г. Алматы, ул. Абая 123",
    telegram: "@unicorn_academy",
    instagram: "@unicorn_academy",
    timezone: "Asia/Almaty",
    language: "ru",
    notificationsEnabled: true,
    autoApproveReviews: false,
    maintenanceMode: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Настройки</h1>
          <p className="text-sm text-indigo-200/40 mt-1">
            Управление настройками платформы
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
        >
          <Save className="w-4 h-4" />
          {saved ? "Сохранено!" : "Сохранить"}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Основная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-white">Основная информация</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Название сайта</label>
              <input
                value={settings.siteName}
                onChange={(e) => updateField("siteName", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">URL сайта</label>
              <input
                value={settings.siteUrl}
                onChange={(e) => updateField("siteUrl", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-indigo-200/60 mb-1.5">Email</label>
                <input
                  value={settings.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
                />
              </div>
              <div>
                <label className="block text-sm text-indigo-200/60 mb-1.5">Телефон</label>
                <input
                  value={settings.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Адрес</label>
              <input
                value={settings.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
          </div>
        </motion.div>

        {/* Социальные сети */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Link2 className="w-4 h-4 text-indigo-400" />
            <h3 className="font-semibold text-white">Социальные сети</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Telegram</label>
              <input
                value={settings.telegram}
                onChange={(e) => updateField("telegram", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Instagram</label>
              <input
                value={settings.instagram}
                onChange={(e) => updateField("instagram", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Часовой пояс</label>
              <select
                value={settings.timezone}
                onChange={(e) => updateField("timezone", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              >
                <option value="Asia/Almaty">Asia/Almaty (UTC+5)</option>
                <option value="Asia/Astana">Asia/Astana (UTC+5)</option>
                <option value="Asia/Tashkent">Asia/Tashkent (UTC+5)</option>
                <option value="Europe/Moscow">Europe/Moscow (UTC+3)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-indigo-200/60 mb-1.5">Язык интерфейса</label>
              <select
                value={settings.language}
                onChange={(e) => updateField("language", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10 text-white text-sm focus:outline-none focus:border-indigo-500/30"
              >
                <option value="ru">Русский</option>
                <option value="kk">Қазақша</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Настройки системы */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-[#12122a] border border-indigo-500/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-white">Настройки системы</h3>
        </div>
        <div className="space-y-4">
          {[
            {
              icon: Bell,
              label: "Email уведомления",
              desc: "Получать уведомления о новых отзывах и заявках",
              field: "notificationsEnabled",
            },
            {
              icon: Database,
              label: "Авто-одобрение отзывов",
              desc: "Автоматически одобрять отзывы с рейтингом 4+",
              field: "autoApproveReviews",
            },
            {
              icon: Smartphone,
              label: "Режим обслуживания",
              desc: "Включить режим технического обслуживания сайта",
              field: "maintenanceMode",
            },
          ].map((item) => (
            <div
              key={item.field}
              className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a1a] border border-indigo-500/10"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-white font-medium">{item.label}</p>
                  <p className="text-xs text-indigo-200/40">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  updateField(item.field, !settings[item.field as keyof typeof settings])
                }
                className={`relative w-12 h-6 rounded-full transition-all ${
                  settings[item.field as keyof typeof settings]
                    ? "bg-indigo-500"
                    : "bg-indigo-200/20"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    settings[item.field as keyof typeof settings]
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
