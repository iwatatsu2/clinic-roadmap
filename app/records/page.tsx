"use client";
import Link from "next/link";

interface ConsultationRecord {
  id: string;
  date: string;
  title: string;
  partner: string;
  summary: string;
  painPoints: { title: string; items: string[] }[];
  expectations: { title: string; items: string[] }[];
  todos: { text: string; assignee: string; done: boolean }[];
  aiSuggestions?: string[];
  fileRef?: string;
}

const RECORDS: ConsultationRecord[] = [
  {
    id: "r1",
    date: "2026-04-02",
    title: "顧客相談：岩本先生夫妻 - 糖尿病内科クリニック開業",
    partner: "積水ハウス（羽柴氏・安藤氏・山崎氏）",
    summary: "千葉県木更津・君津・袖ケ浦エリアでの糖尿病内科クリニック開業を検討する岩本先生夫妻に対し、積水ハウスのコンサルタントが計画についてヒアリングと提案を行った。最大の課題は「最適な土地の選定」と「初期費用の把握」。土地・建物を賃借する「クリニックレント」も提示されたが、最大5,000万円の補助金活用の可能性があるため、土地購入が基本方針。",
    painPoints: [
      {
        title: "最適な開業用地の確保が困難",
        items: [
          "広さ：駐車場確保のため300〜400坪程度",
          "立地：前面道路6m以上・周辺に住宅街",
          "安全性：液状化リスク（川沿い・埋め立て地）を避ける",
          "インフラ：下水完備",
          "近年、木更津エリアでの開業希望医師が増加し競争が激化",
        ],
      },
      {
        title: "初期投資が非常に高額",
        items: [
          "土地費用：坪単価40万円×300坪 ≒ 1億2,000万円",
          "建築・外構費用：55〜60坪の建物 ≒ 1億4,000〜5,000万円、外構 ≒ 2,000〜3,000万円",
          "追加費用：木更津市開発指導条例による植栽・雨水処理施設（1,000万円単位）",
          "医療機器・運転資金を含めると自己資金での開業は大きな負担",
        ],
      },
    ],
    expectations: [
      {
        title: "理想的な開業用地の提案",
        items: [
          "ハウスメーカー独自の非公開情報網を活用した優良土地の紹介",
          "土地に合わせた大まかなプランも併せた提案",
        ],
      },
      {
        title: "初期投資を抑制しつつ理想のクリニックを実現",
        items: [
          "補助金（最大5,000万円）活用を視野に入れた資金計画",
          "融資額が4億円超となる場合はクリニックレントも検討",
          "積水ハウスのデザイン性を活かした自身の診療スタイルに合った間取り",
          "賃貸を選択する場合は事業用定期借家契約による長期安定性",
        ],
      },
      {
        title: "専門家からの継続的な情報提供",
        items: [
          "他開業医のリアルな話・地域競合動向・液状化リスク調査",
          "山崎氏を窓口とした明確な連絡体制の構築",
        ],
      },
    ],
    todos: [
      { text: "希望エリアの土地情報収集（300坪以上・前面道路6m・下水完備・液状化リスク低）", assignee: "積水ハウス 羽柴・安藤氏", done: false },
      { text: "クリニックレントの具体的シミュレーション作成（賃料・契約期間等、自己所有との比較）", assignee: "積水ハウス", done: false },
      { text: "補助金（最大5,000万円）の申請条件・スケジュール調査・共有", assignee: "積水ハウス", done: false },
      { text: "地域競合クリニックのリアル情報収集（守秘義務の範囲内）", assignee: "積水ハウス 安藤・山崎氏", done: false },
      { text: "連絡体制確立（窓口：山崎氏）", assignee: "積水ハウス 山崎氏", done: false },
      { text: "予算感・自己資金のヒアリング", assignee: "積水ハウス", done: false },
    ],
    aiSuggestions: [
      "優先順位付けワークショップ：土地要件を「絶対条件」と「希望条件」に分類し、各エリアでの事業計画シミュレーション（土地購入・レントの両方）を提示",
      "プロアクティブな土地ソーシング：未公開物件（相続予定地・事業廃止予定地）を積極収集。候補地のハザードリスクと地盤改良コストを初期段階で明示",
      "土地取得と建物計画の同時進行：55〜60坪の標準プランと概算見積もりを並行準備し、良い土地が見つかった際に迅速移行",
      "ハイブリッド提案：土地は自己購入・建物は地主建設の「事業用借地権」方式や、内装の一部自己負担・共有部地主負担案でコスト・カスタマイズ・資産形成のバランスを取る",
    ],
    fileRef: "開業プラン/相談記録/04-02 顧客相談：岩本先生夫妻 - 糖尿病内科クリニック開業-Summary.md",
  },
];

export default function RecordsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="text-slate-500 hover:text-slate-800 text-sm">← ガントチャートへ戻る</Link>
          <h1 className="text-lg font-bold text-slate-800">相談記録・情報共有</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {RECORDS.map(rec => (
          <article key={rec.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Record Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-blue-100 text-xs mb-1">{rec.date} ／ {rec.partner}</p>
                  <h2 className="text-white font-bold text-lg leading-tight">{rec.title}</h2>
                </div>
                {rec.fileRef && (
                  <span className="text-blue-200 text-xs whitespace-nowrap mt-1">📁 {rec.fileRef}</span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary */}
              <section>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">概要</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{rec.summary}</p>
              </section>

              {/* Pain Points */}
              <section>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">ペインポイント</h3>
                <div className="space-y-4">
                  {rec.painPoints.map((pp, i) => (
                    <div key={i} className="border-l-4 border-red-400 pl-4">
                      <p className="font-semibold text-slate-800 text-sm mb-2">⚠ {pp.title}</p>
                      <ul className="space-y-1">
                        {pp.items.map((item, j) => (
                          <li key={j} className="text-slate-600 text-sm flex gap-2">
                            <span className="text-slate-400 flex-shrink-0">・</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Expectations */}
              <section>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">期待・要望</h3>
                <div className="space-y-4">
                  {rec.expectations.map((ex, i) => (
                    <div key={i} className="border-l-4 border-blue-400 pl-4">
                      <p className="font-semibold text-slate-800 text-sm mb-2">✓ {ex.title}</p>
                      <ul className="space-y-1">
                        {ex.items.map((item, j) => (
                          <li key={j} className="text-slate-600 text-sm flex gap-2">
                            <span className="text-slate-400 flex-shrink-0">・</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ToDo List */}
              <section>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">To-Doリスト</h3>
                <div className="space-y-2">
                  {rec.todos.map((todo, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${todo.done ? "bg-green-50" : "bg-slate-50"}`}>
                      <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center text-xs ${todo.done ? "bg-green-500 border-green-500 text-white" : "border-slate-300"}`}>
                        {todo.done ? "✓" : ""}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${todo.done ? "line-through text-slate-400" : "text-slate-700"}`}>{todo.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">担当: {todo.assignee}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* AI Suggestions */}
              {rec.aiSuggestions && rec.aiSuggestions.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs mr-2">AI</span>
                    統合的アプローチ提案
                  </h3>
                  <div className="space-y-2">
                    {rec.aiSuggestions.map((s, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                        <span className="text-purple-400 font-mono text-xs flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                        <p className="text-slate-700 text-sm leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
