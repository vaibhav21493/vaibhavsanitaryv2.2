import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryShowcaseProps {
  language: 'en' | 'hi';
}

const categories = [
  {
    id: 'sanitary',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&auto=format&fit=crop',
    en: { label: 'Sanitary Ware & Bathware', sub: 'Faucets · Rain Showers · Designer Basins · WCs', cta: 'Explore Collection' },
    hi: { label: 'सैनिटरी वेयर एवं बाथवेयर', sub: 'नल · शावर · बेसिन · कमोड', cta: 'कलेक्शन देखें' },
    navId: 'bathroom-sanitary',
    accent: 'from-blue-900/90',
  },
  {
    id: 'tiles',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop',
    en: { label: 'Tiles & Flooring Solutions', sub: 'Vitrified Slabs · Ceramic Wall Tiles · Epoxy Grout', cta: 'Explore Tiles' },
    hi: { label: 'टाइल्स और फ्लोरिंग वर्क', sub: 'विट्रिफाइड · सिरेमिक · एपॉक्सी ग्राउट', cta: 'टाइल्स देखें' },
    navId: 'tiles-flooring',
    accent: 'from-amber-900/90',
  },
  {
    id: 'pipes',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=900&auto=format&fit=crop',
    en: { label: 'Pipes, Fittings & Drainage', sub: 'CPVC · UPVC · SWR Pipes · Floor Traps', cta: 'Explore Plumbing' },
    hi: { label: 'पाइप, फिटिंग और ड्रेनेज', sub: 'CPVC · UPVC · SWR पाइप · फिटिंग', cta: 'प्लंबिंग देखें' },
    navId: 'pipes',
    accent: 'from-teal-900/90',
  },
  {
    id: 'tanks',
    image: 'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=900&auto=format&fit=crop',
    en: { label: 'Water Storage Solutions', sub: '3-Layer & 4-Layer UV Protected Tanks (500L-2000L)', cta: 'Explore Tanks' },
    hi: { label: 'वाटर स्टोरेज टैंक', sub: 'मल्टी-लेयर यूवी प्रोटेक्टेड वाटर टैंक', cta: 'टैंक देखें' },
    navId: 'water-storage',
    accent: 'from-cyan-900/90',
  },
  {
    id: 'electrical',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop',
    en: { label: 'Electrical & Lighting', sub: 'Conduit Pipes · FR Wires · Modular Switch Panels', cta: 'Explore Electrical' },
    hi: { label: 'इलेक्ट्रिकल और लाइटिंग', sub: 'कंड्यूट पाइप · तांबे के तार · स्विच बोर्ड', cta: 'इलेक्ट्रिकल देखें' },
    navId: 'electrical-lighting',
    accent: 'from-yellow-900/90',
  },
  {
    id: 'foundation',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=900&auto=format&fit=crop',
    en: { label: 'Cement & Structural Steel', sub: 'OPC 53 Cement · Fe-550D TMT Rebar · AAC Blocks', cta: 'Explore Foundation' },
    hi: { label: 'सीमेंट एवं सरिया', sub: 'सीमेंट · टीएमटी सरिया · निर्माण ईंटें', cta: 'फाउंडेशन देखें' },
    navId: 'foundation',
    accent: 'from-stone-900/90',
  },
];

/** 3D card tilt component with mouse tracking */
function CategoryCard({
  cat,
  language,
  index,
}: {
  cat: typeof categories[number];
  language: 'en' | 'hi';
  index: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const t = cat[language];

  // Scroll reveal
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 14, rotateY: x * 14 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '900px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
      }}
    >
      <Link
        to={`/nav/${cat.navId}`}
        className="group relative overflow-hidden rounded-2xl aspect-[4/3] block border border-[#d0daea]/60"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${hovered ? 1.03 : 1})`,
          transition: hovered
            ? 'transform 0.1s linear, box-shadow 0.2s ease'
            : 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease',
          boxShadow: hovered
            ? `${-tilt.rotateY * 1.5}px ${tilt.rotateX * 1.5}px 40px rgba(0,59,111,0.22), 0 0 0 1px rgba(0,59,111,0.1)`
            : '0 4px 12px rgba(0,59,111,0.07)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background image with 3D parallax depth */}
        <img
          src={cat.image}
          alt={t.label}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{
            transform: hovered
              ? `scale(1.08) translate(${-tilt.rotateY * 0.2}px, ${tilt.rotateX * 0.2}px)`
              : 'scale(1)',
            transition: hovered ? 'transform 0.1s linear' : 'transform 0.6s ease',
          }}
        />

        {/* Multi-layer gradient — category accent color */}
        <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} via-black/30 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-95' : 'opacity-80'}`} />

        {/* Floating shimmer line */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
              }}
            />
          </div>
        )}

        {/* Text content with translateZ depth lift */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6"
          style={{
            transform: hovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: hovered ? 'transform 0.15s ease' : 'transform 0.5s ease',
          }}
        >
          <p className="text-[#F4A94A] text-xs font-bold uppercase tracking-wider mb-1.5">
            {t.sub}
          </p>
          <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
            {t.label}
          </h3>
          <div
            className={`flex items-center gap-2 mt-3 text-white font-semibold text-xs transition-all duration-300 ${
              hovered ? 'opacity-100 text-[#F4A94A]' : 'opacity-70'
            }`}
          >
            <span>{t.cta}</span>
            <ArrowRight
              className="w-3.5 h-3.5"
              style={{
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.25s ease',
              }}
            />
          </div>
        </div>

        {/* Corner glow accent on hover */}
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232,137,26,0.35) 0%, transparent 70%)',
            opacity: hovered ? 1 : 0,
            transform: 'translate(30%, -30%)',
            transition: 'opacity 0.3s ease',
          }}
        />
      </Link>
    </div>
  );
}

export default function CategoryShowcase({ language }: CategoryShowcaseProps) {
  const heading = language === 'en' ? 'Explore by Category' : 'श्रेणी के अनुसार खोजें';
  const sub =
    language === 'en'
      ? "Verified materials from India's leading manufacturers: Hindware, Ashirvad, UltraTech & Havells"
      : 'भारत के शीर्ष ब्रांडों से प्रमाणित निर्माण एवं सैनिटरी सामग्री';

  return (
    <section className="py-14 bg-[#f8f9fb]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8891A]">
            Comprehensive Building Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] mt-1">{heading}</h2>
          <p className="text-[#5a6a82] mt-2 text-sm md:text-base max-w-2xl mx-auto">{sub}</p>
          <div className="w-16 h-1 bg-[#E8891A] mx-auto mt-3 rounded-full" />
        </div>

        {/* Category Grid — 3D perspective tilt cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <CategoryCard key={cat.id} cat={cat} language={language} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
