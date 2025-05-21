
import React, { useState, useEffect } from 'react';
import { NAV_LINKS, PRIMARY_ACCENT_HEX, BASE_BG_HEX } from '../constants';
import { NavLink as NavLinkType } from '../types'; 
import Logo from './ui/Logo'; 

interface HeaderProps {
  activeSection: string | null;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // For entry animation
    const entryTimeout = setTimeout(() => {
      setIsMounted(true);
    }, 50); // Short delay for entry animation to trigger

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(entryTimeout);
    };
  }, []);
  
  const handleLinkClick = (hash: string) => {
    if (isOpen) {
      setIsOpen(false);
    }
    // Optional: Manually set active section on click for immediate feedback if needed
    // This would require passing a setter for activeSection or relying on scroll event
  };

  const headerBaseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out";
  const headerDynamicClasses = isScrolled 
    ? `bg-[${BASE_BG_HEX}]/90 shadow-xl backdrop-blur-md` 
    : 'bg-transparent';
  const headerEntryClasses = isMounted ? 'header-entered' : 'header-initial';


  return (
    <header className={`${headerBaseClasses} ${headerDynamicClasses} ${headerEntryClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="focus:outline-none" aria-label="Justin Distributions Home" onClick={() => handleLinkClick('#hero')}>
            <Logo size={32} />
          </a>
          
          <nav className="hidden md:flex space-x-6">
            {NAV_LINKS.map((link: NavLinkType) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`text-[rgba(250,250,250,0.8)] hover:text-[${PRIMARY_ACCENT_HEX}] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 neon-glow-cyan ${activeSection === link.id ? 'active-nav-link' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`p-2 rounded-md text-[rgba(250,250,250,0.8)] hover:text-[#FAFAFA] hover:bg-[${BASE_BG_HEX}]/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[${PRIMARY_ACCENT_HEX}]`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 bg-[${BASE_BG_HEX}]/95 backdrop-blur-sm shadow-lg`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link: NavLinkType) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`text-[rgba(250,250,250,0.8)] hover:bg-[${BASE_BG_HEX}]/70 hover:text-[#FAFAFA] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${activeSection === link.id ? 'active-nav-link' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
