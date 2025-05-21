
import React, { useEffect, useRef, useState } from 'react';
import AnimatedElement from './AnimatedElement';
import { PARTNER_LOGOS_DATA, PRIMARY_ACCENT_HEX, TwitterIcon, LinkedInIcon, InstagramIcon, ReduceMotionIcon, IncreaseMotionIcon, SURFACE_BG_HEX, BODY_TEXT_HEX, BORDER_COLOR_HEX } from '../constants';
import { PartnerLogo } from '../types';

interface FooterProps {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
}

const Footer: React.FC<FooterProps> = ({ reduceMotion, toggleReduceMotion }) => {
  const footerRef = useRef<HTMLElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
          if (footerRef.current) {
            observer.unobserve(footerRef.current);
          }
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    const currentFooterRef = footerRef.current;
    if (currentFooterRef) {
      observer.observe(currentFooterRef);
    }

    return () => {
      if (currentFooterRef) {
        observer.unobserve(currentFooterRef);
      }
    };
  }, []);


  return (
    <footer ref={footerRef} className={`bg-[${SURFACE_BG_HEX}] text-[rgba(250,250,250,0.7)] py-12 overflow-hidden`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 footer-reveal ${isFooterVisible ? 'revealed' : ''}`}>
        <AnimatedElement className="mb-12" delay="delay-100">
          <h3 className={`text-xl text-center font-semibold text-[${BODY_TEXT_HEX}] mb-6 uppercase tracking-wider`}>Trusted By</h3>
          <AnimatedElement 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            staggerChildren={100}
            animationClasses='opacity-0 translate-y-4'
          >
            {PARTNER_LOGOS_DATA.map((partner: PartnerLogo) => (
              <img 
                key={partner.id} 
                src={partner.imageUrl} 
                alt={partner.name} 
                className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            ))}
          </AnimatedElement>
        </AnimatedElement>

        <div className={`border-t border-[${BORDER_COLOR_HEX}]/50 pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <AnimatedElement className="text-sm mb-4 md:mb-0" delay="delay-200" animationClasses='opacity-0 translate-x-[-20px]'>
              &copy; {new Date().getFullYear()} Justin Distributions. All Rights Reserved.
            </AnimatedElement>
            
            <AnimatedElement className="flex items-center space-x-5" delay="delay-300" animationClasses='opacity-0 translate-x-[20px]'>
              <div className="flex space-x-5">
                <a href="#" aria-label="Twitter profile" className={`hover:text-[${PRIMARY_ACCENT_HEX}] transition-colors duration-200 neon-glow-cyan social-icon-bob`}>
                  <TwitterIcon className="w-6 h-6" />
                </a>
                <a href="#" aria-label="LinkedIn profile" className={`hover:text-[${PRIMARY_ACCENT_HEX}] transition-colors duration-200 neon-glow-cyan social-icon-bob`}>
                  <LinkedInIcon className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Instagram profile" className={`hover:text-[${PRIMARY_ACCENT_HEX}] transition-colors duration-200 neon-glow-cyan social-icon-bob`}>
                  <InstagramIcon className="w-6 h-6" />
                </a>
              </div>
              <button
                onClick={toggleReduceMotion}
                title={reduceMotion ? "Enable Animations" : "Reduce Animations"}
                aria-pressed={reduceMotion}
                className={`p-2 rounded-md hover:bg-[${BORDER_COLOR_HEX}]/30 text-[rgba(250,250,250,0.7)] hover:text-[${PRIMARY_ACCENT_HEX}] transition-colors duration-200 neon-glow-cyan`}
              >
                {reduceMotion ? <IncreaseMotionIcon className="w-5 h-5" /> : <ReduceMotionIcon className="w-5 h-5" />}
                <span className="sr-only">{reduceMotion ? "Enable Animations" : "Reduce Animations"}</span>
              </button>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
