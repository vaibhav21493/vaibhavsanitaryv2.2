import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroHeaderProps {
  language: 'en' | 'hi';
  onSearch?: (query: string) => void;
}

export default function HeroHeader({ language, onSearch }: HeroHeaderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=500&fit=crop',
      title: language === 'en' ? 'Welcome to Vaibhav Sanitary' : 'वैभव सैनिटरी में आपका स्वागत है',
      subtitle: language === 'en' ? 'Your Complete House-Building Partner' : 'आपका पूर्ण घर-निर्माण साथी',
    },
    {
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=500&fit=crop',
      title: language === 'en' ? 'Premium Sanitary Ware' : 'प्रीमियम सैनिटरी वेयर',
      subtitle: language === 'en' ? 'Quality Products for Your Home' : 'आपके घर के लिए गुणवत्ता उत्पाद',
    },
    {
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=500&fit=crop',
      title: language === 'en' ? 'Beautiful Tiles & Flooring' : 'सुंदर टाइल्स और फ्लोरिंग',
      subtitle: language === 'en' ? 'Transform Your Space' : 'अपनी जगह को रूपांतरित करें',
    },
    {
      image: 'https://images.unsplash.com/photo-1565636192335-14a90e1df6a0?w=1200&h=500&fit=crop',
      title: language === 'en' ? 'Complete Construction Solutions' : 'पूर्ण निर्माण समाधान',
      subtitle: language === 'en' ? 'From Foundation to Finish' : 'नींव से फिनिशिंग तक',
    },
  ];

  const categories = [
    {
      name: language === 'en' ? 'Sanitary Ware' : 'सैनिटरी वेयर',
      icon: '🚿',
    },
    {
      name: language === 'en' ? 'Tiles' : 'टाइल्स',
      icon: '🧩',
    },
    {
      name: language === 'en' ? 'Plumbing' : 'प्लंबिंग',
      icon: '🔧',
    },
    {
      name: language === 'en' ? 'Electrical' : 'विद्युत',
      icon: '💡',
    },
    {
      name: language === 'en' ? 'Hardware' : 'हार्डवेयर',
      icon: '🔨',
    },
    {
      name: language === 'en' ? 'POP Materials' : 'POP सामग्री',
      icon: '🧱',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Carousel */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{slide.title}</h1>
              <p className="text-lg md:text-2xl text-white/90 drop-shadow">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[rgb(17,24,39)] py-6 px-4 mt-0 rounded-b-lg shadow-md">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'Search for products, materials, contractors...'
                  : 'उत्पाद, सामग्री, ठेकेदार खोजें...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-card hover:bg-muted text-accent-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Search size={20} />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Search' : 'खोजें'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Quick Category Links */}
      <div className="bg-white py-8 px-4 rounded-b-lg border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-bold text-center mb-6 text-gray-900">
            {language === 'en' ? 'Shop By Category' : 'श्रेणी के अनुसार खरीदें'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition cursor-pointer border border-gray-200 hover:border-blue-300"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-sm font-semibold text-gray-700 text-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
