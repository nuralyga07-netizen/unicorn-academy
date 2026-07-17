"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Mail,
  Send,
  MessageCircle,
  Image,
  Globe,
  ChevronRight,
} from "lucide-react";

const TELEGRAM_LINK =
  "https://t.me/Nu_wwx?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20the%20courses%20at%20Unicorn%20Academy.";

const contactInfo = [
  {
    icon: Send,
    label: "Telegram",
    value: "@Nu_wwx",
    href: TELEGRAM_LINK,
    color: "bg-sky-500/10 text-sky-500",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+7 700 123 45 67",
    href: "https://wa.me/77001234567",
    color: "bg-emerald-500/10 text-emerald-500",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Globe,
    label: "Instagram",
    value: "—",
    href: "#",
    color: "bg-pink-500/10 text-pink-500",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: "—",
    href: "#",
    color: "bg-indigo-500/10 text-indigo-500",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Алматы, ул. Абая, 52\nБЦ «Almaty Towers», 5 этаж",
    href: null,
    color: "bg-amber-500/10 text-amber-500",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "Пн–Сб: 09:00 – 21:00\nВс: Выходной",
    href: null,
    color: "bg-purple-500/10 text-purple-500",
    gradient: "from-purple-500 to-violet-600",
  },
];

const faqData = [
  {
    question: "Как записаться на пробный урок?",
    answer:
      "Напишите нам в Telegram или WhatsApp, и мы подберём удобное время для бесплатного пробного занятия.",
  },
  {
    question: "Есть ли рассрочка?",
    answer:
      "Да, мы предлагаем беспроцентную рассрочку на 3, 6 или 12 месяцев. Подробности уточняйте у менеджера.",
  },
  {
    question: "Как проходят занятия?",
    answer:
      "Все занятия проходят онлайн в Google Meet. Вы получаете ссылку на кабинет и доступ к учебным материалам.",
  },
  {
    question: "Можно ли перенести занятие?",
    answer:
      "Да, вы можете перенести занятие за 4 часа до начала без штрафов. Пропуски без предупреждения сгорают.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-400 mb-6"
            >
              <Send className="w-4 h-4" />
              <span>Свяжитесь с нами</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Мы на связи
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Есть вопросы? Напишите нам — и мы поможем подобрать идеальный курс английского для вас
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                variants={itemVariants}
                className="group relative rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/70 dark:bg-indigo-950/30 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 lg:p-8"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${info.color} flex items-center justify-center mb-5`}
                >
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{info.label}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 group/link"
                  >
                    <span className="whitespace-pre-line">{info.value}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                  </a>
                ) : (
                  <p className="text-muted-foreground whitespace-pre-line">{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-emerald-700 p-10 lg:p-16 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.2),transparent_50%)]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Начните сегодня
                </h2>
                <p className="text-indigo-200 text-lg max-w-xl">
                  Первый пробный урок — бесплатно. Запишитесь прямо сейчас!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-semibold hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  Написать в Telegram
                </a>
                <a
                  href="https://wa.me/77001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all shadow-2xl hover:shadow-emerald-500/25 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Написать в WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-semibold tracking-wider uppercase mb-5 inline-block border border-indigo-500/20">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Часто задаваемые вопросы
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <motion.details
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-white/20 dark:border-indigo-800/30 bg-white/60 dark:bg-indigo-950/20 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/10 overflow-hidden transition-all duration-300"
              >
                <summary className="flex items-center justify-between p-5 lg:p-6 cursor-pointer list-none hover:bg-white/20 dark:hover:bg-indigo-950/30 transition-colors">
                  <span className="font-semibold text-base pr-4">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-indigo-500 shrink-0 transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
