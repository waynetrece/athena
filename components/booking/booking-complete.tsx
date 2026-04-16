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
        <div className="w-16 h-16 border border-gold flex items-center justify-center text-gold text-2xl mx-auto mb-6">&#10003;</div>
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
