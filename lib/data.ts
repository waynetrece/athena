export const slideData = [
  {
    id: 1,
    title: "Athena 韓境美學",
    subtitle: "網站優化提案",
    type: "cover" as const,
  },
  {
    id: 2,
    title: "我們深度分析了您的網站",
    items: [
      "HTML 原始碼逐行檢查",
      "SEO 標籤與搜尋排名分析",
      "設計風格與使用者體驗評估",
      "功能完整性與競品對比",
      "效能與安全性檢測",
    ],
    type: "list" as const,
  },
  {
    id: 3,
    title: "SEO 問題",
    subtitle: "搜尋引擎完全看不到您",
    items: [
      { label: "網站標題", bad: "Home | My Website", good: "Athena 韓境美學 — 韓國頂尖醫美代辦" },
      { label: "網站描述", bad: "This is the homepage of the website", good: "專業韓國醫美代辦，KFDA認證醫師..." },
      { label: "Google Analytics", bad: "完全未安裝", good: "追蹤流量、分析轉換" },
      { label: "結構化數據", bad: "無", good: "Schema.org 醫療機構標記" },
    ],
    type: "comparison" as const,
  },
  {
    id: 4,
    title: "設計問題",
    subtitle: "網站缺乏品牌識別度",
    items: [
      "使用 Odoo 預設模板，與高端醫美定位不符",
      "配色不一致 — 金色文字 + 預設藍色按鈕",
      "Icon 使用大拇指、握手、咖啡杯，與醫美無關",
      "Footer 顯示「由 Odoo 驅動 - 建立一個免費的網站」",
      "首頁堆疊 6 張大圖，缺乏設計層次",
    ],
    type: "bullets" as const,
  },
  {
    id: 5,
    title: "內容缺口",
    subtitle: "關鍵內容缺失或有錯誤",
    items: [
      { icon: "⚠️", text: "好評分享頁面 — 完全空白，零內容" },
      { icon: "⚠️", text: "療程項目 — 沒有任何具體療程說明頁" },
      { icon: "🐛", text: "服務頁面 — 殘留「寫些東西...」佔位文字" },
      { icon: "🐛", text: "Footer email — gangnamtyle 少了一個 s" },
      { icon: "🐛", text: "英文版導航 — Inquriey 拼字錯誤" },
    ],
    type: "issues" as const,
  },
  {
    id: 6,
    title: "功能缺口",
    subtitle: "缺少轉換的關鍵功能",
    items: [
      { label: "線上預約系統", desc: "客戶只能填超長表單（14 種勾選 + 8 種病史）" },
      { label: "LINE 浮動按鈕", desc: "最低門檻的即時聯繫入口，完全沒有" },
      { label: "會員系統", desc: "有「成為會員」按鈕，但功能是空的" },
      { label: "流量追蹤", desc: "無 GA / GTM / FB Pixel，所有數據遺失" },
    ],
    type: "features" as const,
  },
  {
    id: 7,
    title: "服務流程的優化方向",
    subtitle: "從純文字 → 視覺化旅程",
    description: "現有服務頁有好的內容基礎（4 步驟流程），但呈現方式需要升級為視覺化時間軸，讓客戶一眼就能理解整趟旅程。",
    type: "timeline-preview" as const,
  },
  {
    id: 8,
    title: "與國際標竿的差距",
    items: [
      { name: "Beverly Hills Med Spa", feature: "奢華感 + 社會證明 + 媒體曝光" },
      { name: "VIO Med Spa", feature: "極簡設計 + 首頁影片 + 多據點" },
      { name: "星采星和 (台灣)", feature: "14,000+ 案例 + VIP 會員 + 全台分院" },
    ],
    type: "competitors" as const,
  },
  {
    id: 9,
    title: "我們的方案",
    subtitle: "全新品牌官網 + 預約系統 + 會員中心",
    items: [
      "S22 奢華黑金設計語言，匹配韓國醫美高端定位",
      "3 步驟簡化預約，降低諮詢門檻",
      "會員行程追蹤，從諮詢到術後全程數位化",
      "SEO 優化 + GA4 + 社群追蹤完整佈建",
    ],
    cta: { label: "接下來，讓我們直接展示 →", href: "/" },
    type: "solution" as const,
  },
];

export const painPoints = [
  { icon: "🗣️", title: "語言不通", description: "到了韓國，跟醫生溝通全靠比手畫腳？萬一術中有狀況，誰來幫你翻譯？" },
  { icon: "🏥", title: "不知道找誰", description: "網路上韓國診所上千家，哪些有認證？哪些是觀光客價格？怎麼分辨？" },
  { icon: "🩹", title: "術後沒人顧", description: "手術做完回台灣，恢復期出問題找誰？跨國回診太麻煩？" },
];

export const advantages = [
  { icon: "🏅", title: "KFDA 認證合作", value: "100%", desc: "僅合作韓國食藥署認證頂尖醫院" },
  { icon: "👤", title: "全程專人陪同", value: "24hr", desc: "從出發到回程，專屬顧問時刻守護" },
  { icon: "🌐", title: "中韓醫療翻譯", value: "0", suffix: "溝通障礙", desc: "專業醫療翻譯陪同問診" },
  { icon: "🛡️", title: "雙重保險保障", value: "2", suffix: "重保障", desc: "旅遊平安險 + 醫師責任險" },
];

export const timelineSteps = [
  { day: "Day 1", title: "專業諮詢", desc: "醫美顧問一對一評估，量身定制最適方案", icon: "💬" },
  { day: "Day 2", title: "出發入住", desc: "機場接送、入住江南福朋喜來登四星飯店", icon: "✈️" },
  { day: "Day 3", title: "手術日", desc: "PASCAL Clinic 專業團隊施術，全程翻譯陪同", icon: "⭐" },
  { day: "Day 4", title: "術後休養", desc: "專人照護、回診追蹤，確保恢復順利", icon: "🩺" },
  { day: "Day 5", title: "觀光回程", desc: "江南區星空圖書館、新世界商場，滿足購物美食", icon: "🎉" },
];

export const treatments = [
  { id: "eyes", title: "眼部整形", items: ["雙眼皮手術", "眼袋去除", "眼瞼下垂矯正"], doctor: "SAFI Kang MD, PhD" },
  { id: "nose", title: "鼻部整形", items: ["鼻樑增高", "鼻頭塑形", "重建性鼻整形"], doctor: "Donghak Jung MD, PhD" },
  { id: "face", title: "微整注射", items: ["肉毒桿菌", "玻尿酸填充", "皮秒雷射"], doctor: "Kwang-Il Kim MD" },
  { id: "body", title: "私密整形", items: ["女性私密整形", "男性增大手術", "產後修復"], doctor: "Jeong-Ho Seo MD, PhD" },
];

export const doctors = [
  { name: "SAFI Kang MD, PhD", title: "PASCAL Clinic 院長", specialty: "眼瞼整形 / 臉部抽脂塑形", org: "韓國美容整形醫學院 創辦人" },
  { name: "Donghak Jung MD, PhD", title: "PASCAL Clinic 院長", specialty: "重建性鼻整形", org: "KCCS 教授" },
  { name: "Kwang-Il Kim MD", title: "PASCAL Clinic 院長", specialty: "微整形 / 皮膚美容雷射", org: "韓國拉提研究協會 秘書長" },
  { name: "KIM Jin Hong MD PhD", title: "PASCAL Clinic 特邀院長", specialty: "男性增大手術 / 變性手術", org: "ESGURS 教學團隊" },
];

export const faqItems = [
  { q: "赴韓醫美的費用大概多少？", a: "依療程不同，費用範圍從 NT$50,000（微整注射）到 NT$300,000+（整形手術）。我們提供完整的套裝方案，包含機票、住宿、手術、翻譯等費用，諮詢時會給您詳細報價。" },
  { q: "手術安全嗎？出問題怎麼辦？", a: "我們僅合作 KFDA 認證的頂尖醫院，所有醫師都是韓國美容整形醫學院教授級。同時提供旅遊平安險及醫師責任險雙重保障，術後回台也有追蹤服務。" },
  { q: "語言不通怎麼辦？", a: "全程配備專業中韓醫療翻譯，從問診、手術到術後叮嚀，每一個環節都有翻譯陪同，溝通零障礙。" },
  { q: "術後需要多久恢復？", a: "微整注射當天即可外出，整形手術通常 3-5 天可基本恢復。我們會在韓國期間安排回診，回台後持續追蹤至完全恢復。" },
  { q: "住宿和交通怎麼安排？", a: "統一入住首爾江南福朋喜來登四星飯店，機場接送採用 7 人座商務車。行程期間也安排江南區觀光、購物和美食體驗。" },
];

export const bookingServices = [
  { id: "eyes", label: "眼部整形", icon: "👁️" },
  { id: "nose", label: "鼻部整形", icon: "👃" },
  { id: "face", label: "臉部微整", icon: "✨" },
  { id: "body", label: "體雕抽脂", icon: "💪" },
  { id: "intimate", label: "私密整形", icon: "🔒" },
  { id: "skin", label: "皮膚美容", icon: "🌟" },
];

export const timeSlots = [
  "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30",
];
