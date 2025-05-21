
export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  longDescription: string; // New
  specifications?: Array<{ name: string; value: string }>; // New
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Testimonial { // New
  id:string;
  quote: string;
  author: string;
  company: string;
  imageUrl?: string;
}

export interface IconProps {
  className?: string;
}