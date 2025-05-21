
import React, { useState, useEffect, useCallback } from 'react';

interface SectionProgressIndicatorProps {
  sections: Array<{ id: string; label: string }>;
  reduceMotion: boolean;
  activeSection: string | null; // Added prop
  onActiveSectionChange: (sectionId: string | null) => void; // Added prop
}

const SectionProgressIndicator: React.FC<SectionProgressIndicatorProps> = ({ 
  sections, 
  reduceMotion, 
  activeSection, // Use this prop for current active state
  onActiveSectionChange // Call this to update parent
}) => {

  const handleScroll = useCallback(() => {
    // Reduce motion check (optional, as parent handles class)
    // if (reduceMotion && !document.body.classList.contains('reduce-motion-enabled')) {}

    let currentSectionId: string | null = null;
    const offset = window.innerHeight * 0.4; 

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      // NAV_LINKS hrefs are like '#about', section.id is 'about'
      const element = document.getElementById(section.id); 
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= offset) {
          currentSectionId = section.id;
          break;
        }
      }
    }
    
    // If scrolled above all sections, default to the first one or null
    if (!currentSectionId && sections.length > 0) {
        const firstSectionEl = document.getElementById(sections[0].id);
        if (firstSectionEl && firstSectionEl.getBoundingClientRect().top > offset) {
            currentSectionId = null; // Or sections[0].id if preferred
        } else {
             currentSectionId = sections[0].id; // Default to first if near top or nothing else matches
        }
    }
    
    if (activeSection !== currentSectionId) { // Only update if changed
      onActiveSectionChange(currentSectionId);
    }

  }, [sections, reduceMotion, onActiveSectionChange, activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
       // Optionally, immediately update active state, though scroll event will catch it
      onActiveSectionChange(sectionId);
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }
  
  return (
    <nav className="section-progress-indicator" aria-label="Page section navigation">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`progress-dot ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          aria-label={`Go to ${section.label} section`}
          aria-current={activeSection === section.id ? 'step' : undefined}
          title={`Go to ${section.label}`}
        />
      ))}
    </nav>
  );
};

export default SectionProgressIndicator;
