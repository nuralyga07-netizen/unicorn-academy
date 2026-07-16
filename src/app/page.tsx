"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, BookOpen, Users, Star, Shield, MessageCircle, ChevronRight, Target, Award } from "lucide-react";

const courses = [
  { name: "Общий английский", level: "A1 → C2", price: "45 000 ₸", period: "месяц", desc: "Полный курс английского для всех уровней. Разговорная практика, грамматика, аудирование.", color: "from-indigo-500 to-indigo-600", features: ["8 занятий в месяц", "Разговорный клуб", "Домашние задания", "Сертификат"] },
  { name: "IELTS", level: "5.5 → 8.0+", price: "60 000 ₸", period: "месяц", desc: "Интенсивная подготовка к IELTS. Все секции: Reading, Listening, Writing, Speaking.", color: "from-emerald-500 to-emerald-600", features: ["12 занятий в месяц", "Mock-тесты еженедельно", "Проверка Writing", "Speaking simulator"] },
  { name: "Индивидуальные", level: "Любой уровень", price: "8 000 ₸", period: "час", desc: "Персональные занятия с преподавателем. Программа под ваши цели и график.", color: "from-amber-500 to-amber-600", features: ["Гибкий график", "Личный план", "Фокус на слабых местах", "Онлайн-доска"] },
];

const teachers = [
  { name: "Айгерим Нурланова", subject: "IELTS Expert", ielts: "8.5", bio: "Сертифицированный экзаменатор IELTS, 10 лет опыта", avatar: "АН" },
  { name: "Michael Johnson", subject: "Native Speaker", ielts: "—", bio: "Носитель языка из Великобритании, 7 лет преподавания", avatar: "MJ" },
  { name: "Диана Сабитова", subject: "General English", ielts: "8.0", bio: "Магистр лингвистики, специалист по разговорному английскому", avatar: "ДС" },
];

const stats = [
  { value: "500+", label: "Учеников", icon: Users },
  { value: "15", label: "Преподавателей", icon: GraduationCap },
  { value: "1000+", label: "Уроков", icon: BookOpen },
  { value: "5 лет", label: "На рынке", icon: Award },
];

const reviewsData = [
  { name: "Азамат К.", text: "Готовился к IELTS 3 месяца, сдал на 7.5! Преподаватели настоящие профессионалы.", rating: 5 },
  { name: "Мария С.", text: "Очень удобная платформа, всё понятно. Английский подтянула за 2 месяца.", rating: 5 },
  { name: "Ержан М.", text: "Индивидуальные занятия — лучшее решение для занятых. Гибкий график и отличный преподаватель.", rating: 5 },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl animate-pulse-glow" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-300 mb-6">
              <Star className="w-4 h-4 fill-indigo-400" />
              <span>Премиальная онлайн-академия английского языка</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Английский для{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
                жизни и успеха
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl">
              Премиальная онлайн-академия с индивидуальным подходом. IELTS, общий английский, 
              разговорный клуб. Учитесь у лучших преподавателей.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-semibold hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-indigo-500/25">
                Начать учиться
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/#courses" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl glass text-white/80 font-medium hover:bg-white/10 transition-all">
                Наши курсы
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 text-center">
                <stat.icon className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-medium mb-4 inline-block">Наши курсы</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Выберите свой путь</h2>
            <p className="mt-4 text-muted-foreground">Каждый курс разработан экспертами для максимального результата</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div key={course.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="glass-card rounded-3xl overflow-hidden group">
                <div className={`bg-gradient-to-br ${course.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-80">{course.level}</span>
                    <span className="bg-white/20 rounded-lg px-3 py-1 text-xs font-medium">{course.price}<span className="opacity-70">/{course.period}</span></span>
                  </div>
                  <h3 className="text-2xl font-bold">{course.name}</h3>
                  <p className="text-sm opacity-80 mt-1">{course.desc}</p>
                </div>
                <div className="p-6 space-y-4">
                  <ul className="space-y-2">
                    {course.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block text-center py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-all">
                    Записаться
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium mb-4 inline-block">Преподаватели</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Лучшие из лучших</h2>
            <p className="mt-4 text-muted-foreground">Сертифицированные преподаватели с международным опытом</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teachers.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-8 text-center group hover:-translate-y-1 transition-all">
                <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {t.avatar}
                </div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-indigo-500 font-medium">{t.subject}</p>
                {t.ielts !== "—" && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium mt-2">
                    <Target className="w-3 h-3" /> IELTS {t.ielts}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-3">{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-medium mb-4 inline-block">Отзывы</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Что говорят ученики</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsData.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({length: r.rating}).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{r.text}"</p>
                <p className="font-medium mt-4 text-sm">{r.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.15),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GraduationCap className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Начните сегодня</h2>
            <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">Первое занятие — бесплатно. Запишитесь на пробный урок и убедитесь в качестве.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-semibold hover:bg-indigo-50 transition-all shadow-2xl">
                Записаться на пробный
              </Link>
              <Link href="/#courses" className="inline-flex items-center px-8 py-4 rounded-2xl glass text-white/80 font-medium hover:bg-white/10 transition-all">
                Смотреть курсы
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
