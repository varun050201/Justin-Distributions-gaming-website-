
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types';
import { PRIMARY_ACCENT_HEX, BODY_TEXT_HEX, BORDER_COLOR_HEX, DARK_SURFACE_HEX } from '../../constants';
import Button from './Button';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const animationDuration = 500; 

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      modalRef.current?.focus(); 
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]); // onClose added to dependencies

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, animationDuration);
  };
  
  if (!product) return null;

  const modalClasses = `product-modal-content ${ // CSS for this is in index.html
    isOpen && !isClosing ? 'modal-unfold-in' : ''
  } ${isClosing ? 'modal-unfold-out' : ''}`;


  return (
    <div
      className={`product-modal-backdrop ${isOpen || isClosing ? 'open' : 'pointer-events-none'}`} // CSS in index.html
      onClick={handleClose} 
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <div
        ref={modalRef}
        className={modalClasses} // Uses CSS from index.html for background and text color
        onClick={(e) => e.stopPropagation()} 
        tabIndex={-1} 
      >
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 text-[rgba(250,250,250,0.6)] hover:text-[${BODY_TEXT_HEX}] transition-colors p-2 rounded-full hover:bg-[${DARK_SURFACE_HEX}] focus:outline-none focus:ring-2 focus:ring-[${PRIMARY_ACCENT_HEX}]`}
          aria-label="Close product details"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column: Image */}
          <div className="md:col-span-1">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`w-full h-auto max-h-[300px] md:max-h-[400px] object-contain rounded-lg shadow-lg border-2 border-[${BORDER_COLOR_HEX}]`}
            />
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-1 flex flex-col">
            <h2 id="product-modal-title" className={`text-2xl md:text-3xl font-bold text-[${BODY_TEXT_HEX}] mb-2`}>
              {product.name}
            </h2>
            <p className={`text-sm text-[${PRIMARY_ACCENT_HEX}] font-semibold mb-4`}>{product.category}</p>
            
            <div id="product-modal-description" className={`text-[rgba(250,250,250,0.8)] mb-6 leading-relaxed text-sm md:text-base`}>
              {product.longDescription}
            </div>

            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-6">
                <h3 className={`text-lg font-semibold text-[${BODY_TEXT_HEX}] mb-3`}>Specifications:</h3>
                <ul className={`space-y-1.5 text-[rgba(250,250,250,0.7)] text-sm`}>
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="font-medium">{spec.name}:</span>
                      <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className={`mt-auto pt-4 border-t border-[${BORDER_COLOR_HEX}]/30`}>
               <p className={`text-sm text-[rgba(250,250,250,0.7)] mb-3`}>
                Interested in this product or need more information?
              </p>
              <Button 
                variant="primary" 
                size="md" 
                className="w-full" 
                onClick={() => {
                  handleClose(); 
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact Justin for Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;