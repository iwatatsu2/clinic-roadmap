export type Owner = "夫" | "妻" | "夫/妻";
export type Status = "未着手" | "進行中" | "完了";

export interface Phase {
  id: string;
  name: string;
  start: string; // e.g. "2026上"
  end: string;
  owner: Owner;
  note?: string;
}

export interface Task {
  id: string;
  category: string;
  name: string;
  owner: Owner;
  progress: number; // 0-100
  deadline?: string;
  status: Status;
  note?: string;
}

export const PHASES: Phase[] = [
  { id: "p1", name: "前提確定", start: "2026上", end: "2026上", owner: "夫/妻", note: "ビジョン共有" },
  { id: "p2", name: "医療圏分析", start: "2026上", end: "2026下", owner: "夫", note: "木更津エリア調査" },
  { id: "p3", name: "診療コンセプト設計", start: "2026下", end: "2027上", owner: "夫", note: "糖尿病内分泌特化" },
  { id: "p4", name: "家計整理", start: "2026上", end: "2026下", owner: "妻", note: "生活防衛資金確保" },
  { id: "p5", name: "銀行交渉", start: "2027上", end: "2027下", owner: "夫", note: "3行比較" },
  { id: "p6", name: "物件検討", start: "2027上", end: "2027下", owner: "夫/妻", note: "動線重視" },
  { id: "p7", name: "開業判断", start: "2027下", end: "2027下", owner: "夫/妻", note: "GO/NO-GO判定" },
  { id: "p8", name: "開業準備", start: "2028上", end: "2029上", owner: "夫/妻", note: "2029年春開業目処" },
];

export const TASKS: Task[] = [
  // 【医師】戦略・分析
  { id: "t1", category: "【医師】戦略・分析", name: "人口動態分析", owner: "夫", progress: 50, status: "進行中", note: "増田先生と協議・木更津市統計" },
  { id: "t2", category: "【医師】戦略・分析", name: "糖尿病患者推計", owner: "夫", progress: 50, status: "進行中", note: "13,600人推計（増田先生情報）" },
  { id: "t3", category: "【医師】戦略・分析", name: "競合クリニック全件マッピング", owner: "夫", progress: 0, status: "未着手" },
  { id: "t4", category: "【医師】戦略・分析", name: "診療単価調査", owner: "夫", progress: 0, status: "未着手", note: "6,000円想定" },
  // 【医師】診療コンセプト
  { id: "t0a", category: "【医師】診療コンセプト", name: "診療コンセプト決定", owner: "夫/妻", progress: 100, status: "完了", note: "糖尿病・内分泌内科特化型" },
  { id: "t0b", category: "【医師】診療コンセプト", name: "ビジョン夫婦共有", owner: "夫/妻", progress: 80, status: "進行中", note: "増田先生・野見山先生に共有済。三浦先生に確認中" },
  // 【医師】財務・計画
  { id: "t5", category: "【医師】財務・計画", name: "収益モデル試算", owner: "夫", progress: 0, status: "未着手", note: "月売上300万目標" },
  { id: "t6", category: "【医師】財務・計画", name: "5年事業計画書作成", owner: "夫", progress: 0, status: "未着手" },
  { id: "t7", category: "【医師】財務・計画", name: "銀行3行面談", owner: "夫", progress: 0, status: "未着手" },
  { id: "t8", category: "【医師】財務・計画", name: "金利比較", owner: "夫", progress: 0, status: "未着手" },
  { id: "t9", category: "【医師】財務・計画", name: "税理士選定", owner: "夫", progress: 0, status: "未着手" },
  { id: "t10", category: "【医師】財務・計画", name: "運転資金12か月確保", owner: "夫", progress: 0, status: "未着手" },
  { id: "t11", category: "【医師】財務・計画", name: "撤退ライン設定", owner: "夫", progress: 0, status: "未着手" },
  // 【医師】設備・組織
  { id: "t12", category: "【医師】設備・組織", name: "医療機器選定", owner: "夫", progress: 0, status: "未着手" },
  { id: "t13", category: "【医師】設備・組織", name: "スタッフ必要人数算出", owner: "夫", progress: 0, status: "未着手" },
  { id: "t14", category: "【医師】設備・組織", name: "連携医療機関構築", owner: "夫", progress: 0, status: "未着手" },
  // 【妻】財務・計画
  { id: "t15", category: "【妻】財務・計画", name: "事業開業", owner: "夫/妻", progress: 100, deadline: "3/15", status: "完了", note: "開業届" },
  // 【妻】家計・生活
  { id: "t16", category: "【妻】家計・生活", name: "現在家計固定費確定", owner: "妻", progress: 100, deadline: "3/1", status: "完了", note: "家計固定費" },
  { id: "t17", category: "【妻】家計・生活", name: "教育費将来予測", owner: "妻", progress: 0, status: "未着手" },
  { id: "t18", category: "【妻】家計・生活", name: "最低生帯年収ライン設定", owner: "妻", progress: 0, status: "未着手" },
  { id: "t19", category: "【妻】家計・生活", name: "安心貯金月数定義", owner: "妻", progress: 0, status: "未着手" },
  { id: "t20", category: "【妻】家計・生活", name: "ワンオペ時間許容度確認", owner: "妻", progress: 0, status: "未着手" },
  // 【妻】物件・動線
  { id: "t21", category: "【妻】物件・動線", name: "生活動線評価（学校・治安）", owner: "妻", progress: 0, status: "未着手" },
  { id: "t22", category: "【妻】物件・動線", name: "診療動線設計（看護師視点）", owner: "妻", progress: 0, status: "未着手" },
  { id: "t23", category: "【妻】物件・動線", name: "感染対策動線確認", owner: "妻", progress: 0, status: "未着手" },
  // 【妻】運営・教育
  { id: "t24", category: "【妻】運営・教育", name: "物品リスト作成", owner: "妻", progress: 0, status: "未着手" },
  { id: "t25", category: "【妻】運営・教育", name: "看護業務フロー作成", owner: "妻", progress: 0, status: "未着手" },
  { id: "t26", category: "【妻】運営・教育", name: "スタッフ教育方針案", owner: "妻", progress: 0, status: "未着手" },
  { id: "t27", category: "【妻】運営・教育", name: "患者満足度向上施策", owner: "妻", progress: 0, status: "未着手" },
];

export const PERIODS = ["2026上", "2026下", "2027上", "2027下", "2028上", "2028下", "2029上"];
