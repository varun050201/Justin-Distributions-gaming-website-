
import React, { useEffect, useRef, useState } from 'react';
import AnimatedElement from '../AnimatedElement'; 
import { PRIMARY_ACCENT_HEX } from '../../constants';

interface SectionContainerProps {
  id: string;
  title?: string;
  descriptiveTitle?: string; 
  romanNumeral?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  hasSeparator?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ 
  id, 
  title, 
  descriptiveTitle,
  romanNumeral, 
  children, 
  className = '', 
  titleClassName = '',
  contentClassName = '',
  hasSeparator = false,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const bgTextContainerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isSeparatorVisible, setIsSeparatorVisible] = useState(false);
  const [isBgTextVisible, setIsBgTextVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null); // Ref for the section itself to calculate scroll

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    
    const titleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsTitleVisible(true);
        if (titleRef.current) titleObserver.unobserve(titleRef.current);
      }
    }, observerOptions);

    const separatorObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsSeparatorVisible(true);
        if (separatorRef.current) separatorObserver.unobserve(separatorRef.current);
      }
    }, observerOptions);

    const bgTextObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            setIsBgTextVisible(true);
            if (bgTextContainerRef.current) bgTextObserver.unobserve(bgTextContainerRef.current);
        }
    }, { threshold: 0.05 }); // Trigger earlier for bg text

    if (titleRef.current && title) titleObserver.observe(titleRef.current);
    if (separatorRef.current && hasSeparator) separatorObserver.observe(separatorRef.current);
    if (bgTextContainerRef.current && title) bgTextObserver.observe(bgTextContainerRef.current);
    
    // Parallax for background text
    const handleScroll = () => {
        if (bgTextRef.current && sectionRef.current && isBgTextVisible) {
            const rect = sectionRef.current.getBoundingClientRect();
            // Calculate scroll percentage within the section, or based on viewport entry
            const scrollY = window.scrollY;
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Make parallax effect subtle and tied to how much of section is visible
            // Starts when top of section is at bottom of viewport, ends when bottom of section is at top.
            let progress = 0;
            if (rect.bottom >= 0 && rect.top <= viewportHeight) {
                 progress = (viewportHeight - rect.top) / (viewportHeight + elementHeight);
            }
            
            const translateY = (progress - 0.5) * -50; // Adjust multiplier for parallax strength
            bgTextRef.current.style.transform = `translateY(${translateY}px)`;
        }
    };

    if (title) { // Only add scroll listener if there's a title for background text
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (titleRef.current && title) titleObserver.unobserve(titleRef.current);
      if (separatorRef.current && hasSeparator) separatorObserver.unobserve(separatorRef.current);
      if (bgTextContainerRef.current && title) bgTextObserver.unobserve(bgTextContainerRef.current);
      if (title) {
          window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [title, hasSeparator, isBgTextVisible]);

  return (
    <section ref={sectionRef} id={id} className={`relative py-16 md:py-24 ${className} overflow-hidden`} aria-label={descriptiveTitle || title}>
      {title && (
        <div ref={bgTextContainerRef} className={`section-title-bg-text-container ${isBgTextVisible ? 'visible' : ''}`}>
            <div ref={bgTextRef} className="section-title-bg-text">
                {title}
            </div>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Content needs higher z-index */}
        {title && (
          <div ref={titleRef} className="text-center mb-2"> 
            <h2 
              className={`text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-widest ${titleClassName} title-mask-container`}
              style={{ fontFamily: romanNumeral ? "'Orbitron', sans-serif" : undefined }} // Use Orbitron if numeral present
            >
              {romanNumeral && (
                <span 
                  aria-hidden="true" 
                  className={`text-[${PRIMARY_ACCENT_HEX}] mr-2 md:mr-4 title-text-reveal ${isTitleVisible ? 'revealed' : ''}`}
                  style={{ transitionDelay: '0ms' }}
                >
                  {romanNumeral}.
                </span>
              )}
              <span className={`title-text-reveal ${isTitleVisible ? 'revealed' : ''}`} style={{ transitionDelay: isTitleVisible ? (romanNumeral ? '200ms' : '50ms') : '0ms' }}>
                {title}
              </span>
            </h2>
          </div>
        )}
        {hasSeparator && title && (
           <div ref={separatorRef} className="flex justify-center mt-4 mb-12 md:mb-16"> 
             <div className={`h-1 separator-line-draw ${isSeparatorVisible ? 'drawn' : ''}`} style={{ transitionDelay: isSeparatorVisible ? (romanNumeral ? '400ms' : '250ms') : '0ms' }}></div>
           </div>
        )}
        {!title && hasSeparator && ( 
           <div ref={separatorRef} className="flex justify-center my-12 md:my-16"> 
            <div className={`h-0.5 separator-line-draw-thin ${isSeparatorVisible ? 'drawn' : ''}`}></div>
           </div>
        )}
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </section>
  );
};
export default SectionContainer;
