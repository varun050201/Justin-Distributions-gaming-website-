
import React, { useState, useEffect, useRef } from 'react';

interface DecoderTextProps {
  text: string;
  className?: string;
  scrambleDuration?: number; 
  revealDelay?: number; 
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{}|;:,.<>?/'.split('');
const SCRAMBLE_SPEED = 50; 

const DecoderText: React.FC<DecoderTextProps> = ({ 
  text, 
  className = '',
  scrambleDuration = 300, 
  revealDelay = 0, 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
             setIsRevealed(true);
          }, revealDelay);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [revealDelay, text]);


  useEffect(() => {
    if (!isRevealed || !text) {
      setDisplayedText(Array(text.length).fill('\u00A0').join('')); 
      return;
    }

    const targetChars = text.split('');
    let currentChars = Array(text.length).fill(null);
    
    const updateCharacter = (charIndex: number) => {
      let scramblesLeft = Math.floor(scrambleDuration / SCRAMBLE_SPEED);
      
      const animateScramble = () => {
        if (scramblesLeft > 0) {
          currentChars[charIndex] = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          setDisplayedText(currentChars.map(c => c === null ? '\u00A0' : c).join(''));
          scramblesLeft--;
          setTimeout(animateScramble, SCRAMBLE_SPEED);
        } else {
          currentChars[charIndex] = targetChars[charIndex];
          setDisplayedText(currentChars.map(c => c === null ? '\u00A0' : c).join(''));
        }
      };
      animateScramble();
    };

    targetChars.forEach((_, index) => {
      setTimeout(() => updateCharacter(index), index * (SCRAMBLE_SPEED / 2));
    });
    
  }, [text, isRevealed, scrambleDuration]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {displayedText}
    </span>
  );
};

export default DecoderText;