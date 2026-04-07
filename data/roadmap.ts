export type Owner = "夫" | "妻" | "夫/妻";
export type Status = "未着手" | "進行中" | "完了";

export interface LandCandidate {
  id: string;
  rank: "最有力" | "候補" | "参考";
  name: string;
  address: string;
  area: string;
  price: string;
  road: string;
  zoning: string;
  hazard: string;
  rival: string;
  source: string;
  contact?: string;
  note: string;
  mapUrl?: string;
}

export interface LocalAgent {
  rank: number;
  name: string;
  feature: string;
  focus: string;
  contact: string;
}

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
  { id: "t28", category: "【物件・建設】", name: "物件確認（かねだ西医療ヴィレッジ）", owner: "夫/妻", progress: 80, status: "進行中", note: "木更津市瓜倉・約240坪・コストコ近。小櫃川氾濫リスク・住民年齢層が若く立ち上がり集客に懸念あり→保留。他候補と並行検討中" },
  { id: "t28a", category: "【物件・建設】", name: "潮見地区物件確認", owner: "妻", progress: 100, status: "完了", note: "潮見6丁目33-2（準工業地域）。16号からの視認性低・液状化リスクあり→見送り決定（2026/3/26）" },
  { id: "t28b", category: "【物件・建設】", name: "袖ケ浦市横田物件（最有力候補）確認", owner: "夫/妻", progress: 30, status: "進行中", note: "299坪・3,200万円・国道409号沿い・第1種住居地域。ハザードリスク低・競合7km圏内なし。埋蔵文化財包蔵地のため建築前調査要。ハウスドゥ木更津北 TEL:0438-97-5036" },
  { id: "t28c", category: "【物件・建設】", name: "地元不動産業者へ問い合わせ", owner: "妻", progress: 0, status: "未着手", deadline: "2026-04-30", note: "①立和コーポレーション（事業用地専門）②サンワエステート（地元密着）③アール不動産。「医療用ロードサイド300坪・木更津or袖ケ浦」と伝える" },
  { id: "t28d", category: "【物件・建設】", name: "タカサ薬局 医療ビレッジ患者数推移確認", owner: "夫/妻", progress: 30, status: "進行中", deadline: "2026-04-15", note: "三井ホーム(安井氏)がタカサ薬局に確認中。金田エリアの立ち上がり実績を確認し物件判断に活用" },
  { id: "t28e", category: "【物件・建設】", name: "現地見学（候補地）", owner: "夫/妻", progress: 0, status: "未着手", deadline: "2026-05-09", note: "5月9〜10日（土日）。優先順位①袖ケ浦市横田②請西・真舟ドライブ③巌根エリア" },
  { id: "t29", category: "【物件・建設】", name: "建設会社選定・比較検討", owner: "夫/妻", progress: 0, status: "未着手", note: "三井ホーム・他ハウスメーカー・地元工務店を複数比較。土地確定後に本格着手" },
  { id: "t32", category: "【物件・建設】", name: "プラン確定・確認申請提出", owner: "夫", progress: 0, deadline: "2026-10-20", status: "未着手" },
  { id: "t33", category: "【物件・建設】", name: "請負契約", owner: "夫/妻", progress: 0, deadline: "2026-12-01", status: "未着手" },
  { id: "t34", category: "【物件・建設】", name: "地縄・地鎮祭", owner: "夫/妻", progress: 0, deadline: "2027-01-10", status: "未着手" },
  { id: "t35", category: "【物件・建設】", name: "着工", owner: "夫", progress: 0, deadline: "2027-02-20", status: "未着手" },
  { id: "t36", category: "【物件・建設】", name: "上棟", owner: "夫", progress: 0, deadline: "2027-07-25", status: "未着手" },
  { id: "t37", category: "【物件・建設】", name: "竣工・引渡し", owner: "夫/妻", progress: 0, deadline: "2027-08-05", status: "未着手" },
  { id: "t38", category: "【物件・建設】", name: "医院開院（2027年9月初旬）", owner: "夫/妻", progress: 0, deadline: "2027-09-01", status: "未着手", note: "🎯 目標開院日" },
  // 【補助金】
  { id: "t39", category: "【補助金・助成】", name: "千葉県重点医師偏在対策補助金 申請検討", owner: "夫", progress: 10, status: "進行中", note: "施設整備1/2・設備1650万上限1/2・地域定着2/3補助。重点区域確認が必要" },
  { id: "t40", category: "【補助金・助成】", name: "補助金申請書類準備", owner: "夫", progress: 0, status: "未着手", note: "地域医療対策協議会・保険者協議会の合意が必要" },
  // 【取引先・業者交渉】
  { id: "t41", category: "【取引先・業者】", name: "メディセオ面談（4/2 18:00）", owner: "夫", progress: 100, deadline: "2026-04-02", status: "完了", note: "医薬品卸・取引条件確認。2026/4/2実施済。千葉担当：山崎忍氏（090-6910-5732）" },
  { id: "t49", category: "【取引先・業者】", name: "メディセオ山崎氏へ希望条件送付", owner: "夫", progress: 100, deadline: "2026-04-07", status: "完了", note: "君津医療圏内・300坪・幹線道路沿い・ハザード回避・補助金対象エリア必須。池田氏宛に送付済" },
  { id: "t50", category: "【物件・建設】", name: "袖ケ浦二丁目（367坪）ハザードマップ確認", owner: "夫/妻", progress: 0, deadline: "2026-04-14", status: "未着手", note: "三井ホームプロデュース・やや海寄りのため浸水・液状化リスクを最優先確認。OKなら最有力候補" },
  { id: "t51", category: "【物件・建設】", name: "ひらまクリニック見学（平間院長相談）", owner: "夫", progress: 100, deadline: "2026-04-07", status: "完了", note: "建て貸し不可・購入推奨。総事業費3.5億・運転資金厚く確保。甲状腺が外来の半分。電子カルテ：東芝トスニック。卸活用でレントゲン200万円台に値下げ可能" },
  { id: "t52", category: "【補助金・助成】", name: "千葉県医療整備課へ補助金申請状況確認", owner: "夫", progress: 0, deadline: "2026-04-11", status: "未着手", note: "TEL: 043-223-3902 / Mail: d-chibank@mz.pref.chiba.lg.jp。確認事項：申請状況・予算枠・採択実績・土地取得前相談可否" },
  // 【積水ハウス相談 04-02 フォローアップ】
  { id: "t44", category: "【物件・建設】", name: "希望エリア土地情報収集（積水ハウス橋場・安藤氏）", owner: "夫/妻", progress: 0, deadline: "2026-04-30", status: "未着手", note: "木更津・君津・袖ケ浦。条件：300坪以上・前面道路6m以上・下水完備・液状化リスク低" },
  { id: "t45", category: "【補助金・助成】", name: "補助金（最大5,000万円）申請条件・スケジュール調査", owner: "夫", progress: 0, status: "未着手", note: "積水ハウス相談04-02より。申請条件・スケジュールを確認し共有" },
  { id: "t46", category: "【取引先・業者】", name: "クリニックレントシミュレーション作成", owner: "夫/妻", progress: 0, status: "未着手", note: "土地購入との比較資料。賃料・契約期間・事業用定期借家の条件確認" },
  { id: "t47", category: "【医師】戦略・分析", name: "木更津エリア競合クリニック詳細情報収集（積水ハウス安藤・山崎氏）", owner: "夫", progress: 0, status: "未着手", note: "守秘義務範囲内で糖尿病専門医の競合動向を随時収集" },
  { id: "t48", category: "【医師】財務・計画", name: "自己資金・予算感ヒアリング（積水ハウスへ共有）", owner: "夫/妻", progress: 0, deadline: "2026-04-30", status: "未着手", note: "積水ハウス窓口：山崎氏。融資総額4億円超となる場合はレント優先検討" },
  { id: "t42", category: "【取引先・業者】", name: "医療機器メーカー選定・相見積", owner: "夫", progress: 0, status: "未着手" },
  { id: "t43", category: "【取引先・業者】", name: "電子カルテ選定", owner: "夫", progress: 0, status: "未着手" },
];

export const PERIODS = ["2026上", "2026下", "2027上", "2027下", "2028上", "2028下", "2029上"];

export const PROPERTY: PropertyInfo = {
  name: "物件選定中（複数候補を並行検討）",
  address: "【最有力①】袖ケ浦市横田3662（299坪・3,200万円・国道409号沿い）／【最有力②】袖ケ浦二丁目（367坪・三井ホームプロデュース）／【検討中】ウエルシア高柳隣地・清見台・請西南ほか",
  area: "300坪前後を希望（国道16号またはそれに準ずる幹線道路沿い・ロードサイド型・君津医療圏内必須）",
  totalCost: "総事業費3.5億円規模（平間院長実績）。補助金最大約6,000万円（千葉県重点医師偏在対策支援補助金）活用前提",
  openingTarget: "2027年9月初旬",
  subsidy: "千葉県重点医師偏在対策支援補助金（施設整備1/2・設備1/2・地域定着2/3）最大約5,929万円。君津医療圏（木更津・君津・富津・袖ケ浦）内が必須条件",
  builder: "建設会社選定中（建て貸しは不可・購入のみ。三井ホーム・地元工務店を比較検討）",
  scheduleHighlights: [
    { label: "袖ケ浦二丁目ハザードマップ確認", date: "2026年4月中" },
    { label: "千葉県医療整備課へ補助金相談", date: "2026年4月中" },
    { label: "現地見学（土地候補）", date: "2026年5月9〜10日" },
    { label: "🎯 医院開院", date: "2027年9月初旬（目標）" },
  ],
};

export const MEETINGS: Meeting[] = [
  {
    id: "m1",
    date: "2026-04-02",
    time: "18:00",
    title: "メディセオ面談",
    partner: "メディセオ（池田氏）",
    note: "医薬品卸・取引条件確認。希望条件メールを送付済（山崎氏が千葉担当として対応）",
    status: "完了",
  },
  {
    id: "m2",
    date: "2026-04-02",
    time: "18:04",
    title: "積水ハウス相談（岩本先生夫妻）",
    partner: "積水ハウス（橋場氏・安藤氏・山崎氏）",
    note: "糖尿病内科クリニック開業相談。土地条件（300坪・前面道路6m・液状化リスク低）確認。補助金最大5,000万円活用方針。窓口：山崎氏。詳細は相談記録フォルダ参照",
    status: "完了",
  },
  {
    id: "m3",
    date: "2026-04-07",
    title: "ひらまクリニック見学・平間先生相談",
    partner: "ひらまクリニック 平間院長",
    note: "糖尿病専門クリニックの実地見学。主要アドバイス：①建て貸しは契約変更・没収リスクあり→購入推奨 ②総事業費3.5億・運転資金3000万でも不足感 ③銀行30年ローンが楽・政策金融公庫は厳しい ④甲状腺が外来の約半分 ⑤注射患者1人≒一般内科患者4人分の収益 ⑥レントゲン当初800万→600万値引きで200万円台（卸の開業支援活用） ⑦電子カルテは東芝トスニック（オンプレ）⑧予約システムは不使用（電話で選別）⑨1000㎡未満で開発行為回避・駐車場は多め確保",
    status: "完了",
  },
  {
    id: "m5",
    date: "2026-04-07",
    title: "メディセオ山崎氏から土地候補情報受信",
    partner: "メディセオ 山崎忍氏（千葉担当）",
    note: "4件の医療系土地候補＋4件のドラッグストア隣地情報を受信。主要候補：①木更津市清見台南（Kudoカンパニー・かずさのお風呂跡地駐車場）②ウエルシア高柳店隣地③袖ケ浦二丁目367坪（三井ホームプロデュース）。金田エリア・建て貸しは除外方針",
    status: "完了",
  },
  {
    id: "m4",
    date: "2026-05-09",
    title: "現地見学（袖ケ浦市横田・請西・真舟・巌根）",
    partner: "土地エージェント各社",
    note: "5/9〜10の2日間。①袖ケ浦市横田299坪物件②請西・真舟ドライブ③巌根エリア。ハザードマップ・競合地図を持参",
    status: "予定",
  },
];

export const LAND_CANDIDATES: LandCandidate[] = [
  {
    id: "l1",
    rank: "最有力",
    name: "袖ケ浦市横田（国道409号沿い）",
    address: "千葉県袖ケ浦市横田3662",
    area: "989㎡（約299坪）",
    price: "3,200万円（坪単価 約10.7万円）",
    road: "国道409号線沿い",
    zoning: "第1種住居地域（建ぺい率60% / 容積率200%）",
    hazard: "内陸部・津波液状化リスク低。個別確認要",
    rival: "最寄り内科まで約7km（競合実質なし）",
    source: "ハウスドゥ木更津北（有限会社グリーンエース）",
    contact: "TEL: 0438-97-5036",
    note: "更地・確定測量済・即引渡可。ウエルシア薬局が徒歩5分圏内で処方箋連携期待。⚠️埋蔵文化財包蔵地内のため建築前調査要（期間・費用確認必須）",
    mapUrl: "https://maps.google.com/maps?q=千葉県袖ケ浦市横田3662",
  },
  {
    id: "l6",
    rank: "最有力",
    name: "袖ケ浦二丁目（三井ホームプロデュース）",
    address: "千葉県袖ケ浦市袖ケ浦二丁目",
    area: "②区画 367坪",
    price: "未確認（要問い合わせ）",
    road: "袖ケ浦駅徒歩9分・詳細確認要",
    zoning: "未確認（要確認）",
    hazard: "⚠️ やや海寄り → ハザードマップ要確認（最優先）",
    rival: "袖ケ浦デンタルクリニックと道を挟んで隣接",
    source: "メディセオ 山崎忍氏・三井ホームプロデュース",
    contact: "メディセオ山崎氏: 090-6910-5732",
    note: "金田東と同一地主。袖ケ浦市＝君津医療圏内・補助金対象✅。367坪と広さ十分。ハザードマップ確認が最優先アクション",
    mapUrl: "https://maps.google.com/maps?q=千葉県袖ケ浦市袖ケ浦二丁目",
  },
  {
    id: "l7",
    rank: "候補",
    name: "ウエルシア木更津高柳店 隣地",
    address: "木更津市高柳2-3-27 向かい北側空き地",
    area: "未確認（要問い合わせ）",
    price: "未確認（交渉物件）",
    road: "房総縦貫270号沿い",
    zoning: "未確認（要確認）",
    hazard: "内陸側・個別確認要",
    rival: "競合確認要",
    source: "メディセオ 山崎忍氏",
    contact: "メディセオ山崎氏: 090-6910-5732",
    note: "270号沿い・既存住宅地あり・整形地確保の可否が判断の鍵。交渉物件のため条件は未確定",
    mapUrl: "https://maps.google.com/maps?q=千葉県木更津市高柳2-3-27",
  },
  {
    id: "l8",
    rank: "候補",
    name: "木更津市清見台（Kudoカンパニープロデュース）",
    address: "木更津市清見台南5-1-40",
    area: "未確認（駐車場敷地）",
    price: "未確認（募集資料なし）",
    road: "清見台中央通り沿い",
    zoning: "未確認（要確認）",
    hazard: "内陸側・個別確認要",
    rival: "ほたるのセントラル内科と車2分（至近）⚠️",
    source: "メディセオ 山崎忍氏・Kudoカンパニー",
    contact: "メディセオ山崎氏: 090-6910-5732",
    note: "かずさのお風呂（Kudoカンパニー経営）・みるみる内科・とみざわ薬局が隣接。生活動線上の好立地だが、ほたるの内科と至近なのが最大の懸念",
    mapUrl: "https://maps.google.com/maps?q=木更津市清見台南5-1-40",
  },
  {
    id: "l2",
    rank: "候補",
    name: "木更津市 巌根エリア（4車線道路沿い）",
    address: "木更津市（詳細は問い合わせにて確認）",
    area: "約189坪（約625㎡）",
    price: "非公開（要問い合わせ）",
    road: "4車線幹線道路沿い",
    zoning: "準住居地域",
    hazard: "巌根駅周辺（ハザードマップ個別確認要）",
    rival: "ほたるのセントラル内科から約3km以上",
    source: "立和コーポレーション（物件番号: BLC31519）",
    contact: "https://www.tatsuwa.com/",
    note: "視認性◎。面積が300坪に満たないため隣接地追加取得か設計工夫が必要。類似の非公開物件紹介も依頼推奨",
    mapUrl: "https://maps.google.com/maps?q=木更津市巌根",
  },
  {
    id: "l3",
    rank: "候補",
    name: "木更津市 請西南エリア",
    address: "木更津市請西南（詳細は業者確認）",
    area: "300坪前後を探索中",
    price: "坪単価 20〜35万円程度（住宅地相場）",
    road: "国道16号・県道木更津富津線沿い",
    zoning: "未確認（要確認）",
    hazard: "内陸高台のため液状化・浸水リスク低",
    rival: "ほたるのセントラル内科まで約2〜3km確保可能",
    source: "三井ホーム・地元業者（サンワエステート等）",
    note: "人口増加中の新興住宅地。ファミリー層多くイオン木更津近接。まとまった事業用地が出にくいため業者への積極的な働きかけが必要",
    mapUrl: "https://maps.google.com/maps?q=木更津市請西南",
  },
  {
    id: "l4",
    rank: "候補",
    name: "袖ケ浦市 蔵波台・福王台エリア",
    address: "袖ケ浦市蔵波台・福王台周辺",
    area: "300坪前後を探索中",
    price: "坪単価 15〜30万円程度",
    road: "県道袖ケ浦停車場線・幹線道路沿い",
    zoning: "未確認（要確認）",
    hazard: "高台エリアのため地盤安定・海側より安全",
    rival: "糖尿病・内分泌専門クリニック実質不在（ブルーオーシャン）",
    source: "地元業者（サンワエステート等）",
    note: "袖ケ浦市内に糖尿病専門医が少なく早期集患が期待できる。木更津市境に近く両市の患者取り込み可。国道16号直沿いは工業地域が多く一本入った道路が現実的",
    mapUrl: "https://maps.google.com/maps?q=袖ケ浦市蔵波台",
  },
  {
    id: "l5",
    rank: "参考",
    name: "袖ケ浦市蔵波（地価参考）",
    address: "千葉県袖ケ浦市蔵波",
    area: "317㎡（約96坪）※面積不足",
    price: "750万円（坪単価 約7.8万円）",
    road: "公道沿い",
    zoning: "第1種低層住居専用地域",
    hazard: "長浦駅近接（詳細確認要）",
    rival: "蔵波台ハートクリニックから約1km",
    source: "ハウスドゥ",
    note: "面積が大幅不足のため単独利用は困難。蔵波エリアの地価水準の参考として活用。隣接地との合筆や類似物件探索の足がかりに",
    mapUrl: "https://maps.google.com/maps?q=千葉県袖ケ浦市蔵波",
  },
];

export const LOCAL_AGENTS: LocalAgent[] = [
  { rank: 1, name: "メディセオ 山崎忍（千葉担当）", feature: "医薬品卸の開業支援部。医療機器の大幅値引き交渉・土地候補情報提供・診療圏分析が可能", focus: "土地候補情報の継続提供・診療圏分析依頼・医療機器見積取得", contact: "090-6910-5732 / 005364yamazaki@mediceo-gp.com" },
  { rank: 2, name: "立和コーポレーション", feature: "事業用地・工場・倉庫等の事業用不動産専門。非公開物件を多数保有", focus: "「医療用ロードサイド300坪」と指定し非公開物件の紹介を依頼", contact: "https://www.tatsuwa.com/" },
  { rank: 3, name: "株式会社サンワエステート", feature: "木更津・君津・袖ケ浦に特化した地域密着型。地元地主ネットワーク強", focus: "請西・真舟エリアの未公開事業用地（農地転用含む）の有無を確認", contact: "https://sanwa-ko.co.jp/" },
  { rank: 4, name: "アール不動産", feature: "木更津市周辺の物件情報が豊富。ロードサイド事業用地の実績あり", focus: "巌根〜金田エリアの幹線道路沿い物件を相談", contact: "https://www.r-f.jp/" },
  { rank: 5, name: "三共土地建物", feature: "木更津・君津エリアで大家との直接取引数が多く未公開物件に強い", focus: "「直接取引の事業用地」として土地活用提案を依頼", contact: "https://sankyott.co.jp/" },
  { rank: 6, name: "ハウスドゥ 木更津北（有限会社グリーンエース）", feature: "袖ケ浦市横田物件の取扱業者。地元密着で木更津北エリアに強い", focus: "横田物件の詳細確認と類似物件の紹介依頼", contact: "TEL: 0438-97-5036" },
  { rank: 7, name: "三井ホーム（安井様・大竹様）", feature: "袖ケ浦二丁目・金田東・袖ケ浦駅前などプロデュース物件あり。ラフプラン作成可", focus: "袖ケ浦二丁目367坪の詳細確認・ハザードマップ確認・建設費見積", contact: "三井ホーム 安井様・大竹様" },
];
