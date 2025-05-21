
import React from 'react';
// FIX: Import Testimonial type from ./types to make it available for TESTIMONIALS_DATA.
import { NavLink, Product, FAQItem, PartnerLogo, IconProps, Testimonial } from './types'; // Testimonial is now explicitly imported.

export const PRIMARY_ACCENT_HEX = "#00E5FF"; // Electric Cyan
export const SECONDARY_ACCENT_HEX = "#16FF72"; // Mint Green
export const BODY_TEXT_HEX = "#FAFAFA";
export const BASE_BG_HEX = "#0E0E10";
export const SURFACE_BG_HEX = "#2B2B2E";
export const DARK_SURFACE_HEX = "#1f1f22"; // For inputs or slightly darker elements
export const BORDER_COLOR_HEX = "#4A4A50"; // Subtle borders

// Kept for compatibility if FOUNDER_TITLE is used elsewhere, color will be applied via PRIMARY_ACCENT_HEX
export const FOUNDER_TITLE = "Founder & Visionary";


export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials'},
  { id: 'faq', label: 'FAQs', href: '#faq' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const PRODUCTS_DATA: Product[] = [
  { 
    id: 'p1', 
    name: 'Neon Arcade Machine X', 
    imageUrl: 'https://picsum.photos/seed/arcadeX/600/400', 
    category: 'Arcade Classics',
    longDescription: "Relive the golden age of gaming with the Neon Arcade Machine X. Featuring a vibrant 27-inch HD display, authentic joystick and buttons, and pre-loaded with over 100 classic arcade titles. Its eye-catching neon trim and robust build make it a centerpiece for any game room or commercial venue.",
    specifications: [
      { name: 'Display', value: '27-inch Full HD LCD' },
      { name: 'Controls', value: '2 Joysticks, 12 Buttons' },
      { name: 'Games Included', value: '100+ Classic Titles' },
      { name: 'Dimensions', value: '70" H x 30" W x 28" D' },
      { name: 'Power', value: '110V AC' }
    ]
  },
  { 
    id: 'p2', 
    name: 'VR Gaming Pod Pro', 
    imageUrl: 'https://picsum.photos/seed/vrpod/600/400', 
    category: 'Virtual Reality',
    longDescription: "Step into new worlds with the VR Gaming Pod Pro. This all-in-one system offers unparalleled immersion with a high-resolution VR headset, haptic feedback suit, and omni-directional treadmill. Perfect for VR arcades and training simulations, providing a truly captivating experience.",
    specifications: [
      { name: 'Headset', value: '4K Per Eye Resolution, 120Hz' },
      { name: 'Feedback', value: 'Full-Body Haptic Suit' },
      { name: 'Movement', value: 'Omni-Directional Treadmill' },
      { name: 'Platform', value: 'SteamVR & Custom Content Compatible' },
      { name: 'Space Required', value: '10ft x 10ft minimum' }
    ]
  },
  { 
    id: 'p3', 
    name: 'Retro Slot Master 777', 
    imageUrl: 'https://picsum.photos/seed/slotmaster/600/400', 
    category: 'Slot Machines',
    longDescription: "The Retro Slot Master 777 combines classic slot machine charm with modern reliability. Featuring physical reels, authentic sound effects, and multiple payout lines, it's a crowd-pleaser for casinos and entertainment venues looking for a nostalgic touch with dependable performance.",
    specifications: [
      { name: 'Reels', value: '3 Physical Reels' },
      { name: 'Payout Lines', value: '5 Selectable Lines' },
      { name: 'Bonus Features', value: 'Yes, Scatter & Wilds' },
      { name: 'Accepts', value: 'Tokens / Configurable for TITO' },
      { name: 'Security', value: 'Anti-Tamper Locks & Alarms' }
    ]
  },
  { 
    id: 'p4', 
    name: 'Laser Tag Blaster Set', 
    imageUrl: 'https://picsum.photos/seed/lasertag/600/400', 
    category: 'Interactive Games',
    longDescription: "Equip your arena with our professional-grade Laser Tag Blaster Set. Includes 10 lightweight, durable blasters with vibrant LED effects, long-range IR sensors, and multiple game modes. The central scoring system provides real-time updates for competitive play.",
    specifications: [
      { name: 'Set Includes', value: '10 Blasters, 10 Vests' },
      { name: 'Range', value: 'Up to 300 feet' },
      { name: 'Game Modes', value: '5+ (Team, Solo, VIP)' },
      { name: 'Battery Life', value: '8 hours continuous use' },
      { name: 'Software', value: 'Central Scoring & Control System' }
    ]
  },
  { 
    id: 'p5', 
    name: 'Pinball Wizard Champion', 
    imageUrl: 'https://picsum.photos/seed/pinball/600/400', 
    category: 'Arcade Classics',
    longDescription: "The Pinball Wizard Champion offers fast-paced, high-scoring action. With a stunning playfield design, dynamic lighting, challenging ramps, and multi-ball modes, it's a must-have for any pinball enthusiast or arcade operator looking for a premium machine.",
    specifications: [
      { name: 'Playfield', value: 'Multi-Level with Ramps & Targets' },
      { name: 'Lighting', value: 'Full LED RGB Illumination' },
      { name: 'Sound', value: 'Stereo Sound System with Subwoofer' },
      { name: 'Modes', value: 'Multiple Game Modes & Multi-Ball' },
      { name: 'Display', value: 'Full Color LCD Score Display' }
    ]
  },
  { 
    id: 'p6', 
    name: 'Air Hockey Extreme Table', 
    imageUrl: 'https://picsum.photos/seed/airhockey/600/400', 
    category: 'Table Games',
    longDescription: "Experience the thrill of competitive air hockey with the Air Hockey Extreme Table. Built for durability and high-performance play, it features a powerful blower motor, scratch-resistant play surface, and electronic scoring. Ideal for arcades, rec centers, and home game rooms.",
    specifications: [
      { name: 'Play Surface', value: 'Scratch-Resistant Laminate' },
      { name: 'Blower', value: 'High-Output 110V Motor' },
      { name: 'Scoring', value: 'Electronic LED Side Scoring' },
      { name: 'Includes', value: '2 Pushers, 4 Pucks' },
      { name: 'Dimensions', value: '8ft L x 4ft W x 32" H' }
    ]
  },
];

// The Testimonial type is imported from types.ts, so no need to define it here.
// export interface Testimonial {
//   id: string;
//   quote: string;
//   author: string;
//   company: string;
//   imageUrl?: string;
// }

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote: "Justin Distributions revolutionized our arcade floor! The new machines are a hit and their support is top-notch.",
    author: "Sarah W.",
    company: "Galaxy Arcade Zone",
    imageUrl: "https://picsum.photos/seed/sarahW/100/100?face",
  },
  {
    id: 't2',
    quote: "The VR pods we got are incredible. Our customers love them and revenue is up 35% since installation. Highly recommend!",
    author: "Mike B.",
    company: "FuturePlay VR Center",
    imageUrl: "https://picsum.photos/seed/mikeB/100/100?face",
  },
  {
    id: 't3',
    quote: "From classic slots to modern interactive games, Justin Distributions has the best selection and pricing. Their team is a pleasure to work with.",
    author: "Linda H.",
    company: "Neon Casino Resorts",
    imageUrl: "https://picsum.photos/seed/lindaH/100/100?face",
  }
];


export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What types of gaming machines do you distribute?',
    answer: 'We distribute a wide range of gaming machines including classic arcade cabinets, modern VR pods, slot machines, pinball machines, and interactive entertainment systems.',
  },
  {
    id: 'faq2',
    question: 'Do you offer installation and maintenance services?',
    answer: 'Yes, Justin Distributions provides full installation services and ongoing maintenance plans to ensure your equipment runs smoothly. Contact us for more details on service packages.',
  },
  {
    id: 'faq3',
    question: 'Can I customize gaming machines?',
    answer: 'Absolutely! Many of our machines can be customized with specific branding, game selections, or hardware configurations to fit your venue\'s theme and needs.',
  },
  {
    id: 'faq4',
    question: 'What is the warranty period for your products?',
    answer: 'Most of our new products come with a standard 1-year manufacturer warranty. Extended warranty options are also available. Please check specific product pages or inquire for details.',
  },
];

export const PARTNER_LOGOS_DATA: PartnerLogo[] = [
  { id: 'partner1', name: 'GameDev Corp', imageUrl: 'https://picsum.photos/seed/gamedev/200/100?grayscale&trueGray' }, // Added trueGray for better monochrome
  { id: 'partner2', name: 'Arcade Solutions Inc.', imageUrl: 'https://picsum.photos/seed/arcadesol/200/100?grayscale&trueGray' },
  { id: 'partner3', name: 'VR World Tech', imageUrl: 'https://picsum.photos/seed/vrworld/200/100?grayscale&trueGray' },
  { id: 'partner4', name: 'Neon Gaming Co.', imageUrl: 'https://picsum.photos/seed/neongaming/200/100?grayscale&trueGray' },
];

// SVG Icons
export const PhoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.308 1.154a11.034 11.034 0 005.378 5.378l1.153-2.308a1 1 0 011.21-.502l4.493 1.498A1 1 0 0119 16.72V20a2 2 0 01-2 2h-1C6.04 22 2 17.96 2 11V5z"></path>
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
 <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.23.194-6.771 2.692-6.963 6.963-.059 1.28-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.192 4.27 2.733 6.771 6.963 6.963 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.27-.193 6.77-2.692 6.963-6.963.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.193-4.271-2.693-6.771-6.963-6.963-.058-1.28-.072-1.689-.072-4.948zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
 </svg>
);

export const ReduceMotionIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
  </svg>
);

export const IncreaseMotionIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
</svg>
);