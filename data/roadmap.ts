export type Owner = "夫" | "妻" | "夫/妻";
export type Status = "未着手" | "進行中" | "完了";

export interface Meeting {
  id: string;
  date: string;       // "2026-04-02"
  time?: string;      // "18:00"
  title: string;
  partner: string;
  note?: string;
  status: "予定" | "完了" | "キャンセル";
}

export interface PropertyInfo {
  name: string;
  address: string;
  area: string;
  totalCost: string;
  openingTarget: string;
  subsidy: string;
  builder: string;
  scheduleHighlights: { label: string; date: string }[];
}

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
  { id: "p5", name: "銀行交渉・融資申込", start: "2026上", end: "2026下", owner: "夫", note: "3行比較・融資申込（設計契約後）" },
  { id: "p6", name: "物件・設計・建設", start: "2026上", end: "2027下", owner: "夫/妻", note: "かねだ西医療ヴィレッジ・三井ホーム" },
  { id: "p7", name: "開業準備", start: "2027上", end: "2027下", owner: "夫/妻", note: "医療機器・スタッフ・届出" },
  { id: "p8", name: "開院", start: "2027下", end: "2027下", owner: "夫/妻", note: "2027年9月初旬開院目標" },
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
  // 【物件・建設】かねだ西医療ヴィレッジ
  { id: "t28", category: "【物件・建設】", name: "物件確認（かねだ西医療ヴィレッジ）", owner: "夫/妻", progress: 80, status: "進行中", note: "木更津市・約240坪・幹線道路沿い・コストコ近" },
  { id: "t29", category: "【物件・建設】", name: "三井ホーム設計打合①（4月16日）", owner: "夫/妻", progress: 0, deadline: "2026-04-16", status: "未着手", note: "設計打合1回目" },
  { id: "t30", category: "【物件・建設】", name: "三井ホーム設計打合②（4月24日）", owner: "夫/妻", progress: 0, deadline: "2026-04-24", status: "未着手", note: "設計打合2回目" },
  { id: "t31", category: "【物件・建設】", name: "三井ホーム設計契約（5月末）", owner: "夫/妻", progress: 0, deadline: "2026-05-31", status: "未着手", note: "契約金発生" },
  { id: "t32", category: "【物件・建設】", name: "プラン確定・確認申請提出（10月中旬）", owner: "夫", progress: 0, deadline: "2026-10-20", status: "未着手" },
  { id: "t33", category: "【物件・建設】", name: "請負契約（12月初旬）", owner: "夫/妻", progress: 0, deadline: "2026-12-01", status: "未着手", note: "工事請負代金 約9,713万円" },
  { id: "t34", category: "【物件・建設】", name: "地縄・地鎮祭（2027年1月初旬）", owner: "夫/妻", progress: 0, deadline: "2027-01-10", status: "未着手" },
  { id: "t35", category: "【物件・建設】", name: "着工（2027年2月下旬）", owner: "夫", progress: 0, deadline: "2027-02-20", status: "未着手" },
  { id: "t36", category: "【物件・建設】", name: "上棟（2027年7月下旬）", owner: "夫", progress: 0, deadline: "2027-07-25", status: "未着手" },
  { id: "t37", category: "【物件・建設】", name: "竣工・引渡し（2027年8月初旬）", owner: "夫/妻", progress: 0, deadline: "2027-08-05", status: "未着手" },
  { id: "t38", category: "【物件・建設】", name: "医院開院（2027年9月初旬）", owner: "夫/妻", progress: 0, deadline: "2027-09-01", status: "未着手", note: "🎯 目標開院日" },
  // 【補助金】
  { id: "t39", category: "【補助金・助成】", name: "千葉県重点医師偏在対策補助金 申請検討", owner: "夫", progress: 10, status: "進行中", note: "施設整備1/2・設備1650万上限1/2・地域定着2/3補助。重点区域確認が必要" },
  { id: "t40", category: "【補助金・助成】", name: "補助金申請書類準備", owner: "夫", progress: 0, status: "未着手", note: "地域医療対策協議会・保険者協議会の合意が必要" },
  // 【取引先・業者交渉】
  { id: "t41", category: "【取引先・業者】", name: "メディセオ面談（4/2 18:00）", owner: "夫", progress: 0, deadline: "2026-04-02", status: "未着手", note: "医薬品卸・取引条件確認" },
  { id: "t42", category: "【取引先・業者】", name: "医療機器メーカー選定・相見積", owner: "夫", progress: 0, status: "未着手" },
  { id: "t43", category: "【取引先・業者】", name: "電子カルテ選定", owner: "夫", progress: 0, status: "未着手" },
];

export const PERIODS = ["2026上", "2026下", "2027上", "2027下", "2028上", "2028下", "2029上"];

export const PROPERTY: PropertyInfo = {
  name: "かねだ西医療ヴィレッジ（仮称）",
  address: "千葉県木更津市瓜倉字霞野 863番4、864番",
  area: "798.79㎡（約240坪）",
  totalCost: "約1億521万円（土地・医療機器別途）",
  openingTarget: "2027年9月初旬",
  subsidy: "千葉県重点医師偏在対策支援区域 開業支援補助金（施設1/2・設備1/2・定着2/3）",
  builder: "三井ホーム 千葉コンサルティング営業部（大竹俊幸）",
  scheduleHighlights: [
    { label: "設計打合①", date: "2026年4月16日" },
    { label: "設計打合②", date: "2026年4月24日" },
    { label: "見積提示", date: "2026年5月21日" },
    { label: "設計契約", date: "2026年5月末" },
    { label: "プラン確定", date: "2026年10月中旬" },
    { label: "請負契約", date: "2026年12月初旬" },
    { label: "地鎮祭", date: "2027年1月初旬" },
    { label: "着工", date: "2027年2月下旬" },
    { label: "上棟", date: "2027年7月下旬" },
    { label: "引渡し", date: "2027年8月初旬" },
    { label: "🎯 医院開院", date: "2027年9月初旬" },
  ],
};

export const MEETINGS: Meeting[] = [
  {
    id: "m1",
    date: "2026-04-02",
    time: "18:00",
    title: "メディセオ面談",
    partner: "メディセオ",
    note: "医薬品卸・取引条件確認",
    status: "予定",
  },
  {
    id: "m2",
    date: "2026-04-16",
    title: "三井ホーム 設計打合①",
    partner: "三井ホーム 大竹俊幸",
    status: "予定",
  },
  {
    id: "m3",
    date: "2026-04-24",
    title: "三井ホーム 設計打合②",
    partner: "三井ホーム 大竹俊幸",
    status: "予定",
  },
];
