"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm px-4 pt-5 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏥</span>
          <div>
            <h1 className="text-lg font-bold text-slate-800">岩本達也 将来計画</h1>
            <p className="text-xs text-slate-400">更新：2026年4月12日</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4 pb-16">

        {/* 中止バナー */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">⚠️</span>
            <div>
              <h2 className="font-bold text-amber-800 text-sm">木更津クリニック独立開業計画：中止</h2>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                2026年4月11日、肥満症専門医との会話により、独立開業の計画を中止することを決断しました。
                以下にその理由と今後の方針を記載します。
              </p>
            </div>
          </div>
        </div>

        {/* 中止の理由 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-rose-50">
            <h3 className="font-bold text-sm text-slate-700">❌ 開業中止の理由</h3>
          </div>
          <div className="px-4 py-4 space-y-3">
            {[
              {
                title: "亀田総合病院が木更津にクリニック開設予定",
                body: "土地購入済み。循環器・腎臓も含む大規模クリニックとなる見込みで、開業しても患者を全員持っていかれる可能性が高い。",
              },
              {
                title: "クリニック経営の厳しい現実",
                body: "木更津の内田先生のクリニックは1日70人診察しても赤字。固定費（人件費・光熱費・資材費）の高騰で保険診療だけでは経営が成り立たない時代。",
              },
              {
                title: "糖尿病専門医の需要が構造的に減少",
                body: "経口GLP-1薬など新薬の登場で一般医でも血糖管理が可能になりつつある。糖尿病内科専門クリニックの市場は今後縮小する見通し。",
              },
              {
                title: "3〜4億円の借金からのスタートはリスクが大きすぎる",
                body: "コストコ周辺はハザードマップリスクも高く、立地として不適切。現時点での独立開業は財務的に過大なリスクを伴う。",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 今後の将来計画 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-blue-50">
            <h3 className="font-bold text-sm text-slate-700">🧭 今後の将来計画</h3>
          </div>
          <div className="px-4 py-4 space-y-4">

            <div className="flex gap-3">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                <div className="w-0.5 h-full bg-slate-100 mt-1" />
              </div>
              <div className="pb-4">
                <p className="text-sm font-bold text-slate-800">亀田総合病院への転職（近い将来）</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  契約ルートで給与交渉。基本給を大幅に上げ、退職金・銀行信用・住宅ローン審査の基盤を作る。週4勤務で常勤扱い。残り3日は自由に活動可能。
                </p>
                <div className="mt-2 bg-blue-50 rounded-xl px-3 py-2 text-xs text-blue-700">
                  目標年収：1,500〜1,600万円（バイトなし）
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                <div className="w-0.5 h-full bg-slate-100 mt-1" />
              </div>
              <div className="pb-4">
                <p className="text-sm font-bold text-slate-800">専門領域を肥満症にシフト</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  糖尿病内科市場の縮小を見据え、肥満症専門医として差別化。肥満症の教育認定施設での勤務・資格取得を目指す。製薬各社（リリー・ノボ・アストラゼネカ等）の講演会活動も拡大。
                </p>
                <div className="mt-2 bg-purple-50 rounded-xl px-3 py-2 text-xs text-purple-700">
                  参考クリニック：令和日本橋クリニック・三浦中央医院を視察予定
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">3</div>
                <div className="w-0.5 h-full bg-slate-100 mt-1" />
              </div>
              <div className="pb-4">
                <p className="text-sm font-bold text-slate-800">SNS・個人ブランディングの確立</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  顔出し動画（リール・YouTube）で専門医としての認知を高める。AIを活用したコンテンツ量産体制を構築。SNSからクリニック・検診・自費診療への集客導線を設計する。
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">4</div>
                <div className="w-0.5 h-full bg-slate-100 mt-1" />
              </div>
              <div className="pb-4">
                <p className="text-sm font-bold text-slate-800">インバウンド医療のパイプ構築</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  中国・韓国の富裕層をターゲットにした自費診療。仲介会社との連携で集客。日本薬のコストパフォーマンスの高さを武器に、外貨獲得モデルを確立する。まだ競合が少ないブルーオーシャン市場。
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-bold">5</div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">将来的な独立開業（時期・場所は再検討）</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  亀田で信用・資金・ブランドを積み上げた後、木更津または最適地でクリニックを開設。亀田との連携（週1〜2）を維持しながら自院運営。無借金または少額融資でスタートできる体制を整える。
                </p>
                <div className="mt-2 bg-rose-50 rounded-xl px-3 py-2 text-xs text-rose-700">
                  帝国ホテル建て替え完成後（2035年頃）のインバウンドクリニック展開も視野に
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 直近のアクション */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 bg-green-50">
            <h3 className="font-bold text-sm text-slate-700">✅ 直近のアクション</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              "亀田総合病院への転職を本格的に検討・三浦先生に相談",
              "令和日本橋クリニック・三浦中央医院の視察手配",
              "肥満症学会への入会・専門医取得の検討",
              "顔出しSNS動画（リール）の開始",
              "インバウンド医療の仲介会社リサーチ",
              "現職の教授への退職意向の伝達準備",
            ].map((action, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <span className="w-5 h-5 rounded border-2 border-slate-200 shrink-0" />
                <p className="text-sm text-slate-700">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* フッター */}
        <p className="text-center text-xs text-slate-300 pb-4">
          2026年4月11日 神戸にて方針転換を決断
        </p>

      </div>
    </div>
  );
}
