# Tailwind CSS Conversion Rules

## Core Principle
**ALWAYS use Tailwind CSS classes with @apply directive instead of custom CSS properties**

## Conversion Guidelines

### 1. **Position Properties**
```scss
// ❌ Custom CSS
position: absolute;
top: 0;
left: 0;

// ✅ Tailwind
@apply absolute inset-0;
```

### 2. **Sizing Properties**
```scss
// ❌ Custom CSS
width: 100%;
height: 100%;

// ✅ Tailwind
@apply w-full h-full;
```

### 3. **Spacing Properties**
```scss
// ❌ Custom CSS
margin: 0 auto;
padding: 16px;

// ✅ Tailwind
@apply mx-auto p-4;
```

### 4. **Color Properties**
```scss
// ❌ Custom CSS
background: #FF7955;
color: #374151;

// ✅ Tailwind
@apply bg-primary text-gray-700;
```

### 5. **Typography Properties**
```scss
// ❌ Custom CSS
font-size: 2rem;
font-weight: bold;

// ✅ Tailwind
@apply text-3xl font-bold;
```

### 6. **Layout Properties**
```scss
// ❌ Custom CSS
display: flex;
align-items: center;
justify-content: center;

// ✅ Tailwind
@apply flex items-center justify-center;
```

### 7. **Border Properties**
```scss
// ❌ Custom CSS
border-radius: 50%;
border: 2px solid #FF7955;

// ✅ Tailwind
@apply rounded-full border-2 border-primary;
```

### 8. **Effects Properties**
```scss
// ❌ Custom CSS
opacity: 0.3;
filter: blur(60px);

// ✅ Tailwind
@apply opacity-30 blur-[60px];
```

### 9. **Percentage Values**
```scss
// ❌ Custom CSS
top: 20%;
left: 10%;

// ✅ Tailwind
@apply top-[20%] left-[10%];
```

### 10. **Z-Index Values**
```scss
// ❌ Custom CSS
z-index: 9999;

// ✅ Tailwind
@apply z-[9999];
```

## Exceptions

### **Only use custom CSS for:**
1. **Keyframe animations** - Cannot be converted to Tailwind
2. **Complex transforms** - When Tailwind doesn't have equivalent
3. **Custom properties** - CSS variables that aren't in Tailwind config

```scss
// ✅ Acceptable custom CSS
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

// ✅ Acceptable custom CSS
animation: float 6s ease-in-out infinite;
height: 90dvh; // Modern viewport units
```

## Benefits of This Approach

1. **Consistency** - All styling follows Tailwind conventions
2. **Maintainability** - Easier to update and modify
3. **Performance** - Better tree-shaking and optimization
4. **Developer Experience** - IntelliSense and autocomplete
5. **Design System** - Enforces design token usage

## Implementation Checklist

- [ ] Convert all position properties to Tailwind classes
- [ ] Convert all sizing properties to Tailwind classes
- [ ] Convert all color properties to use design tokens
- [ ] Convert all spacing properties to Tailwind scale
- [ ] Convert all typography properties to Tailwind classes
- [ ] Use @apply directive for all Tailwind classes
- [ ] Keep only animations and modern CSS features as custom
- [ ] Use arbitrary values `[value]` for non-standard measurements
- [ ] Maintain semantic class names in HTML
- [ ] Document any exceptions with clear reasoning

## File Structure Compliance

```
component.scss should contain:
├── Tailwind classes with @apply
├── Custom keyframe animations
├── Modern CSS features (dvh, etc.)
└── Component-specific overrides only
```

This approach ensures maximum consistency with the existing CSS architecture while leveraging Tailwind's full potential.