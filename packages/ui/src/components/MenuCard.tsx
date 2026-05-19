import React from 'react';
import { Product, formatPrice } from '@lumina/core';
import { Plus, Minus } from 'lucide-react';

interface MenuCardProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onCustomize: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onCustomize,
}) => {
  return (
    <div className="group relative pt-16">
      <div 
        onClick={onCustomize}
        className="bg-[#1c1b1b]/40 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] hover:-translate-y-2 flex flex-col h-full cursor-pointer"
      >
        {/* Overlapping 3D Image */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 z-10 transition-transform duration-500 group-hover:scale-110">
          <img 
            alt={product.name} 
            className="w-full h-full object-cover rounded-full border-4 border-[#131313] shadow-2xl filter drop-shadow-[0_15px_30px_rgba(255,182,139,0.35)]" 
            src={product.image}
          />
        </div>
        
        <div className="mt-28 text-center flex-grow flex flex-col justify-between">
          <div>
            {product.tag && (
              <span className="inline-block font-body text-xs font-semibold px-3 py-1 rounded-full bg-[#ffb68b]/10 text-[#ffb68b] border border-[#ffb68b]/20">
                {product.tag}
              </span>
            )}
            <h3 className="font-display text-2xl font-bold text-white mt-4">{product.name}</h3>
            <p className="font-body text-sm text-[#e0c0af] mt-2 line-clamp-2">{product.description}</p>
          </div>
          
          <div className="flex items-center justify-between mt-8" onClick={(e) => e.stopPropagation()}>
            <span className="font-display text-2xl font-bold text-[#ffb955]">{formatPrice(product.price)}</span>
            
            {quantity === 0 ? (
              <button 
                onClick={onCustomize}
                className="w-10 h-10 rounded-full bg-[#ff7a00] text-[#522300] flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.4)] hover:scale-110 active:scale-95 transition-all"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-[#0e0e0e] rounded-full p-1 border border-white/5">
                <button 
                  onClick={onDecrement}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span className="font-body text-sm font-semibold text-white w-4 text-center">{quantity}</span>
                <button 
                  onClick={onIncrement}
                  className="w-8 h-8 rounded-full bg-[#ff7a00] text-[#522300] flex items-center justify-center shadow-[0_0_15px_rgba(255,182,139,0.4)] hover:scale-110"
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
