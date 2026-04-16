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
      "使用 Odoo 預設模板，與專業醫美品牌形象不符",
      "配色不一致 — 金色文字搭配預設藍色按鈕，缺乏統一視覺語言",
      "Icon 使用大拇指、握手、咖啡杯等通用圖示，與醫美產業完全脫鉤",
      "首頁堆疊 6 張大圖，缺乏設計層次與視覺引導",
    ],
    type: "bullets" as const,
  },
  {
    id: 5,
    title: "內容優化空間",
    subtitle: "幾個可以立即提升的細節",
    items: [
      { icon: "◈", text: "好評分享頁面目前尚無內容，補上真實案例可大幅提升信任感" },
      { icon: "◈", text: "療程項目缺少獨立說明頁，訪客無法深入了解各療程細節" },
      { icon: "◈", text: "建議增設「療程前後對比」案例區，用真實照片大幅提升說服力" },
      { icon: "◈", text: "加入「醫師專欄」或醫美知識文章，建立品牌專業權威形象" },
      { icon: "◇", text: "多語系內容可再完善，把握韓國醫美的國際客群商機" },
    ],
    type: "issues" as const,
  },
  {
    id: 6,
    title: "功能升級建議",
    subtitle: "提升轉換率的關鍵功能",
    items: [
      { label: "預約流程簡化", desc: "現有表單欄位較多（14 種勾選 + 8 種病史），可拆分為引導式 3 步驟，降低填寫壓力" },
      { label: "LINE 即時聯繫", desc: "加入浮動按鈕，讓訪客一鍵聯繫，大幅降低諮詢門檻" },
      { label: "會員體驗升級", desc: "現有會員功能可再強化 — 加入行程追蹤、術後提醒、專屬顧問等功能" },
      { label: "數據追蹤佈建", desc: "導入 GA4 + GTM + FB Pixel，讓每一筆流量都有數據可分析" },
    ],
    type: "features" as const,
  },
  {
    id: 7,
    title: "服務流程視覺化",
    subtitle: "讓客戶一眼看懂整趟旅程",
    description: "現有服務頁已有完整的 4 步驟流程內容，這是很好的基礎。我們建議升級為視覺化互動時間軸，搭配動態效果，讓每一步都更生動直覺。",
    type: "timeline-preview" as const,
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
