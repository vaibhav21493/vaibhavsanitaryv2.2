import { useState, useEffect } from 'react';
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
  },
  {
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1400&h=600&fit=crop',
    badge: { en: 'Tiles & Surfaces', hi: 'टाइल्स और सतहें' },
    title: { en: 'Designer Tiles & Epoxy Flooring', hi: 'डिजाइनर टाइल्स और फ्लोरिंग' },
    sub: { en: 'Vitrified slabs, ceramic wall tiles, and waterproof epoxy grout', hi: 'विट्रिफाइड स्लैब, सिरेमिक दीवार टाइलें और वॉटरप्रूफ एपॉक्सी ग्राउट' },
    navId: 'tiles-flooring',
  },
  {
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=1400&h=600&fit=crop',
    badge: { en: 'Ashirvad & Truflo', hi: 'आशीर्वाद और ट्रूफ्लो' },
    title: { en: 'CPVC Pipes & Water Storage', hi: 'CPVC पाइप और जल भंडारण' },
    sub: { en: 'Complete plumbing pipelines, fittings, and multi-layer water tanks', hi: 'पूर्ण प्लंबिंग पाइपलाइन, फिटिंग और मल्टी-लेयर पानी के टैंक' },
    navId: 'pipes',
  },
  {
    image: 'https://images.unsplash.com/photo-1565636192335-14a90e1df6a0?w=1400&h=600&fit=crop',
    badge: { en: 'Foundation to Finish', hi: 'नींव से फिनिशिंग' },
    title: { en: 'Complete Construction Solutions', hi: 'पूर्ण निर्माण समाधान' },
    sub: { en: 'Cement, TMT steel, POP, electrical, and verified contractor contacts', hi: 'सीमेंट, टीएमटी स्टील, पीओपी, इलेक्ट्रिकल और ठेकेदार संपर्क' },
    navId: 'foundation',
  },
];

const categories = [
  { icon: Droplets, en: 'Sanitary Ware', hi: 'सैनिटरी वेयर', navId: 'bathroom-sanitary' },
  { icon: Grid3X3, en: 'Tiles & Flooring', hi: 'टाइल्स और फ्लोरिंग', navId: 'tiles-flooring' },
  { icon: Wrench, en: 'Plumbing & Pipes', hi: 'प्लंबिंग और पाइप', navId: 'pipes' },
  { icon: Zap, en: 'Electrical', hi: 'विद्युत', navId: 'electrical-lighting' },
  { icon: Hammer, en: 'Hardware', hi: 'हार्डवेयर', navId: 'hardware' },
  { icon: Layers, en: 'Cement & Base', hi: 'सीमेंट और बेस', navId: 'foundation' },
];

export default function HeroHeader({ language, onSearch }: HeroHeaderProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((prev: number) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
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
      {/* ── Hero Carousel ── */}
      <div className="relative w-full h-[420px] md:h-[540px] overflow-hidden">
        {/* Images */}
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
            />
          </div>
        ))}

        {/* Permanent gradient — bottom anchor like Hindware */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

        {/* Bottom-anchored text */}
        <div
          className={`absolute bottom-0 left-0 right-0 px-8 pb-10 md:px-14 md:pb-14 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <span className="inline-block bg-[#E8891A] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">
            {slide.badge[language]}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg max-w-2xl">
            {slide.title[language]}
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-2 max-w-xl drop-shadow">
            {slide.sub[language]}
          </p>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 rounded-full transition border border-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 rounded-full transition border border-white/30"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 right-8 flex gap-2">
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

      {/* ── Search Bar ── */}
      <div className="bg-[#003B6F] py-5 px-4 shadow-lg">
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="flex gap-0">
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'Search for products, materials, contractors...'
                  : 'उत्पाद, सामग्री, ठेकेदार खोजें...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-l-full text-[#0D1B2A] placeholder-gray-400 focus:outline-none text-sm bg-white"
            />
            <button
              type="submit"
              className="bg-[#E8891A] hover:bg-[#C46D0A] text-white px-7 py-3.5 rounded-r-full font-semibold flex items-center gap-2 transition text-sm"
            >
              <Search size={18} />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Search' : 'खोजें'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* ── Quick Category Links ── */}
      <div className="bg-white border-b border-border py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={index}
                  to={`/nav/${cat.navId}`}
                  className="flex flex-col items-center justify-center p-3 bg-[#f8f9fb] rounded-xl hover:bg-[#003B6F]/10 hover:shadow transition cursor-pointer border border-transparent hover:border-[#003B6F]/20 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#003B6F]/10 flex items-center justify-center mb-2 group-hover:bg-[#003B6F]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#003B6F]" />
                  </div>
                  <span className="text-xs font-semibold text-[#0D1B2A] text-center leading-tight group-hover:text-[#003B6F] transition-colors">
                    {cat[language]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
