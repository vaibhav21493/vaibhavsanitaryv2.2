import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Award, Store, Users } from 'lucide-react';

interface TrustBarProps {
  language: 'en' | 'hi';
}

const badges = [
  {
    icon: ShieldCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    hoverBg: 'group-hover:bg-blue-600',
    en: { label: '25+', unit: 'Years of Trust', sub: 'Serving Chittorgarh since 2000' },
    hi: { label: '25+', unit: 'वर्षों का विश्वास', sub: 'चित्तौड़गढ़ में 2000 से सेवारत' },
    countTo: 25,
    suffix: '+',
  },
  {
    icon: Award,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    hoverBg: 'group-hover:bg-amber-500',
    en: { label: '100%', unit: 'ISI Marked', sub: 'Quality certified materials' },
    hi: { label: '100%', unit: 'ISI चिह्नित', sub: 'गुणवत्ता प्रमाणित सामग्री' },
    countTo: 100,
    suffix: '%',
  },
  {
    icon: Store,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    hoverBg: 'group-hover:bg-teal-600',
    en: { label: '500+', unit: 'Brands Available', sub: 'Top national & international brands' },
    hi: { label: '500+', unit: 'ब्रांड उपलब्ध', sub: 'शीर्ष राष्ट्रीय और अंतर्राष्ट्रीय ब्रांड' },
    countTo: 500,
    suffix: '+',
  },
  {
    icon: Users,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    hoverBg: 'group-hover:bg-orange-500',
    en: { label: '1200+', unit: 'Happy Customers', sub: 'Trusted skilled professionals' },
    hi: { label: '1200+', unit: 'संतुष्ट ग्राहक', sub: 'विश्वसनीय कुशल पेशेवर' },
    countTo: 1200,
    suffix: '+',
  },
];

/** Hook that counts up a number when element scrolls into view */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { ref, count, started };
}

function TrustBadge({
  badge,
  language,
  index,
}: {
  badge: typeof badges[number];
  language: 'en' | 'hi';
  index: number;
}) {
  const Icon = badge.icon;
  const t = badge[language];
  const { ref, count, started } = useCountUp(badge.countTo, 1600 + index * 200);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="vs-shimmer-parent flex items-center gap-3.5 p-4 rounded-2xl transition-all duration-350 cursor-default group border border-transparent hover:border-[#d0daea] hover:bg-white hover:shadow-lg"
      style={{
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* 3D-flipping icon box */}
      <div
        className={`flex-shrink-0 w-14 h-14 rounded-2xl ${badge.bg} flex items-center justify-center transition-all duration-400 shadow-sm ${badge.hoverBg} group-hover:scale-110 group-hover:shadow-lg`}
        style={{
          transform: hovered ? 'perspective(200px) rotateY(180deg) scale(1.1)' : 'perspective(200px) rotateY(0deg) scale(1)',
          transition: 'transform 0.5s ease',
        }}
      >
        <Icon
          className={`w-7 h-7 ${badge.color} group-hover:text-white transition-colors duration-300`}
          style={{
            transform: hovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      <div>
        {/* Animated counter */}
        <div
          className={`font-black text-2xl text-[#0D1B2A] leading-none mb-0.5 ${badge.color.replace('text-', 'group-hover:text-')} transition-colors vs-counter-in`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          {started ? count : 0}{badge.suffix}
        </div>
        <div className="font-bold text-sm text-[#0D1B2A] leading-tight group-hover:text-[#003B6F] transition-colors">
          {t.unit}
        </div>
        <div className="text-xs text-[#5a6a82] mt-0.5">{t.sub}</div>
      </div>
    </div>
  );
}

export default function TrustBar({ language }: TrustBarProps) {
  return (
    <div className="bg-gradient-to-b from-white to-[#f8f9fb] border-y border-[#d0daea] py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <TrustBadge key={i} badge={badge} language={language} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
