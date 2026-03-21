"use client";
import { useState } from "react";
import { PHASES, TASKS, PERIODS, type Owner, type Status } from "@/data/roadmap";

const OWNER_COLOR: Record<Owner, string> = {
  "夫": "bg-blue-600",
  "妻": "bg-rose-400",
  "夫/妻": "bg-purple-500",
};

const OWNER_BADGE: Record<Owner, string> = {
  "夫": "bg-blue-100 text-blue-700",
  "妻": "bg-rose-100 text-rose-600",
  "夫/妻": "bg-purple-100 text-purple-700",
};

const STATUS_COLOR: Record<Status, string> = {
  "未着手": "bg-slate-100 text-slate-500",
  "進行中": "bg-amber-100 text-amber-700",
  "完了": "bg-green-100 text-green-700",
};

const PERIOD_WIDTH = 100 / PERIODS.length;

function periodIndex(p: string) {
  return PERIODS.indexOf(p);
}

export default function Home() {
  const [filter, setFilter] = useState<"全員" | Owner>("全員");

  const filteredTasks = filter === "全員" ? TASKS : TASKS.filter(t => t.owner === filter || t.owner === "夫/妻");

  const categories = Array.from(new Set(filteredTasks.map(t => t.category)));

  const totalTasks = TASKS.length;
  const doneTasks = TASKS.filter(t => t.status === "完了").length;
  const inProgressTasks = TASKS.filter(t => t.status === "進行中").length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">🏥 木更津クリニック開業ロードマップ</h1>
        <p className="text-slate-500 text-sm mt-1">目標：2029年春開業 　夫婦共有版</p>
        <div className="flex gap-4 mt-3">
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-100 text-sm">
            <span className="text-slate-400">全タスク</span>
            <span className="ml-2 font-bold text-slate-700">{totalTasks}</span>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-100 text-sm">
            <span className="text-green-500">✓ 完了</span>
            <span className="ml-2 font-bold text-green-600">{doneTasks}</span>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-100 text-sm">
            <span className="text-amber-500">⟳ 進行中</span>
            <span className="ml-2 font-bold text-amber-600">{inProgressTasks}</span>
          </div>
        </div>
      </div>

      {/* Macro Gantt */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="text-base font-bold text-slate-700 mb-4">📅 マクロガントチャート</h2>
        {/* Period header */}
        <div className="flex mb-2">
          <div className="w-40 shrink-0" />
          {PERIODS.map(p => (
            <div key={p} className="flex-1 text-center text-xs font-medium text-slate-400">{p}</div>
          ))}
        </div>
        {/* Phase bars */}
        <div className="space-y-2">
          {PHASES.map(phase => {
            const startIdx = periodIndex(phase.start);
            const endIdx = periodIndex(phase.end);
            const leftPct = (startIdx / PERIODS.length) * 100;
            const widthPct = ((endIdx - startIdx + 1) / PERIODS.length) * 100;
            return (
              <div key={phase.id} className="flex items-center gap-2">
                <div className="w-40 shrink-0 text-xs text-slate-600 font-medium truncate">{phase.name}</div>
                <div className="flex-1 relative h-7 bg-slate-50 rounded-lg overflow-hidden">
                  <div
                    className={`absolute top-1 bottom-1 rounded-md ${OWNER_COLOR[phase.owner]} opacity-80 flex items-center px-2`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  >
                    <span className="text-white text-xs truncate">{phase.note}</span>
                  </div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded ${OWNER_BADGE[phase.owner]}`}>{phase.owner}</span>
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex gap-4 mt-4 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600 inline-block" />夫</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-400 inline-block" />妻</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500 inline-block" />夫婦</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(["全員", "夫", "妻", "夫/妻"] as const).map(o => (
          <button
            key={o}
            onClick={() => setFilter(o)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === o ? "bg-slate-700 text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400"}`}
          >
            {o === "全員" ? "全員" : o}
          </button>
        ))}
      </div>

      {/* Task list by category */}
      <div className="space-y-4">
        {categories.map(cat => {
          const tasks = filteredTasks.filter(t => t.category === cat);
          const catOwner = cat.includes("医師") ? "夫" : cat.includes("妻") ? "妻" : "夫/妻";
          return (
            <div key={cat} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className={`px-5 py-3 ${catOwner === "夫" ? "bg-blue-50" : catOwner === "妻" ? "bg-rose-50" : "bg-purple-50"}`}>
                <h3 className="font-bold text-sm text-slate-700">{cat}</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {tasks.map(task => (
                  <div key={task.id} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-700">{task.name}</span>
                        {task.note && <span className="text-xs text-slate-400">{task.note}</span>}
                      </div>
                      {/* Progress bar */}
                      <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full w-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${task.progress === 100 ? "bg-green-400" : task.progress > 0 ? "bg-amber-400" : "bg-slate-200"}`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {task.deadline && <span className="text-xs text-slate-400">{task.deadline}</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[task.status]}`}>{task.status}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${OWNER_BADGE[task.owner]}`}>{task.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-300 mt-8">最終更新: 2026/03/21</p>
    </div>
  );
}
