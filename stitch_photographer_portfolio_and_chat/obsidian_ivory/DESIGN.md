---
name: Obsidian & Ivory
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  page-margin-desktop: 80px
  page-margin-mobile: 24px
  gutter: 24px
  section-gap: 160px
  element-gap: 32px
---

## Brand & Style

The design system is engineered to evoke the atmosphere of a high-end contemporary art gallery. It prioritizes the artist's work by adopting a secondary role, using a refined **Minimalist** aesthetic that emphasizes negative space, precision, and silence. 

The target audience consists of luxury clients, creative directors, and high-net-worth individuals who value technical mastery and artistic vision. The UI must feel curated rather than manufactured. Every interaction is intentional, utilizing "white space" as a functional element to prevent visual fatigue and allow the vibrant colors of professional photography to command full attention.

## Colors

The palette is strictly monochromatic to ensure zero competition with the photographic content. 

- **Primary (#121212):** Used for primary typography, iconography, and deep-fill backgrounds for "dark mode" gallery views. It is a "near-black" to avoid the harshness of pure #000.
- **Secondary (#F9F9F9):** An off-white "Gallery Bone" used for subtle section differentiation without breaking the minimalist flow.
- **Neutral (#FFFFFF):** The standard canvas. High-gloss white provides the cleanest possible backdrop for imagery.
- **Tertiary (#707070):** A mid-tone gray reserved for meta-data, captions, and disabled states.

## Typography

This design system utilizes a high-contrast typographic pairing. **Playfair Display** provides an editorial, authoritative serif voice for headlines, echoing luxury fashion journals. **Inter** serves as the functional workhorse, providing maximum legibility for body copy and navigation.

Large display type should be used sparingly to introduce major gallery sections. Use `label-caps` for navigation items and image metadata to create a technical, "catalog" feel. Tighten letter spacing on large serifs and loosen it on small sans-serif labels for optimal balance.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy but with extremely generous margins to simulate a physical gallery wall. 

- **Desktop:** Use a 12-column grid with a maximum container width of 1440px. Gutters are kept wide (24px) to give images "room to breathe."
- **Section Gaps:** Vertical rhythm is intentionally slow. Use `160px` between major sections to force the user to pause and appreciate the current view before moving on.
- **Mobile:** Transition to a 4-column grid. Margins scale down to `24px`.
- **Masonry Logic:** Gallery grids should use a multi-column layout where image aspect ratios are preserved. Avoid cropping unless the image is specifically designated for a square-grid module.

## Elevation & Depth

To maintain a flat, modernist aesthetic, this design system avoids traditional box shadows. Instead, it uses **Tonal Layers** and **Low-Contrast Outlines**.

- **Surfaces:** Depth is created by placing white cards (`#FFFFFF`) on a light gray background (`#F9F9F9`).
- **Borders:** Use 1px solid lines in `#E5E5E5` for dividers and input fields.
- **Floating Elements:** The chat widget and navigation bars should utilize a **Glassmorphism** effect: a white background with 80% opacity and a 20px backdrop blur. This allows the photography to "glow" through the interface as the user scrolls.

## Shapes

The design system utilizes a **Sharp (0)** roundedness level. All buttons, image containers, and input fields must have 90-degree corners. This evokes the feel of a framed photograph and high-end printed lookbooks. Sharp edges communicate precision, professionalism, and architectural rigor.

## Components

- **Buttons:** Primary buttons are solid `#121212` with white `label-caps` text. Secondary buttons are "Ghost" style—1px black borders with no fill. Transitions should be slow (300ms) to maintain the calm mood.
- **Masonry Gallery:** Images must maintain their original aspect ratio. Hovering over an image should trigger a subtle 2% scale-in and a low-opacity overlay showing the `label-caps` metadata (Year, Location).
- **Pricing Cards:** Minimalist blocks with `headline-sm` for the package name. Use 1px horizontal dividers between line items. No shadows; use a `#F9F9F9` background fill to distinguish the card from the page background.
- **Floating Chat Widget:** A circular or square trigger in the bottom right using the glassmorphic blur defined in Elevation. The icon should be a simple 1.5px stroke weight minimalist bubble.
- **Input Fields:** Bottom-border only (underline style) for a more "boutique" form feel. Labels should use the `label-caps` style and float above the line on focus.
- **Lists:** Unordered lists in the footer or bio section should use a simple em-dash (—) as the bullet point for a literary touch.