# Premium Landing Page Animations

This document explains the animation system implemented for the TrendScope landing page hero section.

## Animation Philosophy

The animations follow the design principles of premium SaaS companies like **Stripe**, **Linear**, **Framer**, and **Vercel**:

- **Subtle, not flashy** - Animations enhance without distracting
- **Performance-first** - GPU-accelerated transforms only
- **Sequential reveals** - Staggered timing for natural flow
- **Premium easing** - Custom cubic-bezier curves for smoothness
- **Micro-interactions** - Thoughtful hover and tap states

---

## Technical Implementation

### Easing Curve

```typescript
const premiumEase = [0.16, 1, 0.3, 1] as const;
```

This is a **custom cubic-bezier curve** that creates a smooth, decelerating motion. It starts slowly, accelerates, then eases out smoothly. This is the same curve used by Stripe and Linear.

---

## Hero Section Animations

### 1. Page Load Sequence

Elements animate in this order:

1. **Headline text** (fade + slide up + blur removal)
2. **Highlight backgrounds** (horizontal scale)
3. **Highlight text** (fade + slide)
4. **Subheading** (fade + slide)
5. **CTA buttons** (staggered fade + slide)
6. **Illustrations** (fade + scale)

#### Container Orchestration

```typescript
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // 120ms delay between children
      delayChildren: 0.2, // Initial delay before first child
    },
  },
};
```

### 2. Masked Text Reveal

The headline uses a **premium text reveal effect**:

```typescript
const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50, // Slide up from 50px below
    filter: "blur(10px)", // Start blurred
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: premiumEase,
    },
  },
};
```

**Why?** This creates a "revealing through fog" effect that feels expensive and modern.

### 3. Highlight Word Animation

The highlighted words ("Trending" and "Right Now") use a **two-layer animation**:

#### Background Layer

```typescript
const highlightBgVariants: Variants = {
  hidden: {
    scaleX: 0,
    transformOrigin: "left",
  },
  visible: {
    scaleX: 1.01, // 1% overshoot for polish
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
};
```

#### Text Layer

```typescript
const highlightTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.15, // Text follows background
      ease: premiumEase,
    },
  },
};
```

**Why two layers?** This creates depth and makes the highlight feel "drawn in" before the text appears, adding sophistication.

### 4. CTA Button Micro-Interactions

#### Hover State

```typescript
whileHover={{
  y: -3,  // Lift 3px upward
  boxShadow: "0 10px 30px -5px rgba(234, 179, 8, 0.4)",
  transition: { duration: 0.2, ease: premiumEase },
}}
```

#### Tap State

```typescript
whileTap={{
  scale: 0.97,  // Slight scale down
  transition: { duration: 0.1 },
}}
```

**Why?** These micro-interactions provide tactile feedback without being bouncy or distracting.

### 5. Illustration Animations

#### Entry Animation

```typescript
const illustrationVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: premiumEase,
    },
  },
};
```

#### Infinite Float

```typescript
animate={{
  y: [0, -12, 0],  // Float 12px up and down
}}
transition={{
  duration: 7,
  repeat: Infinity,
  ease: "easeInOut",
}}
```

**Why different durations?** Left illustration floats in 7s, right in 8s. This creates a **natural, non-synchronized** movement that feels organic.

### 6. Ambient Decorative Orbs

Subtle floating dots that add depth:

```typescript
const ambientOrbVariants: Variants = {
  animate: {
    y: [-8, 8, -8],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
```

**Why low opacity?** At 30-50% opacity with blur, these elements add **ambient movement** without competing for attention.

---

## Header/Navbar Animations

### 1. Initial Fade-In

The navbar fades in smoothly on page load:

```typescript
const navbarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20, // Start 20px above
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};
```

### 2. Scroll Behavior

#### Height Reduction

```typescript
animate={{
  height: isScrolled ? "64px" : "80px",
}}
transition={{
  duration: 0.3,
  ease: premiumEase,
}}
```

#### Background Blur Increase

```typescript
const backdropBlur = useTransform(
  scrollY,
  [0, 100],
  ["blur(8px)", "blur(16px)"],
);
```

**Why?** As the user scrolls, the navbar becomes more compact and the background blur increases, creating a **glass morphism effect** that's both modern and functional.

### 3. Navigation Link Hover

Links have an **underline animation**:

```typescript
<motion.span
  className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
  initial={{ scaleX: 0 }}
  whileHover={{ scaleX: 1 }}
  transition={{ duration: 0.3, ease: premiumEase }}
/>
```

**Why origin-left?** The underline "draws in" from left to right, which feels intentional and smooth.

---

## Performance Optimizations

### GPU Acceleration

All animations use **transform properties** that are GPU-accelerated:

- `translateX`, `translateY`
- `scale`, `scaleX`, `scaleY`
- `opacity`

**Avoid:** Properties like `width`, `height`, `top`, `left` that trigger layout recalculation.

### Will-Change Optimization

Framer Motion automatically applies `will-change` CSS property for better performance.

### Reduced Motion Support

Consider adding this for accessibility:

```typescript
const shouldReduceMotion = useReducedMotion();

const variants = shouldReduceMotion
  ? reducedMotionVariants
  : fullMotionVariants;
```

---

## Animation Timing Reference

| Element        | Duration | Delay           | Easing  |
| -------------- | -------- | --------------- | ------- |
| Headline text  | 0.9s     | Staggered 0.12s | Premium |
| Highlight BG   | 0.7s     | 0s              | Premium |
| Highlight text | 0.6s     | 0.15s           | Premium |
| Subheading     | 0.8s     | Staggered       | Premium |
| CTA buttons    | 0.6s     | Staggered 0.1s  | Premium |
| Illustrations  | 1s       | 0.6s / 0.8s     | Premium |
| Button hover   | 0.2s     | 0s              | Premium |
| Button tap     | 0.1s     | 0s              | Linear  |
| Navbar scroll  | 0.3s     | 0s              | Premium |

---

## Best Practices

### DO ✅

- Use staggered reveals for related elements
- Apply easing curves for smooth motion
- Keep animations under 1 second
- Use GPU-accelerated properties
- Test on low-end devices

### DON'T ❌

- Animate multiple elements simultaneously
- Use elastic or bouncy easing
- Animate layout properties (width, height)
- Create long animation durations (>1.5s)
- Overuse motion - less is more

---

## Browser Compatibility

- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

All animations gracefully degrade on older browsers.

---

## Future Enhancements

Consider adding:

1. **Scroll-triggered animations** for other sections
2. **Intersection Observer** for performance
3. **Reduced motion queries** for accessibility
4. **Dark mode animation variants**
5. **Loading state animations**

---

## References

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Stripe's animation principles](https://stripe.com)
- [Linear's design system](https://linear.app)
- [Cubic-bezier.com](https://cubic-bezier.com) - Easing curve tool

---

**Last Updated:** January 2026  
**Version:** 1.0.0
