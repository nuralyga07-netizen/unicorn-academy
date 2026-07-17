"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Eye,
  EyeOff,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface Review {
  id: number;
  name: string;
  course: string;
  rating: number;
  text: string;
  date: string;
  status: "pending" | "approved" | "rejected" | "hidden";
}

const initialReviews: Review[] = [];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filtered = reviews.filter((r) => filter === "all" || r.status === filter);
  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  const updateStatus = (id: number, status: Review["status"]) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Отзывы</h1>
          <p className="text-sm text-indigo-200/40 mt-1">
            Модерация отзывов учеников
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">{pendingCount} на модерации</span>
          </div>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-2"
      >
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f
                ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                : "bg-[#12122a] text-indigo-200/40 border border-indigo-500/10 hover:text-indigo-200/60"
            }`}
          >
            {f === "all" ? "Все" : f === "pending" ? "На модерации" : f === "approved" ? "Одобренные" : "Отклоненные"}
          </button>
        ))}
      </motion.div>

      {/* Reviews list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        {filtered.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`bg-[#12122a] border rounded-2xl p-5 transition-all ${
              r.status === "pending"
                ? "border-amber-500/20"
                : r.status === "approved"
                ? "border-emerald-500/10"
                : r.status === "rejected"
                ? "border-red-500/10"
                : "border-indigo-500/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{r.name}</span>
                    <span className="text-xs text-indigo-200/40">·</span>
                    <span className="text-xs text-indigo-200/40">{r.course}</span>
                    <span className="text-xs text-indigo-200/40">·</span>
                    <span className="text-xs text-indigo-200/40">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= r.rating ? "fill-amber-400 text-amber-400" : "text-indigo-200/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-indigo-200/70 mt-2">{r.text}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {r.status !== "approved" && (
                  <button
                    onClick={() => updateStatus(r.id, "approved")}
                    className="w-9 h-9 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center justify-center text-emerald-400 transition-all"
                    title="Одобрить"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                {r.status !== "rejected" && (
                  <button
                    onClick={() => updateStatus(r.id, "rejected")}
                    className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-all"
                    title="Отклонить"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => updateStatus(r.id, r.status === "hidden" ? "approved" : "hidden")}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    r.status === "hidden"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-200/40"
                  }`}
                  title={r.status === "hidden" ? "Показать" : "Скрыть"}
                >
                  {r.status === "hidden" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 mt-3">
              {r.status === "pending" && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <MessageSquare className="w-3 h-3" />
                  Ожидает модерации
                </span>
              )}
              {r.status === "approved" && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ThumbsUp className="w-3 h-3" />
                  Одобрен
                </span>
              )}
              {r.status === "rejected" && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                  <ThumbsDown className="w-3 h-3" />
                  Отклонен
                </span>
              )}
              {r.status === "hidden" && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  <EyeOff className="w-3 h-3" />
                  Скрыт
                </span>
              )}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Star className="w-12 h-12 mx-auto text-indigo-200/20 mb-3" />
            <p className="text-sm text-indigo-200/40">Нет отзывов</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
