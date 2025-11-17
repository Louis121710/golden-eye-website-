# Golden Eye Security - Complete Styling Documentation

## Main CSS File: `css/style.css`

This document shows all the styling enhancements made to create a professional security-themed website with blue and yellow color scheme.

### Color Variables (CSS Custom Properties)
```css
--blue-900: #003060 (Dark Navy)
--blue-800: #004499
--blue-700: #0055aa
--blue-600: #0066cc (Primary Blue)
--blue-500: #1f7fe6
--blue-400: #3c8dff (Light Blue)
--blue-300: #6ba8ff
--yellow-400: #f6b400 (Primary Yellow/Gold)
--yellow-300: #ffd463
--yellow-200: #ffe085
```

### Key Styling Features

#### 1. **Body Background**
- Multi-layer gradient background with blue and yellow accents
- Fixed background attachment for depth
- Subtle texture overlay pattern
- Professional security aesthetic

#### 2. **Header & Navigation**
- Glassmorphism effect with backdrop blur
- Gradient border at bottom (yellow to blue)
- Enhanced navigation links with hover animations
- Emergency hotline button with shine effect
- Active state with blue gradient background

#### 3. **Hero Sections**
- Animated background elements (pulse and float animations)
- Multi-layer shadows for depth
- Gradient overlays with yellow accents
- Professional card design with borders

#### 4. **Service Cards**
- Hover animations (lift and scale)
- Shimmer effect on hover
- Yellow accent border (left side) transitioning to blue
- Gradient border that appears on hover
- Smooth cubic-bezier transitions

#### 5. **Forms & Inputs**
- Enhanced focus states with blue glow
- Smooth transitions on interactions
- Professional checkbox/radio styling
- Button animations with shine effect
- Improved visual feedback

#### 6. **Footer**
- Gradient background (blue-900 to blue-800)
- Yellow top border (3px)
- Subtle accent line
- Improved contrast and readability

### Animations

1. **Pulse Animation**: Used in hero cards for background elements
2. **Float Animation**: Subtle movement in hero sections
3. **Shimmer Effect**: Applied to buttons and cards on hover
4. **Transform Animations**: Smooth lift and scale effects

### Responsive Design
- All styles are fully responsive
- Mobile-first approach maintained
- Breakpoints at 780px for mobile optimization

## File Structure

```
golden-eye-website/
├── css/
│   └── style.css (Main stylesheet - 869 lines)
├── index.html (Has inline styles)
├── contact.html (Has inline styles)
├── products.html (Has inline styles)
├── compliance.html (Has inline styles)
├── training.html (Has inline styles)
├── equity.html (Has inline styles)
└── infrastructure.html (Has inline styles)
```

## Note on Inline Styles

The HTML files contain inline `<style>` tags that may override the main CSS. For best results:
1. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
2. Or consolidate inline styles into main CSS file
3. Ensure CSS file path is correct (some use `./css/style.css`, others use `/css/style.css`)

## Visual Enhancements Summary

✅ Enhanced color palette with blue and yellow theme
✅ Professional gradients throughout
✅ Smooth animations and transitions
✅ Modern glassmorphism effects
✅ Enhanced shadows and depth
✅ Improved hover states
✅ Better form styling
✅ Professional footer design
✅ Responsive design maintained

