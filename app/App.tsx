import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import StepCarousel from './components/StepCarousel';
import HeroHeader from './components/HeroHeader';
import TrustBar from './components/TrustBar';
import CategoryShowcase from './components/CategoryShowcase';
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Languages,
  MessageCircle,
  Star,
  Facebook,
  Instagram,
  Youtube,
  Sun,
  Moon,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Trophy,
  Truck,
  HeadphonesIcon,
  BadgePercent,
  Wrench,
} from 'lucide-react';
import CartWishlistSheet from './components/CartWishlistSheet';
import PlatformReviewBar from './components/PlatformReviewBar';
import AuthStatusButton from './auth/AuthStatusButton';
import { useAuth } from './auth/AuthProvider';

/** Hook: triggers animation class when element scrolls into view */
function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const benefitIcons = [Trophy, ShieldCheck, Wrench, BadgePercent, HeadphonesIcon, Truck];
const benefitColors = [
  { icon: 'text-amber-600', bg: 'bg-amber-50', hoverBg: 'group-hover:bg-amber-500' },
  { icon: 'text-blue-600',  bg: 'bg-blue-50',  hoverBg: 'group-hover:bg-blue-600' },
  { icon: 'text-teal-600',  bg: 'bg-teal-50',  hoverBg: 'group-hover:bg-teal-600' },
  { icon: 'text-green-600', bg: 'bg-green-50', hoverBg: 'group-hover:bg-green-600' },
  { icon: 'text-purple-600',bg: 'bg-purple-50',hoverBg: 'group-hover:bg-purple-600' },
  { icon: 'text-orange-600',bg: 'bg-orange-50',hoverBg: 'group-hover:bg-orange-500' },
];

/** Individual benefit card with 3D tilt */
function BenefitCard({
  benefit,
  index,
  visible,
}: {
  benefit: { title: string; desc: string };
  index: number;
  visible: boolean;
}) {
  const Icon = benefitIcons[index] ?? CheckCircle2;
  const colors = benefitColors[index] ?? benefitColors[0];
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 12, rotateY: x * 12 });
  }, []);

  return (
    <div
      style={{ perspective: '700px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ rotateX: 0, rotateY: 0 }); setHovered(false); }}
        className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#d0daea] cursor-default group h-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${hovered ? 1.03 : 1}) translateY(0)`
            : 'translateY(28px)',
          transition: visible
            ? hovered
              ? 'transform 0.1s linear, box-shadow 0.15s ease'
              : 'transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, opacity 0.5s ease'
            : `opacity 0.5s ease ${index * 80}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
          boxShadow: hovered
            ? `${-tilt.rotateY}px ${tilt.rotateX}px 32px rgba(0,59,111,0.14), 0 1px 4px rgba(0,59,111,0.06)`
            : '0 2px 8px rgba(0,59,111,0.05)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center transition-all duration-350 shadow-sm ${colors.hoverBg} group-hover:scale-115 group-hover:shadow-lg`}
          style={{
            transform: hovered ? 'perspective(200px) rotateY(15deg) scale(1.1)' : 'perspective(200px) rotateY(0deg) scale(1)',
            transition: 'transform 0.4s ease',
          }}
        >
          <Icon className={`w-6 h-6 ${colors.icon} group-hover:text-white transition-colors duration-300`} />
        </div>
        <div>
          <h4 className="font-bold text-[#0D1B2A] text-base group-hover:text-[#003B6F] transition-colors">
            {benefit.title}
          </h4>
          <p className="text-xs text-[#5a6a82] mt-1.5 leading-relaxed">{benefit.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const { user } = useAuth();
  const [profileName, setProfileName] = useState<string>('');

  useEffect(() => {
    const cached = localStorage.getItem('vs.profile.full_name.v1') ?? '';
    setProfileName(cached);
  }, []);

  const translations = {
    en: {
      title: 'Vaibhav Sanitary',
      subtitle: 'Complete House-Building & Sanitary Partner',
      tagline: 'From Foundation to Finish — Everything Under One Roof.',
      whyChoose: 'Why Choose Vaibhav Sanitary',
      aboutUs: 'About Vaibhav Sanitary',
      aboutText:
        "At Vaibhav Sanitary, we believe building your dream home should be simple and stress-free. We supply verified, premium materials — from structural cement & steel to Italian-collection bathware, designer tiles, and heavy-duty CPVC pipelines, backed by expert technical guidance and contractor support in Chittorgarh.",
      contactUs: 'Contact & Store Visit',
      location: 'Store Location',
      callWhatsapp: 'Phone & WhatsApp',
      timings: 'Operating Hours',
      footerTagline: 'Build Your Dream Home with Vaibhav Sanitary.',
      quickLinks: 'Navigation',
      categories: 'Product Categories',
      contactInfo: 'Contact Information',
      followUs: 'Connect With Us',
      allRights: 'All rights reserved.',

      sanitary: 'Bathware & Sanitary Fittings',
      sanitaryDesc: 'Italian collection faucets, rain showers, designer basins & ceramic commodes.',
      tiles: 'Tiles & Surface Finishes',
      tilesDesc: 'Vitrified slabs, ceramic wall tiles, and waterproof epoxy grouting solutions.',
      electrical: 'Electrical & Lighting Setup',
      electricalDesc: 'Modular switches, conduit piping, FR multi-strand wires & LED panels.',
      waterTank: 'Water Storage Solutions',
      waterTankDesc: 'Multi-layer UV stabilized overhead water storage tanks.',
      foundation: 'Foundation & Structural Supplies',
      foundationDesc: 'High-grade cement, TMT reinforcement, and structural hardware.',

      benefit1: { title: 'One-Stop Building Solution', desc: 'All construction materials and fittings under one roof' },
      benefit2: { title: '100% Quality Assured', desc: 'ISI marked, brand certified products only' },
      benefit3: { title: 'Master Contractor Network', desc: 'Direct contacts for verified plumbers, electricians & masons' },
      benefit4: { title: 'Wholesale & Retail Pricing', desc: 'Transparent, highly competitive rates directly from manufacturers' },
      benefit5: { title: 'Technical Guidance', desc: 'Material estimation and layout support at every stage' },
      benefit6: { title: 'Same-Day Site Delivery', desc: 'Prompt site logistics for Chittorgarh & nearby regions' },
    },
    hi: {
      title: 'वैभव सैनिटरी',
      subtitle: 'आपका पूर्ण घर-निर्माण एवं सैनिटरी साथी',
      tagline: 'नींव से फिनिशिंग तक — सब कुछ एक छत के नीचे।',
      whyChoose: 'वैभव सैनिटरी क्यों चुनें',
      aboutUs: 'हमारे बारे में',
      aboutText:
        'वैभव सैनिटरी में, हम मानते हैं कि आपका ड्रीम होम बनाना सरल और तनाव मुक्त होना चाहिए। इसीलिए हम हर आवश्यक सामग्री की आपूर्ति करते हैं — पहली ईंट और सीमेंट से लेकर अंतिम लक्जरी बाथवेयर, टाइल्स और प्लंबिंग तक विशेषज्ञ मार्गदर्शन और ठेकेदार सहायता के साथ।',
      contactUs: 'संपर्क एवं स्टोर का पता',
      location: 'हमारा स्थान',
      callWhatsapp: 'फोन / व्हाट्सएप',
      timings: 'स्टोर का समय',
      footerTagline: 'वैभव सैनिटरी के साथ अपना सपनों का घर बनाएं।',
      quickLinks: 'नेविगेशन',
      categories: 'उत्पाद श्रेणियाँ',
      contactInfo: 'संपर्क जानकारी',
      followUs: 'सोशल मीडिया',
      allRights: 'सर्वाधिकार सुरक्षित।',

      sanitary: 'बाथरूम और सैनिटरी फिटिंग',
      sanitaryDesc: 'प्रीमियम लक्जरी नल, शावर, डिज़ाइनर बेसिन एवं टॉयलेट वेयर।',
      tiles: 'टाइल्स और फ्लोरिंग वर्क',
      tilesDesc: 'विट्रिफाइड टाइल्स, सिरेमिक दीवार टाइलें और एपॉक्सी समाधान।',
      electrical: 'बिजली और लाइटिंग सेटअप',
      electricalDesc: 'मॉड्यूलर स्विच, कंड्यूट पाइपिंग एवं सुरक्षित विद्युत तार।',
      waterTank: 'पानी की टंकी समाधान',
      waterTankDesc: 'टिकाऊ मल्टी-लेयर यूवी स्टेबलाइज्ड वाटर स्टोरेज टैंक।',
      foundation: 'नींव और संरचना सामग्री',
      foundationDesc: 'सुरक्षित और टिकाऊ आधार के लिए उच्च गुणवत्ता सीमेंट एवं सरिया।',

      benefit1: { title: 'वन-स्टॉप समाधान', desc: 'एक छत के नीचे सभी निर्माण और सैनिटरी सामग्री' },
      benefit2: { title: 'गुणवत्ता आश्वासन', desc: 'केवल ISI चिह्नित और प्रमाणित ब्रांडेड उत्पाद' },
      benefit3: { title: 'ठेकेदार नेटवर्क', desc: 'विश्वसनीय प्लंबर, इलेक्ट्रीशियन और राजमिस्त्री संपर्क' },
      benefit4: { title: 'सर्वोत्तम मूल्य', desc: 'पारदर्शी और प्रतिस्पर्धी थोक एवं खुदरा दरें' },
      benefit5: { title: 'तकनीकी मार्गदर्शन', desc: 'सामग्री अनुमान और विशेषज्ञ सहायता' },
      benefit6: { title: 'साइट डिलीवरी', desc: 'चित्तौड़गढ़ और आसपास के क्षेत्रों में त्वरित आपूर्ति' },
    },
  };

  const t = translations[language];

  // Sanitary & Bathroom
  const sanitaryItems = [
    { id: 1, title: language === 'en' ? 'Taps & Basin Mixers' : 'नल और बेसिन मिक्सर', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop', description: language === 'en' ? 'Hindware & Jaquar collection brass faucets' : 'प्रीमियम पीतल के नल एवं मिक्सर', navId: 'taps-mixers' },
    { id: 2, title: language === 'en' ? 'Rain & Multi-Flow Showers' : 'शावर एवं ओवरहेड सिस्टम', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop', description: language === 'en' ? 'Overhead rain showers & concealed diverters' : 'रेन और हैंड शावर सिस्टम', navId: 'showers' },
    { id: 3, title: language === 'en' ? 'Designer Basins & Toilets' : 'टॉयलेट और बेसिन', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop', description: language === 'en' ? 'Italian table-top washbasins & wall-hung WCs' : 'डिज़ाइनर सिरेमिक सैनिटरी वेयर', navId: 'basins' },
    { id: 4, title: language === 'en' ? 'CPVC & UPVC Pipes' : 'प्लंबिंग पाइप और फिटिंग', image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=600&auto=format&fit=crop', description: language === 'en' ? 'Ashirvad Flowguard CPVC & UPVC pressure pipes' : 'आशीर्वाद CPVC और UPVC पाइप', navId: 'pipes' },
    { id: 5, title: language === 'en' ? 'Drainage Channels & Traps' : 'ड्रेनेज सिस्टम', image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=600&auto=format&fit=crop', description: language === 'en' ? 'Stainless steel floor traps & linear drains' : 'पूर्ण ड्रेनेज एवं फ्लोर ट्रैप्स', navId: 'drainage' },
  ];

  const tilesItems = [
    { id: 1, title: language === 'en' ? 'Vitrified Marble Slabs' : 'विट्रिफाइड मार्बल टाइल्स', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&auto=format&fit=crop', description: language === 'en' ? 'High-gloss glazed porcelain floor tiles (2x4, 4x6)' : 'शानदार डिज़ाइन और टिकाऊ फिनिश', navId: 'ceramic-tiles' },
    { id: 2, title: language === 'en' ? 'Designer Ceramic Wall Tiles' : 'सिरेमिक दीवार टाइलें', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop', description: language === 'en' ? 'Waterproof textured bathroom & kitchen wall tiles' : 'वॉटरप्रूफ बाथरूम और किचन दीवार टाइल्स', navId: 'ceramic-tiles' },
    { id: 3, title: language === 'en' ? 'Epoxy Grout & Tile Adhesives' : 'ग्राउट और टाइल एडहेसिव', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop', description: language === 'en' ? 'Waterproof epoxy joint fillers & polymer bonding' : 'टाइल जोड़ों के लिए वॉटरप्रूफ एपॉक्सी', navId: 'grout-epoxy' },
  ];

  const electricalItems = [
    { id: 1, title: language === 'en' ? 'Conduit Pipes & Boxes' : 'कंड्यूट पाइप और फिटिंग', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop', description: language === 'en' ? 'Heavy-duty concealed PVC wiring conduit pipes' : 'इलेक्ट्रिकल फिटिंग और पाइप', navId: 'electrical-fitting-pipe' },
    { id: 2, title: language === 'en' ? 'FR Copper Multi-Strand Wires' : 'सुरक्षित विद्युत तार', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop', description: language === 'en' ? 'Havells & Polycab fire-resistant domestic wire coils' : 'अग्नि-प्रतिरोधी तांबे के तार', navId: 'electrical-wire' },
    { id: 3, title: language === 'en' ? 'Modular Switch Panels & MCBs' : 'मॉड्यूलर स्विच बोर्ड', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop', description: language === 'en' ? 'Designer touch plates, sockets & distribution MCBs' : 'मॉड्यूलर स्विच और सुरक्षा पैनल', navId: 'switch-board' },
  ];

  const waterTankItems = [
    { id: 1, title: language === 'en' ? 'Antibacterial Water Storage Tanks' : 'पानी की टंकी', image: 'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=600&auto=format&fit=crop', description: language === 'en' ? 'Ashirvad & Sintex 3-layer, 4-layer UV protected tanks (500L - 2000L)' : 'टिकाऊ 3-लेयर एवं 4-लेयर वाटर टैंक', navId: 'water-tank' },
    { id: 2, title: language === 'en' ? 'Heavy-Duty Underground Sump Tanks' : 'अंडरग्राउंड स्टोरेज टैंक', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop', description: language === 'en' ? 'Reinforced polymer underground water tanks' : 'मजबूत अंडरग्राउंड वाटर स्टोरेज', navId: 'water-tank' },
  ];

  const foundationItems = [
    { id: 1, title: language === 'en' ? 'High-Grade Cement Bags' : 'सीमेंट (UltraTech / ACC)', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop', description: language === 'en' ? 'OPC 53, PPC & WeatherPlus cement bags' : 'उच्च गुणवत्ता सीमेंट ब्रांड', navId: 'cement' },
    { id: 2, title: language === 'en' ? 'Fe-550D TMT Steel Rebars' : 'टीएमटी सरिया (TMT Steel)', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop', description: language === 'en' ? 'Tata Tiscon & Jindal Panther earthquake-resistant steel' : 'भूकंप प्रतिरोधी टीएमटी सरिया', navId: 'steel' },
    { id: 3, title: language === 'en' ? 'Precision AAC Building Blocks' : 'एएसी ब्लॉक (AAC Blocks)', image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop', description: language === 'en' ? 'Lightweight thermal insulated structural blocks' : 'हल्की एवं मजबूत निर्माण ईंटें', navId: 'brick-aac-blocks' },
  ];

  const benefits = [t.benefit1, t.benefit2, t.benefit3, t.benefit4, t.benefit5, t.benefit6];

  // Theme toggle
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  // Scroll reveal refs
  const benefitsReveal = useRevealOnScroll(0.1);
  const aboutReveal = useRevealOnScroll(0.1);
  const contactReveal = useRevealOnScroll(0.1);

  const sectionHeading = (title: string, sub: string, navLink?: string) => (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1.5 h-6 bg-[#E8891A] rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] tracking-tight">{title}</h2>
        </div>
        <p className="text-sm text-[#5a6a82] ml-3.5">{sub}</p>
      </div>
      {navLink && (
        <Link
          to={navLink}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003B6F] hover:text-[#E8891A] transition-colors ml-3.5 sm:ml-0 group"
        >
          <span>View All in Category</span>
          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb]">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#d0daea]">
        {/* Top Utility Bar */}
        <div className="bg-[#003B6F] text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <a href="tel:6377307050" className="flex items-center gap-1.5 hover:text-[#F4A94A] transition-colors">
                  <Phone className="w-3 h-3 text-[#F4A94A]" />
                  <span>6377307050</span>
                </a>
                <a href="tel:9462656996" className="flex items-center gap-1.5 hover:text-[#F4A94A] transition-colors">
                  <Phone className="w-3 h-3 text-[#F4A94A]" />
                  <span>9462656996</span>
                </a>
                <a
                  href="https://wa.me/916377307050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#25D366] hover:text-white transition-colors font-medium"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#F4A94A]" />
                  9:00 AM – 7:00 PM
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#F4A94A]" />
                  {language === 'en' ? 'Kapasan Road, Chittorgarh' : 'कपासन रोड, चित्तौड़गढ़'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3.5 gap-4">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-[#003B6F] flex items-center justify-center text-white shadow-sm font-black text-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-[#00244A]">
                VS
              </div>
              <div>
                <span className="text-xl font-black text-[#003B6F] tracking-tight block leading-tight">
                  VAIBHAV SANITARY
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5a6a82] block">
                  House-Building & Bathware Partner
                </span>
              </div>
            </Link>

            {/* Middle Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#0D1B2A]">
              <Link to="/" className="hover:text-[#003B6F] transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
              <Link to="/nav/root" className="hover:text-[#003B6F] transition-colors relative group">
                All Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
              <Link to="/nav/bathroom-sanitary" className="hover:text-[#003B6F] transition-colors relative group">
                Bathware
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
              <Link to="/nav/pipes" className="hover:text-[#003B6F] transition-colors relative group">
                Plumbing & Tanks
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
              <Link to="/nav/tiles-flooring" className="hover:text-[#003B6F] transition-colors relative group">
                Tiles
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
              <Link to="/nav/electrical-lighting" className="hover:text-[#003B6F] transition-colors relative group">
                Electrical
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
              <a href="#about" className="hover:text-[#003B6F] transition-colors relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
              <a href="#contact" className="hover:text-[#003B6F] transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8891A] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#003B6F] border border-[#003B6F]/30 rounded-lg hover:bg-[#003B6F]/10 transition hover:scale-105 active:scale-95"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>

              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#d0daea] hover:bg-[#f8f9fb] text-[#0D1B2A] transition hover:scale-110 active:scale-90"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#F4A94A]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#003B6F]" />
                )}
              </button>

              <AuthStatusButton />
              <CartWishlistSheet />
            </div>
          </div>
        </div>
      </header>

      {/* Platform Review Ribbon */}
      <div className="bg-[#eef2f8] border-b border-[#d0daea] py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <PlatformReviewBar language={language} />
          <span className="hidden md:inline text-xs text-[#5a6a82]">
            Serving Chittorgarh, Kapasan, Nimbahera & Mewar Region
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <HeroHeader language={language} />

      {/* ── Trust Badges ── */}
      <TrustBar language={language} />

      {/* ── Category Showcase ── */}
      <CategoryShowcase language={language} />

      {/* ── Turnkey House Package Banner — animated gradient ── */}
      <section className="container mx-auto px-4 my-8">
        <div
          className="vs-gradient-anim relative overflow-hidden rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #003B6F 0%, #00244A 35%, #006466 65%, #003B6F 100%)',
          }}
        >
          {/* Decorative floating icons */}
          <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
            <Sparkles className="w-24 h-24 text-white" />
          </div>
          <div className="absolute bottom-4 left-1/3 opacity-10 pointer-events-none">
            <Zap className="w-16 h-16 text-[#F4A94A]" />
          </div>

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#E8891A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-3 vs-bounce-in">
              <Sparkles className="size-3.5" />
              Turnkey House Consultation
            </div>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              Building a new home in Chittorgarh?
            </h3>
            <p className="mt-2 text-white/80 text-sm md:text-base leading-relaxed">
              Get an end-to-end material estimation, brand comparison, and direct contractor connections for your entire construction project.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 relative z-10">
            <a
              href="https://wa.me/916377307050?text=Hello%20Vaibhav%20Sanitary,%20I%20am%20building%20a%20new%20home%20and%20need%20a%20complete%20material%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="vs-ring-pulse px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
            <Link
              to="/nav/root"
              className="px-6 py-3 glass-card hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Explore Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Catalog Highlights ── */}
      <main className="container mx-auto px-4 py-10 space-y-16">

        <section>{sectionHeading(t.sanitary, t.sanitaryDesc, '/nav/bathroom-sanitary')}<StepCarousel items={sanitaryItems} /></section>
        <section>{sectionHeading(t.tiles, t.tilesDesc, '/nav/tiles-flooring')}<StepCarousel items={tilesItems} /></section>
        <section>{sectionHeading(t.electrical, t.electricalDesc, '/nav/electrical-lighting')}<StepCarousel items={electricalItems} /></section>
        <section>{sectionHeading(t.waterTank, t.waterTankDesc, '/nav/water-storage')}<StepCarousel items={waterTankItems} /></section>
        <section>{sectionHeading(t.foundation, t.foundationDesc, '/nav/foundation')}<StepCarousel items={foundationItems} /></section>

        {/* ── Why Choose Us — 3D benefit cards ── */}
        <section className="pt-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold text-[#E8891A] tracking-widest">
              The Vaibhav Sanitary Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] mt-1">{t.whyChoose}</h2>
            <div className="w-16 h-1 bg-[#E8891A] mx-auto mt-3 rounded-full" />
          </div>
          <div ref={benefitsReveal.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} visible={benefitsReveal.visible} />
            ))}
          </div>
        </section>

        {/* ── About Us ── */}
        <section
          id="about"
          className="scroll-mt-24"
          ref={aboutReveal.ref}
          style={{
            opacity: aboutReveal.visible ? 1 : 0,
            transform: aboutReveal.visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.6s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="bg-white rounded-2xl border border-[#d0daea] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-6 bg-[#E8891A] rounded-full" />
                  <span className="text-xs font-bold text-[#E8891A] uppercase tracking-widest">
                    Who We Are
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-[#0D1B2A] mb-4 leading-tight">{t.aboutUs}</h2>
                <p className="text-[#5a6a82] leading-relaxed text-sm md:text-base">{t.aboutText}</p>
                <div className="mt-8 pt-6 border-t border-[#d0daea] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E8891A] text-[#E8891A]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#0D1B2A]">
                      4.9/5 Rating (1,248+ Reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#003B6F] font-bold">
                    <ShieldCheck className="size-4 text-[#003B6F]" />
                    Authorized Regional Distributor
                  </div>
                </div>
              </div>
              <div className="relative min-h-[280px] md:min-h-0 bg-[#003B6F]/10 overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop"
                  alt="Vaibhav Sanitary Showroom"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B6F]/40 to-transparent" />
                {/* Floating badge on image */}
                <div className="absolute bottom-6 left-6 glass-card rounded-xl px-4 py-2 text-white text-xs font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <ShieldCheck className="w-4 h-4 text-[#F4A94A]" />
                  Since 2000 · Chittorgarh
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact Section ── */}
        <section
          id="contact"
          className="scroll-mt-24"
          ref={contactReveal.ref}
        >
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold text-[#E8891A] tracking-widest">
              Store & Distribution Center
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] mt-1">{t.contactUs}</h2>
            <div className="w-16 h-1 bg-[#E8891A] mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location */}
            <div
              className="card-hover-effect text-center p-8 bg-white rounded-2xl border border-[#d0daea] cursor-pointer group"
              style={{
                opacity: contactReveal.visible ? 1 : 0,
                transform: contactReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.5s ease 0ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0ms',
              }}
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Kapasan+Road+Narpat+Ki+Kheri+Chittorgarh', '_blank')}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#003B6F] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00244A] group-hover:scale-110 transition-all duration-300 shadow group-hover:shadow-xl">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] text-lg mb-2 group-hover:text-[#003B6F] transition-colors">{t.location}</h3>
              <p className="text-[#5a6a82] text-sm leading-relaxed">
                Kapasan Road, Narpat Ki Kheri, Chittorgarh, Rajasthan
              </p>
              <span className="inline-block mt-3 text-xs text-[#E8891A] font-bold group-hover:translate-x-1 transition-transform">
                Open in Google Maps &amp; Directions &rarr;
              </span>
            </div>

            {/* Phone */}
            <div
              className="card-hover-effect text-center p-8 bg-white rounded-2xl border border-[#d0daea] group"
              style={{
                opacity: contactReveal.visible ? 1 : 0,
                transform: contactReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.5s ease 80ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) 80ms',
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#003B6F] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00244A] group-hover:scale-110 transition-all duration-300 shadow group-hover:shadow-xl">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] text-lg mb-2 group-hover:text-[#003B6F] transition-colors">{t.callWhatsapp}</h3>
              <div className="space-y-1">
                <a href="tel:6377307050" className="block text-sm text-[#0D1B2A] font-bold hover:text-[#003B6F] transition-colors">
                  +91 6377307050
                </a>
                <a href="tel:9462656996" className="block text-sm text-[#0D1B2A] font-bold hover:text-[#003B6F] transition-colors">
                  +91 9462656996
                </a>
              </div>
              <a
                href="https://wa.me/916377307050"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#25D366] hover:text-[#1EBE5D] transition-colors hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

            {/* Timings */}
            <div
              className="card-hover-effect text-center p-8 bg-white rounded-2xl border border-[#d0daea] group"
              style={{
                opacity: contactReveal.visible ? 1 : 0,
                transform: contactReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.5s ease 160ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) 160ms',
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#003B6F] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00244A] group-hover:scale-110 transition-all duration-300 shadow group-hover:shadow-xl">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] text-lg mb-2 group-hover:text-[#003B6F] transition-colors">{t.timings}</h3>
              <p className="text-[#5a6a82] text-sm">Open all 7 days for builders &amp; customers</p>
              <p className="text-[#003B6F] font-bold text-base mt-2">9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0D1B2A] text-white pt-14 pb-8 border-t border-white/10 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#E8891A] flex items-center justify-center font-bold text-white text-sm">
                  VS
                </div>
                <h4 className="font-bold text-lg tracking-tight">{t.title}</h4>
              </div>
              <p className="text-white/60 text-xs leading-relaxed mb-3">{t.subtitle}</p>
              <p className="text-[#F4A94A] text-xs italic">"{t.footerTagline}"</p>
              <div className="flex gap-3 mt-6">
                {[
                  { href: '#', label: 'Facebook', Icon: Facebook },
                  { href: '#', label: 'Instagram', Icon: Instagram },
                  { href: '#', label: 'YouTube', Icon: Youtube },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8891A] transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-90"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#F4A94A]">{t.quickLinks}</h4>
              <ul className="text-white/60 text-xs space-y-2.5 font-medium">
                <li><Link to="/nav/root" className="hover:text-white hover:translate-x-1 transition-all inline-block">Product Catalog</Link></li>
                <li><Link to="/cart" className="hover:text-white hover:translate-x-1 transition-all inline-block">Inquiry Cart</Link></li>
                <li><Link to="/account" className="hover:text-white hover:translate-x-1 transition-all inline-block">Customer Account</Link></li>
                <li><a href="#about" className="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</a></li>
                <li><a href="#contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Store Visit</a></li>
                <li><Link to="/admin" className="hover:text-white hover:translate-x-1 transition-all inline-block">Staff / Admin Portal</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#F4A94A]">{t.categories}</h4>
              <ul className="text-white/60 text-xs space-y-2.5 font-medium">
                <li><Link to="/nav/bathroom-sanitary" className="hover:text-white hover:translate-x-1 transition-all inline-block">Bathware & Faucets</Link></li>
                <li><Link to="/nav/tiles-flooring" className="hover:text-white hover:translate-x-1 transition-all inline-block">Tiles & Epoxy Grout</Link></li>
                <li><Link to="/nav/pipes" className="hover:text-white hover:translate-x-1 transition-all inline-block">CPVC & SWR Plumbing</Link></li>
                <li><Link to="/nav/water-storage" className="hover:text-white hover:translate-x-1 transition-all inline-block">Overhead Water Tanks</Link></li>
                <li><Link to="/nav/electrical-lighting" className="hover:text-white hover:translate-x-1 transition-all inline-block">Electrical & Conduit</Link></li>
                <li><Link to="/nav/foundation" className="hover:text-white hover:translate-x-1 transition-all inline-block">Cement & Structural Base</Link></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#F4A94A]">{t.contactInfo}</h4>
              <ul className="text-white/60 text-xs space-y-3 font-medium">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#E8891A]" />
                  <span>+91 6377307050 / +91 9462656996</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#E8891A]" />
                  <span>Kapasan Road, Narpat Ki Kheri, Chittorgarh, Rajasthan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#E8891A]" />
                  <span>9:00 AM – 7:00 PM (Monday – Sunday)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-3 text-white/40 text-xs">
            <p>© {new Date().getFullYear()} {t.title}. {t.allRights}</p>
            <p className="italic">{t.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}