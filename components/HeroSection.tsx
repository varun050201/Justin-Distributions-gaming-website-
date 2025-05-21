
import React, { useState, useEffect, useRef } from 'react';
import AnimatedElement from './AnimatedElement';
import Button from './ui/Button';
import { PRIMARY_ACCENT_HEX, BASE_BG_HEX, BODY_TEXT_HEX } from '../constants';

const SLIDESHOW_IMAGES = [
  'https://picsum.photos/seed/brightSlotMachines/1920/1080', 
  'https://picsum.photos/seed/casinoFloorVibrant/1920/1080', 
  'https://picsum.photos/seed/rouletteCloseUp/1920/1080',   
  'https://picsum.photos/seed/pokerTableScene/1920/1080',    
  'https://picsum.photos/seed/neonArcadeSlots/1920/1080', 
];
const SLIDESHOW_INTERVAL = 6000; 
const NUM_HERO_PARTICLES = 30;

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroParticles, setHeroParticles] = useState<Array<{id: number, x: number, y: number, size: number, initialX: number, initialY: number }>>([]);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_IMAGES.length);
    }, SLIDESHOW_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < NUM_HERO_PARTICLES; i++) {
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 
        particles.push({ 
            id: i, 
            x: x, 
            y: y, 
            size: Math.random() * 2 + 1, 
            initialX: x,
            initialY: y 
        });
    }
    setHeroParticles(particles);

    const handleMouseMove = (event: MouseEvent) => {
        if (!heroContainerRef.current) return;
        const rect = heroContainerRef.current.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) / rect.width;
        const mouseY = (event.clientY - rect.top) / rect.height;

        setHeroParticles(prevParticles => prevParticles.map(p => {
            const movementStrength = 5 + p.size * 2; 
            const targetX = p.initialX + (mouseX - 0.5) * movementStrength;
            const targetY = p.initialY + (mouseY - 0.5) * movementStrength;
            return {
                ...p,
                x: p.x + (targetX - p.x) * 0.1,
                y: p.y + (targetY - p.y) * 0.1,
            };
        }));
    };
    
    const currentHeroRef = heroContainerRef.current;
    currentHeroRef?.addEventListener('mousemove', handleMouseMove);

    return () => {
        currentHeroRef?.removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  const mainTitleParts = {
      first: "Justin",
      second: "Distributions"
  };
  const mainTitleLetters = `${mainTitleParts.first} ${mainTitleParts.second}`.split('');

  const taglineText = "Your Premier Partner for Cutting-Edge Gaming & Arcade Solutions.";
  const taglineWords = taglineText.split(' ');

  const marqueeBaseText = "JUSTIN DISTRIBUTIONS — GAMING — SELLER — ";
  
  // Adjusted delays
  const titleContainerDelay = "delay-100"; // For AnimatedElement wrapping jd-title-container
  const letterAnimationBaseDelay = 0; // Start letters immediately after container is visible
  const letterStagger = 50; // ms between letters

  const taglineContainerDelay = "delay-[1000ms]"; // Start tagline after main title is likely done (approx sum of titleContainerDelay + last letter delay + anim duration)
  const wordAnimationBaseDelay = 0; // Start words immediately after tagline container is visible
  const wordStagger = 120; // ms between words

  const ctaButtonDelay = "delay-[1800ms]"; // CTA after tagline

  return (
    <section 
      id="hero" 
      ref={heroContainerRef}
      className="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden"
    >
      <div className="hero-slideshow" aria-roledescription="carousel" aria-live="off">
        {SLIDESHOW_IMAGES.map((imageUrl, index) => (
          <div
            key={index} 
            className={`hero-slideshow-slide ${index === currentIndex ? 'current-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Gaming slide ${index + 1} of ${SLIDESHOW_IMAGES.length}`}
            aria-hidden={index !== currentIndex}
          >
            <div 
              className="hero-slideshow-image-inner" 
              style={{ 
                backgroundImage: `url(${imageUrl})`,
                transform: index === currentIndex ? `scale(1.15) translate(0px, ${window.scrollY * 0.1}px)` : 'scale(1.15)' 
              }}
            ></div>
          </div>
        ))}
      </div>
      
      <div className={`absolute inset-0 bg-[${BASE_BG_HEX}]/70 z-10`}></div> 

      <div className="hero-interactive-particles">
          {heroParticles.map(p => (
              <div 
                  key={p.id} 
                  className="hero-particle" 
                  style={{ 
                      width: `${p.size}px`, 
                      height: `${p.size}px`,
                      left: `${p.x}%`, 
                      top: `${p.y}%`,
                      transform: `translate(-50%, -50%)`,
                   }}
              />
          ))}
      </div>
      
      <div className="relative z-20 p-4 flex flex-col items-center">
        <AnimatedElement animationClasses="opacity-0 translate-y-4" delay={titleContainerDelay}>
            <div className="jd-title-container"> {/* This div gets opacity-100 from AnimatedElement */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {mainTitleParts.first.split('').map((letter, i) => (
                        <span 
                            key={`justin-${i}`} 
                            className="jd-hero-letter" 
                            style={{ animationDelay: `${letterAnimationBaseDelay + i * letterStagger}ms`, '--animation-delay': `${letterAnimationBaseDelay + i * letterStagger}ms`} as React.CSSProperties }
                        >
                            {letter}
                        </span>
                    ))}
                    <span 
                        className="jd-hero-letter" 
                        style={{ animationDelay: `${letterAnimationBaseDelay + mainTitleParts.first.length * letterStagger}ms`, '--animation-delay': `${letterAnimationBaseDelay + mainTitleParts.first.length * letterStagger}ms`} as React.CSSProperties }
                    >
                        &nbsp; {/* Space */}
                    </span>
                    {mainTitleParts.second.split('').map((letter, i) => (
                        <span 
                            key={`distributions-${i}`} 
                            className="jd-hero-letter accent-color" 
                            style={{ animationDelay: `${letterAnimationBaseDelay + (mainTitleParts.first.length + 1) * letterStagger + i * letterStagger}ms`, '--animation-delay': `${letterAnimationBaseDelay + (mainTitleParts.first.length + 1) * letterStagger + i * letterStagger}ms`} as React.CSSProperties }
                        >
                            {letter}
                        </span>
                    ))}
                </h1>
            </div>
        </AnimatedElement>
        
        <AnimatedElement animationClasses="opacity-0 translate-y-6" delay={taglineContainerDelay}>
          <h2 className={`hero-tagline text-lg sm:text-xl md:text-2xl text-[rgba(250,250,250,0.85)] mb-10 max-w-3xl mx-auto leading-relaxed`}>
            {taglineWords.map((word, index) => (
              <React.Fragment key={index}>
                <span
                  className="hero-tagline-word"
                  style={{ animationDelay: `${wordAnimationBaseDelay + index * wordStagger}ms`, '--animation-delay': `${wordAnimationBaseDelay + index * wordStagger}ms`} as React.CSSProperties}
                >
                  {word}
                </span>
                {index < taglineWords.length -1 && ' '}
              </React.Fragment>
            ))}
          </h2>
        </AnimatedElement>
        
        <AnimatedElement animationClasses="opacity-0 translate-y-8 scale-95" delay={ctaButtonDelay}>
           <Button href="#products" size="lg" variant="primary">
            View Our Products
          </Button>
        </AnimatedElement>
      </div>

      <div 
        className={`marquee-container marquee-glitch-hover absolute bottom-10 left-0 w-full z-20 py-4 bg-[${BASE_BG_HEX}]/60 backdrop-blur-sm`}
        aria-label="Promotional marquee: Justin Distributions - Gaming - Seller"
      >
        <div className="marquee-text" data-text={marqueeBaseText + marqueeBaseText}> 
          <span className={`text-[${BODY_TEXT_HEX}]`}>JUSTIN DISTRIBUTIONS <span className="marquee-text-accent">—</span> GAMING <span className="marquee-text-accent">—</span> SELLER <span className="marquee-text-accent">—</span>&nbsp;</span>
          <span className={`text-[${BODY_TEXT_HEX}]`}>JUSTIN DISTRIBUTIONS <span className="marquee-text-accent">—</span> GAMING <span className="marquee-text-accent">—</span> SELLER <span className="marquee-text-accent">—</span>&nbsp;</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
