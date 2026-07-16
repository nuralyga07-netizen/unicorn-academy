import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { GraduationCap, Mail, Phone, MapPin, Send, MessageCircle, Globe } from 'lucide-react';

// ============================================================
// Footer component
// ============================================================

const footerLinks = {
  academy: {
    title: 'Академия',
    links: [
      { label: 'О нас', href: '/' },
      { label: 'Курсы', href: '/#courses' },
      { label: 'Кабинеты', href: '/classrooms' },
      { label: 'Контакты', href: '/contact' },
    ],
  },
  support: {
    title: 'Поддержка',
    links: [
      { label: 'Контакты', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Помощь', href: '/help' },
      { label: 'Политика конфиденциальности', href: '/privacy' },
      { label: 'Условия использования', href: '/terms' },
    ],
  },
} as const;

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/Nu_wwx', icon: Send },
  { label: 'WhatsApp', href: 'https://wa.me/77000000000', icon: MessageCircle },
  { label: 'Instagram', href: '#', icon: Globe },
  { label: 'Email', href: 'mailto:hello@unicorn-academy.kz', icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-indigo-600/10 dark:border-indigo-800/20 bg-white/50 dark:bg-indigo-950/30 backdrop-blur-xl">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="content-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-5">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Unicorn Academy — На главную"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Unicorn
                <span className="text-indigo-600 dark:text-indigo-400 ml-1">
                  Academy
                </span>
              </span>
            </Link>

            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              Международная онлайн-академия с&nbsp;премиальными курсами от&nbsp;ведущих преподавателей.
              Учитесь в&nbsp;любое время, в&nbsp;любом месте.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-indigo-500 shrink-0" />
                <a
                  href="mailto:hello@unicornacademy.com"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  hello@unicornacademy.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-indigo-500 shrink-0" />
                <a
                  href="tel:+78001234567"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  8 (800) 123-45-67
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  Онлайн по всему Казахстану
                </span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Мы в соцсетях
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium',
                      'bg-indigo-600/5 text-gray-700 dark:text-gray-300',
                      'hover:bg-indigo-600/15 hover:text-indigo-600 dark:hover:text-indigo-400',
                      'border border-indigo-600/10 dark:border-indigo-800/30',
                      'transition-all duration-200',
                    )}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200/30 dark:border-indigo-800/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <p>© {currentYear} Unicorn Academy. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
