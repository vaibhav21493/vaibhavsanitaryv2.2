import { useState, useEffect } from 'react';
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
  Layers,
  Wrench,
  Grid3X3,
  Droplets,
  Zap,
} from 'lucide-react';
import CartWishlistSheet from './components/CartWishlistSheet';
import PlatformReviewBar from './components/PlatformReviewBar';
import AuthStatusButton from './auth/AuthStatusButton';
import { useAuth } from './auth/AuthProvider';

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

      // Section Titles
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

      // Benefits
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

      // Section Titles
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

      // Benefits
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
    {
      id: 1,
      title: language === 'en' ? 'Taps & Basin Mixers' : 'नल और बेसिन मिक्सर',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Hindware & Jaquar collection brass faucets' : 'प्रीमियम पीतल के नल एवं मिक्सर',
      navId: 'taps-mixers',
    },
    {
      id: 2,
      title: language === 'en' ? 'Rain & Multi-Flow Showers' : 'शावर एवं ओवरहेड सिस्टम',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Overhead rain showers & concealed diverters' : 'रेन और हैंड शावर सिस्टम',
      navId: 'showers',
    },
    {
      id: 3,
      title: language === 'en' ? 'Designer Basins & Toilets' : 'टॉयलेट और बेसिन',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Italian table-top washbasins & wall-hung WCs' : 'डिज़ाइनर सिरेमिक सैनिटरी वेयर',
      navId: 'basins',
    },
    {
      id: 4,
      title: language === 'en' ? 'CPVC & UPVC Pipes' : 'प्लंबिंग पाइप और फिटिंग',
      image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Ashirvad Flowguard CPVC & UPVC pressure pipes' : 'आशीर्वाद CPVC और UPVC पाइप',
      navId: 'pipes',
    },
    {
      id: 5,
      title: language === 'en' ? 'Drainage Channels & Traps' : 'ड्रेनेज सिस्टम',
      image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Stainless steel floor traps & linear drains' : 'पूर्ण ड्रेनेज एवं फ्लोर ट्रैप्स',
      navId: 'drainage',
    },
  ];

  // Tiles & Flooring
  const tilesItems = [
    {
      id: 1,
      title: language === 'en' ? 'Vitrified Marble Slabs' : 'विट्रिफाइड मार्बल टाइल्स',
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'High-gloss glazed porcelain floor tiles (2x4, 4x6)' : 'शानदार डिज़ाइन और टिकाऊ फिनिश',
      navId: 'ceramic-tiles',
    },
    {
      id: 2,
      title: language === 'en' ? 'Designer Ceramic Wall Tiles' : 'सिरेमिक दीवार टाइलें',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Waterproof textured bathroom & kitchen wall tiles' : 'वॉटरप्रूफ बाथरूम और किचन दीवार टाइल्स',
      navId: 'ceramic-tiles',
    },
    {
      id: 3,
      title: language === 'en' ? 'Epoxy Grout & Tile Adhesives' : 'ग्राउट और टाइल एडहेसिव',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Waterproof epoxy joint fillers & polymer bonding' : 'टाइल जोड़ों के लिए वॉटरप्रूफ एपॉक्सी',
      navId: 'grout-epoxy',
    },
  ];

  // Electrical & Lighting
  const electricalItems = [
    {
      id: 1,
      title: language === 'en' ? 'Conduit Pipes & Boxes' : 'कंड्यूट पाइप और फिटिंग',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Heavy-duty concealed PVC wiring conduit pipes' : 'इलेक्ट्रिकल फिटिंग और पाइप',
      navId: 'electrical-fitting-pipe',
    },
    {
      id: 2,
      title: language === 'en' ? 'FR Copper Multi-Strand Wires' : 'सुरक्षित विद्युत तार',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Havells & Polycab fire-resistant domestic wire coils' : 'अग्नि-प्रतिरोधी तांबे के तार',
      navId: 'electrical-wire',
    },
    {
      id: 3,
      title: language === 'en' ? 'Modular Switch Panels & MCBs' : 'मॉड्यूलर स्विच बोर्ड',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Designer touch plates, sockets & distribution MCBs' : 'मॉड्यूलर स्विच और सुरक्षा पैनल',
      navId: 'switch-board',
    },
  ];

  // Water Tank
  const waterTankItems = [
    {
      id: 1,
      title: language === 'en' ? 'Antibacterial Water Storage Tanks' : 'पानी की टंकी',
      image: 'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Ashirvad & Sintex 3-layer, 4-layer UV protected tanks (500L - 2000L)' : 'टिकाऊ 3-लेयर एवं 4-लेयर वाटर टैंक',
      navId: 'water-tank',
    },
    {
      id: 2,
      title: language === 'en' ? 'Heavy-Duty Underground Sump Tanks' : 'अंडरग्राउंड स्टोरेज टैंक',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Reinforced polymer underground water tanks' : 'मजबूत अंडरग्राउंड वाटर स्टोरेज',
      navId: 'water-tank',
    },
  ];

  // Foundation & Cement
  const foundationItems = [
    {
      id: 1,
      title: language === 'en' ? 'High-Grade Cement Bags' : 'सीमेंट (UltraTech / ACC)',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'OPC 53, PPC & WeatherPlus cement bags' : 'उच्च गुणवत्ता सीमेंट ब्रांड',
      navId: 'cement',
    },
    {
      id: 2,
      title: language === 'en' ? 'Fe-550D TMT Steel Rebars' : 'टीएमटी सरिया (TMT Steel)',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Tata Tiscon & Jindal Panther earthquake-resistant steel' : 'भूकंप प्रतिरोधी टीएमटी सरिया',
      navId: 'steel',
    },
    {
      id: 3,
      title: language === 'en' ? 'Precision AAC Building Blocks' : 'एएसी ब्लॉक (AAC Blocks)',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop',
      description: language === 'en' ? 'Lightweight thermal insulated structural blocks' : 'हल्की एवं मजबूत निर्माण ईंटें',
      navId: 'brick-aac-blocks',
    },
  ];

  const benefits = [t.benefit1, t.benefit2, t.benefit3, t.benefit4, t.benefit5, t.benefit6];

  // Theme toggle state
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
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003B6F] hover:text-[#E8891A] transition-colors ml-3.5 sm:ml-0"
        >
          <span>View All in Category</span>
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fb]">

      {/* ────────────────────────────────────────────────
          HEADER: Utility Bar + Main Navigation
      ──────────────────────────────────────────────── */}
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
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#003B6F] flex items-center justify-center text-white shadow-sm font-black text-xl">
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
              <Link to="/" className="hover:text-[#003B6F] transition-colors">
                Home
              </Link>
              <Link to="/nav/root" className="hover:text-[#003B6F] transition-colors">
                All Products
              </Link>
              <Link to="/nav/bathroom-sanitary" className="hover:text-[#003B6F] transition-colors">
                Bathware
              </Link>
              <Link to="/nav/pipes" className="hover:text-[#003B6F] transition-colors">
                Plumbing & Tanks
              </Link>
              <Link to="/nav/tiles-flooring" className="hover:text-[#003B6F] transition-colors">
                Tiles
              </Link>
              <Link to="/nav/electrical-lighting" className="hover:text-[#003B6F] transition-colors">
                Electrical
              </Link>
              <a href="#about" className="hover:text-[#003B6F] transition-colors">
                About Us
              </a>
              <a href="#contact" className="hover:text-[#003B6F] transition-colors">
                Contact
              </a>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2.5">
              {/* Language Switch */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#003B6F] border border-[#003B6F]/30 rounded-lg hover:bg-[#003B6F]/10 transition"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>

              {/* Theme Toggle Button (Professional Icon) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#d0daea] hover:bg-[#f8f9fb] text-[#0D1B2A] transition"
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

      {/* ── Hero Carousel + Search ── */}
      <HeroHeader language={language} />

      {/* ── Ashirvad-Style Trust Badges ── */}
      <TrustBar language={language} />

      {/* ── Hindware-Style Category Showcase ── */}
      <CategoryShowcase language={language} />

      {/* ── Turnkey House Package Banner ── */}
      <section className="container mx-auto px-4 my-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#003B6F] via-[#00244A] to-[#003B6F] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E8891A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-3">
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
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/916377307050?text=Hello%20Vaibhav%20Sanitary,%20I%20am%20building%20a%20new%20home%20and%20need%20a%20complete%20material%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-sm transition shadow flex items-center gap-2"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
            <Link
              to="/nav/root"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/20 transition"
            >
              Explore Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Catalog Highlights ── */}
      <main className="container mx-auto px-4 py-10 space-y-16">

        {/* 1. Sanitary & Bathware */}
        <section>
          {sectionHeading(t.sanitary, t.sanitaryDesc, '/nav/bathroom-sanitary')}
          <StepCarousel items={sanitaryItems} />
        </section>

        {/* 2. Tiles & Flooring */}
        <section>
          {sectionHeading(t.tiles, t.tilesDesc, '/nav/tiles-flooring')}
          <StepCarousel items={tilesItems} />
        </section>

        {/* 3. Electrical & Lighting */}
        <section>
          {sectionHeading(t.electrical, t.electricalDesc, '/nav/electrical-lighting')}
          <StepCarousel items={electricalItems} />
        </section>

        {/* 4. Water Storage */}
        <section>
          {sectionHeading(t.waterTank, t.waterTankDesc, '/nav/water-storage')}
          <StepCarousel items={waterTankItems} />
        </section>

        {/* 5. Foundation & Structure */}
        <section>
          {sectionHeading(t.foundation, t.foundationDesc, '/nav/foundation')}
          <StepCarousel items={foundationItems} />
        </section>

        {/* ── Why Choose Us ── */}
        <section className="pt-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold text-[#E8891A] tracking-widest">
              The Vaibhav Sanitary Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] mt-1">
              {t.whyChoose}
            </h2>
            <div className="w-16 h-1 bg-[#E8891A] mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="card-hover-effect flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#d0daea] cursor-default group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#003B6F]/10 flex items-center justify-center text-[#003B6F] group-hover:bg-[#003B6F] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1B2A] text-base group-hover:text-[#003B6F] transition-colors">{benefit.title}</h4>
                  <p className="text-xs text-[#5a6a82] mt-1.5 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── About Us ── */}
        <section id="about" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-[#d0daea] overflow-hidden shadow-sm card-hover-effect">
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B6F]/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact Section ── */}
        <section id="contact" className="scroll-mt-24">
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
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Kapasan+Road+Narpat+Ki+Kheri+Chittorgarh', '_blank')}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#003B6F] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00244A] group-hover:scale-110 transition-all duration-300 shadow">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] text-lg mb-2 group-hover:text-[#003B6F] transition-colors">{t.location}</h3>
              <p className="text-[#5a6a82] text-sm leading-relaxed">
                Kapasan Road, Narpat Ki Kheri, Chittorgarh, Rajasthan
              </p>
              <span className="inline-block mt-3 text-xs text-[#E8891A] font-bold group-hover:translate-x-1 transition-transform">
                Open in Google Maps & Directions &rarr;
              </span>
            </div>

            {/* Phone */}
            <div className="card-hover-effect text-center p-8 bg-white rounded-2xl border border-[#d0daea] group">
              <div className="w-14 h-14 rounded-2xl bg-[#003B6F] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00244A] group-hover:scale-110 transition-all duration-300 shadow">
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
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#25D366] hover:text-[#1EBE5D] transition-colors group-hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

            {/* Timings */}
            <div className="card-hover-effect text-center p-8 bg-white rounded-2xl border border-[#d0daea] group">
              <div className="w-14 h-14 rounded-2xl bg-[#003B6F] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00244A] group-hover:scale-110 transition-all duration-300 shadow">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] text-lg mb-2 group-hover:text-[#003B6F] transition-colors">{t.timings}</h3>
              <p className="text-[#5a6a82] text-sm">Open all 7 days for builders & customers</p>
              <p className="text-[#003B6F] font-bold text-base mt-2">9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </section>
      </main>

      {/* ────────────────────────────────────────────────
          FOOTER
      ──────────────────────────────────────────────── */}
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
                <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8891A] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8891A] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8891A] transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#F4A94A]">{t.quickLinks}</h4>
              <ul className="text-white/60 text-xs space-y-2.5 font-medium">
                <li><Link to="/nav/root" className="hover:text-white transition-colors">Product Catalog</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Inquiry Cart</Link></li>
                <li><Link to="/account" className="hover:text-white transition-colors">Customer Account</Link></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Store Visit</a></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Staff / Admin Portal</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#F4A94A]">{t.categories}</h4>
              <ul className="text-white/60 text-xs space-y-2.5 font-medium">
                <li><Link to="/nav/bathroom-sanitary" className="hover:text-white transition-colors">Bathware & Faucets</Link></li>
                <li><Link to="/nav/tiles-flooring" className="hover:text-white transition-colors">Tiles & Epoxy Grout</Link></li>
                <li><Link to="/nav/pipes" className="hover:text-white transition-colors">CPVC & SWR Plumbing</Link></li>
                <li><Link to="/nav/water-storage" className="hover:text-white transition-colors">Overhead Water Tanks</Link></li>
                <li><Link to="/nav/electrical-lighting" className="hover:text-white transition-colors">Electrical & Conduit</Link></li>
                <li><Link to="/nav/foundation" className="hover:text-white transition-colors">Cement & Structural Base</Link></li>
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