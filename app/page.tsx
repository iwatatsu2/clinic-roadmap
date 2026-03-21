"use client";
import { useState, useEffect, useCallback } from "react";
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
const STATUS_OPTIONS: Status[] = ["未着手", "進行中", "完了"];
const STATUS_COLOR: Record<Status, string> = {
  "未着手": "bg-slate-100 text-slate-500",
  "進行中": "bg-amber-100 text-amber-700",
  "完了": "bg-green-100 text-green-700",
};
const STATUS_NEXT: Record<Status, Status> = {
  "未着手": "進行中",
  "進行中": "完了",
  "完了": "未着手",
};

type Overrides = Record<string, { status?: Status; progress?: number }>;
type Notes = Record<string, string>;

function periodIndex(p: string) { return PERIODS.indexOf(p); }

export default function Home() {
  const [filter, setFilter] = useState<"全員" | Owner>("全員");
  const [overrides, setOverrides] = useState<Overrides>({});
  const [notes, setNotes] = useState<Notes>({});
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/tasks").then(r => r.json()),
      fetch("/api/notes").then(r => r.json()),
    ]).then(([ov, nt]) => {
      setOverrides(ov || {});
      setNotes(nt || {});
      setLoaded(true);
    });
  }, []);

  const updateField = useCallback(async (taskId: string, field: "status" | "progress", value: string | number) => {
    setSaving(s => ({ ...s, [taskId]: true }));
    setOverrides(prev => ({
      ...prev,
      [taskId]: { ...prev[taskId], [field]: value },
    }));
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, field, value }),
    });
    setSaving(s => ({ ...s, [taskId]: false }));
  }, []);

  const updateNote = useCallback(async (taskId: string, note: string) => {
    setNotes(prev => ({ ...prev, [taskId]: note }));
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, note }),
    });
  }, []);

  const getTask = (id: string) => {
    const base = TASKS.find(t => t.id === id)!;
    const ov = overrides[id] || {};
    return { ...base, ...ov };
  };

  const filteredTasks = TASKS.filter(t =>
    filter === "全員" || t.owner === filter || t.owner === "夫/妻"
  ).map(t => getTask(t.id));

  const categories = Array.from(new Set(filteredTasks.map(t => t.category)));

  const allTasks = TASKS.map(t => getTask(t.id));
  const doneTasks = allTasks.filter(t => t.status === "完了").length;
  const inProgressTasks = allTasks.filter(t => t.status === "進行中").length;
  const totalProgress = Math.round(allTasks.reduce((s, t) => s + t.progress, 0) / allTasks.length);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">🏥 木更津クリニック開業ロードマップ</h1>
        <p className="text-slate-500 text-sm mt-1">目標：2029年春開業 　夫婦共有版</p>
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-100 text-sm">
            <span className="text-slate-400">全体進捗</span>
            <span className="ml-2 font-bold text-slate-700">{loaded ? `${totalProgress}%` : "..."}</span>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-100 text-sm">
            <span className="text-green-500">✓ 完了</span>
            <span className="ml-2 font-bold text-green-600">{loaded ? doneTasks : "..."}</span>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-100 text-sm">
            <span className="text-amber-500">⟳ 進行中</span>
            <span className="ml-2 font-bold text-amber-600">{loaded ? inProgressTasks : "..."}</span>
          </div>
        </div>
      </div>

      {/* Macro Gantt */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <h2 className="text-base font-bold text-slate-700 mb-4">📅 マクロガントチャート</h2>
        <div className="flex mb-2">
          <div className="w-36 shrink-0" />
          {PERIODS.map(p => (
            <div key={p} className="flex-1 text-center text-xs font-medium text-slate-400">{p}</div>
          ))}
        </div>
        <div className="space-y-2">
          {PHASES.map(phase => {
            const startIdx = periodIndex(phase.start);
            const endIdx = periodIndex(phase.end);
            const leftPct = (startIdx / PERIODS.length) * 100;
            const widthPct = ((endIdx - startIdx + 1) / PERIODS.length) * 100;
            return (
              <div key={phase.id} className="flex items-center gap-2">
                <div className="w-36 shrink-0 text-xs text-slate-600 font-medium truncate">{phase.name}</div>
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
            {o}
          </button>
        ))}
      </div>

      {/* Task list */}
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
                {tasks.map(task => {
                  const noteOpen = openNotes[task.id];
                  const noteVal = notes[task.id] || "";
                  return (
                    <div key={task.id} className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {/* Progress slider */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-slate-700 flex-1">{task.name}</span>
                            {saving[task.id] && <span className="text-xs text-slate-300">保存中...</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={10}
                              value={task.progress}
                              onChange={e => updateField(task.id, "progress", Number(e.target.value))}
                              className="flex-1 h-1.5 accent-blue-500"
                            />
                            <span className="text-xs text-slate-400 w-8 text-right">{task.progress}%</span>
                          </div>
                        </div>
                        {/* Status toggle */}
                        <button
                          onClick={() => updateField(task.id, "status", STATUS_NEXT[task.status as Status])}
                          className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${STATUS_COLOR[task.status as Status]}`}
                        >
                          {task.status}
                        </button>
                        <span className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${OWNER_BADGE[task.owner]}`}>{task.owner}</span>
                        {/* Note toggle */}
                        <button
                          onClick={() => setOpenNotes(s => ({ ...s, [task.id]: !s[task.id] }))}
                          className={`text-xs px-2 py-1 rounded shrink-0 ${noteVal ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:text-slate-500"}`}
                          title="調査メモ"
                        >
                          {noteVal ? "📝" : "✏️"}
                        </button>
                      </div>
                      {/* Note textarea */}
                      {noteOpen && (
                        <div className="mt-2">
                          <textarea
                            className="w-full text-sm border border-slate-200 rounded-lg p-2.5 text-slate-700 placeholder-slate-300 focus:outline-none focus:border-blue-300 resize-none"
                            rows={4}
                            placeholder="調査内容・メモをここにコピペで貼り付け..."
                            value={noteVal}
                            onChange={e => updateNote(task.id, e.target.value)}
                          />
                          {task.note && <p className="text-xs text-slate-400 mt-1">参考: {task.note}</p>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-300 mt-8">編集内容は自動保存されます</p>
    </div>
  );
}
