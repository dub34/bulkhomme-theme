# ForHomeAndMore Magento 2 Theme

A modern, clean Magento 2 theme for ForHomeAndMore using CSS custom properties and a mobile-first approach.

## Overview

- **Theme Name**: ForHomeAndMore/default
- **Parent Theme**: Magento/blank
- **Version**: 1.0.0
- **Magento Version**: 2.4.x
- **PHP Version**: 8.1, 8.2, 8.3

## Features

- Modern CSS architecture with CSS custom properties (CSS variables)
- No LESS compilation required for custom styles
- Mobile-first responsive design
- Green/natural color scheme with professional aesthetics
- Optimized performance and accessibility
- Clean, semantic HTML5 markup
- Flexible grid system
- Component-based architecture

## Installation

### 1. Copy Theme to Magento

Copy the `forhomeandmore_theme` directory to your Magento installation:

```bash
cp -r forhomeandmore_theme /path/to/magento/app/design/frontend/ForHomeAndMore/default
```

### 2. Clear Cache and Deploy

```bash
cd /path/to/magento

# Clear all caches
php bin/magento cache:clean
php bin/magento cache:flush

# Deploy static content
php bin/magento setup:static-content:deploy -f

# Reindex if needed
php bin/magento indexer:reindex
```

### 3. Activate Theme

1. Log in to Magento Admin Panel
2. Navigate to **Content > Design > Configuration**
3. Find your store view and click **Edit**
4. Under **Applied Theme**, select **ForHomeAndMore/default**
5. Click **Save Configuration**
6. Clear cache again

```bash
php bin/magento cache:flush
```

## Theme Architecture

### Directory Structure

```
forhomeandmore_theme/
├── composer.json              # Composer package definition
├── registration.php           # Theme registration
├── theme.xml                  # Theme metadata
├── etc/
│   └── view.xml              # Responsive breakpoints & image config
├── web/
│   ├── css/
│   │   ├── styles/
│   │   │   ├── variables.css # CSS custom properties (design tokens)
│   │   │   └── theme.css     # Main component styles
│   │   └── source/
│   │       ├── _extend.less  # LESS integration
│   │       └── _module.less  # Component LESS styles
│   ├── js/
│   │   └── theme.js          # Theme JavaScript
│   └── images/               # Theme images
├── Magento_Theme/
│   ├── layout/
│   │   └── default.xml       # Custom header layout
│   └── templates/
│       └── html/             # Header templates
├── Magento_Catalog/
│   ├── layout/               # Catalog layouts
│   └── templates/            # Product templates
└── media/
    └── preview.png           # Theme preview image
```

### CSS System

The theme uses a **hybrid approach**: modern CSS variables combined with LESS for Magento integration.

#### CSS Variables (Design Tokens)

All design tokens are defined in `web/css/styles/variables.css`:

- **Colors**: Primary green (#2c5f2d), secondary, neutrals, semantic colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (xs to 7xl)
- **Layout**: Container widths, grid gaps, breakpoints
- **Effects**: Shadows, transitions, border radius

#### Main Styles

Component styles are in `web/css/styles/theme.css`:

- Base styles (typography, links)
- Components (buttons, forms, cards, messages)
- Layout (header, navigation, grid, footer)
- Utility classes

#### LESS Integration

- `web/css/source/_extend.less` - Imports CSS files and provides LESS compatibility
- `web/css/source/_module.less` - Complex components requiring LESS preprocessing

### Responsive Breakpoints

Defined in `etc/view.xml`:

- **Mobile Small**: <640px
- **Mobile**: 640-767px
- **Tablet**: 768-1024px
- **Desktop**: 1024px+

### Color Palette

#### Primary Colors
- Primary: `#2c5f2d` (Forest Green)
- Primary Dark: `#1e4620`
- Primary Light: `#3d7a3e`

#### Secondary Colors
- Secondary: `#97c3a2` (Sage Green)
- Secondary Dark: `#7ba885`
- Secondary Light: `#b8d4be`

#### Semantic Colors
- Success: `#22c55e`
- Error: `#ef4444`
- Warning: `#f59e0b`
- Info: `#3b82f6`

## Customization

### Changing Colors

Edit `web/css/styles/variables.css` and modify the color variables:

```css
:root {
    --color-primary: #2c5f2d;
    --color-primary-dark: #1e4620;
    /* ... */
}
```

After changes, redeploy:

```bash
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
```

### Adding Custom Styles

Add custom styles to `web/css/styles/theme.css` or create new CSS files and import them in `web/css/source/_extend.less`.

### Modifying Layout

Override layout XML files in the appropriate module directories:

- Header: `Magento_Theme/layout/default.xml`
- Category: `Magento_Catalog/layout/catalog_category_view.xml`
- Product: `Magento_Catalog/layout/catalog_product_view.xml`

### Custom Templates

Override templates by creating files in the appropriate module directories:

```
Magento_[Module]/templates/[template_path].phtml
```

## Development Workflow

### Making Changes

1. Edit CSS/LESS files
2. Clear static content and cache:
   ```bash
   rm -rf pub/static/frontend/* var/view_preprocessed/*
   php bin/magento setup:static-content:deploy -f
   php bin/magento cache:flush
   ```

### Developer Mode

For faster development, enable developer mode:

```bash
php bin/magento deploy:mode:set developer
```

In developer mode, static files are generated on-demand (no need to redeploy after every change).

### Browser DevTools

CSS variables can be inspected and modified live in browser DevTools under the `:root` element.

## Performance

### Optimization Tips

1. **Enable Production Mode**:
   ```bash
   php bin/magento deploy:mode:set production
   ```

2. **Enable CSS/JS Merging**:
   - Admin > Stores > Configuration > Advanced > Developer
   - Enable CSS/JS merging and minification

3. **Enable Full Page Cache**:
   - Admin > Stores > Configuration > Advanced > System > Full Page Cache

4. **Use CDN for Static Content**:
   Configure CDN URL in Admin panel

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## Accessibility

The theme follows WCAG 2.1 Level AA guidelines:

- Semantic HTML5 markup
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus indicators on interactive elements

## License

Copyright (c) 2026 ForHomeAndMore. All rights reserved.

## Support

For theme support and customization requests, please contact the development team.

## Changelog

### Version 1.0.0 (2026-01-23)
- Initial release
- Modern CSS architecture with CSS custom properties
- Mobile-first responsive design
- Green/natural color scheme
- Custom header layout
- Product grid styling
- Full Magento/blank compatibility
