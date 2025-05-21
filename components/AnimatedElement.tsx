
import React, { useEffect, useRef, useState, ElementType, ComponentPropsWithRef, isValidElement } from 'react';

// Make props generic, inferring from the 'as' prop
type AnimatedElementProps<C extends ElementType = 'div'> = {
  children: React.ReactNode;
  as?: C;
  className?: string;
  animationClasses?: string;
  threshold?: number;
  delay?: string;
  staggerChildren?: number;
  style?: React.CSSProperties;
} & Omit<ComponentPropsWithRef<C>, 'children' | 'className' | 'style' | 'as'>; // Allow other native props

// Make the component generic
const AnimatedElement = <C extends ElementType = 'div'>({
  children,
  as,
  className = '',
  animationClasses = 'opacity-0 translate-y-8',
  threshold = 0.1,
  delay = '',
  staggerChildren,
  style,
  ...rest // Capture other native props
}: AnimatedElementProps<C>): JSX.Element => {
  const Component = as || ('div' as ElementType); // Default to 'div'
  const [isIntersecting, setIsIntersecting] = useState(false);
  // FIX: Changed ref type from React.ElementRef<C> to Element for IntersectionObserver compatibility.
  // React.ElementRef<C> caused issues because C (ElementType) is too broad.
  // IntersectionObserver expects a DOM Element.
  const ref = useRef<Element>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // FIX: ref.current is now Element | null. After null check, it's Element.
          // This is compatible with observer.unobserve.
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      // FIX: currentRef is Element. This is compatible with observer.observe.
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        // FIX: currentRef is Element. This is compatible with observer.unobserve.
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  if (staggerChildren && React.Children.count(children) > 0) {
    return (
      <Component ref={ref} className={`${className}`} style={style} {...rest}>
        {React.Children.map(children, (child, index) => {
          // FIX: Use React.isValidElement to safely access child.props.style.
          // This resolves "Property 'style' does not exist on type 'unknown'".
          let childSpecificStyle: React.CSSProperties = {};
          if (isValidElement(child)) { // child is React.ReactElement
            const props = child.props as { style?: unknown }; // Assume style prop might exist
            if (props.style && typeof props.style === 'object') {
              childSpecificStyle = props.style as React.CSSProperties;
            }
          }
          return (
            <div // Inner element for stagger is always div for simplicity here
              className={`transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : animationClasses}`}
              style={{ transitionDelay: isIntersecting ? `${index * staggerChildren}ms` : '0ms', ...childSpecificStyle }}
            >
              {child}
            </div>
          );
        })}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${delay} ${
        isIntersecting ? 'opacity-100 translate-y-0' : animationClasses
      }`}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default AnimatedElement;
