"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export interface PricingPlan {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
  gradient: string;
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Общий английский",
    subtitle: "Для повседневного общения",
    price: "20 000",
    period: "месяц",
    description: "Полный курс английского языка для всех уровней — от начального до продвинутого.",
    features: [
      "8 групповых занятий в месяц",
      "Разговорный клуб с носителем",
      "Домашние задания с проверкой",
      "Доступ к материалам 24/7",
      "Сертификат по окончании",
    ],
    color: "from-indigo-500 to-indigo-600",
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
  },
  {
    name: "IELTS",
    subtitle: "Интенсивная подготовка",
    price: "25 000",
    period: "месяц",
    description: "Целенаправленная подготовка к IELTS с опытными преподавателями и экзаменаторами.",
    features: [
      "12 занятий в месяц",
      "Mock-тесты каждую неделю",
      "Детальный разбор Writing",
      "Speaking simulator с обратной связью",
      "Стратегии для каждой секции",
      "Гарантия результата 6.5+",
    ],
    popular: true,
    color: "from-emerald-500 to-emerald-600",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  {
    name: "Индивидуальные",
    subtitle: "Персональный подход",
    price: "35 000",
    period: "месяц",
    description: "Персональные занятия с преподавателем по индивидуальной программе под ваши цели.",
    features: [
      "Индивидуальный учебный план",
      "Гибкий график занятий",
      "Фокус на ваших слабых местах",
      "Доступ к премиум-материалам",
      "Личный куратор",
    ],
    color: "from-amber-500 to-amber-600",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
];

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  className?: string;
  telegramLink?: string;
}

const TELEGRAM_LINK =
  "https://t.me/Nu_wwx?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20the%20courses%20at%20Unicorn%20Academy.";

export default function PricingSection({
  title = "Выберите свой тариф",
  subtitle = "Прозрачные цены без скрытых платежей",
  plans = defaultPlans,
  className = "",
  telegramLink = TELEGRAM_LINK,
}: PricingSectionProps) {
  return (
    <section id="pricing" className={`py-20 lg:py-28 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold tracking-wider uppercase mb-5 inline-block border border-emerald-500/20">
            Стоимость
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: plan.popular ? -8 : -4 }}
              className={`relative rounded-3xl border transition-all duration-500 ${
                plan.popular
                  ? "border-indigo-500/40 bg-white/80 dark:bg-indigo-950/40 shadow-2xl shadow-indigo-500/20 scale-105 md:scale-105"
                  : "border-white/20 dark:border-indigo-800/30 bg-white/60 dark:bg-indigo-950/20 shadow-xl shadow-black/5 dark:shadow-black/10 hover:shadow-2xl hover:shadow-indigo-500/10"
              } backdrop-blur-xl`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Популярный выбор
                  </span>
                </div>
              )}

              {/* Card content */}
              <div className="p-8 lg:p-10">
                {/* Plan header */}
                <div className="mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.subtitle}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">₸</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">/{plan.period}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-[1.02]"
                      : "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30"
                  }`}
                >
                  Записаться на курс
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          Первый пробный урок — бесплатно. Возможна оплата частями.
        </motion.p>
      </div>
    </section>
  );
}
