import { Product } from '../store/useCartStore';

const MENU_PRODUCTS: Product[] = [
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
    id: 'nitro-cold-brew',
    name: 'Nitro Cold Brew',
    description: 'Slow-steeped organic coffee infused with pure nitrogen for a velvety, creamy cascade effect.',
    price: 8.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPyZF1R_4sWzjrzUc914Un2AnO0PKesfTX53b3y7mewgQ0E9yj2qC8Lp8uNiuztQ578XCi0epHFNHHqVfld0Apv_AJwMNvPW3hei3yCT_lm1A-pgw0aBAj3bVsJCa9xERArQD8UnU7LOX-2gQGnJorpwr4qVkwJRgHgrHhS6fEGqz3tjvhS6xCjXe6xwRfpD9BPIZ1_NNEPIf9eoTkIKOwKUG_v1LXFonm-7ZODtPfSpb3pHvYNBzchhldGkByqHbGL7olXsxWRlRB',
    category: 'drinks',
    tag: 'Lumina Elixir',
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
