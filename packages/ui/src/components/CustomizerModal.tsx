import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { Product, formatPrice } from '@lumina/core';

interface CustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customizedItem: any) => void;
}

interface CustomizationState {
  bun: { name: string; price: number };
  patty: { name: string; price: number };
  cheese: { name: string; price: number };
  toppings: { name: string; price: number }[];
  sauces: { name: string; price: number }[];
}

const BANS_OPTIONS = [
  { name: 'Gold-Dusted Brioche', price: 0 },
  { name: 'Active Charcoal Bun', price: 2.0 },
  { name: 'Hydroponic Lettuce Wrap', price: 0 }
];

const PATTY_OPTIONS = [
  { name: 'Double A5 Wagyu Patty', price: 0 },
  { name: 'Triple A5 Wagyu Patty', price: 6.0 },
  { name: 'Plant-Based Wagyu Patty', price: 0 }
];

const TOPPINGS_OPTIONS = [
  { name: 'Freshly Shaved Black Truffle', price: 5.0 },
  { name: 'Crispy House-Cured Guanciale', price: 3.0 },
  { name: '24k Edible Gold Leaf', price: 10.0 },
  { name: 'Aged Cave Cheddar', price: 1.5 },
  { name: 'Sunny Side Organic Egg', price: 2.0 }
];

const SAUCES_OPTIONS = [
  { name: 'Signature Smoked Habanero Aioli', price: 0 },
  { name: 'Black Truffle Infused Mayo', price: 1.0 },
  { name: 'Aged Black Garlic Puree', price: 1.5 }
];

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selections, setSelections] = useState<CustomizationState>({
    bun: BANS_OPTIONS[0],
    patty: PATTY_OPTIONS[0],
    cheese: { name: 'None', price: 0 },
    toppings: [],
    sauces: [SAUCES_OPTIONS[0]]
  });

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!product) return;
    let extraCost = 0;
    extraCost += selections.bun.price;
    extraCost += selections.patty.price;
    extraCost += selections.cheese.price;
    extraCost += selections.toppings.reduce((acc, t) => acc + t.price, 0);
    extraCost += selections.sauces.reduce((acc, s) => acc + s.price, 0);
    
    setTotalPrice((product.price + extraCost) * quantity);
  }, [selections, quantity, product]);

  // Reset states on open
  useEffect(() => {
    if (isOpen) {
      setSelections({
        bun: BANS_OPTIONS[0],
        patty: PATTY_OPTIONS[0],
        cheese: { name: 'None', price: 0 },
        toppings: [],
        sauces: [SAUCES_OPTIONS[0]]
      });
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleToggleTopping = (topping: { name: string; price: number }) => {
    setSelections(prev => {
      const exists = prev.toppings.some(t => t.name === topping.name);
      return {
        ...prev,
        toppings: exists 
          ? prev.toppings.filter(t => t.name !== topping.name)
          : [...prev.toppings, topping]
      };
    });
  };

  const handleToggleSauce = (sauce: { name: string; price: number }) => {
    setSelections(prev => {
      const exists = prev.sauces.some(s => s.name === sauce.name);
      return {
        ...prev,
        // Sauces are multi-select in this customizer
        sauces: exists 
          ? prev.sauces.filter(s => s.name !== sauce.name)
          : [...prev.sauces, sauce]
      };
    });
  };

  const handleConfirm = () => {
    // Generate unique ID based on product and selections
    const selectionsHash = JSON.stringify(selections);
    
    // Cross-platform charCode hybrid hash (100% safe for Web & Expo Mobile, 0 dependencies)
    let hash = 0;
    for (let i = 0; i < selectionsHash.length; i++) {
      const char = selectionsHash.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    const uniqueId = `${product.id}-${Math.abs(hash).toString(36)}`;
    
    const extraPrice = totalPrice / quantity;

    onAddToCart({
      id: uniqueId,
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      price: extraPrice, // Per-item fully customized price
      quantity,
      image: product.image,
      customizations: selections
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#131313] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[80vh] max-h-[900px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full border border-white/10 bg-black/40 text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Left Panel: Food Image & Info (Desktop split, stacks top on mobile) */}
        <div className="w-full lg:w-1/2 bg-[#1c1b1b]/40 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
          <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 122, 0, 0.2) 0%, transparent 70%)'
            }}
          />
          <div className="relative z-10 flex-grow flex flex-col items-center justify-center py-8">
            <img 
              alt={product.name} 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full filter drop-shadow-[0_20px_50px_rgba(255,182,139,0.4)] transition-transform hover:scale-105 duration-500" 
              src={product.image}
            />
            <div className="text-center mt-8">
              <h2 className="font-display text-3xl font-black text-white">{product.name}</h2>
              <p className="font-body text-sm text-[#e0c0af] mt-2 max-w-sm">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Customizer Fields (Scrollable options) */}
        <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
          <div className="flex-grow overflow-y-auto p-8 space-y-8 pb-32">
            
            {/* Bun Selection */}
            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider text-left">
                Choose Bun / Crust
              </h4>
              <div className="space-y-2">
                {BANS_OPTIONS.map((bun) => {
                  const isSelected = selections.bun.name === bun.name;
                  return (
                    <div 
                      key={bun.name}
                      onClick={() => setSelections(prev => ({ ...prev, bun }))}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#ffb68b] bg-[#ffb68b]/5' 
                          : 'border-white/5 bg-[#1c1b1b]/20 hover:border-white/10'
                      }`}
                    >
                      <span className="font-body text-sm font-semibold text-white">{bun.name}</span>
                      <div className="flex items-center gap-3">
                        {bun.price > 0 && <span className="font-body text-xs text-[#ffb955] font-semibold">+{formatPrice(bun.price)}</span>}
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#ffb68b] bg-[#ff7a00]' : 'border-white/30'}`}>
                          {isSelected && <Check size={12} strokeWidth={3} className="text-[#522300]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Protein Selections */}
            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider text-left">
                Choose Protein Size
              </h4>
              <div className="space-y-2">
                {PATTY_OPTIONS.map((patty) => {
                  const isSelected = selections.patty.name === patty.name;
                  return (
                    <div 
                      key={patty.name}
                      onClick={() => setSelections(prev => ({ ...prev, patty }))}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#ffb68b] bg-[#ffb68b]/5' 
                          : 'border-white/5 bg-[#1c1b1b]/20 hover:border-white/10'
                      }`}
                    >
                      <span className="font-body text-sm font-semibold text-white">{patty.name}</span>
                      <div className="flex items-center gap-3">
                        {patty.price > 0 && <span className="font-body text-xs text-[#ffb955] font-semibold">+{formatPrice(patty.price)}</span>}
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#ffb68b] bg-[#ff7a00]' : 'border-white/30'}`}>
                          {isSelected && <Check size={12} strokeWidth={3} className="text-[#522300]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Premium Toppings */}
            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider text-left">
                Add Premium Toppings
              </h4>
              <div className="space-y-2">
                {TOPPINGS_OPTIONS.map((topping) => {
                  const isSelected = selections.toppings.some(t => t.name === topping.name);
                  return (
                    <div 
                      key={topping.name}
                      onClick={() => handleToggleTopping(topping)}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#ffb68b] bg-[#ffb68b]/5' 
                          : 'border-white/5 bg-[#1c1b1b]/20 hover:border-white/10'
                      }`}
                    >
                      <span className="font-body text-sm font-semibold text-white">{topping.name}</span>
                      <div className="flex items-center gap-3">
                        {topping.price > 0 && <span className="font-body text-xs text-[#ffb955] font-semibold">+{formatPrice(topping.price)}</span>}
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isSelected ? 'border-[#ffb68b] bg-[#ff7a00]' : 'border-white/30'}`}>
                          {isSelected && <Check size={12} strokeWidth={3} className="text-[#522300]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature Sauces */}
            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider text-left">
                Select Gourmet Sauces
              </h4>
              <div className="space-y-2">
                {SAUCES_OPTIONS.map((sauce) => {
                  const isSelected = selections.sauces.some(s => s.name === sauce.name);
                  return (
                    <div 
                      key={sauce.name}
                      onClick={() => handleToggleSauce(sauce)}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#ffb68b] bg-[#ffb68b]/5' 
                          : 'border-white/5 bg-[#1c1b1b]/20 hover:border-white/10'
                      }`}
                    >
                      <span className="font-body text-sm font-semibold text-white">{sauce.name}</span>
                      <div className="flex items-center gap-3">
                        {sauce.price > 0 && <span className="font-body text-xs text-[#ffb955] font-semibold">+{formatPrice(sauce.price)}</span>}
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isSelected ? 'border-[#ffb68b] bg-[#ff7a00]' : 'border-white/30'}`}>
                          {isSelected && <Check size={12} strokeWidth={3} className="text-[#522300]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sticky Checkout Bar */}
          <div className="absolute bottom-0 right-0 left-0 lg:left-1/2 bg-[#131313]/90 backdrop-blur-lg border-t border-white/10 p-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-4 bg-[#0e0e0e] rounded-full p-1.5 border border-white/5">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <Minus size={16} strokeWidth={2.5} />
              </button>
              <span className="font-body text-base font-bold text-white w-6 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 rounded-full bg-[#ff7a00] text-[#522300] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>
            
            <button 
              onClick={handleConfirm}
              className="flex-grow ml-6 bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] px-8 py-4 rounded-full font-body font-black text-sm tracking-wider uppercase flex items-center justify-between shadow-[0_10px_25px_rgba(255,122,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <span>Add Selected</span>
              <span className="font-display font-black text-base pl-2">{formatPrice(totalPrice)}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
