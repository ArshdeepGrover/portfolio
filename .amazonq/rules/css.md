# CSS/SCSS Rules

## Styling Guidelines

- **NEVER use Tailwind classes in HTML files** - use semantic CSS classes only
- **Use SCSS files** for all styling with Tailwind's @apply directive
- **HTML should only contain semantic class names** - no utility classes
- **Component-specific styles** should go in the component's `.scss` file
- **Use @apply directive** in SCSS to apply Tailwind utilities

## File Structure
- Component styles: `component-name.component.scss`
- Global styles: `src/styles.scss`
- Utility styles: `src/app/shared/styles/`

## Color Palette
- **Primary Colors Only**: Use these specific colors for all primary selections
  - Primary: '#FF7955'
  - Primary Light: '#FF9B80'
  - Primary Dark: '#E65E3B'
- **No other primary colors** - stick to this orange palette consistently

## Best Practices
- HTML uses semantic class names only (e.g., .hero-title, .card-container)
- SCSS files use @apply with Tailwind utilities
- Never write Tailwind classes directly in HTML
- Use meaningful, component-specific class names in HTML
- using dark: prefix for all styling
- using responsive prefixes (sm:, md:, lg:, xl:)