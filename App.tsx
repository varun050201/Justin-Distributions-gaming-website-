
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import TestimonialsSection from './components/TestimonialsSection'; 
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Preloader from './components/ui/Preloader'; 
import SectionProgressIndicator from './components/ui/SectionProgressIndicator'; 
import { NAV_LINKS, BASE_BG_HEX, PRIMARY_ACCENT_HEX } from './constants'; 

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeSectionHook, setActiveSectionHook] = useState<string | null>(NAV_LINKS[0]?.id || null);


  useEffect(() => {
    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(prefersReducedMotionQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };
    prefersReducedMotionQuery.addEventListener('change', handleChange);
    
    return () => {
      prefersReducedMotionQuery.removeEventListener('change', handleChange);
    };
  }, []);


  const handlePreloaderComplete = () => {
    setIsAppLoading(false);
  };

  useEffect(() => {
    if (reduceMotion) {
      document.body.classList.add('reduce-motion-enabled');
    } else {
      document.body.classList.remove('reduce-motion-enabled');
    }
  }, [reduceMotion]);

  const toggleReduceMotion = () => {
    setReduceMotion(prev => !prev);
  };
  
  const sectionsForProgress = NAV_LINKS.map(link => ({ id: link.id, label: link.label }));

  const handleActiveSectionChange = useCallback((sectionId: string | null) => {
    setActiveSectionHook(sectionId);
  }, []);


  return (
    <div className={`bg-[${BASE_BG_HEX}] min-h-screen text-[#FAFAFA] selection:bg-[${PRIMARY_ACCENT_HEX}] selection:text-[${BASE_BG_HEX}]`}>
      {isAppLoading && <Preloader onLoadingComplete={handlePreloaderComplete} reduceMotionEnabled={reduceMotion} />}
      
      {!isAppLoading && 
        <SectionProgressIndicator 
            sections={sectionsForProgress} 
            reduceMotion={reduceMotion} 
            activeSection={activeSectionHook}
            onActiveSectionChange={handleActiveSectionChange}
        />
      }
      
      <div className={`transition-opacity duration-700 ease-in-out ${isAppLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {!isAppLoading && (
          <>
            <Header activeSection={activeSectionHook} />
            <main>
              <HeroSection />
              <AboutSection />
              <ProductsSection />
              <TestimonialsSection /> 
              <FAQSection />
              <ContactSection />
            </main>
            <Footer reduceMotion={reduceMotion} toggleReduceMotion={toggleReduceMotion} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
