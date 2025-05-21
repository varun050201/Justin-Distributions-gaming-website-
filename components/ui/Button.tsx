
import React, { useState, MouseEvent as ReactMouseEvent, useRef, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { PRIMARY_ACCENT_HEX, SECONDARY_ACCENT_HEX, BASE_BG_HEX, BODY_TEXT_HEX, DARK_SURFACE_HEX, BORDER_COLOR_HEX } from '../../constants';

interface Ripple {
  key: number;
  top: number;
  left: number;
  size: number;
}

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string; 
  onClick?: (event: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseDown?: (event: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseUp?: (event: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  onMouseLeave?: (event: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

interface AnchorElProps extends ButtonBaseProps,
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>,
    'children' | 'className' | 'onClick' | 'onMouseDown' | 'onMouseUp' | 'onMouseLeave' | 'href'
  > {
  href: string;
}

interface NativeButtonElProps extends ButtonBaseProps,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'className' | 'onClick' | 'onMouseDown' | 'onMouseUp' | 'onMouseLeave' | 'type'
  > {
  href?: never; 
  type?: 'submit' | 'button' | 'reset';
}

type ButtonProps = AnchorElProps | NativeButtonElProps;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className: userClassName = '',
    onClick: userOnClick,
    onMouseDown: userOnMouseDown,
    onMouseUp: userOnMouseUp,
    onMouseLeave: userOnMouseLeave,
  } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isBoomActive, setIsBoomActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);


  const baseStyles = `font-semibold rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[${BASE_BG_HEX}] button-base`;
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const variantStyles = {
    primary: `button-accent shadow-lg hover:shadow-[0_0_15px_${SECONDARY_ACCENT_HEX}] text-[${BASE_BG_HEX}]`,
    secondary: `bg-[${DARK_SURFACE_HEX}] text-[${BODY_TEXT_HEX}] hover:bg-[${BORDER_COLOR_HEX}] focus:ring-[${BORDER_COLOR_HEX}] active:scale-[0.98] active:brightness-90`,
    outline: `button-outline bg-transparent border-2 border-[${PRIMARY_ACCENT_HEX}] text-[${PRIMARY_ACCENT_HEX}] hover:bg-[${PRIMARY_ACCENT_HEX}] hover:text-[${BASE_BG_HEX}] focus:ring-[${PRIMARY_ACCENT_HEX}] neon-glow-cyan active:scale-[0.98]`,
  };

  const createRipple = (event: ReactMouseEvent<HTMLElement>) => {
    const currentTarget = event.currentTarget;
    const rect = currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - rippleSize / 2;
    const y = event.clientY - rect.top - rippleSize / 2;

    const newRipple: Ripple = {
      key: Date.now(),
      top: y,
      left: x,
      size: rippleSize,
    };

    setRipples(prevRipples => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples(prevRipples => prevRipples.filter(r => r.key !== newRipple.key));
    }, 600); 
  };

  const handleMouseDownInternal = (event: ReactMouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      setIsBoomActive(true);
      createRipple(event);
    }
    if (userOnMouseDown) {
      userOnMouseDown(event as ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>);
    }
  };
  
  const handleMouseUpInternal = (event: ReactMouseEvent<HTMLElement>) => {
     if (variant === 'primary') {
        setIsBoomActive(false);
     }
     if (userOnMouseUp) {
      userOnMouseUp(event as ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>);
    }
  };

  const handleMouseLeaveInternal = (event: ReactMouseEvent<HTMLElement>) => {
    if (variant === 'primary' && isBoomActive) { 
       setIsBoomActive(false);
    }
    if (userOnMouseLeave) {
      userOnMouseLeave(event as ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>);
    }
  };

  const handleClickInternal = (event: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (userOnClick) {
      userOnClick(event);
    }
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${userClassName} ${isBoomActive ? 'micro-boom-active' : ''}`;

  const buttonContent = (
    <>
      <span className="button-shine-overlay"></span>
      <span className="button-content-wrapper">{children}</span>
      {ripples.map(ripple => (
        <span
          key={ripple.key}
          className="button-ripple"
          style={{
            top: ripple.top,
            left: ripple.left,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </>
  );
  
  const commonDomProps = {
    onMouseDown: handleMouseDownInternal,
    onMouseUp: handleMouseUpInternal,
    onMouseLeave: handleMouseLeaveInternal,
    onClick: handleClickInternal,
  };

  if (props.href !== undefined) {
    const anchorProps = props as AnchorElProps;
    const {
        children: _c, variant: _v, size: _s, className: _cN,
        onClick: _oC, onMouseDown: _oMD, onMouseUp: _oMU, onMouseLeave: _oML,
        href,
        ...remainingAnchorAttrs 
    } = anchorProps; 

    return (
      <a 
        href={href}
        ref={anchorRef}
        className={`${combinedClassName} inline-block text-center`}
        {...commonDomProps}
        {...remainingAnchorAttrs}
      >
        {buttonContent}
      </a>
    );
  }

  const {
      children: _c, variant: _v, size: _s, className: _cN,
      onClick: _oC, onMouseDown: _oMD, onMouseUp: _oMU, onMouseLeave: _oML,
      type,
      href: _hNever, 
      ...remainingButtonAttrs
  } = props as NativeButtonElProps;

  return (
    <button 
      ref={buttonRef}
      className={combinedClassName}
      type={type || 'button'}
      {...commonDomProps}
      {...remainingButtonAttrs}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
