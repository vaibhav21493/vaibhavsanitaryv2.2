import { ShieldCheck, Award, Store, Users } from 'lucide-react';

interface TrustBarProps {
  language: 'en' | 'hi';
}

const badges = [
  {
    icon: ShieldCheck,
    en: { label: '25+ Years of Trust', sub: 'Serving Chittorgarh since 2000' },
    hi: { label: '25+ वर्षों का विश्वास', sub: 'चित्तौड़गढ़ में 2000 से सेवारत' },
  },
  {
    icon: Award,
    en: { label: 'ISI Marked Products', sub: 'Quality certified materials' },
    hi: { label: 'ISI चिह्नित उत्पाद', sub: 'गुणवत्ता प्रमाणित सामग्री' },
  },
  {
    icon: Store,
    en: { label: '500+ Brands Available', sub: 'Top national & international brands' },
    hi: { label: '500+ ब्रांड उपलब्ध', sub: 'शीर्ष राष्ट्रीय और अंतर्राष्ट्रीय ब्रांड' },
  },
  {
    icon: Users,
    en: { label: 'Expert Contractor Network', sub: 'Trusted skilled professionals' },
    hi: { label: 'विशेषज्ञ ठेकेदार नेटवर्क', sub: 'विश्वसनीय कुशल पेशेवर' },
  },
];

export default function TrustBar({ language }: TrustBarProps) {
  return (
    <div className="bg-white border-y border-[#d0daea] py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            const t = badge[language];
            return (
              <div
                key={i}
                className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#f8f9fb] transition-all duration-300 hover:-translate-y-1 cursor-default group border border-transparent hover:border-[#d0daea]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#003B6F]/10 flex items-center justify-center group-hover:bg-[#003B6F] group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6 text-[#003B6F] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0D1B2A] leading-tight group-hover:text-[#003B6F] transition-colors">
                    {t.label}
                  </div>
                  <div className="text-xs text-[#5a6a82] mt-0.5">{t.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
