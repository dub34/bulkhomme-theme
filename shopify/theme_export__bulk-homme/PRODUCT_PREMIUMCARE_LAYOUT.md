# Product Page - PremiumCare Layout

Custom three-column product page layout inspired by PremiumCare design.

## Overview

This layout creates a unique product page with:
- **Left Column**: Vertical breadcrumbs, product title, description, promo banner, variant selector, price, buy buttons (quantity + add to cart + accelerated checkout)
- **Center Column**: Large product image gallery with slideshow navigation
- **Right Column**: Back to category link, product attributes, wishlist/compare buttons, brand link

## Files Created

### 1. Section
- `sections/product-information-premiumcare.liquid` - Main section file with three-column layout

### 2. Styles
- `assets/product-premiumcare.css` - Complete CSS for the layout

### 3. JavaScript
- `assets/product-premiumcare.js` - Interactive functionality:
  - Image slideshow/gallery
  - Wishlist & compare buttons

**Note**: Quantity selector and add-to-cart are now handled by Shopify's `buy-buttons` block system.

### 4. Snippets
- `snippets/icon-heart.liquid` - Wishlist icon
- `snippets/icon-compare.liquid` - Compare icon

### 5. Template
- `templates/product.premiumcare.json` - Product template using the new section

## Installation

### Step 1: Upload Files to Shopify

Upload all files to your Shopify theme via the Online Store editor or using Shopify CLI.

```bash
# If using Shopify CLI
shopify theme push
```

### Step 2: Add CSS to Theme

Add the CSS file to your theme's `<head>` section. Edit `layout/theme.liquid` and add:

```liquid
{{ 'product-premiumcare.css' | asset_url | stylesheet_tag }}
```

Or add it to `snippets/stylesheets.liquid` if your theme uses that pattern:

```liquid
{{ 'product-premiumcare.css' | asset_url | stylesheet_tag }}
```

### Step 3: Add JavaScript to Theme

Add the JavaScript file before the closing `</body>` tag in `layout/theme.liquid`:

```liquid
<script src="{{ 'product-premiumcare.js' | asset_url }}" defer></script>
```

Or add it to `snippets/scripts.liquid`:

```liquid
<script src="{{ 'product-premiumcare.js' | asset_url }}" defer></script>
```

## Usage

### Option 1: Apply to Specific Products

1. Go to **Online Store > Themes > Customize**
2. Navigate to a product page
3. Click on the template selector (top left)
4. Select **"product.premiumcare"** template
5. Save

### Option 2: Set as Default Product Template

To use this layout for all products:

1. Go to your theme editor
2. Navigate to **Products > Default product**
3. Replace the main section with "Product Info PremiumCare" section
4. Configure the settings
5. Save

## Configuration

### Section Settings

**Color Scheme**: Choose the color scheme for the section

**Breadcrumbs**:
- Show breadcrumbs (checkbox)
- Show vendor in breadcrumbs (checkbox)

**Promo Banner**:
- Show promotional banner (checkbox)
- Promo label (text, e.g., "Week Offer")
- Promo text (textarea for the promotional message)

**Product Gallery**:
- Maximum images (range: 3-20)

**Right Column**:
- Show back to category link (checkbox)
- Back link text (default: "Back to category")
- Show product attributes (checkbox)
- Show wishlist & compare buttons (checkbox)
- Show vendor/brand link (checkbox)
- Vendor link text (default: "All products")

### Product Attributes

Add custom attributes using **Product Metafields**:

1. Go to **Settings > Custom data > Products**
2. Add metafield definitions:
   - `custom.purpose` (single line text)
   - `custom.application_time` (single line text)
   - `custom.classification` (single line text)
   - `custom.skin_type` (single line text)
   - `custom.country` (single line text)

3. Edit individual products to add attribute values

**OR** use the default values defined in the section blocks.

### Blocks

**Buy Buttons Block** (automatically included):
- Quantity selector with +/- buttons
- Add to Cart button
- Accelerated Checkout (Apple Pay, Google Pay, etc.)
- Settings:
  - Show pickup availability
  - Enable gift card recipient form
  - Stack buttons vertically

**Product Attribute Blocks**:
- **Label**: Display name (e.g., "Purpose")
- **Metafield namespace**: Usually "custom"
- **Metafield key**: The metafield key (e.g., "purpose")
- **Default value**: Fallback text if metafield is empty

## Customization

### Colors

The layout uses CSS variables from the Shopify theme:
- `--color-foreground` - Text color
- `--color-background` - Background color
- `--color-border` - Border color

Modify these in your theme's color scheme settings.

### Typography

The layout inherits fonts from:
- `--font-heading--family` - For headings
- `--font-body--family` - For body text

### Spacing

Modify spacing in `product-premiumcare.css`:
- Gap between columns: `.prod-container-top { gap: 60px; }`
- Element spacing: Various `margin` and `padding` values

### Responsive Behavior

- **Desktop (1024px+)**: Three-column layout
- **Tablet (640-1024px)**: Single column (gallery → info → attributes)
- **Mobile (<640px)**: Optimized single column with adjusted font sizes

## Features

### Image Gallery
- Automatic slideshow with prev/next buttons
- Dot navigation
- Keyboard support (arrow keys)
- Touch/swipe support on mobile
- Lazy loading for performance

### Quantity Selector
- +/- buttons
- Min/max validation
- Keyboard input filtering
- Respects Shopify quantity rules

### Variant Selection
- Automatic price updates
- Stock status handling
- Add to cart AJAX integration

### Wishlist & Compare
- Custom events fired: `wishlist:add`, `compare:add`
- Easy integration with apps
- Visual feedback on click

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported (uses custom elements and modern JavaScript)

## Troubleshooting

**Issue**: Styles not loading
- **Solution**: Check that CSS file is included in theme.liquid

**Issue**: JavaScript not working
- **Solution**: Ensure JS file is loaded and check browser console for errors

**Issue**: Images not displaying
- **Solution**: Verify product has images uploaded

**Issue**: Attributes not showing
- **Solution**: Check metafield configuration or use default values in blocks

## Support

For customization or issues, refer to:
- Shopify Liquid documentation
- Theme development docs
- Custom metafields guide

---

**Created for**: Shopify themes
**Compatible with**: Shopify 2.0+ themes using sections everywhere