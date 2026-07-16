"use client";

import { motion } from "framer-motion";
import PricingSection from "@/components/sections/pricing";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  Star,
  Shield,
  MessageCircle,
  ChevronRight,
  Target,
  Award,
  UsersRound,
  Monitor,
  FileCheck,
  MessageSquare,
  Zap,
  Clock,
  BarChart3,
  Send,
  Image,
  Mail,
  MapPin,
  Quote,
} from "lucide-react";

const TELEGRAM_LINK =
  "https://t.me/Nu_wwx?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20the%20courses%20at%20Unicorn%20Academy.";

const stats = [
  { value: "—", label: "Учеников", icon: Users },
  { value: "—", label: "Преподавателей", icon: GraduationCap },
  { value: "—", label: "Уроков", icon: BookOpen },
  { value: "—", label: "На рынке", icon: Award },
];

const trustCards = [
  {
    title: "Опытные преподаватели",
    desc: "Сертифицированные педагоги с международным опытом и подтверждёнными квалификациями",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Небольшие группы",
    desc: "До 12 человек в группе — каждому ученику уделяется максимум внимания",
    icon: UsersRound,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Интерактивные уроки",
    desc: "Современные материалы, видео, игры и real-life задания для погружения в язык",
    icon: Monitor,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "IELTS подготовка",
    desc: "Эксперты с опытом проверки IELTS, mock-тесты и разбор стратегий",
    icon: Target,
    gradient: "from-purple-500 to-violet-600",
  },
  {
    title: "Персональная обратная связь",
    desc: "Детальный разбор ошибок и рекомендации от преподавателя после каждого урока",
    icon: MessageSquare,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "Живые онлайн-занятия",
    desc: "Занятия в реальном времени в Google Meet с возможностью задать вопрос",
    icon: Zap,
    gradient: "from-cyan-500 to-sky-600",
  },
  {
    title: "Домашние задания",
    desc: "Интерактивные задания с автоматической и ручной проверкой",
    icon: FileCheck,
    gradient: "from-indigo-500 to-emerald-600",
  },
  {
    title: "Отслеживание прогресса",
    desc: "Прозрачная статистика успеваемости в личном кабинете",
    icon: BarChart3,
    gradient: "from-emerald-500 to-indigo-600",
  },
];

// Teachers removed — real teachers will be added from the database

const reviewsData = [
  {
    name: "Азамат К.",
    role: "IELTS 7.5",
    text: "Готовился к IELTS 3 месяца, сдал на 7.5! Преподаватели настоящие профессионалы. Отдельное спасибо за интенсивные mock-тесты — они реально готовят к формату экзамена.",
    rating: 5,
    avatar: "АК",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    name: "Мария С.",
    role: "Общий английский A2 → B1",
    text: "Очень удобная платформа, всё понятно. Английский подтянула за 2 месяца с нуля до уверенного A2. Групповые занятия оказались даже эффективнее индивидуальных!",
    rating: 5,
    avatar: "МС",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Ержан М.",
    role: "Business English",
    text: "Индивидуальные занятия — лучшее решение для занятых людей. Гибкий график, отличный преподаватель и реально видимый прогресс. Коллеги заметили улучшение моего английского.",
    rating: 5,
    avatar: "ЕМ",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Дана Б.",
    role: "Общий английский B1 → B2",
    text: "Занимаюсь уже полгода — результат превзошёл ожидания. Разговорный клуб с носителем языка отдельный восторг! Очень дружелюбная атмосфера и профессиональный подход.",
    rating: 5,
    avatar: "ДБ",
    gradient: "from-purple-500 to-violet-600",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#0a0a1a] to-emerald-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.35),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(79,70,229,0.1),transparent_50%)]" />

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-emerald-500/8 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-indigo-400/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 max-w-3xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-indigo-300 mb-8"
              >
                <Star className="w-4 h-4 fill-indigo-400" />
                <span>Премиальная онлайн-академия английского языка</span>
              </motion.div>

              {/* Main heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight">
                Unicorn
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
                  Academy
                </span>
              </h1>

              <p className="mt-6 text-xl sm:text-2xl text-white/50 max-w-xl leading-relaxed">
                Премиальная онлайн-академия английского языка с индивидуальным подходом.
                IELTS, общий английский, разговорный клуб.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-semibold hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 text-lg"
                >
                  Начать учиться
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 font-medium hover:bg-white/10 hover:text-white transition-all text-lg"
                >
                  <Send className="w-5 h-5" />
                  Связаться с нами
                </a>
              </div>

              {/* Trust markers */}
              <div className="mt-12 flex flex-wrap items-center gap-6">
                {[
                  { icon: Shield, text: "Гос. лицензия" },
                  { icon: Users, text: "500+ учеников" },
                  { icon: Award, text: "5 лет опыта" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-white/40 text-sm">
                    <item.icon className="w-4 h-4 text-emerald-400" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero visual right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block flex-1 max-w-md"
            >
              <div className="relative">
                {/* Glass card */}
                <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl">
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                    <span className="text-white text-2xl font-bold">5.0</span>
                  </div>
                  <Star className="w-8 h-8 text-amber-400 fill-amber-400 mb-4" />
                  <p className="text-white/80 text-lg leading-relaxed">
                    "Лучшая академия английского в Казахстане! Готовился к IELTS, результат — 7.5 за 3 месяца."
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      АК
                    </div>
                    <div>
                      <p className="text-white font-semibold">Азамат К.</p>
                      <p className="text-white/40 text-sm">IELTS 7.5</p>
                    </div>
                  </div>
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">500+</div>
                      <div className="text-white/40 text-xs">довольных учеников</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS BAR */}
      {/* ============================================ */}
      <section className="py-16 -mt-14 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/40 backdrop-blur-xl shadow-xl p-6 lg:p-8 text-center group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST / WHY US SECTION */}
      {/* ============================================ */}
      <section id="why-us" className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(79,70,229,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(16,185,129,0.03),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-semibold tracking-wider uppercase mb-5 inline-block border border-indigo-500/20">
              Почему мы
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Почему{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Unicorn Academy
              </span>
              ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Мы объединили лучшие методики преподавания, современных преподавателей и удобную
              платформу для максимального результата
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {trustCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/60 dark:bg-indigo-950/20 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 lg:p-7 overflow-hidden"
              >
                {/* Gradient hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING SECTION (component) */}
      {/* ============================================ */}
      <PricingSection />

      {/* ============================================ */}
      {/* REVIEWS SECTION */}
      {/* ============================================ */}
      <section id="reviews" className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.03),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-semibold tracking-wider uppercase mb-5 inline-block border border-indigo-500/20">
              Отзывы
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Что говорят ученики
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Более 500 учеников уже достигли своих целей с нами
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {reviewsData.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xl p-6 lg:p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-indigo-500/20 dark:text-indigo-500/10 absolute top-6 right-6" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  "{r.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-indigo-500/10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================ */}
      <section id="contact" className="py-20 lg:py-28 relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(79,70,229,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(16,185,129,0.03),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-semibold tracking-wider uppercase mb-5 inline-block border border-indigo-500/20">
              Контакты
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Свяжитесь с нами
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Мы всегда на связи и готовы ответить на ваши вопросы
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-2xl mx-auto">
            {/* Telegram */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 p-6 flex items-center gap-4 hover:bg-sky-500/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Send className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Telegram</h3>
                <p className="text-sm text-muted-foreground">@Nu_wwx</p>
                <p className="text-xs text-sky-500 font-medium mt-0.5">Написать →</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-emerald-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.15),transparent_50%)]" />

        {/* Animated orbs */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-emerald-400/10 blur-3xl animate-pulse-glow" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-20 h-20 text-white/30 mx-auto mb-8" />

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Начните сегодня
            </h2>
            <p className="mt-6 text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed">
              Первое занятие — бесплатно. Запишитесь на пробный урок и убедитесь в качестве
              преподавания лично. Никаких обязательств, только результат.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-white text-indigo-900 font-bold hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-white/30 hover:scale-105 text-lg"
              >
                Записаться на пробный
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/20 transition-all text-lg"
              >
                <Send className="w-5 h-5" />
                Задать вопрос
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/40">
              {[
                "Без регистрации",
                "Без оплаты",
                "30 минут с преподавателем",
                "Определение уровня",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
