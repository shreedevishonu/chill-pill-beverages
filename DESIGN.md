# Design Brief — Chill Pill Beverages

## Purpose
Youthful, energetic e-commerce site for Indian beverage brand. Goal: immersive, playful, premium-feeling glassmorphic UI that feels like a "frosted glass on tropical landscape" — modern, tech-forward but approachable.

## Tone
Playful maximalism. Vibrant + joyful. Bold without chaotic. Energetic, fresh, young audience.

## Color Palette (OKLCH — Light / Dark)
| Name | Light OKLCH | Dark OKLCH | Usage |
|------|-------------|-----------|-------|
| Primary (Orange) | 0.58 0.28 34 | 0.72 0.24 34 | CTAs, highlights, product hero |
| Secondary (Sky Blue) | 0.68 0.18 138 | 0.65 0.22 138 | Accent rhythm, secondary actions |
| Accent (Purple) | 0.58 0.28 34 | 0.72 0.24 34 | Product variants, creative states |
| Background | 0.98 0.01 88 | 0.09 0.02 32 | Page base |
| Card | 0.95 0.02 88 | 0.12 0.02 32 | Frosted glass surfaces |
| Foreground | 0.12 0.02 32 | 0.96 0.01 88 | Text, primary content |
| Muted | 0.85 0.02 88 | 0.18 0.01 32 | Secondary text, subtle UI |
| Border | 0.88 0.02 88 | 0.22 0.02 32 | Dividers, outlines |

## Typography
- **Display**: Fraunces (serif, playful). Use weights 600-900 for headers, taglines, hero text.
- **Body**: DM Sans (sans-serif, clean). Weights 400-600 for paragraphs, UI labels.
- **Mono**: Geist Mono (monospace). Code blocks, product specs.
- **Scale**: 12, 14, 16, 18, 20, 24, 30, 36, 48, 64px.

## Elevation & Depth
- **Glass surfaces**: `bg-card/40 backdrop-blur-md border border-border/20` for floating, layered look.
- **Shadows**: elevated (8px offset), glow (accent primary color), subtle (default).
- **3D**: CSS perspective + transform for card tilt hover on product grid. React Three Fiber for hero bottles.
- **Layering**: Card > popover > default background, transparent stacking for depth.

## Structural Zones
| Zone | Treatment |
|------|-----------|
| Header/Nav | `glassmorphic` class: semi-transparent card with backdrop blur, subtle border, sticky positioning. |
| Hero | Full-height, gradient bg or image, floating 3D bottles (Three.js), bold centered copy. Scroll-triggered fade-in for secondary elements. |
| Product Grid | Card-based, 3-4 columns mobile-first. Frosted glass cards with 3D tilt hover, glow on hover. Staggered fade-in animation. |
| Section Breaks | Alternate `bg-muted/20` or `bg-card/30` for rhythm. Subtle borders between zones. |
| Footer | `glassmorphic`, links + newsletter signup, centered layout. |
| Cart Sidebar | Slides in from right, overlays main content with semi-transparent backdrop, `glassmorphic` panels. |

## Spacing & Rhythm
- **Micro** (4px gap between icon + label)
- **Small** (8px padding inside buttons, card gaps)
- **Medium** (16px section padding)
- **Large** (24-32px between major sections)
- **Full** (48-64px for hero height, major breathing room)
- Grid: mobile-first `gap-4 md:gap-6 lg:gap-8`.

## Component Patterns
- **Buttons**: Primary (bg-primary text-primary-foreground), Secondary (bg-secondary text-secondary-foreground), Ghost (border-border).
- **Cards**: `glassmorphic` base + hover state raises shadow and brightens slightly.
- **Forms**: Input bg-input, border-border, focus ring-primary.
- **Badge/Pill**: Rounded-full, accent color for active, muted for disabled.

## Motion & Animation
- **Entrance**: `animate-fade-in` (0.5s ease-out) for staggered cascade on scroll.
- **Floating**: `animate-float` (6s ease-in-out infinite) for hero bottles, floating elements.
- **Hover**: 3D tilt (`animate-tilt`), shadow elevation, glow pulse on accent elements.
- **Transitions**: All UI changes use `transition-smooth` (0.3s cubic-bezier).
- **Scroll**: Intersection Observer triggers fade-in, parallax on hero background.

## Constraints
- **No defaults**: All shadows, radii, animations are custom, never Bootstrap/Tailwind defaults.
- **No gradients on text**: Use solid colors or very subtle overlays.
- **Mobile-first**: Start responsive at 375px, scale to 1440px+.
- **Contrast AA+**: Verified for both light and dark modes.
- **3D restraint**: Tilt max 5deg, perspective 1000px to avoid nausea.

## Signature Detail
**Glassmorphic frosted glass + vibrant accent glow.** Combine semi-transparent card backgrounds with subtle backdrop blur and a soft glowing shadow using the brand's orange primary color. This creates an upscale, modern, premium feel while maintaining the youthful energetic tone. Floating elements with gentle animation reinforce playfulness. No flat design — all surfaces have intentional depth and light behavior.

## Differentiation
Beverage e-commerce sites often use clean minimalism or overly-playful cartoon aesthetics. Chill Pill bridges: **premium modern tech (glassmorphism, 3D perspective) meets youthful playfulness (vibrant colors, floating animations, bold typography).** The result feels like a sophisticated, energetic experience — not a kids' app, not a corporate site, but a fun premium brand.
