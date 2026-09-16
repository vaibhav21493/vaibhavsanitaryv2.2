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
  },
  {
    id: 'tiles',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop',
    en: { label: 'Tiles & Flooring Solutions', sub: 'Vitrified Slabs · Ceramic Wall Tiles · Epoxy Grout', cta: 'Explore Tiles' },
    hi: { label: 'टाइल्स और फ्लोरिंग वर्क', sub: 'विट्रिफाइड · सिरेमिक · एपॉक्सी ग्राउट', cta: 'टाइल्स देखें' },
    navId: 'tiles-flooring',
  },
  {
    id: 'pipes',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=900&auto=format&fit=crop',
    en: { label: 'Pipes, Fittings & Drainage', sub: 'CPVC · UPVC · SWR Pipes · Floor Traps', cta: 'Explore Plumbing' },
    hi: { label: 'पाइप, फिटिंग और ड्रेनेज', sub: 'CPVC · UPVC · SWR पाइप · फिटिंग', cta: 'प्लंबिंग देखें' },
    navId: 'pipes',
  },
  {
    id: 'tanks',
    image: 'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=900&auto=format&fit=crop',
    en: { label: 'Water Storage Solutions', sub: '3-Layer & 4-Layer UV Protected Tanks (500L-2000L)', cta: 'Explore Tanks' },
    hi: { label: 'वाटर स्टोरेज टैंक', sub: 'मल्टी-लेयर यूवी प्रोटेक्टेड वाटर टैंक', cta: 'टैंक देखें' },
    navId: 'water-storage',
  },
  {
    id: 'electrical',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop',
    en: { label: 'Electrical & Lighting', sub: 'Conduit Pipes · FR Wires · Modular Switch Panels', cta: 'Explore Electrical' },
    hi: { label: 'इलेक्ट्रिकल और लाइटिंग', sub: 'कंड्यूट पाइप · तांबे के तार · स्विच बोर्ड', cta: 'इलेक्ट्रिकल देखें' },
    navId: 'electrical-lighting',
  },
  {
    id: 'foundation',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=900&auto=format&fit=crop',
    en: { label: 'Cement & Structural Steel', sub: 'OPC 53 Cement · Fe-550D TMT Rebar · AAC Blocks', cta: 'Explore Foundation' },
    hi: { label: 'सीमेंट एवं सरिया', sub: 'सीमेंट · टीएमटी सरिया · निर्माण ईंटें', cta: 'फाउंडेशन देखें' },
    navId: 'foundation',
  },
];

export default function CategoryShowcase({ language }: CategoryShowcaseProps) {
  const heading = language === 'en' ? 'Explore by Category' : 'श्रेणी के अनुसार खोजें';
  const sub = language === 'en'
    ? 'Verified materials from India’s leading manufacturers: Hindware, Ashirvad, UltraTech & Havells'
    : 'भारत के शीर्ष ब्रांडों से प्रमाणित निर्माण एवं सैनिटरी सामग्री';

  return (
    <section className="py-14 bg-[#f8f9fb]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8891A]">
            Comprehensive Building Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] mt-1">{heading}</h2>
          <p className="text-[#5a6a82] mt-2 text-sm md:text-base max-w-2xl mx-auto">{sub}</p>
          <div className="w-16 h-1 bg-[#E8891A] mx-auto mt-3 rounded-full" />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const t = cat[language];
            return (
              <Link
                key={cat.id}
                to={`/nav/${cat.navId}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] block shadow-sm hover:shadow-xl transition-all duration-300 border border-[#d0daea]/60"
              >
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={t.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#F4A94A] text-xs font-bold uppercase tracking-wider mb-1">
                    {t.sub}
                  </p>
                  <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
                    {t.label}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-white font-semibold text-xs opacity-80 group-hover:opacity-100 group-hover:text-[#F4A94A] transition-all duration-300">
                    <span>{t.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
