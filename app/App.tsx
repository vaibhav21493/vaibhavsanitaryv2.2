import { useState, useEffect } from 'react';
import StepCarousel from './components/StepCarousel';
import HeroHeader from './components/HeroHeader';
import { Phone, MapPin, Clock, CheckCircle, Languages } from 'lucide-react';
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
      subtitle: 'Your Complete House-Building Partner',
      welcome: 'Welcome to Vaibhav Sanitary',
      welcomeText: 'Your trusted destination for sanitary ware, plumbing materials, construction supplies, tiles, lighting, hardware, steel, POP materials, glass & contractor support — all under one roof.',
      visitStore: 'Visit our store on Kapasan Road,Narpat Ki Kheri, Chittorgarh',
      tagline: 'From Foundation to Finish — Everything Under One Roof.',
      whyChoose: 'Why Choose Vaibhav Sanitary',
      aboutUs: 'About Us',
      aboutText: 'At Vaibhav Sanitary, we believe building your dream home should be simple and stress-free. That\'s why we supply every material required — from the first brick to the final finishing along with expert guidance & contractor support so you never have to search anywhere else.',
      contactUs: 'Contact Us',
      location: 'Location',
      callWhatsapp: 'Call / WhatsApp',
      timings: 'Timings',
      footerTagline: 'Build Your Dream Home with Vaibhav Sanitary.',
      
      // Steps
      foundation: 'Foundation & Structure',
      foundationDesc: 'Strong materials for a safe and durable base.',
      wallsRoof: 'Walls & Roof Construction',
      wallsRoofDesc: 'Reliable support at every stage.',
      plaster: 'Plaster & POP Base Work',
      plasterDesc: 'Perfect walls & ceilings start here.',
      tiles: 'Tiles & Flooring Work',
      tilesDesc: 'Beautiful finishing your home deserves.',
      electrical: 'Electrical & Lighting Setup',
      electricalDesc: 'Safe, bright & efficient lighting.',
      sanitary: 'Bathroom & Sanitary Fittings',
      sanitaryDesc: 'Premium quality & long-lasting performance.',
      painting: 'Painting & Home Decoration',
      paintingDesc: 'Add beauty & style to your dream home.',
      glass: 'Windows, Doors & Glass Work',
      glassDesc: 'Elegant finishing touches.',
      waterTank: 'Water Tank',
      waterTankDesc: 'Durable water storage solutions.',
      
      // Benefits
      benefit1: 'One-stop solution for all building needs',
      benefit2: 'Quality-assured materials',
      benefit3: 'Trusted contractor contacts',
      benefit4: 'Best pricing',
      benefit5: 'Friendly customer guidance',
    },
    hi: {
      title: 'वैभव सैनिटरी',
      subtitle: 'आपका पूर्ण घर-निर्माण साथी',
      welcome: 'वैभव सैनिटरी में आपका स्वागत है',
      welcomeText: 'सैनिटरी वेयर, प्लंबिंग सामग्री, निर्माण आपूर्ति, टाइल्स, लाइटिंग, हार्डवेयर, स्टील, POP सामग्री, ग्लास और ठेकेदार सहायता के लिए आपका विश्वसनीय गंतव्य — सब कुछ एक छत के नीचे।',
      visitStore: 'कपासन रोड, नरपत की खेड़ी, चित्तौड़गढ़ पर हमारे स्टोर पर जाएं',
      tagline: 'नींव से फिनिशिंग तक — सब कुछ एक छत के नीचे।',
      whyChoose: 'वैभव सैनिटरी क्यों चुनें',
      aboutUs: 'हमारे बारे में',
      aboutText: 'वैभव सैनिटरी में, हम मानते हैं कि आपका ड्रीम होम बनाना सरल और तनाव मुक्त होना चाहिए। इसीलिए हम हर आवश्यक सामग्री की आपूर्ति करते हैं — पहली ईंट से लेकर अंतिम फिनिशिंग तक विशेषज्ञ मार्गदर्शन और ठेकेदार सहायता के साथ ताकि आपको कहीं और खोजने की आवश्यकता न हो।',
      contactUs: 'संपर्क करें',
      location: 'स्थान',
      callWhatsapp: 'कॉल / व्हाट्सएप',
      timings: 'समय',
      footerTagline: 'वैभव सैनिटरी के साथ अपना सपनों का घर बनाएं।',
      
      // Steps
      foundation: 'नींव और संरचना',
      foundationDesc: 'सुरक्षित और टिकाऊ आधार के लिए मजबूत सामग्री।',
      wallsRoof: 'दीवारें और छत निर्माण',
      wallsRoofDesc: 'हर चरण में विश्वसनीय सहायता।',
      plaster: 'प्लास्टर और POP बेस वर्क',
      plasterDesc: 'परफेक्ट दीवारें और छत यहाँ से शुरू होती हैं।',
      tiles: 'टाइल्स और फ्लोरिंग वर्क',
      tilesDesc: 'आपके घर की सुंदर फिनिशिंग।',
      electrical: 'बिजली और लाइटिंग सेटअप',
      electricalDesc: 'सुरक्षित, उज्ज्वल और कुशल प्रकाश।',
      sanitary: 'बाथरूम और सैनिटरी फिटिंग',
      sanitaryDesc: 'प्रीमियम गुणवत्ता और लंबे समय तक चलने वाला प्रदर्शन।',
      painting: 'पेंटिंग और होम डेकोरेशन',
      paintingDesc: 'अपने सपनों के घर में सुंदरता और शैली जोड़ें।',
      glass: 'खिड़कियां, दरवाजे और ग्लास वर्क',
      glassDesc: 'सुरुचिपूर्ण फिनिशिंग टच।',
      waterTank: 'पानी की टंकी',
      waterTankDesc: 'टिकाऊ पानी भंडारण समाधान।',
      
      // Benefits
      benefit1: 'सभी निर्माण आवश्यकताओं के लिए न-स्टॉप समाधान',
      benefit2: 'गुणवत्ता-आश्वासित सामग्री',
      benefit3: 'विश्वसनीय ठेकेदार संपर्क',
      benefit4: 'सर्वोत्तम मूल्य निर्धारण',
      benefit5: 'मैत्रीपूर्ण ग्राहक मार्गदर्शन',
    }
  };

  const t = translations[language];

  const foundationItems = [
    {
      id: 1,
      title: language === 'en' ? 'Cement' : 'सीमेंट',
      image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400',
      description: language === 'en' ? 'High-quality cement brands' : 'उच्च गुणवत्ता सीमेंट ब्रांड',
      navId: 'cement',
    },
  ];

  /* HIDDEN: Walls & Roof Construction Category
  const wallsRoofItems = [
    {
      id: 1,
      title: language === 'en' ? 'Bricks & Blocks' : 'ईंटें और ब्लॉक',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
      description: language === 'en' ? 'For wall construction' : 'दीवार निर्माण के लिए',
      navId: 'blocks',
    },
    {
      id: 2,
      title: language === 'en' ? 'Steel Reinforcement' : 'स्टील रीइन्ोर्समेंट',
      image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400',
      description: language === 'en' ? 'Roof support materials' : 'छत समर्थन सामग्री',
      navId: 'roof-steel',
    },
    {
      id: 3,
      title: language === 'en' ? 'Construction Hardware' : 'निर्माण हार्डवेयर',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      description: language === 'en' ? 'Essential tools & supplies' : 'आवश्यक उपकरण और आपूर्ति',
      navId: 'construction-hardware',
    },
    {
      id: 4,
      title: language === 'en' ? 'Contractor Support' : 'ठेकेदार सहायता',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      description: language === 'en' ? 'Skilled contractor contacts' : 'कुशल ठेकेदार संपर्क',
      navId: 'contractors-masonry',
    },
  ];
  */

  /* HIDDEN: Plaster & POP Category
  const plasterItems = [
    {
      id: 1,
      title: language === 'en' ? 'POP Material' : 'POP सामग्री',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400',
      description: language === 'en' ? 'Quality plaster of paris' : 'गुणवत्ता प्लास्टर ऑफ पेरिस',
      navId: 'pop',
    },
    {
      id: 2,
      title: language === 'en' ? 'Finishing Hardware' : 'फिनिशिंग हार्डवेयर',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      description: language === 'en' ? 'Tools for perfect finish' : 'परफेक्ट फिनिश के लिए उपकरण',
      navId: 'finishing-tools',
    },
    {
      id: 3,
      title: language === 'en' ? 'POP Contractor' : 'POP ठेकेदार',
      image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400',
      description: language === 'en' ? 'Expert POP contractors' : 'विशेषज्ञ POP ठेकेदार',
      navId: 'contractors-pop',
    },
  ];
  */

  const tilesItems = [
    {
      id: 1,
      title: language === 'en' ? 'Ceramic Tiles' : 'सिरेमिक टाइल्स',
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400',
      description: language === 'en' ? 'Multiple designs available' : 'कई डिज़ाइन उपलब्ध',
      navId: 'ceramic-tiles',
    },
    {
      id: 2,
      title: language === 'en' ? 'Grout & Epoxy' : 'ग्राउट और एपॉक्सी',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      description: language === 'en' ? 'Grout and epoxy solutions for tile joints' : 'टाइल जोड़ों के लिए ग्राउट और एपॉक्सी समाधान',
      navId: 'grout-epoxy',
    },
  ];

  const electricalItems = [
    {
      id: 1,
      title: language === 'en' ? 'Fitting & Pipe' : 'फिटिंग और पाइप',
      image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400',
      description: language === 'en' ? 'Electrical fittings & conduit pipes' : 'इलेक्ट्रिकल फिटिंग और कंड्यूट पाइप',
      navId: 'electrical-fitting-pipe',
    },
    {
      id: 2,
      title: language === 'en' ? 'Wire' : 'तार',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      description: language === 'en' ? 'Quality electrical wires' : 'गुणवत्ता विद्युत तार',
      navId: 'electrical-wire',
    },
    {
      id: 3,
      title: language === 'en' ? 'Switch Board' : 'स्विच बोर्ड',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400',
      description: language === 'en' ? 'Modular switch boards & panels' : 'मॉड्यूलर स्विच बोर्ड और पैनल',
      navId: 'switch-board',
    },
  ];

  const sanitaryItems = [
    {
      id: 1,
      title: language === 'en' ? 'Taps & Mixers' : 'नल और मिक्सर',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
      description: language === 'en' ? 'Premium quality taps' : 'प्रीमियम गुणवत्ता नल',
      navId: 'taps-mixers',
    },
    {
      id: 2,
      title: language === 'en' ? 'Showers' : 'शावर',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
      description: language === 'en' ? 'Rain & hand showers' : 'रेन और हंड शावर',
      navId: 'showers',
    },
    {
      id: 3,
      title: language === 'en' ? 'Toilets & Basins' : 'टॉयलेट और बेसिन',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400',
      description: language === 'en' ? 'Designer sanitary ware' : 'डिज़ाइनर सैनिटरी वेयर',
      navId: 'basins',
    },
    {
      id: 4,
      title: language === 'en' ? 'Plumbing Pipes' : 'प्लंबिंग पाइप',
      image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400',
      description: language === 'en' ? 'CPVC & PVC pipes' : 'CPVC और PVC पाइप',
      navId: 'pipes',
    },
    {
      id: 5,
      title: language === 'en' ? 'Drainage Items' : 'ड्रेनेज आइटम',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
      description: language === 'en' ? 'Complete drainage system' : 'पूर्ण ड्रेनेज सिस्टम',
      navId: 'drainage',
    },
  ];

  const waterTankItems = [
    {
      id: 1,
      title: language === 'en' ? 'Water Tank' : 'पानी की टंकी',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
      description: language === 'en' ? 'Durable water storage tanks' : 'टिकाऊ पानी भंडारण टैंक',
      navId: 'water-tank',
    },
  ];

  /* HIDDEN: Painting & Home Decoration Category
  const paintingItems = [
    {
      id: 1,
      title: language === 'en' ? 'Wall Paints' : 'वॉल पेंट',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
      description: language === 'en' ? 'All colors available' : 'सभी रंग उपलब्ध',
      navId: 'wall-paints',
    },
    {
      id: 2,
      title: language === 'en' ? 'Premium Paints' : 'प्रीमियम पेंट',
      image: 'https://images.unsplash.com/photo-1572363241899-409f46ba62f5?w=400',
      description: language === 'en' ? 'Weather-resistant finish' : 'मौसम प्रतिरोधी फिनिश',
      navId: 'premium-paints',
    },
    {
      id: 3,
      title: language === 'en' ? 'Painting Hardware' : 'पेंटिंग हार्डवेयर',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400',
      description: language === 'en' ? 'Brushes, rollers & tools' : 'ब्रश, रोलर और उपकरण',
      navId: 'rollers-brushes',
    },
    {
      id: 4,
      title: language === 'en' ? 'Accessories' : 'सहायक उपकरण',
      image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400',
      description: language === 'en' ? 'Putty, primer & more' : 'पुट्टी, प्राइमर और अधिक',
      navId: 'primer-putty',
    },
  ];
  */

  /* HIDDEN: Windows, Doors & Glass Work Category
  const glassItems = [
    {
      id: 1,
      title: language === 'en' ? 'Window Glass' : 'विंडो ग्लास',
      image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400',
      description: language === 'en' ? 'Clear & tinted options' : 'क्लियर और टिंटेड विकल्प',
      navId: 'window-glass',
    },
    {
      id: 2,
      title: language === 'en' ? 'Door Glass' : 'डोर ग्लास',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400',
      description: language === 'en' ? 'Tempered safety glass' : 'टेम्पर्ड सेफ्टी ग्लास',
      navId: 'door-glass',
    },
    {
      id: 3,
      title: language === 'en' ? 'Glass Fittings' : 'ग्लास फिटिंग',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
      description: language === 'en' ? 'Hardware for glass work' : 'ग्लास वर्क के लिए हार्डवेयर',
      navId: 'glass-fittings',
    },
    {
      id: 4,
      title: language === 'en' ? 'Glass Contractors' : 'ग्लास ठेकेदार',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400',
      description: language === 'en' ? 'Expert glass installers' : 'विशेषज्ञ ग्लास इंस्टॉलर',
      navId: 'contractors-glass',
    },
  ];
  */

  const benefits = [
    t.benefit1,
    t.benefit2,
    t.benefit3,
    t.benefit4,
    t.benefit5,
  ];

  // Theme state and effect
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 py-4">
            {/* Top bar */}
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  🏠 {t.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.subtitle}
                </p>
              </div>

              {/* Right actions */}
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition border border-border"
                >
                  <Languages className="w-4 h-4 inline mr-1" />
                  {language === 'en' ? 'हिंदी' : 'English'}
                </button>

                <AuthStatusButton />
                <CartWishlistSheet />
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-medium text-foreground">6377307050</div>
                  <div className="text-xs">9462656996</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div className="text-sm">{t.visitStore}</div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div className="text-sm">9:00 AM – 7:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PlatformReviewBar */}
      <div className="bg-secondary border-b border-border py-2">
        <div className="container mx-auto px-4">
          <PlatformReviewBar language={language} />
        </div>
      </div>

      {/* New Hero Header with Carousel, Search & Categories */}
      <section className="container mx-auto px-4 py-8">
        <HeroHeader language={language} />
      </section>

      {/* Hero Section with Welcome */}
      <section className="bg-gradient-to-r from-primary to-primary text-primary-foreground py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {user && profileName ? `Welcome back, ${profileName}!` : t.welcome}
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-primary-foreground/80 dark:text-primary-foreground">
            {t.welcomeText}
          </p>
          <p className="text-xl font-semibold italic text-primary-foreground/70 dark:text-primary-foreground">
            "{t.tagline}"
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Foundation & Structure */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              ✅ {t.foundation}
            </h2>
            <p className="text-muted-foreground">{t.foundationDesc}</p>
          </div>
          <StepCarousel items={foundationItems} />
        </section>

        {/* HIDDEN: Walls & Roof Construction Category
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-2">
              ✅ {t.wallsRoof}
            </h2>
            <p className="text-muted-foreground">📌 {t.wallsRoofDesc}</p>
          </div>
          <StepCarousel items={wallsRoofItems} />
        </section>
        */}

        {/* HIDDEN: Plaster & POP Category
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-2">
              ✅ {t.plaster}
            </h2>
            <p className="text-muted-foreground">📌 {t.plasterDesc}</p>
          </div>
          <StepCarousel items={plasterItems} />
        </section>
        */}

        {/* Tiles & Flooring */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              ✅ {t.tiles}
            </h2>
            <p className="text-muted-foreground">{t.tilesDesc}</p>
          </div>
          <StepCarousel items={tilesItems} />
        </section>

        {/* Electrical & Lighting */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              ✅ {t.electrical}
            </h2>
            <p className="text-muted-foreground">{t.electricalDesc}</p>
          </div>
          <StepCarousel items={electricalItems} />
        </section>

        {/* Sanitary Fittings */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              ✅ {t.sanitary}
            </h2>
            <p className="text-muted-foreground">{t.sanitaryDesc}</p>
          </div>
          <StepCarousel items={sanitaryItems} />
        </section>

        {/* Water Tank */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              ✅ {t.waterTank}
            </h2>
            <p className="text-muted-foreground">{t.waterTankDesc}</p>
          </div>
          <StepCarousel items={waterTankItems} />
        </section>

        {/* HIDDEN: Painting & Home Decoration Category
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              ✅ {t.painting}
            </h2>
            <p className="text-gray-600">📌 {t.paintingDesc}</p>
          </div>
          <StepCarousel items={paintingItems} />
        </section>
        */}

        {/* HIDDEN: Windows, Doors & Glass Work Category
        <section className="mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent mb-2">
              ✅ {t.glass}
            </h2>
            <p className="text-gray-600">📌 {t.glassDesc}</p>
          </div>
          <StepCarousel items={glassItems} />
        </section>
        */}

        {/* Why Choose Us */}
        <section className="mb-16 bg-primary rounded-xl p-8 md:p-12 border border-primary">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ⭐ {t.whyChoose}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-200"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section className="mb-16 bg-blue-50 rounded-xl p-8 md:p-12 border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">🧩 {t.aboutUs}</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            {t.aboutText}
          </p>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-xl p-8 md:p-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📞 {t.contactUs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="text-center hover:shadow-lg transition-shadow p-6 rounded-lg bg-gray-50 cursor-pointer"
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Kapasan+Road+Narpat+Ki+Kheri+Chittorgarh', '_blank')}
              title="Click to open in Google Maps"
            >
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t.location}</h3>
              <p className="text-secondary-foreground hover:text-accent transition-colors">
                Kapasan Road, Narpat Ki Kheri, Chittorgarh
              </p>
              <p className="text-xs text-primary-foreground mt-1">Click to view on map</p>
            </div>
            <div className="text-center hover:shadow-lg transition-shadow p-6 rounded-lg bg-gray-50">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t.callWhatsapp}
              </h3>
              <div className="text-gray-600 space-y-1">
                <a 
                  href="tel:6377307050"
                  className="block hover:text-accent transition-colors cursor-pointer"
                >
                  6377307050
                </a>
                <a 
                  href="tel:9462656996"
                  className="block hover:text-accent transition-colors cursor-pointer"
                >
                  9462656996
                </a>
              </div>
              <p className="text-xs text-primary-foreground mt-1">Click to call</p>
            </div>
            <div className="text-center hover:shadow-lg transition-shadow p-6 rounded-lg bg-gray-50">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t.timings}</h3>
              <p className="text-gray-600">9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">🏠 {t.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{t.subtitle}</p>
              <p className="text-gray-400 text-sm italic">"{t.footerTagline}"</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Products</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Contractors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>📞 6377307050</li>
                <li>📞 9462656996</li>
                <li>📍 Kapasan Road, Chittorgarh</li>
                <li>⏰ 9:00 AM – 7:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} {t.title}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating theme toggle button */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: 'var(--card)',
          color: 'var(--card-foreground)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          width: 48,
          height: 48,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}
        aria-label="Toggle dark mode"
        title="Toggle dark/light mode"
      >
        <span role="img" aria-label="theme">🌓</span>
      </button>
    </div>
  );
}