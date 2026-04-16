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
            <li>台北市中山區遼寧街76巷4號1樓</li>
            <li>service@gangnamstyle.com.tw</li>
            <li>LINE 官方帳號</li>
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
        &copy; 2026 江南時代企業有限公司 Gangnamstyle CO., LTD. All rights reserved.
      </div>
    </footer>
  );
}
