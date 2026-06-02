import { Product } from '../store/useCartStore';

const MENU_PRODUCTS: Product[] = [
  // --- BURGERS ---
  {
    id: 'brioche-wagyu',
    name: 'Brioche Wagyu',
    description: 'Double A5 Wagyu patty, black truffle aioli, aged cheddar, toasted gold-dusted brioche bun.',
    price: 34.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU0u9Oix2Q6Dw6kZAY8KCbhqvlqgc9yb2nXCtfixlcmAWIOzBu-wWtXbS1Tb8tcq0Gg-YPOHi-tWKwdA3lsSaxpElXVj9Q3pXb7SYv6mVSU9TnDpyapZaxHF0lC4OX0G7f9UCgJ30A6sMqr-ex_PGMu0A90vdE9ylYA2K9VOaFyz81iiyiXVo4cdEsAP5gwkXXCtN_txzOxwyEwwmBxzCSt6ikb14tpolYqwAMhWw2Ylw4jocs2cCSbD6SrgQsb1jEaw99xz36thGy',
    category: 'burgers',
    tag: "Chef's Choice",
    isPopular: true
  },
  {
    id: 'truffle-wagyu-large',
    name: 'The Truffle Wagyu',
    description: 'A decadent masterpiece featuring A5 Wagyu beef, triple-cream brie, and freshly shaved Périgord black truffles on a 24k gold-dusted brioche.',
    price: 42.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKmmNkwYcrxT42tFdvOAeup0YMF3K8i31nzQl76u0Xr1uB3jYp6fc4OJ3BDZ9v2bYmk4d59nbtsAk4ZjtjB4oAnwC-wBvZZ3BkF2SHqnol1aPs_4ecgVzNPsGLnb13c8qSdk33mVG-h5AljDxU0N4RBojoQR7RJP1mc2hVlqTGAUB7HTNj-JZEFfzMmIUEybeH8gSsf55vPR_YSNO8mkZQyo72ybvAX_yPIUmyBfzQtZiLPO4NIS0hHODM0Q6EA_h3JTDjklfrQ1d9',
    category: 'burgers',
    tag: 'Best Seller',
    isPopular: true
  },
  {
    id: 'golden-royal-burger',
    name: 'Golden Royal Burger',
    description: '24K gold-wrapped double Prime beef, caviar spread, black truffle cheese, champagne-infused glaze on a custom sesame bun.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    category: 'burgers',
    tag: 'Ultra Luxury',
    isPopular: true
  },
  {
    id: 'caviar-lobster-roll-burger',
    name: 'Caviar Lobster Burger',
    description: 'Fresh Maine lobster claw, Ossetra caviar, brown butter mayonnaise, organic microgreens on a toasted milk bun.',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    category: 'burgers',
    tag: 'Seafood Special',
    isPopular: false
  },
  {
    id: 'foie-gras-deluxe',
    name: 'Foie Gras Deluxe',
    description: 'Wagyu beef patty topped with pan-seared foie gras, fig compote, and aged balsamic reduction on artisanal brioche.',
    price: 54.00,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    category: 'burgers',
    tag: 'Epicurean',
    isPopular: false
  },
  {
    id: 'imperial-bison-burger',
    name: 'Imperial Bison Burger',
    description: 'Organic free-range bison patty, sharp white cheddar, caramelized shallots, house-made wild berry relish.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80',
    category: 'burgers',
    tag: 'Signature',
    isPopular: false
  },

  // --- PIZZA ---
  {
    id: 'truffle-mushroom',
    name: 'Truffle Mushroom',
    description: 'Wild forest mushrooms, charcoal dough, fresh black truffle shavings, creamy burrata.',
    price: 28.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEVjxEuc0-hYnQjdCu0c5sEkLk22k6bWJtWb9thnnNivXOaYQ3a5hZq0kZVp5-501kimqYn2DRR6Zz3TdL_dRXRDrv_wVe4nGCPg88j17UHa8pOtbqFNqKjumwmL_DH2H26Ha6TmWQNG0ZsOhlhTY7b0oeX5KBag9-VJMpDYqvrksUaceU_Tr_R48EPvzWllZf_MYM9Irl0msOk4OdmjKsj8n-Nf2V3bUemNsSYRUEmpC4MybaR0Y62YtXbr4NPCF_7a8os6k8R1ME',
    category: 'pizza',
    tag: 'New Arrival',
    isPopular: true
  },
  {
    id: 'burrata-bliss',
    name: 'Burrata Bliss',
    description: 'Whole fresh Italian burrata heart on a foundation of San Marzano tomatoes, heirloom confit, and a 20-year aged balsamic drizzle.',
    price: 34.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAosms2w2yac-B8DC_z6DTqj-BL6JDwPee0Ed6XTVQxpwy_t4wejFoyuTE8NrJjnSe80Mh_4s9rOiPhxfnpVTqgJ8oLNc9slprPsQBnmq5MWM3HkhLUaVBKijwodI7VJcCnmsrxbTQds5TMpD85TZk0Q-V4a8ABPXVUqePDi_NvoxvrCTehcaamLl7DHLWslde4do4Kw9P4pYxwQ6fTNXcRVisyCOvR7X6BED38mfCS30MZQowmZXaH4k2KFdMIs7fRN0JsDzbD7ZsH',
    category: 'pizza',
    tag: "Chef's Choice",
    isPopular: true
  },
  {
    id: 'gold-leaf-caviar-pizza',
    name: 'Gold Leaf Caviar Pizza',
    description: '24K gold leaf flakes, Royal Ossetra caviar, smoked salmon carpaccio, crème fraîche base, micro-dill.',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    tag: 'Prestige',
    isPopular: true
  },
  {
    id: 'iberico-fig-pizza',
    name: 'Iberico Fig Pizza',
    description: '36-month cured Jamón Ibérico, fresh Mission figs, gorgonzola dolce, fresh arugula, aged balsamic.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    tag: 'Classic Italian',
    isPopular: false
  },
  {
    id: 'lobster-thermidor-pizza',
    name: 'Lobster Thermidor Pizza',
    description: 'Butter-poached lobster chunks, cognac cream sauce, gruyère cheese, fresh chives.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    tag: 'Seafood',
    isPopular: false
  },
  {
    id: 'quattro-formaggi-truffle',
    name: 'Quattro Formaggi Truffle',
    description: 'Fontina, Taleggio, Gorgonzola, Burrata, topped with shaved white Alba truffles.',
    price: 39.00,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
    category: 'pizza',
    tag: 'White Base',
    isPopular: false
  },

  // --- PASTA ---
  {
    id: 'classic-carbonara',
    name: 'Classic Carbonara',
    description: 'Pecorino Romano, organic egg yolk, crispy house-cured guanciale, perfectly al dente hand-rolled pasta.',
    price: 24.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvJ2Dswk8YlSC-eCnjbRPnlO5FRtKEalNglqBtEdGv_ML4vmGRLIahFn4ofX2fAc3jDfm3UtIhaQFpBmDu4lYa_C8ucr4a2xw9Z5JcMQJ2SHhOfpwPG1tJFBZmWhkn5W5XQYge8vsF8W_Pf78mIgfQX1kNU4HnLe3c9h_MNU3cPnRmFkUDZ63Sp3Atm4c13fmzCazE8ER8m-CEjsw-l2l8R4Hai-Pdmc_tjNGaN85-k6qZo_rJrCbMulSIsDT-F_K0Xo84Cf-_oqFd',
    category: 'pasta',
    tag: 'Signature',
    isPopular: false
  },
  {
    id: 'lobster-tagliolini',
    name: 'Lobster Tagliolini',
    description: 'Hand-cut squid ink tagliolini, butter-poached Maine lobster tail, saffron-infused cherry tomato reduction.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    category: 'pasta',
    tag: 'Signature',
    isPopular: true
  },
  {
    id: 'white-truffle-tagliatelle',
    name: 'White Truffle Tagliatelle',
    description: 'House-made egg tagliatelle tossed in Alpine butter, Parmigiano-Reged, covered in shaved white truffles.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80',
    category: 'pasta',
    tag: 'Chef Choice',
    isPopular: true
  },
  {
    id: 'saffron-seafood-linguine',
    name: 'Saffron Seafood Linguine',
    description: 'Saffron linguine with scallops, jumbo prawns, clams, wild garlic, and white wine emulsion.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    category: 'pasta',
    tag: 'Seafood',
    isPopular: false
  },
  {
    id: 'wagyu-bolognese-pappardelle',
    name: 'Wagyu Bolognese Pappardelle',
    description: 'Slow-braised A5 Wagyu beef ragù, hand-rolled wide pappardelle pasta, fresh ricotta cheese.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80',
    category: 'pasta',
    tag: 'Classic',
    isPopular: false
  },
  {
    id: 'wild-mushroom-truffle-ravioli',
    name: 'Mushroom Truffle Ravioli',
    description: 'House-made ravioli stuffed with wild porcini, served in a sage butter sauce with fresh shaved truffles.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    category: 'pasta',
    tag: 'Vegetarian',
    isPopular: false
  },

  // --- DRINKS ---
  {
    id: 'nitro-cold-brew',
    name: 'Nitro Cold Brew',
    description: 'Slow-steeped organic coffee infused with pure nitrogen for a velvety, creamy cascade effect.',
    price: 8.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPyZF1R_4sWzjrzUc914Un2AnO0PKesfTX53b3y7mewgQ0E9yj2qC8Lp8uNiuztQ578XCi0epHFNHHqVfld0Apv_AJwMNvPW3hei3yCT_lm1A-pgw0aBAj3bVsJCa9xERArQD8UnU7LOX-2gQGnJorpwr4qVkwJRgHgrHhS6fEGqz3tjvhS6xCjXe6xwRfpD9BPIZ1_NNEPIf9eoTkIKOwKUG_v1LXFonm-7ZODtPfSpb3pHvYNBzchhldGkByqHbGL7olXsxWRlRB',
    category: 'drinks',
    tag: 'Lumina Elixir',
    isPopular: false
  },
  {
    id: 'gold-espresso-martini',
    name: 'Gold Espresso Martini',
    description: 'Signature single-origin espresso, premium vodka, gold-dusted coffee beans, house coffee liqueur.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    category: 'drinks',
    tag: 'Cocktail',
    isPopular: true
  },
  {
    id: 'saffron-rose-latte',
    name: 'Saffron Rose Latte',
    description: 'Organic milk, organic saffron threads, damask rose water, sweetened with pure acacia honey.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    category: 'drinks',
    tag: 'Elixir',
    isPopular: false
  },
  {
    id: 'smoked-rosemary-old-fashioned',
    name: 'Smoked Old Fashioned',
    description: 'Barrel-aged bourbon, maple syrup, orange bitters, smoked with fresh organic rosemary.',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    category: 'drinks',
    tag: 'Cocktail',
    isPopular: false
  },
  {
    id: 'hibiscus-champagne-spritz',
    name: 'Hibiscus Champagne Spritz',
    description: 'Premium Champagne, organic wild hibiscus flower syrup, fresh mint, splash of club soda.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    category: 'drinks',
    tag: 'Sparkling',
    isPopular: true
  },
  {
    id: 'royal-matcha-frappe',
    name: 'Royal Matcha Frappé',
    description: 'Ceremonial grade Uji matcha, organic almond milk, sweet cream, topped with edible silver flakes.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=600&q=80',
    category: 'drinks',
    tag: 'Wellness',
    isPopular: false
  },

  // --- SIDES ---
  {
    id: 'truffle-fries',
    name: 'Truffle Frites',
    description: 'Gourmet hand-cut fries served in a designer bowl, dusted with truffle zest and freshly grated parmesan cheese.',
    price: 14.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1tTtRpqICxonHQlTbw-TSOQCi4hf32hUZf_N19_DD2b10Jz4d7Pf5nYUXuiqzXUx4C01XECoPmZJzIQwVlzi-cqKFK2xhBfdh9tfBdROYGccafW68QA_hw1wCvKsRrnnziUfVhABsdg-mAdzlUh1_lZLQjrWwOS_tXMmORbek1gGVZVElqE_lZYY6yJ4oS8BmjGiLpsfxogK89Jxs4fEKc32WScySRrX_jbsGyG12b4_0Z2mB_BGFjE5y83VDBq1HuUv8iFfrBRLF',
    category: 'sides',
    tag: 'Popular',
    isPopular: false
  },
  {
    id: 'crispy-caviar-tots',
    name: 'Crispy Caviar Tots',
    description: 'Crispy hand-formed potato tots topped with chive crème fraîche and Royal Ossetra caviar.',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    category: 'sides',
    tag: 'Deluxe',
    isPopular: true
  },
  {
    id: 'parmesan-asparagus-fries',
    name: 'Parmesan Asparagus',
    description: 'Panko-crusted fresh jumbo asparagus spears served with roasted garlic aioli.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80',
    category: 'sides',
    tag: 'Vegetarian',
    isPopular: false
  },
  {
    id: 'lobster-mac-cheese-bites',
    name: 'Lobster Mac Bites',
    description: 'Golden crispy bites stuffed with five-cheese macaroni and butter-poached lobster.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80',
    category: 'sides',
    tag: 'Seafood',
    isPopular: false
  },
  {
    id: 'wagyu-beef-sliders',
    name: 'Wagyu Beef Sliders',
    description: 'Three mini Wagyu sliders with aged cheddar, caramelized onions, and truffle aioli.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    category: 'sides',
    tag: 'Signature',
    isPopular: true
  },
  {
    id: 'sweet-potato-truffle-wedges',
    name: 'Sweet Potato Truffle',
    description: 'Sweet potato wedges dusted with smoked paprika, sea salt, truffle oil, and pecorino romano.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    category: 'sides',
    tag: 'Popular',
    isPopular: false
  }
];

export function useMenuData() {
  const getProductsByCategory = (category: Product['category']) => {
    return MENU_PRODUCTS.filter((p) => p.category === category);
  };

  const getPopularProducts = () => {
    return MENU_PRODUCTS.filter((p) => p.isPopular);
  };

  const getProductById = (id: string) => {
    return MENU_PRODUCTS.find((p) => p.id === id);
  };

  return {
    products: MENU_PRODUCTS,
    getProductsByCategory,
    getPopularProducts,
    getProductById,
  };
}
