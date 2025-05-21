
import React from 'react';
import SectionContainer from './ui/SectionContainer';
import AnimatedElement from './AnimatedElement';
import Button from './ui/Button';
import { PRIMARY_ACCENT_HEX, FOUNDER_TITLE, BASE_BG_HEX, SURFACE_BG_HEX, BODY_TEXT_HEX } from '../constants';
import DecoderText from './ui/DecoderText';


const AboutSection: React.FC = () => {
  return (
    <SectionContainer 
      id="about" 
      title="About Us" 
      descriptiveTitle="Section I: About Us"
      romanNumeral="I" 
      hasSeparator={true} 
      className={`bg-[${BASE_BG_HEX}]`} // Use base background
    >
      <div className="max-w-4xl mx-auto text-center lg:text-left">
        <AnimatedElement className="mb-8">
          <p className={`text-lg md:text-xl text-[rgba(250,250,250,0.8)] leading-relaxed`}>
            Justin <span className={`font-semibold text-[${PRIMARY_ACCENT_HEX}]`}>Distributions</span> is a leading supplier of innovative and high-quality gaming machines and arcade equipment. 
            With years of experience in the industry, we pride ourselves on delivering exceptional products and services 
            that create unforgettable entertainment experiences. Our mission is to bring the thrill of gaming to venues 
            of all sizes, from family entertainment centers to high-end casinos.
          </p>
        </AnimatedElement>
        <AnimatedElement className="mb-10" delay="delay-100">
          <p className={`text-lg md:text-xl text-[rgba(250,250,250,0.8)] leading-relaxed`}>
            We are passionate about the evolution of gaming technology and constantly seek out the latest advancements 
            to offer our clients. Whether you're looking for classic retro arcades, immersive VR setups, or state-of-the-art 
            slot machines, Justin Distributions is your trusted partner for quality, reliability, and excitement.
          </p>
        </AnimatedElement>
      </div>

      <AnimatedElement className="mt-16 md:mt-24" delay="delay-200">
        <div className={`max-w-5xl mx-auto bg-[${SURFACE_BG_HEX}]/80 p-8 md:p-12 rounded-xl shadow-2xl backdrop-blur-sm`}> {/* Surface with transparency */}
          <div className="text-center mb-8 md:mb-10">
            <h3 className={`text-3xl md:text-4xl font-bold text-[${BODY_TEXT_HEX}] title-mask-container`}>
                 <span className={`title-text-reveal revealed`}>Meet Our Founder</span>
            </h3>
             <div className="flex justify-center mt-4">
                 <div className={`h-1 bg-[${PRIMARY_ACCENT_HEX}] separator-line-draw drawn`}></div>
             </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
            <div className="md:col-span-1 flex justify-center founder-image-container">
              <AnimatedElement animationClasses='opacity-0 scale-95' > 
                <img 
                  src="https://picsum.photos/seed/justin-visionary/400/400?face" 
                  alt="Justin Miller - Founder & Visionary of Justin Distributions" 
                  className={`w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-[${PRIMARY_ACCENT_HEX}] shadow-lg founder-image-reveal`}
                  loading="lazy"
                />
              </AnimatedElement>
            </div>
            <div className={`md:col-span-2 text-[rgba(250,250,250,0.8)]`}>
              <AnimatedElement animationClasses='opacity-0 translate-y-4'>
                 <h4 className={`text-2xl md:text-3xl font-semibold text-[${BODY_TEXT_HEX}] mb-2`}>Justin Miller</h4>
              </AnimatedElement>
              <AnimatedElement animationClasses='opacity-0 translate-y-4' delay="delay-100">
                <DecoderText 
                  text={FOUNDER_TITLE} 
                  className={`text-lg text-[${PRIMARY_ACCENT_HEX}] font-medium mb-4 block`} 
                />
              </AnimatedElement>
              
              <AnimatedElement animationClasses='opacity-0 translate-y-4' delay="delay-200">
                <p className="mb-4 leading-relaxed">
                  A lifelong gaming aficionado, Justin Miller founded Justin Distributions with a singular vision: to revolutionize how businesses access and deploy cutting-edge gaming experiences. His journey began with a passion for classic arcades, evolving into a deep understanding of modern gaming technologies, from immersive VR to high-stakes competitive e-sports hardware.
                </p>
              </AnimatedElement>
              <AnimatedElement animationClasses='opacity-0 translate-y-4' delay="delay-300">
                <p className="mb-4 leading-relaxed">
                  Justin believes that exceptional entertainment is built on innovation, reliability, and an unwavering commitment to customer success. He leads the company with a hands-on approach, personally curating the product portfolio and ensuring that every client partnership is powered by the thrill of the game and the promise of unparalleled quality.
                </p>
              </AnimatedElement>
              <AnimatedElement animationClasses='opacity-0 translate-y-4' delay="delay-400">
                <p className="leading-relaxed">
                  His expertise isn't just in distribution; it's in understanding the pulse of the gaming world and translating that into tangible success for venues and operators. Justin is dedicated to forging the future of interactive entertainment, one electrifying experience at a time.
                </p>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement delay="delay-300" className="text-center mt-16 md:mt-20">
        <Button href="#contact" variant="outline" size="lg">
          Connect With Us
        </Button>
      </AnimatedElement>
    </SectionContainer>
  );
};

export default AboutSection;
