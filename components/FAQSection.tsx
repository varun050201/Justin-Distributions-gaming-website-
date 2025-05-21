
import React, { useState } from 'react';
import SectionContainer from './ui/SectionContainer';
import AnimatedElement from './AnimatedElement';
import { FAQ_DATA, PRIMARY_ACCENT_HEX, BASE_BG_HEX, BORDER_COLOR_HEX, BODY_TEXT_HEX, SECONDARY_ACCENT_HEX } from '../constants';
import { FAQItem } from '../types';

interface FAQAccordionItemProps {
  item: FAQItem;
  index: number;
}

const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedElement 
      className={`border-b border-[${BORDER_COLOR_HEX}]/50 py-1`} 
      delay={`delay-[${index * 75}ms]`}
    >
      <h3>
        <button
          type="button"
          className={`flex justify-between items-center w-full py-5 text-left text-[rgba(250,250,250,0.8)] hover:text-[${SECONDARY_ACCENT_HEX}] focus:outline-none transition-colors duration-200`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`faq-content-${item.id}`}
        >
          <span className="text-lg md:text-xl font-medium">
             <span className={`text-sm text-[${PRIMARY_ACCENT_HEX}] mr-2 font-semibold`}>{String(index + 1).padStart(2, '0')}.</span>
            {item.question}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </h3>
      <div 
        id={`faq-content-${item.id}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
        style={{willChange: 'max-height, opacity'}} 
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
      >
        <div className={`px-1 pt-2 text-[rgba(250,250,250,0.7)] text-base md:text-lg leading-relaxed`}>
          {item.answer}
        </div>
      </div>
    </AnimatedElement>
  );
};

const FAQSection: React.FC = () => {
  return (
    <SectionContainer 
      id="faq" 
      title="Frequently Asked Questions" 
      descriptiveTitle="Section III: Frequently Asked Questions"
      romanNumeral="III" 
      hasSeparator={true} 
      className={`bg-[${BASE_BG_HEX}]`}
    >
      <div className="max-w-3xl mx-auto">
        {FAQ_DATA.map((item, index) => (
          <FAQAccordionItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default FAQSection;