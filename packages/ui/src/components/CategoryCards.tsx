import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'burgers',
    name: 'Prime Burgers',
    description: 'Wagyu, Truffle, & Gold-leaf selections.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYBN0Cf27016ZhN_e6aHnFlmSBzQgHDDRb5NfyJPvLLUA0TW83I6sEpUj6uSjb0sI9Wp3P1Ce1GYi4q5l7MPJ2lwdn8R4Y9ZOAGc48mztcPpAgxjf0jW3gLJ79c_uD14dtxEAdiNUOm_yxdCChLxa8ZjPReDOvuH2_1Xy6zSWTK7msQFjvy2ip8gr8H_WFTNv0hEziJk6z__dkZQPbDB0UqPiETC35awDW56w3a5TTFJVpZ13N479jhkLqFjp-Aqs7FvJBsyLPXLfb'
  },
  {
    id: 'pizza',
    name: 'Artisan Pizza',
    description: '72-hour fermented sourdough crust.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgCRU-aSFfdDTsfRxDAR2haLTAATI0zQS-R73zKhHcfpp97Pq7b7GPfcVEzaChxv_xA25J-MPWKihIcHSmPSJmIc4oQBf2BnV8NMZ4DV0QLdcyQiClraTCpNuElRg0btfZV_sVVm8_BObB0FIBbHkbCIXc0VhNsBffB1QzYk4UO4n3pf9Ryd1XveLm9i37RVmo4IC-4J0besv64w0Hl-EF6ZJX7UV5kOv59T3ccyoF2_gYN6T2EEqAecqqKIXu6t4eM8NF-fK2qko0'
  },
  {
    id: 'sides',
    name: 'Signature Sides',
    description: 'Truffle frites & charred seasonal greens.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1tTtRpqICxonHQlTbw-TSOQCi4hf32hUZf_N19_DD2b10Jz4d7Pf5nYUXuiqzXUx4C01XECoPmZJzIQwVlzi-cqKFK2xhBfdh9tfBdROYGccafW68QA_hw1wCvKsRrnnziUfVhABsdg-mAdzlUh1_lZLQjrWwOS_tXMmORbek1gGVZVElqE_lZYY6yJ4oS8BmjGiLpsfxogK89Jxs4fEKc32WScySRrX_jbsGyG12b4_0Z2mB_BGFjE5y83VDBq1HuUv8iFfrBRLF'
  },
  {
    id: 'drinks',
    name: 'Lumina Elixirs',
    description: 'Crafted botanical infusions & cold brews.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPyZF1R_4sWzjrzUc914Un2AnO0PKesfTX53b3y7mewgQ0E9yj2qC8Lp8uNiuztQ578XCi0epHFNHHqVfld0Apv_AJwMNvPW3hei3yCT_lm1A-pgw0aBAj3bVsJCa9xERArQD8UnU7LOX-2gQGnJorpwr4qVkwJRgHgrHhS6fEGqz3tjvhS6xCjXe6xwRfpD9BPIZ1_NNEPIf9eoTkIKOwKUG_v1LXFonm-7ZODtPfSpb3pHvYNBzchhldGkByqHbGL7olXsxWRlRB'
  }
];

interface CategoryCardsProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full">
      {/* Category Container: Horizontal Scroll on Mobile/Tablet, 4-column Grid on Desktop */}
      <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-6 pb-6 md:pb-0 px-margin-mobile md:px-0">
        
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <div 
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`snap-center shrink-0 w-[280px] sm:w-[320px] md:w-auto relative aspect-[4/3] rounded-[28px] overflow-hidden group cursor-pointer border transition-all duration-500 ${
                isActive 
                  ? 'border-[#ffb68b] shadow-[0_15px_30px_rgba(255,182,139,0.2)] scale-[1.02]' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.4]" 
                  src={category.image}
                />
                {/* Glowing Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ff7a00]/10 via-transparent to-transparent opacity-40" />
                )}
              </div>

              {/* Card Label/Content */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ffb68b] transition-colors">
                    {category.name}
                  </h3>
                  <p className="font-body text-xs text-[#e0c0af] max-w-[200px] line-clamp-1">
                    {category.description}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#ff7a00] border-[#ff7a00] text-[#522300]' 
                    : 'border-white/20 bg-white/5 text-white group-hover:bg-white/10 group-hover:border-white/40'
                }`}>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
