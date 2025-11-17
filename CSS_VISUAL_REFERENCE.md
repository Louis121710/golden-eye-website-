# CSS Styling Visual Reference

## Complete CSS File Location
**File:** `css/style.css` (19,835 bytes / ~870 lines)

## Key Styling Sections

### 1. Color System (Lines 1-24)
```css
:root {
  --blue-900: #003060;  /* Dark Navy - Primary Dark */
  --blue-800: #004499;
  --blue-700: #0055aa;
  --blue-600: #0066cc;  /* Primary Blue */
  --blue-500: #1f7fe6;
  --blue-400: #3c8dff;  /* Light Blue */
  --blue-300: #6ba8ff;
  --yellow-400: #f6b400; /* Primary Yellow/Gold */
  --yellow-300: #ffd463;
  --yellow-200: #ffe085;
  /* Plus shadow variables */
}
```

### 2. Body Background (Lines 32-56)
- **Multi-layer gradients**: Blue and yellow radial gradients
- **Fixed background**: Creates depth effect
- **Texture overlay**: Subtle pattern overlay

### 3. Header Styling (Lines 61-242)
- **Glassmorphism**: `backdrop-filter: blur(16px)`
- **Gradient border**: Yellow to blue at bottom
- **Navigation**: Enhanced hover states with blue gradients
- **Emergency button**: Yellow gradient with shine animation

### 4. Hero Cards (Lines 268-315)
- **Gradient background**: Blue-900 to Blue-800 to Blue-700
- **Animated elements**: Pulse and float animations
- **Multi-layer shadows**: Deep, professional shadows
- **Border effects**: Subtle blue border

### 5. Service Cards (Lines 396-465)
- **Hover lift**: `translateY(-8px) scale(1.02)`
- **Shimmer effect**: Animated gradient sweep
- **Yellow accent border**: Left border (4px) transitions to blue on hover
- **Gradient border**: Appears on hover

### 6. Forms (Lines 557-727)
- **Enhanced inputs**: Blue focus glow
- **Button animations**: Shine effect on hover
- **Professional styling**: Gradients and shadows

### 7. Footer (Lines 785-825)
- **Gradient background**: Blue-900 to Blue-800
- **Yellow top border**: 3px solid
- **Accent line**: Gradient overlay

## Animations Defined

### Pulse Animation (Lines 306-309)
```css
@keyframes pulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.15; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 0.25; }
}
```

### Float Animation (Lines 311-315)
```css
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -20px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
```

## How to See the Changes

1. **Hard Refresh Browser**: 
   - Windows: `Ctrl + F5` or `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache**: 
   - Open DevTools (F12)
   - Right-click refresh button → "Empty Cache and Hard Reload"

3. **Check CSS is Loading**:
   - Open DevTools (F12)
   - Go to Network tab
   - Refresh page
   - Look for `style.css` - should show 200 status

4. **Verify CSS Path**:
   - All HTML files should use: `href="./css/style.css"`
   - Fixed: `compliance.html` and `contact.html` now use relative path

## Visual Features You Should See

✅ **Header**: Glassmorphic effect with blur, yellow-blue gradient border at bottom
✅ **Navigation**: Links turn blue gradient on hover/active
✅ **Hero Section**: Animated background elements, deep shadows
✅ **Service Cards**: Yellow left border, lift on hover, shimmer effect
✅ **Buttons**: Shine animation on hover, enhanced shadows
✅ **Forms**: Blue glow on focus, smooth transitions
✅ **Footer**: Yellow top border, gradient background

## Troubleshooting

If styles don't appear:
1. Check browser console for CSS loading errors
2. Verify file path in HTML: `./css/style.css`
3. Hard refresh browser (Ctrl+F5)
4. Check if inline styles in HTML are overriding (they have higher specificity)

