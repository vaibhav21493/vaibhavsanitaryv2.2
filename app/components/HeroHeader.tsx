import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight, Droplets, Grid3X3, Wrench, Zap, Hammer, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeroHeaderProps {
  language: 'en' | 'hi';
  onSearch?: (query: string) => void;
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&h=600&fit=crop',
    badge: { en: 'Hindware Collection', hi: 'हिंडवेयर संग्रह' },
    title: { en: 'Bathroom & Sanitary Fittings', hi: 'बाथरूम और सैनिटरी फिटिंग' },
    sub: { en: 'Luxury faucets, rain showers, basins, and smart bath solutions', hi: 'लक्जरी नल, रेन शावर, बेसिन और स्मार्ट बाथ समाधान' },
    navId: 'bathroom-sanitary',
    accent: '#003B6F',
  },
  {
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1400&h=600&fit=crop',
    badge: { en: 'Tiles & Surfaces', hi: 'टाइल्स और सतहें' },
    title: { en: 'Designer Tiles & Epoxy Flooring', hi: 'डिजाइनर टाइल्स और फ्लोरिंग' },
    sub: { en: 'Vitrified slabs, ceramic wall tiles, and waterproof epoxy grout', hi: 'विट्रिफाइड स्लैब, सिरेमिक दीवार टाइलें और वॉटरप्रूफ एपॉक्सी ग्राउट' },
    navId: 'tiles-flooring',
    accent: '#5B4A00',
  },
  {
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=1400&h=600&fit=crop',
    badge: { en: 'Ashirvad & Truflo', hi: 'आशीर्वाद और ट्रूफ्लो' },
    title: { en: 'CPVC Pipes & Water Storage', hi: 'CPVC पाइप और जल भंडारण' },
    sub: { en: 'Complete plumbing pipelines, fittings, and multi-layer water tanks', hi: 'पूर्ण प्लंबिंग पाइपलाइन, फिटिंग और मल्टी-लेयर पानी के टैंक' },
    navId: 'pipes',
    accent: '#006466',
  },
  {
    image: 'https://images.unsplash.com/photo-1565636192335-14a90e1df6a0?w=1400&h=600&fit=crop',
    badge: { en: 'Foundation to Finish', hi: 'नींव से फिनिशिंग' },
    title: { en: 'Complete Construction Solutions', hi: 'पूर्ण निर्माण समाधान' },
    sub: { en: 'Cement, TMT steel, POP, electrical, and verified contractor contacts', hi: 'सीमेंट, टीएमटी स्टील, पीओपी, इलेक्ट्रिकल और ठेकेदार संपर्क' },
    navId: 'foundation',
    accent: '#6B3A00',
  },
];

const categories = [
  { icon: Droplets, en: 'Sanitary Ware', hi: 'सैनिटरी वेयर', navId: 'bathroom-sanitary', color: 'text-blue-600', bg: 'bg-blue-50', hoverBg: 'hover:bg-blue-100', hoverBorder: 'hover:border-blue-300' },
  { icon: Grid3X3, en: 'Tiles & Flooring', hi: 'टाइल्स और फ्लोरिंग', navId: 'tiles-flooring', color: 'text-amber-600', bg: 'bg-amber-50', hoverBg: 'hover:bg-amber-100', hoverBorder: 'hover:border-amber-300' },
  { icon: Wrench, en: 'Plumbing & Pipes', hi: 'प्लंबिंग और पाइप', navId: 'pipes', color: 'text-teal-600', bg: 'bg-teal-50', hoverBg: 'hover:bg-teal-100', hoverBorder: 'hover:border-teal-300' },
  { icon: Zap, en: 'Electrical', hi: 'विद्युत', navId: 'electrical-lighting', color: 'text-yellow-600', bg: 'bg-yellow-50', hoverBg: 'hover:bg-yellow-100', hoverBorder: 'hover:border-yellow-300' },
  { icon: Hammer, en: 'Hardware', hi: 'हार्डवेयर', navId: 'hardware', color: 'text-orange-600', bg: 'bg-orange-50', hoverBg: 'hover:bg-orange-100', hoverBorder: 'hover:border-orange-300' },
  { icon: Layers, en: 'Cement & Base', hi: 'सीमेंट और बेस', navId: 'foundation', color: 'text-stone-600', bg: 'bg-stone-50', hoverBg: 'hover:bg-stone-100', hoverBorder: 'hover:border-stone-300' },
];

/** Lightweight 3D tilt hook — returns style based on mouse position within element */
function use3DTilt(strength = 10) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(600px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale(1.04) translateZ(4px)`,
      transition: 'transform 0.1s ease',
      boxShadow: `${-x * 10}px ${y * 10}px 24px rgba(0,59,111,0.18)`,
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0)',
      transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease',
      boxShadow: 'none',
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, style };
}

/** Category tile with individual 3D tilt */
function CategoryTile({ cat, language }: { cat: typeof categories[number]; language: 'en' | 'hi' }) {
  const { ref, style } = use3DTilt(8);
  const Icon = cat.icon;
  return (
    <Link
      ref={ref}
      to={`/nav/${cat.navId}`}
      style={style}
      className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer border border-transparent ${cat.bg} ${cat.hoverBg} ${cat.hoverBorder} group`}
    >
      <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110`}>
        <Icon className={`w-5 h-5 ${cat.color}`} />
      </div>
      <span className={`text-xs font-semibold text-[#0D1B2A] text-center leading-tight ${cat.color.replace('text-','group-hover:text-')}`}>
        {cat[language]}
      </span>
    </Link>
  );
}

export default function HeroHeader({ language, onSearch }: HeroHeaderProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [searchFocused, setSearchFocused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((prev: number) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Parallax mouse tracking on hero
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: x * 18, y: y * 10 });
    };
    const handleLeave = () => setParallax({ x: 0, y: 0 });
    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);
    return () => {
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  function goToSlide(getter: number | ((prev: number) => number)) {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(getter as any);
      setIsTransitioning(false);
    }, 150);
  }

  const nextSlide = () => goToSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => goToSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else if (searchQuery.trim()) {
      navigate(`/nav/root?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="w-full">
      {/* ── Hero Carousel with Parallax ── */}
      <div ref={heroRef} className="relative w-full h-[420px] md:h-[540px] overflow-hidden">

        {/* Floating atmospheric orbs for 3D depth */}
        <div
          className="vs-orb w-64 h-64 bg-[#003B6F]/40 top-[-60px] left-[-40px]"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="vs-orb vs-orb-2 w-80 h-80 bg-[#E8891A]/25 top-[20px] right-[-60px]"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="vs-orb w-48 h-48 bg-[#006466]/30 bottom-[40px] left-[30%]"
          style={{ animationDelay: '-8s' }}
        />

        {/* Parallax image layers */}
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={s.image}
              alt={s.title.en}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{
                transform: index === currentSlide
                  ? `scale(1.05) translate(${parallax.x * 0.4}px, ${parallax.y * 0.3}px)`
                  : 'scale(1.05)',
                transition: index === currentSlide
                  ? 'transform 0.12s linear'
                  : 'transform 0.8s ease',
              }}
            />
          </div>
        ))}

        {/* Multi-layer gradient for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Slide counter badge — top right */}
        <div className="absolute top-4 right-4 glass-card rounded-full px-3 py-1.5 text-white text-xs font-bold tracking-widest select-none">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Bottom-anchored text with staggered entrance */}
        <div
          className={`absolute bottom-0 left-0 right-0 px-8 pb-10 md:px-14 md:pb-14 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          <span
            className="inline-block bg-[#E8891A] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3 vs-bounce-in"
            key={`badge-${currentSlide}`}
          >
            {slide.badge[language]}
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg max-w-2xl"
            key={`title-${currentSlide}`}
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
          >
            {slide.title[language]}
          </h1>
          <p
            className="text-white/85 text-base md:text-lg mt-2 max-w-xl drop-shadow"
            key={`sub-${currentSlide}`}
          >
            {slide.sub[language]}
          </p>
          {/* CTA link inline */}
          <Link
            to={`/nav/${slide.navId}`}
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#E8891A] hover:bg-[#C46D0A] text-white text-sm font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            {language === 'en' ? 'Explore Category' : 'श्रेणी देखें'}
            <ChevronRight size={15} />
          </Link>
        </div>

        {/* Carousel Controls — glassmorphism */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 glass-card text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-90 border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 glass-card text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-90 border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide indicators — bottom center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-[#E8891A]'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Search Bar — floating glass style ── */}
      <div className="bg-[#003B6F] py-5 px-4 shadow-lg">
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div
            className={`flex gap-0 rounded-full transition-all duration-300 ${
              searchFocused
                ? 'shadow-[0_0_0_3px_rgba(232,137,26,0.45),0_8px_32px_rgba(0,59,111,0.25)] scale-[1.01]'
                : 'shadow-lg'
            }`}
          >
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'Search for products, materials, contractors...'
                  : 'उत्पाद, सामग्री, ठेकेदार खोजें...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 px-5 py-3.5 rounded-l-full text-[#0D1B2A] placeholder-gray-400 focus:outline-none text-sm bg-white"
            />
            <button
              type="submit"
              className="bg-[#E8891A] hover:bg-[#C46D0A] text-white px-7 py-3.5 rounded-r-full font-semibold flex items-center gap-2 transition-all duration-200 text-sm hover:shadow-lg active:scale-95"
            >
              <Search size={18} />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Search' : 'खोजें'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* ── Quick Category Links — 3D tiles ── */}
      <div className="bg-white border-b border-border py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, index) => (
              <CategoryTile key={index} cat={cat} language={language} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
