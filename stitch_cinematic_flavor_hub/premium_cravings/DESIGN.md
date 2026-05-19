---
name: Premium Cravings
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e0c0af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#a78b7c'
  outline-variant: '#584235'
  surface-tint: '#ffb68b'
  primary: '#ffb68b'
  on-primary: '#522300'
  primary-container: '#ff7a00'
  on-primary-container: '#5c2800'
  inverse-primary: '#994700'
  secondary: '#ffb955'
  on-secondary: '#452b00'
  secondary-container: '#dc9100'
  on-secondary-container: '#4f3100'
  tertiary: '#ffb4a8'
  on-tertiary: '#690000'
  tertiary-container: '#ff7663'
  on-tertiary-container: '#750000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbc8'
  primary-fixed-dim: '#ffb68b'
  on-primary-fixed: '#321200'
  on-primary-fixed-variant: '#753400'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#ffb955'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#633f00'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#920703'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter-sm: 16px
  gutter-md: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The brand personality is **sophisticated, energetic, and visually addictive**. It reimagines fast food through the lens of luxury, elevating the ordering experience into a high-end digital ritual. The system targets a modern, discerning audience that values both convenience and premium aesthetics.

The visual style is a fusion of **Glassmorphism** and **Cinematic Modernism**. It leverages deep, moody backgrounds to make vibrant food photography "pop" with hyper-realistic intensity. High-gloss textures, smooth ambient glows, and floating interface layers create a sense of depth and physical presence, reminiscent of a high-end automotive configurator or a luxury watch showcase.

## Colors

The palette is anchored in a **Dark Mode** foundation to evoke a sense of exclusive, late-night luxury. 

- **Foundational Darks:** Deep blacks and charcoal browns are used for surfaces and containers, providing a canvas that absorbs light and directs focus toward the food.
- **Accents & CTAs:** High-energy oranges and golden yellows are reserved for primary actions, price points, and interactive states.
- **Rich Red:** Used sparingly as a background wash or a secondary accent to stimulate appetite and add a "prestige" heat to the visual language.
- **High-Contrast Content:** Cream and off-white are used for typography to ensure maximum legibility and a softer, more premium feel than pure white.

## Typography

The typography system relies on a high-contrast pairing:
- **Headlines (Sora):** Used for titles, product names, and hero sections. It features heavy weights and tight tracking to create an impactful, editorial "Dribbble-style" look.
- **Body & Labels (Montserrat):** Used for descriptions, nutritional info, and UI controls. It provides a clean, geometric counterpoint to the expressive headlines.

For mobile, display sizes are aggressively scaled down while maintaining the heavy weight to preserve the brand's bold character on smaller screens.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with a generous spacing rhythm.
- **Mobile:** A 4-column layout with 20px side margins and 16px gutters.
- **Desktop:** A 12-column layout with 64px margins and 24px gutters.

Spacing follows a 4px base unit. Component internal padding should be generous (typically 24px or 32px) to reinforce the luxury aesthetic. Use negative space aggressively around food imagery to allow the high-gloss textures to breathe. Content should feel "floating" rather than boxed-in.

## Elevation & Depth

Hierarchy is established through **Ambient Depth** and **Glassmorphism**:

1.  **Level 0 (Base):** Deep black (#111111) background.
2.  **Level 1 (Surface):** Dark charcoal containers with subtle 1px inner borders (top-down lighting effect).
3.  **Level 2 (Floating):** Semi-transparent glass layers (10-20% opacity) with a 20px backdrop blur and a thin, bright white stroke at 10% opacity to define edges.
4.  **Shadows:** Use large, ultra-diffused shadows with a 15% opacity primary color tint (e.g., an orange-tinted shadow under a primary CTA) to simulate colored light reflections.
5.  **Glows:** Apply outer glows to primary buttons and "Add to Cart" actions to create a pulsating, energetic feel.

## Shapes

The shape language is defined by **pronounced, friendly curves**.
- **Cards & Primary Containers:** 28px corner radius.
- **Buttons & Input Fields:** 16px corner radius.
- **Tags & Chips:** Full pill-shape for high-interactivity elements.

These rounded forms contrast against the dark, moody colors to keep the UI approachable and "appetizing."

## Components

- **Primary Buttons:** High-gloss gradients (Orange to Gold), 16px radius, bold Montserrat caps, with a soft orange drop shadow.
- **Product Cards:** Floating glass containers. The image of the food should break the top boundary of the card (z-axis overlap) to create a 3D effect. 
- **Chips:** Small, semi-transparent dark pills used for dietary labels (e.g., "Vegan," "Spicy") with subtle 1px borders.
- **Input Fields:** Deep charcoal background, 16px radius, with a 1px border that glows Golden Yellow when focused.
- **Progress Indicators:** Fluid, animated orange bars with a trailing glow to visualize the cooking/delivery process.
- **Bottom Sheets:** High-blur glass surfaces that slide up with a heavy 40px top-corner radius for detail views and customization options.