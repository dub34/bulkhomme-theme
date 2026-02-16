# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **BULK HOMME Magento 2 Theme** (FHM/default) - a minimalist premium theme using pure CSS instead of LESS preprocessing.

- **Theme Path**: `app/design/frontend/FHM/default`
- **Parent Theme**: Magento/blank
- **Magento Version**: 2.4.x
- **PHP Version**: 8.1, 8.2, 8.3
- **CSS Approach**: Modern CSS variables (no LESS compilation required)

## Development Commands

```bash
# Clear static content and redeploy (required after CSS changes)
rm -rf pub/static/frontend/* var/view_preprocessed/*
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush

# Full cache clear (for troubleshooting)
rm -rf var/cache/* var/page_cache/* var/view_preprocessed/* pub/static/* generated/*
php bin/magento setup:static-content:deploy -f
```

## Theme Architecture

### Directory Structure

```
fhm_theme/
├── composer.json              # Package: fhm/theme-default
├── registration.php           # Registers frontend/FHM/default
├── theme.xml                  # Theme declaration, parent: Magento/blank
├── etc/view.xml               # Responsive breakpoints config
├── web/css/
│   ├── styles/
│   │   ├── variables.css      # CSS custom properties (design tokens)
│   │   └── theme.css          # Main component styles
│   └── source/
│       ├── _extend.less       # LESS imports for Magento integration
│       └── _module.less       # Header component LESS styles
├── Magento_Theme/
│   ├── layout/default.xml     # Layout overrides (custom header structure)
│   └── templates/html/
│       └── fhm-header.phtml   # Custom header template
└── Magento_Wishlist/
    └── templates/link.phtml   # Wishlist icon template
```

### CSS System

The theme uses a **hybrid approach**: modern CSS variables for customization with LESS for Magento integration.

**variables.css** - Design tokens:
- Colors: Primary (black), greyscale (10 shades), semantic (error/success/warning/info)
- Typography: Desktop/mobile font sizes, weights, line heights
- Spacing: Scale from xs (2px) to 7xl (128px)
- Breakpoints: mobile-small (<640px), mobile (640-767px), tablet (768-1024px), desktop (1024px+)

**theme.css** - Component styles:
- Base styles (body, typography)
- Components (buttons, forms, cards)
- Layout (header, footer, grid)
- Utility classes

### Responsive Breakpoints (from etc/view.xml)

- Desktop: 1024px+
- Tablet: 768-1024px
- Mobile: 640-767px
- Mobile-small: <640px

### Layout System

The theme overrides `default.xml` to create a custom header structure:
- Removes default header blocks
- Creates custom header wrapper with logo, search, wishlist, account, minicart
- Uses `fhm-header.phtml` for the custom header template

## Design Philosophy

- **Black & White**: Minimalist monochrome palette
- **Sharp Corners**: `border-radius: 0` throughout
- **Generous Spacing**: Breathing room in layouts
- **Bold Typography**: Clear visual hierarchy
- **Mobile-first**: Responsive design starting from smallest screens

## Customization Entry Points

1. **Colors/Typography/Spacing**: Modify CSS variables in `variables.css`
2. **Component Styles**: Edit `theme.css`
3. **Layout Structure**: Override XML files in `Magento_Theme/layout/`
4. **Templates**: Override PHTML files in `Magento_[Module]/templates/`

## Important Notes

- After any CSS changes, you must redeploy static content
- The theme inherits from Magento/blank, not Luma
- CSS variables can be inspected/modified live in browser DevTools
- No npm/webpack build step required - pure CSS approach