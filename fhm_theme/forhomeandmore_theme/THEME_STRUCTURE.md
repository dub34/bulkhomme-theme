# ForHomeAndMore Theme - Complete File Structure

## Overview

This document provides a complete reference of the theme structure with descriptions of each file and directory.

## Root Files

```
forhomeandmore_theme/
├── composer.json              # Composer package definition
├── registration.php           # Registers theme with Magento
├── theme.xml                  # Theme metadata and parent declaration
├── requirejs-config.js        # RequireJS module configuration
├── .gitignore                 # Git ignore patterns
├── README.md                  # Theme documentation
├── INSTALLATION.md            # Installation guide
└── THEME_STRUCTURE.md         # This file
```

### File Descriptions

#### composer.json
Defines the theme as a Composer package with:
- Package name: `forhomeandmore/theme-default`
- Type: `magento2-theme`
- Dependencies: Magento Framework
- Autoload configuration

#### registration.php
Registers the theme with Magento's component registry:
- Component type: Theme
- Theme code: `frontend/ForHomeAndMore/default`
- Directory path: `__DIR__`

#### theme.xml
Theme configuration:
- Title: "ForHomeAndMore Default Theme"
- Parent: `Magento/blank`
- Preview image path

#### requirejs-config.js
JavaScript module configuration:
- Maps theme JS to RequireJS
- Auto-loads theme.js on all pages

---

## Configuration Directory

```
etc/
└── view.xml                   # View configuration (breakpoints, images)
```

### view.xml
Configures:
- **Responsive breakpoints**: mobile-small (<640px), mobile (640-767px), tablet (768-1024px), desktop (1024px+)
- **Product image sizes**: Category grid, product page, thumbnails, cart
- **Theme variables**: Image settings, breakpoint values

---

## Web Assets

```
web/
├── css/
│   ├── styles/
│   │   ├── variables.css      # CSS custom properties (design tokens)
│   │   └── theme.css          # Main component styles
│   └── source/
│       ├── _extend.less       # LESS integration layer
│       └── _module.less       # Component LESS styles
├── images/                    # Theme images directory
└── js/
    └── theme.js               # Main theme JavaScript
```

### CSS Files

#### web/css/styles/variables.css
**CSS Custom Properties (Design Tokens)**

Defines all reusable design values:

1. **Color System**
   - Primary colors: Green palette (#2c5f2d family)
   - Secondary colors: Sage green (#97c3a2 family)
   - Neutral colors: Grayscale (grey-50 to grey-900)
   - Semantic colors: Success, error, warning, info
   - Background colors: Primary, secondary, tertiary
   - Text colors: Primary, secondary, tertiary, inverse
   - Border colors: Primary, secondary, dark

2. **Typography**
   - Font families: Base, heading, monospace
   - Font sizes: xs (12px) to 6xl (60px) for desktop
   - Font sizes mobile: xs (12px) to 5xl (36px) for mobile
   - Font weights: Light (300) to extrabold (800)
   - Line heights: Tight (1.25) to loose (2)
   - Letter spacing: Tight to widest

3. **Spacing System**
   - Scale: xs (2px) to 7xl (128px)
   - Consistent spacing tokens

4. **Layout & Grid**
   - Container widths: sm (640px) to 2xl (1536px)
   - Container padding: Responsive
   - Grid gaps: sm to xl

5. **Borders & Radius**
   - Border widths: thin, base, thick
   - Border radius: none to full (9999px)

6. **Shadows**
   - Six shadow levels: sm to 2xl

7. **Transitions**
   - Durations: fast (150ms) to slower (500ms)
   - Timing functions: ease, ease-in, ease-out

8. **Z-Index**
   - Layering system: dropdown (1000) to tooltip (1070)

#### web/css/styles/theme.css
**Main Component Styles**

Organized sections:
1. **Base Styles**: HTML, body, box-sizing
2. **Typography**: Headings, paragraphs, links
3. **Buttons**: Primary, secondary, disabled states
4. **Forms**: Input fields, textareas, selects, validation
5. **Header**: Page header, logo, search, actions
6. **Navigation**: Main nav, mobile menu, submenus
7. **Main Content**: Page wrapper, titles
8. **Product Grid**: Grid layout, product cards, hover effects
9. **Footer**: Footer sections, links, copyright
10. **Utility Classes**: Display, text alignment, spacing, containers, cards, messages

#### web/css/source/_extend.less
**LESS Integration Layer**

- Imports CSS files into LESS compilation
- Provides LESS variables for backward compatibility
- Defines reusable mixins:
  - `.lib-button()`, `.lib-button-primary()`, `.lib-button-secondary()`
  - `.lib-form-element()`
  - `.flex-center()`, `.transition-base()`, `.text-truncate()`, `.clearfix()`

#### web/css/source/_module.less
**Component LESS Styles**

Complex components requiring LESS preprocessing:
- Header components (search, actions, counters)
- Navigation (dropdowns, mobile menu)
- Product listing (actions, labels)
- Mini cart (dropdown, counter)
- Breadcrumbs
- Pagination
- Messages
- Modal/Popup styles

### JavaScript

#### web/js/theme.js
**Main Theme JavaScript**

RequireJS module with functionality:
1. **Mobile Menu**: Toggle navigation on mobile devices
2. **Header Scroll**: Show/hide header on scroll, add scrolled class
3. **Product Grid**: Hover effects, quick view setup

---

## Layout XML Files

```
Magento_Theme/
└── layout/
    └── default.xml            # Custom header structure

Magento_Catalog/
└── layout/
    ├── catalog_category_view.xml  # Category page layout
    └── catalog_product_view.xml   # Product page layout
```

### Magento_Theme/layout/default.xml
Customizes global layout:
- Removes default header blocks (logo, minicart, search)
- Creates custom header container with custom template
- Adds logo, search, wishlist, customer account, minicart to header
- Includes custom CSS files

### Magento_Catalog Layouts
- **catalog_category_view.xml**: Category page customizations
- **catalog_product_view.xml**: Product page customizations

---

## Template Files

```
Magento_Theme/
└── templates/
    └── html/
        ├── forhomeandmore-header.phtml  # Main header wrapper
        ├── custom-css.phtml             # CSS file includes
        └── header/
            └── logo.phtml               # Logo template

Magento_Catalog/
└── templates/
    ├── category/
    │   └── description.phtml        # Category description
    └── product/
        └── list.phtml               # Product grid/list

Magento_Wishlist/
└── templates/
    └── link.phtml                   # Wishlist icon link

Magento_Customer/
└── templates/
    └── account/
        └── link/
            └── authorization.phtml  # Account/login link
```

### Template Descriptions

#### Magento_Theme/templates/html/forhomeandmore-header.phtml
Main header wrapper that outputs the custom header structure with all child blocks.

#### Magento_Theme/templates/html/custom-css.phtml
Includes CSS variable and theme CSS files using `getViewFileUrl()`.

#### Magento_Theme/templates/html/header/logo.phtml
Renders store logo with link to homepage, proper alt text, and dimensions.

#### Magento_Catalog/templates/category/description.phtml
Displays category description if available.

#### Magento_Catalog/templates/product/list.phtml
Complete product grid template with:
- Product images with hover effects
- Product names and links
- Pricing display
- Add to cart buttons
- Wishlist integration
- Sale/new labels
- Empty state message
- Pagination

#### Magento_Wishlist/templates/link.phtml
Wishlist link with:
- Heart icon (SVG)
- Counter badge for items
- Proper permissions check

#### Magento_Customer/templates/account/link/authorization.phtml
Customer account link with:
- User icon (SVG)
- Shows "Sign In" for guests
- Shows customer name for logged-in users
- Links to account or login page

---

## Media Directory

```
media/
└── preview-placeholder.txt    # Instructions for theme preview image
```

Place `preview.png` (800x800px recommended) in this directory for theme preview in Admin Panel.

---

## Module Overrides

The theme customizes these Magento modules:

### Magento_Theme
- **Purpose**: Global layout and header customization
- **Files**: 1 layout, 3 templates
- **Customizations**: Custom header structure, logo display

### Magento_Catalog
- **Purpose**: Product and category display
- **Files**: 2 layouts, 2 templates
- **Customizations**: Product grid styling, category descriptions

### Magento_Wishlist
- **Purpose**: Wishlist functionality
- **Files**: 1 template
- **Customizations**: Icon-based wishlist link with counter

### Magento_Customer
- **Purpose**: Customer account integration
- **Files**: 1 template
- **Customizations**: Icon-based account/login link

---

## Key Features

### 1. Modern CSS Architecture
- CSS custom properties for all design tokens
- No LESS compilation required for main styles
- Easy customization through variables
- Responsive design built-in

### 2. Mobile-First Approach
- Responsive breakpoints defined in view.xml
- Mobile-optimized typography
- Touch-friendly interface elements
- Responsive grid system

### 3. Component-Based Design
- Reusable UI components
- Consistent design patterns
- Modular CSS architecture
- BEM-like naming conventions

### 4. Performance Optimized
- Minimal CSS/JS footprint
- Efficient selector usage
- Optimized image sizes
- Fast rendering

### 5. Accessibility Focused
- Semantic HTML5 markup
- ARIA labels where needed
- Keyboard navigation support
- Proper color contrast
- Focus indicators

---

## Customization Points

### Quick Customizations

1. **Colors**: Edit `web/css/styles/variables.css` (lines 15-70)
2. **Typography**: Edit `web/css/styles/variables.css` (lines 75-140)
3. **Spacing**: Edit `web/css/styles/variables.css` (lines 145-160)
4. **Layout**: Edit `Magento_Theme/layout/default.xml`
5. **Header**: Edit `Magento_Theme/templates/html/forhomeandmore-header.phtml`

### Advanced Customizations

1. **New Components**: Add to `web/css/styles/theme.css`
2. **LESS Styles**: Add to `web/css/source/_module.less`
3. **JavaScript**: Extend `web/js/theme.js` with RequireJS
4. **Layout Changes**: Override layout XML files
5. **Template Changes**: Override PHTML templates

---

## File Count Summary

- **Total Directories**: 19
- **Total Files**: 22
- **PHP Templates**: 7
- **XML Layouts**: 3
- **CSS Files**: 2
- **LESS Files**: 2
- **JavaScript Files**: 2
- **Configuration Files**: 4
- **Documentation Files**: 4

---

## Dependencies

### Parent Theme
- **Magento/blank**: Base theme providing core functionality

### Magento Modules
- Magento_Framework
- Magento_Theme
- Magento_Catalog
- Magento_Wishlist
- Magento_Customer
- Magento_Checkout
- Magento_Search

### JavaScript Libraries
- jQuery (via Magento)
- RequireJS (via Magento)
- KnockoutJS (via Magento)

---

## Browser Compatibility

Tested and compatible with:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 12+
- Chrome Mobile Android 8+

---

## Next Steps

1. **Installation**: Follow [INSTALLATION.md](./INSTALLATION.md)
2. **Customization**: Review [README.md](./README.md)
3. **Development**: Use developer mode for faster iteration
4. **Testing**: Test all responsive breakpoints
5. **Deployment**: Follow production deployment checklist

---

For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md).

For theme features and customization guide, see [README.md](./README.md).
