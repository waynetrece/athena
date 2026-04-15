# Athena Proposal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a proposal presentation + homepage demo + booking demo for Athena 韓境美學 client meeting on 2026-04-16.

**Architecture:** Next.js 15 App Router with three routes: `/slides` (presentation), `/` (homepage demo), `/booking` (booking demo). All share a common S22 Luxury Gold design system. GSAP handles scroll animations, Motion handles component transitions.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Motion (Framer Motion), GSAP + ScrollTrigger, Vercel deployment.

**TDD:** Skipped — this is a UI demo/landing page prototype (per project rules).

---

## File Structure

```
athena-proposal/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, metadata, body class
│   ├── globals.css                # Tailwind directives + S22 custom properties
│   ├── page.tsx                   # Homepage demo (imports home sections)
│   ├── slides/
│   │   └── page.tsx               # Presentation slides
│   └── booking/
│       └── page.tsx               # Booking demo
├── components/
│   ├── ui/
│   │   ├── button.tsx             # Gold CTA button with hover glow
│   │   ├── card.tsx               # Gold-bordered card
│   │   ├── gold-divider.tsx       # 0.5px gold hairline separator
│   │   └── section-wrapper.tsx    # Scroll-reveal wrapper
│   ├── layout/
│   │   ├── navbar.tsx             # Fixed top navbar with anchor links
│   │   ├── footer.tsx             # Contact + social + copyright
│   │   └── line-float.tsx         # Floating LINE button (bottom-right)
│   ├── home/
│   │   ├── hero.tsx               # Full-screen hero with SplitText
│   │   ├── pain-points.tsx        # 3 fear cards
│   │   ├── why-athena.tsx         # 4 advantages with counters
│   │   ├── service-timeline.tsx   # Day 1-5 scroll-driven timeline
│   │   ├── treatments.tsx         # 4 treatment cards
│   │   ├── doctor-team.tsx        # Doctor profile cards
│   │   ├── faq.tsx                # 5-item accordion
│   │   └── cta-section.tsx        # Final CTA with gold pulse
│   ├── slides/
│   │   ├── slide-container.tsx    # Keyboard nav + page indicator
│   │   └── slide-content.tsx      # Individual slide layouts
│   └── booking/
│       ├── booking-flow.tsx       # 3-step state machine
│       ├── step-service.tsx       # Service selection grid
│       ├── step-schedule.tsx      # Calendar + time picker
│       ├── step-contact.tsx       # Contact form
│       ├── booking-complete.tsx   # Confirmation screen
│       └── member-preview.tsx     # Member dashboard mock
├── lib/
│   ├── gsap-register.ts          # GSAP plugin registration (client-only)
│   └── data.ts                   # All content data (slides, treatments, doctors, FAQ)
├── public/
│   └── images/                   # Placeholder images
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Task 1: Project Scaffolding + Design System

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`
- Create: `app/layout.tsx`, `app/globals.css`
- Create: `lib/gsap-register.ts`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/waynechen/01_開發專案/athena-proposal
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --turbopack --yes
```

- [ ] **Step 2: Install dependencies**

```bash
npm install motion gsap @gsap/react
npm install @fontsource/playfair-display @fontsource/inter
```

- [ ] **Step 3: Configure Tailwind with S22 tokens**

`tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          dim: "#C5A037",
          muted: "rgba(212, 175, 55, 0.3)",
        },
        obsidian: {
          DEFAULT: "#000000",
          light: "#0A0A0A",
          card: "#111111",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.3)",
        "gold-lg": "0 0 40px rgba(212, 175, 55, 0.4)",
      },
      borderWidth: {
        hairline: "0.5px",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Set up globals.css with S22 custom properties**

`app/globals.css`:
```css
@import "tailwindcss";
@import "@fontsource/playfair-display/400.css";
@import "@fontsource/playfair-display/700.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";

@theme {
  --color-gold: #D4AF37;
  --color-gold-dim: #C5A037;
  --color-gold-muted: rgba(212, 175, 55, 0.3);
  --color-obsidian: #000000;
  --color-obsidian-light: #0A0A0A;
  --color-obsidian-card: #111111;
  --font-serif: "Playfair Display", serif;
  --font-sans: "Inter", sans-serif;
  --shadow-gold: 0 0 20px rgba(212, 175, 55, 0.3);
  --shadow-gold-lg: 0 0 40px rgba(212, 175, 55, 0.4);
}

body {
  background: #000000;
  color: #E5E5E5;
  font-family: var(--font-sans);
}

::selection {
  background: rgba(212, 175, 55, 0.3);
  color: #D4AF37;
}

/* Gold hairline utility */
.gold-hairline {
  border-color: rgba(212, 175, 55, 0.3);
  border-width: 0.5px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Gold gradient text */
.text-gold-gradient {
  background: linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gold pulse animation for CTA */
@keyframes gold-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.2); }
  50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.5); }
}
.animate-gold-pulse {
  animation: gold-pulse 3s ease-in-out infinite;
}
```

- [ ] **Step 5: Set up root layout with fonts and metadata**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athena 韓境美學 — 網站優化提案",
  description: "韓國頂尖醫美，台灣安心出發",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="bg-obsidian text-neutral-200 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create GSAP registration utility**

`lib/gsap-register.ts`:
```typescript
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 7: Create content data file**

`lib/data.ts` — all text content centralized:
```typescript
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
      { label: "網站標題", bad: 'Home | My Website', good: 'Athena 韓境美學 — 韓國頂尖醫美代辦' },
      { label: "網站描述", bad: 'This is the homepage of the website', good: '專業韓國醫美代辦，KFDA認證醫師...' },
      { label: "Google Analytics", bad: '完全未安裝', good: '追蹤流量、分析轉換' },
      { label: "結構化數據", bad: '無', good: 'Schema.org 醫療機構標記' },
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
  {
    icon: "🗣️",
    title: "語言不通",
    description: "到了韓國，跟醫生溝通全靠比手畫腳？萬一術中有狀況，誰來幫你翻譯？",
  },
  {
    icon: "🏥",
    title: "不知道找誰",
    description: "網路上韓國診所上千家，哪些有認證？哪些是觀光客價格？怎麼分辨？",
  },
  {
    icon: "🩹",
    title: "術後沒人顧",
    description: "手術做完回台灣，恢復期出問題找誰？跨國回診太麻煩？",
  },
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
  {
    q: "赴韓醫美的費用大概多少？",
    a: "依療程不同，費用範圍從 NT$50,000（微整注射）到 NT$300,000+（整形手術）。我們提供完整的套裝方案，包含機票、住宿、手術、翻譯等費用，諮詢時會給您詳細報價。",
  },
  {
    q: "手術安全嗎？出問題怎麼辦？",
    a: "我們僅合作 KFDA 認證的頂尖醫院，所有醫師都是韓國美容整形醫學院教授級。同時提供旅遊平安險及醫師責任險雙重保障，術後回台也有追蹤服務。",
  },
  {
    q: "語言不通怎麼辦？",
    a: "全程配備專業中韓醫療翻譯，從問診、手術到術後叮嚀，每一個環節都有翻譯陪同，溝通零障礙。",
  },
  {
    q: "術後需要多久恢復？",
    a: "微整注射當天即可外出，整形手術通常 3-5 天可基本恢復。我們會在韓國期間安排回診，回台後持續追蹤至完全恢復。",
  },
  {
    q: "住宿和交通怎麼安排？",
    a: "統一入住首爾江南福朋喜來登四星飯店，機場接送採用 7 人座商務車。行程期間也安排江南區觀光、購物和美食體驗。",
  },
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
```

- [ ] **Step 8: Verify dev server starts**

```bash
cd /Users/waynechen/01_開發專案/athena-proposal && npm run dev
```

Open http://localhost:3000 — should see black page with no errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: project scaffolding with S22 design tokens and content data"
```

---

## Task 2: Shared UI Components

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/gold-divider.tsx`
- Create: `components/ui/section-wrapper.tsx`

- [ ] **Step 1: Create Button component**

`components/ui/button.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  className?: string;
};

export function Button({ children, href, variant = "primary", onClick, className = "" }: ButtonProps) {
  const base = "inline-block px-8 py-3 font-sans text-sm tracking-widest uppercase transition-all duration-300";
  const variants = {
    primary: "bg-gold text-black hover:shadow-gold-lg",
    outline: "border-hairline border-gold text-gold hover:bg-gold/10",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, boxShadow: "0 0 30px rgba(212,175,55,0.4)" },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.3 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={cls}>{children}</Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...motionProps} className={cls} onClick={onClick}>
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: Create Card component**

`components/ui/card.tsx`:
```tsx
"use client";

import { motion } from "motion/react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-obsidian-card border-hairline border-gold/20 p-6 ${className}`}
      whileHover={hover ? { borderColor: "rgba(212,175,55,0.5)", boxShadow: "0 0 20px rgba(212,175,55,0.15)" } : undefined}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create GoldDivider and SectionWrapper**

`components/ui/gold-divider.tsx`:
```tsx
export function GoldDivider({ className = "" }: { className?: string }) {
  return <div className={`w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent ${className}`} />;
}
```

`components/ui/section-wrapper.tsx`:
```tsx
"use client";

import { motion } from "motion/react";

type SectionWrapperProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export function SectionWrapper({ children, id, className = "" }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`py-24 px-6 md:px-12 lg:px-24 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: shared UI components — Button, Card, GoldDivider, SectionWrapper"
```

---

## Task 3: Layout Shell (Navbar + Footer + LINE Button)

**Files:**
- Create: `components/layout/navbar.tsx`
- Create: `components/layout/footer.tsx`
- Create: `components/layout/line-float.tsx`

- [ ] **Step 1: Create Navbar**

`components/layout/navbar.tsx`:
```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "服務流程", href: "#timeline" },
  { label: "療程項目", href: "#treatments" },
  { label: "醫師團隊", href: "#doctors" },
  { label: "常見問題", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.02);
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-gold/10" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-gold text-xl tracking-wider">
            Athena
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-gold transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <Button href="/booking" variant="primary" className="text-xs py-2 px-6">
              預約諮詢
            </Button>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
```

- [ ] **Step 2: Create Footer**

`components/layout/footer.tsx`:
```tsx
import { GoldDivider } from "@/components/ui/gold-divider";

export function Footer() {
  return (
    <footer className="py-16 px-6">
      <GoldDivider className="mb-12" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-sm text-neutral-500">
        <div>
          <h4 className="font-serif text-gold text-lg mb-4">Athena 韓境美學</h4>
          <p className="leading-relaxed">
            您通往韓國頂尖醫美的安心橋樑。<br />
            KFDA 認證合作，全程專人陪同。
          </p>
        </div>
        <div>
          <h4 className="text-gold text-sm tracking-widest uppercase mb-4">聯絡我們</h4>
          <ul className="space-y-2">
            <li>📍 台北市中山區遼寧街76巷4號1樓</li>
            <li>📧 service@gangnamstyle.com.tw</li>
            <li>📱 LINE 官方帳號</li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold text-sm tracking-widest uppercase mb-4">社群</h4>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/GNAthena.tw" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Facebook</a>
            <a href="https://www.instagram.com/gnathena.tw/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gold/10 text-center text-xs text-neutral-600">
        © 2026 江南時代企業有限公司 Gangnamstyle CO., LTD. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create LINE floating button**

`components/layout/line-float.tsx`:
```tsx
"use client";

import { motion } from "motion/react";

export function LineFloat() {
  return (
    <motion.a
      href="https://lin.ee/uy9vYWW"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#06C755] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      aria-label="LINE 諮詢"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    </motion.a>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/
git commit -m "feat: layout shell — Navbar with scroll progress, Footer, LINE float button"
```

---

## Task 4: Presentation Slides `/slides`

**Files:**
- Create: `components/slides/slide-container.tsx`
- Create: `components/slides/slide-content.tsx`
- Create: `app/slides/page.tsx`

- [ ] **Step 1: Create SlideContainer (keyboard nav + page indicator)**

`components/slides/slide-container.tsx`:
```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { slideData } from "@/lib/data";
import { SlideContent } from "./slide-content";

export function SlideContainer() {
  const [current, setCurrent] = useState(0);
  const total = slideData.length;

  const goTo = useCallback((n: number) => {
    if (n >= 0 && n < total) setCurrent(n);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative select-none">
      {/* Click zones */}
      <div className="absolute inset-0 flex z-10">
        <div className="w-1/3 cursor-pointer" onClick={() => goTo(current - 1)} />
        <div className="w-1/3" />
        <div className="w-1/3 cursor-pointer" onClick={() => goTo(current + 1)} />
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full flex items-center justify-center px-12 md:px-24"
        >
          <SlideContent slide={slideData[current]} />
        </motion.div>
      </AnimatePresence>

      {/* Page indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slideData.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 transition-all duration-300 ${
              i === current ? "bg-gold w-8" : "bg-gold/30 hover:bg-gold/50"
            }`}
          />
        ))}
      </div>

      {/* Page number */}
      <div className="absolute bottom-8 right-8 text-gold/40 text-sm font-sans z-20">
        {current + 1} / {total}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create SlideContent (renders each slide type)**

`components/slides/slide-content.tsx` — renders different layouts based on slide type:
```tsx
import Link from "next/link";
import type { slideData } from "@/lib/data";

type Slide = (typeof slideData)[number];

export function SlideContent({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case "cover":
      return (
        <div className="text-center">
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-6">Proposal</p>
          <h1 className="font-serif text-gold text-5xl md:text-7xl mb-4">{slide.title}</h1>
          <p className="text-neutral-400 text-xl">{slide.subtitle}</p>
          <div className="mt-12 w-24 h-px bg-gold/30 mx-auto" />
          <p className="mt-6 text-neutral-600 text-sm">按 → 或點擊右側繼續</p>
        </div>
      );

    case "list":
      return (
        <div className="max-w-2xl">
          <h2 className="font-serif text-gold text-3xl md:text-5xl mb-12">{slide.title}</h2>
          <ul className="space-y-4">
            {slide.items.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-neutral-300">
                <span className="text-gold mt-1">✦</span>
                <span className="text-lg">{item as string}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "comparison":
      return (
        <div className="max-w-3xl w-full">
          <h2 className="font-serif text-gold text-3xl md:text-4xl mb-2">{slide.title}</h2>
          <p className="text-neutral-500 mb-10">{slide.subtitle}</p>
          <div className="space-y-6">
            {(slide.items as Array<{ label: string; bad: string; good: string }>).map((item, i) => (
              <div key={i} className="grid grid-cols-[120px_1fr_1fr] gap-4 items-start">
                <span className="text-neutral-500 text-sm pt-1">{item.label}</span>
                <div className="bg-red-950/30 border border-red-900/30 p-3">
                  <span className="text-red-400 text-xs block mb-1">現狀</span>
                  <span className="text-red-300 text-sm">{item.bad}</span>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/30 p-3">
                  <span className="text-emerald-400 text-xs block mb-1">應該是</span>
                  <span className="text-emerald-300 text-sm">{item.good}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "bullets":
      return (
        <div className="max-w-2xl">
          <h2 className="font-serif text-gold text-3xl md:text-4xl mb-2">{slide.title}</h2>
          <p className="text-neutral-500 mb-10">{slide.subtitle}</p>
          <ul className="space-y-4">
            {(slide.items as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-300">
                <span className="text-red-400 mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "issues":
      return (
        <div className="max-w-2xl">
          <h2 className="font-serif text-gold text-3xl md:text-4xl mb-2">{slide.title}</h2>
          <p className="text-neutral-500 mb-10">{slide.subtitle}</p>
          <ul className="space-y-4">
            {(slide.items as Array<{ icon: string; text: string }>).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-300 bg-obsidian-card border border-gold/10 p-4">
                <span className="text-xl">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "features":
      return (
        <div className="max-w-2xl">
          <h2 className="font-serif text-gold text-3xl md:text-4xl mb-2">{slide.title}</h2>
          <p className="text-neutral-500 mb-10">{slide.subtitle}</p>
          <div className="space-y-4">
            {(slide.items as Array<{ label: string; desc: string }>).map((item, i) => (
              <div key={i} className="border-l-2 border-gold/50 pl-4">
                <h4 className="text-gold font-medium">{item.label}</h4>
                <p className="text-neutral-400 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "timeline-preview":
      return (
        <div className="max-w-2xl">
          <h2 className="font-serif text-gold text-3xl md:text-4xl mb-2">{slide.title}</h2>
          <p className="text-neutral-500 mb-10">{slide.subtitle}</p>
          <p className="text-neutral-300 leading-relaxed mb-8">{slide.description}</p>
          <div className="flex items-center gap-2">
            {["諮詢", "出發", "手術", "休養", "回程"].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-10 h-10 border border-gold/50 flex items-center justify-center text-gold text-xs">{i + 1}</div>
                <span className="text-neutral-400 text-sm">{step}</span>
                {i < 4 && <div className="w-6 h-px bg-gold/30" />}
              </div>
            ))}
          </div>
        </div>
      );

    case "competitors":
      return (
        <div className="max-w-2xl">
          <h2 className="font-serif text-gold text-3xl md:text-4xl mb-10">{slide.title}</h2>
          <div className="space-y-6">
            {(slide.items as Array<{ name: string; feature: string }>).map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-b border-gold/10 pb-4">
                <span className="text-gold text-lg">✦</span>
                <div>
                  <h4 className="text-gold">{item.name}</h4>
                  <p className="text-neutral-400 text-sm mt-1">{item.feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "solution":
      return (
        <div className="max-w-2xl text-center">
          <h2 className="font-serif text-gold text-3xl md:text-5xl mb-2">{slide.title}</h2>
          <p className="text-neutral-500 mb-10">{slide.subtitle}</p>
          <ul className="space-y-3 text-left inline-block">
            {(slide.items as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-300">
                <span className="text-gold mt-0.5">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {slide.cta && (
            <div className="mt-12">
              <Link
                href={slide.cta.href}
                className="inline-block bg-gold text-black px-10 py-4 text-sm tracking-widest uppercase hover:shadow-gold-lg transition-shadow"
              >
                {slide.cta.label}
              </Link>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
```

- [ ] **Step 3: Create slides page**

`app/slides/page.tsx`:
```tsx
import { SlideContainer } from "@/components/slides/slide-container";

export default function SlidesPage() {
  return <SlideContainer />;
}
```

- [ ] **Step 4: Verify slides work**

Open http://localhost:3000/slides — test keyboard ← → navigation, click navigation, page indicator.

- [ ] **Step 5: Commit**

```bash
git add app/slides/ components/slides/
git commit -m "feat: presentation slides — 9-page proposal with keyboard navigation"
```

---

## Task 5: Homepage — Hero + Pain Points + Why Athena

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/pain-points.tsx`
- Create: `components/home/why-athena.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Hero with GSAP SplitText-style animation**

`components/home/hero.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { Button } from "@/components/ui/button";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const titleText = "韓國頂尖醫美 台灣安心出發";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian-light to-obsidian" />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.3) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Athena 韓境美學
        </motion.p>

        <h1 ref={titleRef} className="font-serif text-4xl md:text-6xl lg:text-7xl text-gold leading-tight mb-6">
          {titleText.split("").map((char, i) => (
            <span key={i} className="char inline-block" style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <motion.p
          className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          KFDA 認證醫師團隊 · 全程中韓翻譯陪同 · 雙重保險保障
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Button href="/booking">立即預約諮詢</Button>
          <Button href="#timeline" variant="outline">了解服務流程</Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Create PainPoints**

`components/home/pain-points.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { painPoints } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Card } from "@/components/ui/card";

export function PainPoints() {
  return (
    <SectionWrapper>
      <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">
        Common Concerns
      </p>
      <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-4">
        想去韓國做醫美，但...
      </h2>
      <p className="text-neutral-500 text-center mb-16 max-w-lg mx-auto">
        這些疑慮，我們都幫你想好了
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {painPoints.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <Card className="h-full text-center py-10">
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-gold font-serif text-xl mb-3">{point.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{point.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Create WhyAthena with counter animation**

`components/home/why-athena.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { advantages } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GoldDivider } from "@/components/ui/gold-divider";

function Counter({ value, suffix }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numericValue = parseInt(value);
  const isNumber = !isNaN(numericValue);

  useEffect(() => {
    if (!inView || !isNumber) return;
    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, numericValue, isNumber]);

  return (
    <span ref={ref} className="text-gold font-serif text-4xl md:text-5xl">
      {isNumber ? count : value}
      {isNumber && value.includes("+") && "+"}
      {suffix && <span className="text-lg text-gold/70 ml-1">{suffix}</span>}
    </span>
  );
}

export function WhyAthena() {
  return (
    <SectionWrapper className="bg-obsidian-light">
      <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">
        Why Athena
      </p>
      <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-16">
        為什麼選擇我們
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {advantages.map((adv, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="text-3xl mb-4">{adv.icon}</div>
            <Counter value={adv.value} suffix={adv.suffix} />
            <h3 className="text-gold text-sm tracking-wider mt-3 mb-2">{adv.title}</h3>
            <p className="text-neutral-500 text-sm">{adv.desc}</p>
          </motion.div>
        ))}
      </div>

      <GoldDivider className="mt-16" />
    </SectionWrapper>
  );
}
```

- [ ] **Step 4: Wire up homepage**

`app/page.tsx`:
```tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LineFloat } from "@/components/layout/line-float";
import { Hero } from "@/components/home/hero";
import { PainPoints } from "@/components/home/pain-points";
import { WhyAthena } from "@/components/home/why-athena";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <WhyAthena />
      </main>
      <Footer />
      <LineFloat />
    </>
  );
}
```

- [ ] **Step 5: Verify in browser**

Open http://localhost:3000 — check Hero animation, scroll to Pain Points, check counter animation.

- [ ] **Step 6: Commit**

```bash
git add components/home/hero.tsx components/home/pain-points.tsx components/home/why-athena.tsx app/page.tsx
git commit -m "feat: homepage Hero + Pain Points + Why Athena sections"
```

---

## Task 6: Homepage — Service Timeline + Treatments

**Files:**
- Create: `components/home/service-timeline.tsx`
- Create: `components/home/treatments.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create scroll-driven Service Timeline**

`components/home/service-timeline.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { timelineSteps } from "@/lib/data";

export function ServiceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const steps = containerRef.current.querySelectorAll(".timeline-step");
    const ctx = gsap.context(() => {
      // Animate the connecting line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { strokeDashoffset: 800 },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      // Animate each step
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0.2, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">
          Service Flow
        </p>
        <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-4">
          您的蛻變之旅
        </h2>
        <p className="text-neutral-500 text-center mb-20 max-w-lg mx-auto">
          從諮詢到回程，每一步都有人為您守護
        </p>

        <div ref={containerRef} className="relative">
          {/* Vertical line (desktop) */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-0 h-full hidden md:block" width="2" height="100%">
            <line
              ref={lineRef}
              x1="1" y1="0" x2="1" y2="100%"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="800"
              strokeDashoffset="800"
              opacity="0.4"
            />
          </svg>

          <div className="space-y-16 md:space-y-24">
            {timelineSteps.map((step, i) => (
              <div
                key={i}
                className={`timeline-step flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`md:w-5/12 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-gold/40 text-sm tracking-widest">{step.day}</span>
                  <h3 className="font-serif text-gold text-2xl mt-1">{step.title}</h3>
                  <p className="text-neutral-400 mt-2 leading-relaxed">{step.desc}</p>
                </div>

                <div className="w-16 h-16 border border-gold/40 flex items-center justify-center text-2xl bg-obsidian-light shrink-0 z-10">
                  {step.icon}
                </div>

                <div className="md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Treatments cards**

`components/home/treatments.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { treatments } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function Treatments() {
  return (
    <SectionWrapper id="treatments" className="bg-obsidian-light">
      <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">
        Treatments
      </p>
      <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-16">
        療程項目
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {treatments.map((t, i) => (
          <motion.div
            key={t.id}
            className="group bg-obsidian-card border-hairline border-gold/10 p-6 transition-all duration-500 hover:border-gold/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}
          >
            <h3 className="font-serif text-gold text-xl mb-4">{t.title}</h3>
            <ul className="space-y-2 mb-6">
              {t.items.map((item, j) => (
                <li key={j} className="text-neutral-400 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold/50" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-gold/10 pt-4 mt-auto">
              <p className="text-neutral-600 text-xs">主治醫師</p>
              <p className="text-neutral-400 text-sm">{t.doctor}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Add to homepage**

Update `app/page.tsx` — add imports and components after WhyAthena:
```tsx
import { ServiceTimeline } from "@/components/home/service-timeline";
import { Treatments } from "@/components/home/treatments";

// In the JSX, after <WhyAthena />:
<ServiceTimeline />
<Treatments />
```

- [ ] **Step 4: Verify in browser**

Scroll through homepage — check timeline scroll animation and treatment card hovers.

- [ ] **Step 5: Commit**

```bash
git add components/home/service-timeline.tsx components/home/treatments.tsx app/page.tsx
git commit -m "feat: homepage Service Timeline (GSAP scroll) + Treatment cards"
```

---

## Task 7: Homepage — Doctor Team + FAQ + CTA

**Files:**
- Create: `components/home/doctor-team.tsx`
- Create: `components/home/faq.tsx`
- Create: `components/home/cta-section.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create DoctorTeam**

`components/home/doctor-team.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { doctors } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function DoctorTeam() {
  return (
    <SectionWrapper id="doctors">
      <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">
        Medical Team
      </p>
      <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-4">
        韓國醫師團隊
      </h2>
      <p className="text-neutral-500 text-center mb-16">
        PASCAL Clinic — 韓國美容整形醫學院教授級陣容
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doc, i) => (
          <motion.div
            key={i}
            className="group relative bg-obsidian-card border-hairline border-gold/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            {/* Placeholder avatar */}
            <div className="aspect-square bg-gradient-to-b from-obsidian-card to-obsidian flex items-center justify-center">
              <span className="text-6xl text-gold/20 font-serif">{doc.name.charAt(0)}</span>
            </div>

            <div className="p-5">
              <h3 className="text-gold font-medium text-sm">{doc.name}</h3>
              <p className="text-neutral-600 text-xs mt-1">{doc.title}</p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/90 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-gold font-medium">{doc.name}</h3>
              <p className="text-neutral-400 text-sm mt-2">{doc.specialty}</p>
              <p className="text-neutral-500 text-xs mt-2">{doc.org}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Create FAQ accordion**

`components/home/faq.tsx`:
```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqItems } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

function FaqItem({ item, isOpen, onToggle }: { item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gold/10">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-sm md:text-base transition-colors ${isOpen ? "text-gold" : "text-neutral-300 group-hover:text-gold"}`}>
          {item.q}
        </span>
        <motion.span
          className="text-gold ml-4 shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-neutral-400 text-sm leading-relaxed pb-5 pl-0 md:pl-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq" className="bg-obsidian-light">
      <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">FAQ</p>
      <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-16">
        常見問題
      </h2>

      <div className="max-w-2xl mx-auto">
        {faqItems.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Create CTA section**

`components/home/cta-section.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Gold gradient pulse background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 animate-gold-pulse" />

      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-serif text-gold text-3xl md:text-5xl mb-6">
          準備好開始您的蛻變之旅了嗎？
        </h2>
        <p className="text-neutral-400 mb-10 leading-relaxed">
          預約免費諮詢，讓我們為您量身規劃專屬的韓國醫美旅程
        </p>
        <Button href="/booking" className="text-base px-12 py-4">
          預約免費諮詢
        </Button>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 4: Add all sections to homepage**

Update `app/page.tsx` — add remaining imports:
```tsx
import { DoctorTeam } from "@/components/home/doctor-team";
import { FAQ } from "@/components/home/faq";
import { CTASection } from "@/components/home/cta-section";

// In JSX, after <Treatments />:
<DoctorTeam />
<FAQ />
<CTASection />
```

- [ ] **Step 5: Verify complete homepage in browser**

Scroll through entire homepage — verify all sections render, animations trigger, FAQ works.

- [ ] **Step 6: Commit**

```bash
git add components/home/doctor-team.tsx components/home/faq.tsx components/home/cta-section.tsx app/page.tsx
git commit -m "feat: homepage Doctor Team + FAQ accordion + CTA section — homepage complete"
```

---

## Task 8: Booking Demo `/booking`

**Files:**
- Create: `components/booking/booking-flow.tsx`
- Create: `components/booking/step-service.tsx`
- Create: `components/booking/step-schedule.tsx`
- Create: `components/booking/step-contact.tsx`
- Create: `components/booking/booking-complete.tsx`
- Create: `components/booking/member-preview.tsx`
- Create: `app/booking/page.tsx`

- [ ] **Step 1: Create BookingFlow state machine**

`components/booking/booking-flow.tsx`:
```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StepService } from "./step-service";
import { StepSchedule } from "./step-schedule";
import { StepContact } from "./step-contact";
import { BookingComplete } from "./booking-complete";

export type BookingData = {
  service: string;
  method: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  lineId: string;
  note: string;
};

const stepLabels = ["選擇服務", "預約時間", "聯絡資料"];

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>({
    service: "", method: "", date: "", time: "",
    name: "", phone: "", lineId: "", note: "",
  });

  const update = (partial: Partial<BookingData>) => setData((prev) => ({ ...prev, ...partial }));

  if (step === 3) return <BookingComplete data={data} />;

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-sm border ${
                i <= step ? "border-gold text-gold" : "border-gold/20 text-gold/20"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${
                i <= step ? "text-gold" : "text-gold/20"
              }`}>{label}</span>
              {i < 2 && <div className={`w-8 h-px ${i < step ? "bg-gold" : "bg-gold/20"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && <StepService data={data} update={update} onNext={() => setStep(1)} />}
            {step === 1 && <StepSchedule data={data} update={update} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
            {step === 2 && <StepContact data={data} update={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create StepService**

`components/booking/step-service.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { bookingServices } from "@/lib/data";
import type { BookingData } from "./booking-flow";

type Props = {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  onNext: () => void;
};

export function StepService({ data, update, onNext }: Props) {
  return (
    <div>
      <h2 className="font-serif text-gold text-2xl md:text-3xl text-center mb-2">您想諮詢什麼項目？</h2>
      <p className="text-neutral-500 text-center mb-10 text-sm">選擇一個療程類別</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {bookingServices.map((svc) => (
          <motion.button
            key={svc.id}
            onClick={() => update({ service: svc.id })}
            className={`p-6 text-center border transition-all ${
              data.service === svc.id
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold/10 text-neutral-400 hover:border-gold/30"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">{svc.icon}</div>
            <div className="text-sm">{svc.label}</div>
          </motion.button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <motion.button
          onClick={onNext}
          disabled={!data.service}
          className={`px-10 py-3 text-sm tracking-widest uppercase transition-all ${
            data.service
              ? "bg-gold text-black hover:shadow-gold"
              : "bg-gold/20 text-gold/40 cursor-not-allowed"
          }`}
          whileHover={data.service ? { scale: 1.02 } : undefined}
        >
          下一步 →
        </motion.button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create StepSchedule**

`components/booking/step-schedule.tsx`:
```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { timeSlots } from "@/lib/data";
import type { BookingData } from "./booking-flow";

type Props = {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

const methods = [
  { id: "video", label: "線上視訊", desc: "30 分鐘", icon: "📹" },
  { id: "line", label: "LINE 通話", desc: "20 分鐘", icon: "💬" },
  { id: "inperson", label: "到店面談", desc: "台北中山區", icon: "🏢" },
];

function MiniCalendar({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleDateString("zh-TW", { year: "numeric", month: "long" });

  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div>
      <p className="text-gold text-sm mb-3">{monthName}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="text-neutral-600 py-1">{d}</div>
        ))}
        {days.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isPast = day <= today.getDate();
          const isSelected = selected === dateStr;
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onSelect(dateStr)}
              className={`py-1.5 transition-all ${
                isSelected ? "bg-gold text-black" :
                isPast ? "text-neutral-700 cursor-not-allowed" :
                "text-neutral-400 hover:text-gold hover:bg-gold/10"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StepSchedule({ data, update, onNext, onBack }: Props) {
  const canProceed = data.method && data.date && data.time;

  return (
    <div>
      <h2 className="font-serif text-gold text-2xl md:text-3xl text-center mb-10">選擇諮詢方式與時間</h2>

      {/* Method */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => update({ method: m.id })}
            className={`p-4 text-center border text-sm transition-all ${
              data.method === m.id ? "border-gold text-gold bg-gold/10" : "border-gold/10 text-neutral-400 hover:border-gold/30"
            }`}
          >
            <div className="text-xl mb-1">{m.icon}</div>
            <div>{m.label}</div>
            <div className="text-xs text-neutral-600 mt-1">{m.desc}</div>
          </button>
        ))}
      </div>

      {/* Calendar + Time */}
      <div className="grid md:grid-cols-2 gap-6">
        <MiniCalendar selected={data.date} onSelect={(d) => update({ date: d })} />
        <div>
          <p className="text-gold text-sm mb-3">選擇時段</p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => update({ time: slot })}
                className={`py-2 text-sm border transition-all ${
                  data.time === slot ? "border-gold text-gold bg-gold/10" : "border-gold/10 text-neutral-500 hover:border-gold/30"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="text-neutral-500 text-sm hover:text-gold transition-colors">← 上一步</button>
        <motion.button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-10 py-3 text-sm tracking-widest uppercase ${
            canProceed ? "bg-gold text-black" : "bg-gold/20 text-gold/40 cursor-not-allowed"
          }`}
          whileHover={canProceed ? { scale: 1.02 } : undefined}
        >
          下一步 →
        </motion.button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create StepContact**

`components/booking/step-contact.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import type { BookingData } from "./booking-flow";

type Props = {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepContact({ data, update, onNext, onBack }: Props) {
  const canSubmit = data.name.trim() && data.phone.trim();
  const inputCls = "w-full bg-transparent border-b border-gold/20 py-3 text-neutral-200 placeholder:text-neutral-600 focus:border-gold focus:outline-none transition-colors";

  return (
    <div>
      <h2 className="font-serif text-gold text-2xl md:text-3xl text-center mb-2">最後一步</h2>
      <p className="text-neutral-500 text-center mb-10 text-sm">留下聯絡方式，我們會盡快與您確認</p>

      <div className="space-y-6">
        <div>
          <label className="text-gold/60 text-xs tracking-wider">姓名 *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="您的姓名"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-gold/60 text-xs tracking-wider">電話 *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="0912-345-678"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-gold/60 text-xs tracking-wider">LINE ID（選填）</label>
          <input
            type="text"
            value={data.lineId}
            onChange={(e) => update({ lineId: e.target.value })}
            placeholder="方便我們加您好友"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-gold/60 text-xs tracking-wider">備註（選填）</label>
          <textarea
            value={data.note}
            onChange={(e) => update({ note: e.target.value })}
            placeholder="想特別諮詢的問題..."
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="text-neutral-500 text-sm hover:text-gold transition-colors">← 上一步</button>
        <motion.button
          onClick={onNext}
          disabled={!canSubmit}
          className={`px-10 py-3 text-sm tracking-widest uppercase ${
            canSubmit ? "bg-gold text-black" : "bg-gold/20 text-gold/40 cursor-not-allowed"
          }`}
          whileHover={canSubmit ? { scale: 1.02 } : undefined}
        >
          確認預約 ✓
        </motion.button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create BookingComplete + MemberPreview**

`components/booking/booking-complete.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { bookingServices } from "@/lib/data";
import { MemberPreview } from "./member-preview";
import type { BookingData } from "./booking-flow";

const methodLabels: Record<string, string> = { video: "線上視訊", line: "LINE 通話", inperson: "到店面談" };

export function BookingComplete({ data }: { data: BookingData }) {
  const serviceName = bookingServices.find((s) => s.id === data.service)?.label ?? data.service;

  return (
    <div className="min-h-screen bg-obsidian px-6 py-24">
      <motion.div
        className="max-w-lg mx-auto text-center mb-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 border border-gold flex items-center justify-center text-gold text-2xl mx-auto mb-6">✓</div>
        <h2 className="font-serif text-gold text-3xl mb-4">預約成功！</h2>

        <div className="bg-obsidian-card border-hairline border-gold/20 p-6 text-left space-y-3 mt-8">
          <div className="flex justify-between">
            <span className="text-neutral-500 text-sm">諮詢項目</span>
            <span className="text-gold text-sm">{serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 text-sm">諮詢方式</span>
            <span className="text-neutral-300 text-sm">{methodLabels[data.method]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 text-sm">預約日期</span>
            <span className="text-neutral-300 text-sm">{data.date} {data.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500 text-sm">姓名</span>
            <span className="text-neutral-300 text-sm">{data.name}</span>
          </div>
        </div>

        <p className="text-neutral-500 text-sm mt-6">
          我們會在 24 小時內透過 LINE 與您確認詳細資訊
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Button href="https://lin.ee/uy9vYWW" variant="primary">加入 LINE 好友</Button>
          <Button href="/" variant="outline">返回首頁</Button>
        </div>
      </motion.div>

      {/* Member center preview */}
      <MemberPreview />
    </div>
  );
}
```

`components/booking/member-preview.tsx`:
```tsx
"use client";

import { motion } from "motion/react";
import { GoldDivider } from "@/components/ui/gold-divider";

const journeySteps = [
  { status: "done", label: "諮詢評估", date: "04/16" },
  { status: "done", label: "方案確認", date: "04/18" },
  { status: "current", label: "機票訂購", date: "04/20" },
  { status: "pending", label: "飯店入住", date: "05/01" },
  { status: "pending", label: "術前檢查", date: "05/02" },
  { status: "pending", label: "手術日", date: "05/03" },
  { status: "pending", label: "術後回診", date: "05/04" },
  { status: "pending", label: "觀光回程", date: "05/05" },
];

export function MemberPreview() {
  return (
    <div className="max-w-2xl mx-auto">
      <GoldDivider className="mb-16" />

      <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">
        Member Center Preview
      </p>
      <h3 className="font-serif text-gold text-2xl text-center mb-12">
        會員中心 — 行程追蹤概念
      </h3>

      <motion.div
        className="bg-obsidian-card border-hairline border-gold/20 p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif">W</div>
          <div>
            <p className="text-gold text-sm">Hi, 王小姐</p>
            <p className="text-neutral-600 text-xs">眼部整形 — 雙眼皮手術</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {journeySteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-3 h-3 shrink-0 ${
                step.status === "done" ? "bg-gold" :
                step.status === "current" ? "border border-gold bg-gold/30 animate-pulse" :
                "border border-gold/20"
              }`} />
              <div className="flex-1 flex justify-between">
                <span className={`text-sm ${
                  step.status === "done" ? "text-gold/60" :
                  step.status === "current" ? "text-gold" :
                  "text-neutral-600"
                }`}>{step.label}</span>
                <span className="text-neutral-600 text-xs">{step.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="border border-gold/10 p-4">
            <p className="text-gold text-xs tracking-wider mb-2">我的文件</p>
            <p className="text-neutral-400 text-sm">護照 ✓</p>
            <p className="text-neutral-400 text-sm">體檢報告 ✓</p>
            <p className="text-neutral-600 text-sm">同意書 ✗</p>
          </div>
          <div className="border border-gold/10 p-4">
            <p className="text-gold text-xs tracking-wider mb-2">我的顧問</p>
            <p className="text-neutral-400 text-sm">Kelly 顧問</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs border border-gold/20 text-gold/60 px-2 py-1">LINE 對話</span>
              <span className="text-xs border border-gold/20 text-gold/60 px-2 py-1">撥打電話</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 6: Create booking page**

`app/booking/page.tsx`:
```tsx
import { BookingFlow } from "@/components/booking/booking-flow";

export default function BookingPage() {
  return <BookingFlow />;
}
```

- [ ] **Step 7: Verify booking flow in browser**

Open http://localhost:3000/booking — complete full flow: select service → pick time → fill form → see confirmation + member preview.

- [ ] **Step 8: Commit**

```bash
git add components/booking/ app/booking/
git commit -m "feat: booking demo — 3-step flow + confirmation + member center preview"
```

---

## Task 9: Polish + Deploy

**Files:**
- Modify: various components for fixes
- Deploy to Vercel

- [ ] **Step 1: Final visual check in browser**

Open all three routes and verify:
- http://localhost:3000/slides — all 9 slides, keyboard nav, transitions
- http://localhost:3000 — full homepage scroll, all animations
- http://localhost:3000/booking — complete booking flow

- [ ] **Step 2: Build check**

```bash
cd /Users/waynechen/01_開發專案/athena-proposal && npm run build
```

Fix any TypeScript or build errors.

- [ ] **Step 3: Commit final state**

```bash
git add -A
git commit -m "fix: resolve build issues and final polish"
```

- [ ] **Step 4: Deploy to Vercel**

```bash
cd /Users/waynechen/01_開發專案/athena-proposal && npx vercel --yes
```

Note the deployment URL — this is what you bring to the client meeting.

- [ ] **Step 5: Verify production deployment**

Open the Vercel URL — test all three routes on production.

- [ ] **Step 6: Commit Vercel config**

```bash
git add -A
git commit -m "chore: add Vercel deployment config"
```
