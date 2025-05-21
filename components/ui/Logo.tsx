
import React from 'react';
import { PRIMARY_ACCENT_HEX, BODY_TEXT_HEX } from '../../constants';

interface LogoProps {
  className?: string;
  size?: number; 
  textColor?: string; 
  accentColorHex?: string; // Direct hex for SVG path stroke
  accentTextColorClass?: string; // Tailwind class for text span
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 36,
  textColor = `text-[${BODY_TEXT_HEX}]`,
  accentColorHex = PRIMARY_ACCENT_HEX,
  accentTextColorClass = `text-[${PRIMARY_ACCENT_HEX}]`
}) => {

  return (
    <div className={`flex items-center space-x-2 ${className} ${textColor}`}>
      <svg 
        width={size * 0.8} 
        height={size} 
        viewBox="0 0 30 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20 5 L20 25 Q20 35 10 35 L5 35" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
         <path 
          d="M20 10 L5 10"
          stroke={accentColorHex} 
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-black text-2xl tracking-tighter leading-none">
        JUSTIN
        <span className={accentTextColorClass}>DISTRIBUTIONS</span> 
      </span>
    </div>
  );
};

export default Logo;