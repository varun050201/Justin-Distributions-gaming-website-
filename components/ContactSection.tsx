
import React, { useState } from 'react';
import SectionContainer from './ui/SectionContainer';
import AnimatedElement from './AnimatedElement';
import Button from './ui/Button';
import { PhoneIcon, EmailIcon, LocationIcon, PRIMARY_ACCENT_HEX, BASE_BG_HEX, SURFACE_BG_HEX, DARK_SURFACE_HEX, BORDER_COLOR_HEX, BODY_TEXT_HEX, SECONDARY_ACCENT_HEX } from '../constants';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000); 
  };

  return (
    <SectionContainer 
      id="contact" 
      title="Get In Touch" 
      descriptiveTitle="Section IV: Get In Touch"
      romanNumeral="IV" 
      hasSeparator={true} 
      className={`bg-[${BASE_BG_HEX}]`}
    >
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        <AnimatedElement className="space-y-8">
          <div>
            <h3 className={`text-2xl font-semibold text-[${BODY_TEXT_HEX}] mb-4`}>Contact Information</h3>
            <ul className={`space-y-3 text-[rgba(250,250,250,0.8)]`}>
              <li className="flex items-center space-x-3">
                <PhoneIcon className={`w-5 h-5 text-[${PRIMARY_ACCENT_HEX}]`} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <EmailIcon className={`w-5 h-5 text-[${PRIMARY_ACCENT_HEX}]`} />
                <span>contact@justindistributions.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <LocationIcon className={`w-5 h-5 text-[${PRIMARY_ACCENT_HEX}]`} />
                <span>123 Gaming Avenue, Tech City, TX 75001</span>
              </li>
            </ul>
          </div>
           <div className={`mt-10 pt-8 border-t border-[${BORDER_COLOR_HEX}]/50`}>
             <h3 className={`text-2xl font-semibold text-[${BODY_TEXT_HEX}] mb-4`}>Business Hours</h3>
             <p className={`text-[rgba(250,250,250,0.8)]`}>Monday - Friday: 9:00 AM - 6:00 PM</p>
             <p className={`text-[rgba(250,250,250,0.8)]`}>Saturday: 10:00 AM - 4:00 PM</p>
             <p className={`text-[rgba(250,250,250,0.8)]`}>Sunday: Closed</p>
           </div>
        </AnimatedElement>

        <AnimatedElement 
          delay="delay-200" 
          className={`bg-[${SURFACE_BG_HEX}] p-6 sm:p-8 rounded-lg shadow-2xl`}
          // style={{ transitionDelay: '200ms' }}
        >
          <h3 className={`text-2xl font-semibold text-[${BODY_TEXT_HEX}] mb-6`}>Send Us a Message</h3>
          {isSubmitted && (
            <div className={`mb-4 p-3 rounded-md bg-[${SECONDARY_ACCENT_HEX}] text-[${BASE_BG_HEX}] text-center`}>
              Message sent successfully! We'll be in touch soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium text-[rgba(250,250,250,0.8)] mb-1`}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                className={`w-full px-4 py-2.5 bg-[${DARK_SURFACE_HEX}] border border-[${BORDER_COLOR_HEX}] rounded-md text-[${BODY_TEXT_HEX}] focus:ring-[${PRIMARY_ACCENT_HEX}] focus:border-[${PRIMARY_ACCENT_HEX}] transition-colors`} 
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium text-[rgba(250,250,250,0.8)] mb-1`}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                className={`w-full px-4 py-2.5 bg-[${DARK_SURFACE_HEX}] border border-[${BORDER_COLOR_HEX}] rounded-md text-[${BODY_TEXT_HEX}] focus:ring-[${PRIMARY_ACCENT_HEX}] focus:border-[${PRIMARY_ACCENT_HEX}] transition-colors`} 
              />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium text-[rgba(250,250,250,0.8)] mb-1`}>Message</label>
              <textarea 
                name="message" 
                id="message" 
                rows={4} 
                value={formData.message}
                onChange={handleChange}
                required 
                className={`w-full px-4 py-2.5 bg-[${DARK_SURFACE_HEX}] border border-[${BORDER_COLOR_HEX}] rounded-md text-[${BODY_TEXT_HEX}] focus:ring-[${PRIMARY_ACCENT_HEX}] focus:border-[${PRIMARY_ACCENT_HEX}] transition-colors`}
              ></textarea>
            </div>
            <div>
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Message
              </Button>
            </div>
          </form>
        </AnimatedElement>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;