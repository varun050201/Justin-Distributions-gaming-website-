
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Logo from './Logo'; 
import { PRIMARY_ACCENT_HEX, BODY_TEXT_HEX } from '../../constants';
import DecoderText from './DecoderText'; // Import DecoderText

interface PreloaderProps {
  onLoadingComplete: () => void;
  reduceMotionEnabled: boolean;
}

type PreloaderPhase = 
  | 'initialDelay'
  | 'lightBars' 
  | 'logoAppear' 
  | 'statusTextAppear' 
  | 'finalPause' 
  | 'fadingOut'
  | 'hidden';

const PRELOADER_CONFIG = {
  initialDelay: 100,
  lightBarsDuration: 600,
  lightBarStagger: 80,
  logoAppearDuration: 800,
  logoAppearDelay: 500, // After light bars start
  statusTextAppearDuration: 700,
  statusTextAppearDelay: 1000, // After light bars start
  finalPauseDuration: 500,
  fadeOutDuration: 700,
};

const REDUCED_MOTION_PRELOADER_CONFIG = {
  initialDelay: 50,
  lightBarsDuration: 100,
  lightBarStagger: 0,
  logoAppearDuration: 100,
  logoAppearDelay: 100,
  statusTextAppearDuration: 100,
  statusTextAppearDelay: 150,
  finalPauseDuration: 50,
  fadeOutDuration: 100,
};

const NUM_LIGHT_BARS = 7;
const LOADING_STATUS_TEXT = "Initializing Interface...";

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete, reduceMotionEnabled }) => {
  const [phase, setPhase] = useState<PreloaderPhase>('initialDelay');
  const timersRef = useRef<Array<number>>([]);
  const config = reduceMotionEnabled ? REDUCED_MOTION_PRELOADER_CONFIG : PRELOADER_CONFIG;

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timerId => clearTimeout(timerId));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  useEffect(() => {
    clearAllTimers();
    let nextPhase: PreloaderPhase | null = null;
    let delay = 0;

    switch (phase) {
      case 'initialDelay':
        nextPhase = 'lightBars';
        delay = config.initialDelay;
        break;
      case 'lightBars':
        // This phase's duration is effectively config.lightBarsDuration for the animation itself.
        // Transitions to logo and text are timed from the start of 'lightBars' via their own delays.
        // The next phase 'finalPause' will be triggered after logo and text are expected to have appeared.
        nextPhase = 'finalPause';
        delay = Math.max(config.logoAppearDelay + config.logoAppearDuration, config.statusTextAppearDelay + config.statusTextAppearDuration) - config.lightBarsDuration;
        delay = Math.max(delay, 0) + config.lightBarsDuration; // ensure it's after bars animate
        break;
      case 'logoAppear': // These are visual states triggered by lightBars phase
      case 'statusTextAppear':
        // No direct timer from these, managed by lightBars timeouts
        break;
      case 'finalPause':
        nextPhase = 'fadingOut';
        delay = config.finalPauseDuration;
        break;
      case 'fadingOut':
        timersRef.current.push(window.setTimeout(() => {
          onLoadingComplete();
          // setPhase('hidden'); // To visually hide if needed, though App.tsx handles removal
        }, config.fadeOutDuration));
        break;
      case 'hidden':
        // No further actions
        break;
    }

    if (nextPhase) {
      timersRef.current.push(window.setTimeout(() => {
        setPhase(nextPhase as PreloaderPhase);
      }, delay));
    }

  }, [phase, config, onLoadingComplete, clearAllTimers]);

  const showLogo = phase === 'logoAppear' || phase === 'statusTextAppear' || phase === 'finalPause' || phase === 'fadingOut';
  const showStatusText = phase === 'statusTextAppear' || phase === 'finalPause' || phase === 'fadingOut';

  return (
    <div 
      className={`new-preloader-backdrop ${phase === 'fadingOut' ? 'phase-exit' : ''} ${phase === 'hidden' ? 'hidden-completely' : ''}`}
      aria-live="polite" 
      aria-busy={phase !== 'fadingOut' && phase !== 'hidden'}
      role="status"
      aria-label="Loading application content"
    >
      {(phase === 'lightBars' || showLogo || showStatusText) && (
        <div className="preloader-light-bar-container" style={{ animationDuration: `${config.lightBarsDuration}ms` }}>
          {!reduceMotionEnabled && Array.from({ length: NUM_LIGHT_BARS }).map((_, i) => (
            <div 
              key={i} 
              className="preloader-light-bar" 
              style={{ 
                animationDelay: `${i * config.lightBarStagger}ms`,
                animationDuration: `${config.lightBarsDuration * 0.8}ms` // Bar animation shorter than container reveal
              }}
            />
          ))}
        </div>
      )}

      <div 
        className="preloader-logo-wrapper"
        style={{
            animationDuration: `${config.logoAppearDuration}ms`,
            animationDelay: reduceMotionEnabled ? '0ms' : `${config.logoAppearDelay - config.lightBarsDuration / 2}ms`, // Adjust delay relative to lightBars phase
            opacity: (phase === 'lightBars' || phase === 'logoAppear' || phase === 'statusTextAppear' || phase === 'finalPause' || phase === 'fadingOut') && !reduceMotionEnabled ? undefined : (reduceMotionEnabled && phase !== 'initialDelay' ? 1: 0)
        }}
      >
         <Logo size={reduceMotionEnabled ? 48 : 64} textColor={`text-[${BODY_TEXT_HEX}]`} accentColorHex={PRIMARY_ACCENT_HEX} />
      </div>
      
      <div 
        className="preloader-status-text"
         style={{
            animationDuration: `${config.statusTextAppearDuration}ms`,
            animationDelay: reduceMotionEnabled ? '0ms' : `${config.statusTextAppearDelay - config.lightBarsDuration / 2}ms`,
            opacity: (phase === 'statusTextAppear' || phase === 'finalPause' || phase === 'fadingOut') && !reduceMotionEnabled ? undefined : (reduceMotionEnabled && phase !== 'initialDelay' && phase !== 'lightBars' ? 1: 0)
        }}
      >
        {reduceMotionEnabled ? LOADING_STATUS_TEXT : <DecoderText text={LOADING_STATUS_TEXT} scrambleDuration={400} />}
      </div>
    </div>
  );
};

export default Preloader;
