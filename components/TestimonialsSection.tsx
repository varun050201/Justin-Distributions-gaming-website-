
import React from 'react';
import SectionContainer from './ui/SectionContainer';
import AnimatedElement from './AnimatedElement';
import { TESTIMONIALS_DATA, PRIMARY_ACCENT_HEX, BASE_BG_HEX, BODY_TEXT_HEX } from '../constants';
import { Testimonial } from '../types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="testimonial-card p-6 md:p-8 rounded-xl shadow-xl h-full flex flex-col group"> {/* Added group for hover state if needed in CSS */}
      <blockquote className="flex-grow">
        <p className={`text-[rgba(250,250,250,0.8)] text-lg italic mb-6 leading-relaxed`}>
          "{testimonial.quote}"
        </p>
      </blockquote>
      <figcaption className="flex items-center mt-auto">
        {testimonial.imageUrl && (
          <img 
            src={testimonial.imageUrl} 
            alt={testimonial.author} 
            className={`w-14 h-14 rounded-full object-cover mr-4 border-2 border-[${PRIMARY_ACCENT_HEX}]`}
            loading="lazy"
          />
        )}
        <div>
          <p className={`font-semibold text-[${BODY_TEXT_HEX}] text-md`}>{testimonial.author}</p>
          <p className={`text-sm text-[${PRIMARY_ACCENT_HEX}]`}>{testimonial.company}</p>
        </div>
      </figcaption>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <SectionContainer 
      id="testimonials" 
      title="What Our Clients Say" 
      descriptiveTitle="Customer Testimonials"
      hasSeparator={true} 
      className={`bg-[${BASE_BG_HEX}]`}
    >
      <AnimatedElement 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        staggerChildren={150}
        animationClasses="opacity-0 translate-y-10"
      >
        {TESTIMONIALS_DATA.map((testimonial) => (
          <AnimatedElement 
            key={testimonial.id}
            animationClasses="opacity-0 scale-95" // Individual card animation
            className="h-full" // Ensure AnimatedElement takes full height for card
          >
            <TestimonialCard testimonial={testimonial} />
          </AnimatedElement>
        ))}
      </AnimatedElement>
    </SectionContainer>
  );
};

export default TestimonialsSection;
