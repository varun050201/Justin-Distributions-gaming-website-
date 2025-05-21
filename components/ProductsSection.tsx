
import React, { useState, useCallback } from 'react';
import SectionContainer from './ui/SectionContainer';
import AnimatedElement from './AnimatedElement';
import { PRODUCTS_DATA, PRIMARY_ACCENT_HEX, SECONDARY_ACCENT_HEX, BASE_BG_HEX, SURFACE_BG_HEX, BODY_TEXT_HEX } from '../constants';
import { Product } from '../types';
import ProductDetailModal from './ui/ProductDetailModal';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const handleCardClick = () => {
    onViewDetails(product);
  };

  return (
    <div 
      className={`bg-[${SURFACE_BG_HEX}] rounded-lg shadow-2xl overflow-hidden group cursor-pointer product-card-base h-full flex flex-col`}
      onClick={handleCardClick} 
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
      role="button" 
      tabIndex={0} 
      aria-label={`View details for ${product.name}`}
    >
      <div className="product-card-image-container"> 
        <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-56 object-cover product-card-image" 
            loading="lazy"
        />
        <div className="product-card-overlay">
            <span className="text-lg font-semibold product-overlay-text">View Details &rarr;</span> {/* Added class here */}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow"> 
        <h3 className={`text-xl font-semibold mb-2 text-[${BODY_TEXT_HEX}] group-hover:text-[${PRIMARY_ACCENT_HEX}] transition-colors duration-300`}>{product.name}</h3>
        <p className={`text-sm text-[rgba(250,250,250,0.7)] mb-3 flex-grow`}>{product.category}</p> 
        <span 
          className={`text-sm font-medium text-[${PRIMARY_ACCENT_HEX}] hover:text-[${SECONDARY_ACCENT_HEX}] neon-glow-cyan transition-colors duration-200 inline-block mt-auto pt-2`}
        >
          Learn More &rarr;
        </span>
      </div>
    </div>
  );
};


const ProductsSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    if (document.body) {
        document.body.style.overflow = 'hidden'; 
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    if (document.body) {
        document.body.style.overflow = ''; 
    }
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <SectionContainer 
        id="products" 
        title="Our Products" 
        descriptiveTitle="Section II: Our Products"
        romanNumeral="II" 
        hasSeparator={true} 
        className={`bg-[${BASE_BG_HEX}]`}
      >
        <AnimatedElement 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            staggerChildren={120} 
            animationClasses="opacity-0 translate-y-10" 
        >
          {PRODUCTS_DATA.map((product) => (
            <AnimatedElement 
              key={product.id}
              animationClasses="card-entry-initial" 
              className="animate-card-entry" 
            >
              <ProductCard product={product} onViewDetails={handleViewDetails} /> 
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </SectionContainer>

      {selectedProduct && (
        <ProductDetailModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          product={selectedProduct} 
        />
      )}
    </>
  );
};

export default ProductsSection;
