"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { PHASES, TASKS, PERIODS, PROPERTY, MEETINGS, LAND_CANDIDATES, LOCAL_AGENTS, type Owner, type Status } from "@/data/roadmap";

const OWNER_COLOR: Record<Owner, string> = {
  "夫": "bg-blue-600",
  "妻": "bg-rose-400",
  "夫/妻": "bg-purple-500",
};
const OWNER_BADGE: Record<Owner, string> = {
  "夫": "bg-blue-100 text-blue-800",
  "妻": "bg-rose-100 text-rose-700",
  "夫/妻": "bg-purple-100 text-purple-700",
};
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
type Tab = "タスク" | "ガント" | "物件・予定";

function periodIndex(p: string) { return PERIODS.indexOf(p); }

export default function Home() {
  const [tab, setTab] = useState<Tab>("タスク");
  const [filter, setFilter] = useState<"全員" | Owner>("全員");
  const [overrides, setOverrides] = useState<Overrides>({});
  const [notes, setNotes] = useState<Notes>({});
  const [openTask, setOpenTask] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

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

  const updateField = useCallback((taskId: string, field: "status" | "progress", value: string | number) => {
    setOverrides(prev => ({ ...prev, [taskId]: { ...prev[taskId], [field]: value } }));
    clearTimeout(saveTimer.current[taskId + field]);
    saveTimer.current[taskId + field] = setTimeout(() => {
      fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, field, value }),
      });
    }, 600);
  }, []);

  const updateNote = useCallback((taskId: string, note: string) => {
    setNotes(prev => ({ ...prev, [taskId]: note }));
    clearTimeout(saveTimer.current["note_" + taskId]);
    saveTimer.current["note_" + taskId] = setTimeout(() => {
      fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, note }),
      });
    }, 800);
  }, []);

  const getTask = (id: string) => {
    const base = TASKS.find(t => t.id === id)!;
    return { ...base, ...(overrides[id] || {}) };
  };

  const allTasks = TASKS.map(t => getTask(t.id));
  const doneTasks = allTasks.filter(t => t.status === "完了").length;
  const inProgress = allTasks.filter(t => t.status === "進行中").length;
  const totalProgress = Math.round(allTasks.reduce((s, t) => s + t.progress, 0) / allTasks.length);

  const filteredTasks = TASKS
    .filter(t => filter === "全員" || t.owner === filter || t.owner === "夫/妻")
    .map(t => getTask(t.id));
  const categories = Array.from(new Set(filteredTasks.map(t => t.category)));

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Fixed header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 shadow-sm">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-lg font-bold text-slate-800">🏥 木更津クリニック開業</h1>
          {/* Progress bar */}
          <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all"
              style={{ width: `${loaded ? totalProgress : 0}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-400">
            <span>全体進捗 {loaded ? totalProgress : "..."}%</span>
            <span>✓{doneTasks}完了 ⟳{inProgress}進行中</span>
          </div>
        </div>
        {/* Tab bar */}
        <div className="flex px-4 gap-1 pb-2 mt-1">
          {(["タスク", "ガント", "物件・予定"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${tab === t ? "bg-slate-800 text-white" : "text-slate-500"}`}
            >
              {t}
            </button>
          ))}
          <Link
            href="/records"
            className="flex-1 py-2 rounded-xl text-sm font-medium text-slate-500 text-center hover:bg-slate-100 transition-all"
          >
            相談記録
          </Link>
        </div>
      </div>

      {tab === "タスク" && (
        <div className="px-4 pt-4 space-y-4">
          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {(["全員", "夫", "妻", "夫/妻"] as const).map(o => (
              <button
                key={o}
                onClick={() => setFilter(o)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === o ? "bg-slate-800 text-white" : "bg-white text-slate-500 border border-slate-200"}`}
              >
                {o}
              </button>
            ))}
          </div>

          {/* Task cards */}
          {categories.map(cat => {
            const tasks = filteredTasks.filter(t => t.category === cat);
            const catOwner = cat.includes("医師") ? "夫" : cat.includes("妻") ? "妻" : "夫/妻";
            const catDone = tasks.filter(t => t.status === "完了").length;
            return (
              <div key={cat} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className={`px-4 py-3 flex items-center justify-between ${catOwner === "夫" ? "bg-blue-50" : catOwner === "妻" ? "bg-rose-50" : "bg-purple-50"}`}>
                  <h3 className="font-bold text-sm text-slate-700">{cat}</h3>
                  <span className="text-xs text-slate-400">{catDone}/{tasks.length}</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {tasks.map(task => {
                    const isOpen = openTask === task.id;
                    const noteVal = notes[task.id] || "";
                    const status = task.status as Status;
                    return (
                      <div key={task.id}>
                        {/* Task row — tap to expand */}
                        <button
                          className="w-full text-left px-4 py-4 active:bg-slate-50 transition-colors"
                          onClick={() => setOpenTask(isOpen ? null : task.id)}
                        >
                          <div className="flex items-center gap-3">
                            {/* Status dot */}
                            <div className={`w-3 h-3 rounded-full shrink-0 ${status === "完了" ? "bg-green-400" : status === "進行中" ? "bg-amber-400" : "bg-slate-200"}`} />
                            <span className="flex-1 text-sm text-slate-700 font-medium">{task.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${OWNER_BADGE[task.owner]}`}>{task.owner}</span>
                            {noteVal && <span className="text-sm">📝</span>}
                            <span className="text-slate-300 text-xs">{isOpen ? "▲" : "▼"}</span>
                          </div>
                          {/* Mini progress bar */}
                          {task.progress > 0 && (
                            <div className="mt-2 ml-6 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${task.progress}%` }} />
                            </div>
                          )}
                        </button>

                        {/* Expanded panel */}
                        {isOpen && (
                          <div className="px-4 pb-4 space-y-4 bg-slate-50 border-t border-slate-100">
                            {/* Status selector */}
                            <div className="pt-3">
                              <p className="text-xs text-slate-400 mb-2 font-medium">ステータス</p>
                              <div className="flex gap-2">
                                {(["未着手", "進行中", "完了"] as Status[]).map(s => (
                                  <button
                                    key={s}
                                    onClick={() => updateField(task.id, "status", s)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${status === s ? STATUS_COLOR[s] + " ring-2 ring-offset-1 ring-slate-300" : "bg-white text-slate-400 border border-slate-200"}`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Progress slider */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-xs text-slate-400 font-medium">進捗</p>
                                <p className="text-xs font-bold text-blue-500">{task.progress}%</p>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                step={10}
                                value={task.progress}
                                onChange={e => updateField(task.id, "progress", Number(e.target.value))}
                                className="w-full h-6 accent-blue-500"
                              />
                              <div className="flex justify-between text-xs text-slate-300 mt-0.5">
                                <span>0</span><span>50</span><span>100%</span>
                              </div>
                            </div>

                            {/* Note */}
                            <div>
                              <p className="text-xs text-slate-400 mb-2 font-medium">📝 調査メモ</p>
                              <textarea
                                className="w-full text-sm border border-slate-200 rounded-xl p-3 text-slate-700 placeholder-slate-300 focus:outline-none focus:border-blue-300 resize-none bg-white"
                                rows={5}
                                placeholder="調べたことをここにコピペで貼り付け..."
                                value={noteVal}
                                onChange={e => updateNote(task.id, e.target.value)}
                              />
                            </div>
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
      )}

      {tab === "ガント" && (
        <div className="px-4 pt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 overflow-x-auto">
            <h2 className="text-sm font-bold text-slate-700 mb-4">📅 2026〜2029 スケジュール</h2>
            <div className="min-w-[500px]">
              <div className="flex mb-2">
                <div className="w-28 shrink-0" />
                {PERIODS.map(p => (
                  <div key={p} className="flex-1 text-center text-xs font-medium text-slate-400">{p}</div>
                ))}
              </div>
              <div className="space-y-2.5">
                {PHASES.map(phase => {
                  const startIdx = periodIndex(phase.start);
                  const endIdx = periodIndex(phase.end);
                  const leftPct = (startIdx / PERIODS.length) * 100;
                  const widthPct = ((endIdx - startIdx + 1) / PERIODS.length) * 100;
                  return (
                    <div key={phase.id} className="flex items-center gap-2">
                      <div className="w-28 shrink-0 text-xs text-slate-600 font-medium leading-tight">{phase.name}</div>
                      <div className="flex-1 relative h-8 bg-slate-50 rounded-lg overflow-hidden">
                        <div
                          className={`absolute top-1 bottom-1 rounded-md ${OWNER_COLOR[phase.owner]} opacity-85 flex items-center px-2`}
                          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                        >
                          <span className="text-white text-xs truncate">{phase.note}</span>
                        </div>
                      </div>
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
          </div>
          <p className="text-center text-xs text-slate-300 mt-4">🎯 目標：2027年9月初旬開院</p>
        </div>
      )}

      {tab === "物件・予定" && (
        <div className="px-4 pt-4 space-y-4 pb-20">

          {/* 直近の予定 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-amber-50 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-700">📅 直近の予定</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {MEETINGS.filter(m => m.status !== "キャンセル").map(m => (
                <div key={m.id} className="px-4 py-3 flex items-start gap-3">
                  <div className="shrink-0 text-center bg-amber-100 rounded-xl px-2 py-1 min-w-[52px]">
                    <p className="text-xs font-bold text-amber-700">{m.date.slice(5).replace("-", "/")}</p>
                    {m.time && <p className="text-xs text-amber-600">{m.time}</p>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{m.title}</p>
                    <p className="text-xs text-slate-400">{m.partner}</p>
                    {m.note && <p className="text-xs text-slate-400 mt-0.5">{m.note}</p>}
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${m.status === "完了" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 物件情報 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-green-50">
              <h3 className="font-bold text-sm text-slate-700">🏥 物件情報</h3>
            </div>
            <div className="px-4 py-3 space-y-2 text-sm">
              <div className="flex gap-2"><span className="text-slate-400 shrink-0 w-20">物件名</span><span className="font-semibold text-slate-800">{PROPERTY.name}</span></div>
              <div className="flex gap-2"><span className="text-slate-400 shrink-0 w-20">所在地</span><span className="text-slate-700">{PROPERTY.address}</span></div>
              <div className="flex gap-2"><span className="text-slate-400 shrink-0 w-20">面積</span><span className="text-slate-700">{PROPERTY.area}</span></div>
              <div className="flex gap-2"><span className="text-slate-400 shrink-0 w-20">総費用</span><span className="font-semibold text-blue-700">{PROPERTY.totalCost}</span></div>
              <div className="flex gap-2"><span className="text-slate-400 shrink-0 w-20">施工</span><span className="text-slate-700">{PROPERTY.builder}</span></div>
              <div className="flex gap-2"><span className="text-slate-400 shrink-0 w-20">補助金</span><span className="text-green-700 text-xs">{PROPERTY.subsidy}</span></div>
              <div className="flex gap-2"><span className="text-slate-400 shrink-0 w-20">開院目標</span><span className="font-bold text-rose-600">{PROPERTY.openingTarget}</span></div>
            </div>
          </div>

          {/* 建設スケジュール */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-blue-50">
              <h3 className="font-bold text-sm text-slate-700">🏗️ 建設スケジュール（目標）</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {PROPERTY.scheduleHighlights.map((s, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${s.label.includes("🎯") ? "bg-rose-500" : "bg-blue-300"}`} />
                  <span className="text-xs text-slate-400 w-32 shrink-0">{s.date}</span>
                  <span className={`text-sm ${s.label.includes("🎯") ? "font-bold text-rose-600" : "text-slate-700"}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 土地候補リスト */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-emerald-50">
              <h3 className="font-bold text-sm text-slate-700">📍 土地候補リスト</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manusレポート（2026/3/27）より</p>
            </div>
            <div className="divide-y divide-slate-100">
              {LAND_CANDIDATES.map(land => (
                <details key={land.id} className="group">
                  <summary className="px-4 py-3 flex items-center gap-3 cursor-pointer list-none active:bg-slate-50">
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-bold ${land.rank === "最有力" ? "bg-rose-100 text-rose-700" : land.rank === "候補" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                      {land.rank}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-slate-800">{land.name}</span>
                    <span className="text-slate-300 text-xs group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 pb-4 space-y-1.5 bg-slate-50 text-xs text-slate-600">
                    <div className="flex gap-2 pt-2"><span className="text-slate-400 w-16 shrink-0">所在地</span><span>{land.address}</span></div>
                    <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">面積</span><span className="font-semibold">{land.area}</span></div>
                    <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">価格</span><span className="font-bold text-blue-700">{land.price}</span></div>
                    <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">接道</span><span>{land.road}</span></div>
                    <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">用途地域</span><span>{land.zoning}</span></div>
                    <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">ハザード</span><span>{land.hazard}</span></div>
                    <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">競合</span><span>{land.rival}</span></div>
                    <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">情報源</span><span>{land.source}</span></div>
                    {land.contact && <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">連絡先</span><span className="text-blue-600">{land.contact}</span></div>}
                    <div className="mt-2 p-2 bg-white rounded-xl border border-slate-100 text-slate-600 leading-relaxed">{land.note}</div>
                    {land.mapUrl && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-slate-200">
                        <iframe
                          src={land.mapUrl.replace("maps.google.com/maps?", "maps.google.com/maps?output=embed&")}
                          width="100%"
                          height="220"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* 地元不動産業者リスト */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 bg-violet-50">
              <h3 className="font-bold text-sm text-slate-700">🏢 地元不動産業者リスト</h3>
              <p className="text-xs text-slate-400 mt-0.5">問い合わせ時「医療用ロードサイド300坪・木更津or袖ケ浦」と伝える</p>
            </div>
            <div className="divide-y divide-slate-100">
              {LOCAL_AGENTS.map(agent => (
                <div key={agent.rank} className="px-4 py-3 flex items-start gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">{agent.rank}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{agent.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{agent.feature}</p>
                    <p className="text-xs text-violet-600 mt-1">▶ {agent.focus}</p>
                    <p className="text-xs text-blue-500 mt-0.5">{agent.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Bottom save indicator */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 text-center">
        <p className="text-xs text-slate-300">編集内容は自動保存 · 夫婦リアルタイム同期</p>
      </div>
    </div>
  );
}
