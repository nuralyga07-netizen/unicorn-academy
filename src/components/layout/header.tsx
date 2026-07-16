'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';

// ============================================================
// Navigation links
// ============================================================

const navLinks = [
  { href: '/courses', label: 'Курсы' },
  { href: '/teachers', label: 'Преподаватели' },
  { href: '/about', label: 'О нас' },
  { href: '/contact', label: 'Контакты' },
] as const;

// ============================================================
// Header component
// ============================================================

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'glass-strong py-3 shadow-lg'
          : 'bg-transparent py-4',
      )}
    >
      <div className="content-container flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Unicorn Academy — На главную"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/50">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="hidden sm:block text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Unicorn
            <span className="text-indigo-600 dark:text-indigo-400 ml-1">
              Academy
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 rounded-xl text-base font-medium transition-all duration-200',
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-600/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-600/5',
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right section: Theme toggle + Auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-indigo-600/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Auth buttons — desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Войти</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/register">Регистрация</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 dark:text-gray-400 hover:bg-indigo-600/10 transition-all duration-200"
            aria-label="Открыть меню"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ============================================ */}
      {/* Mobile navigation overlay */}
      {/* ============================================ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-strong animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-200/30 dark:border-indigo-800/30">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Меню
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-indigo-600/10 transition-all duration-200"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-4 space-y-1" aria-label="Мобильная навигация">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-600/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-600/5',
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-gray-200/30 dark:border-indigo-800/30 p-4 space-y-3">
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link href="/login">Войти</Link>
              </Button>
              <Button variant="primary" className="w-full justify-center" asChild>
                <Link href="/register">Регистрация</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
