# ForHomeAndMore - CMS Content Blocks

This folder contains HTML templates for CMS content blocks that can be inserted into Magento's content editor (Admin > Content > Blocks or Pages).

## Block List

| File | Block Identifier | Description |
|------|-----------------|-------------|
| `homepage-hero-slider.html` | `fhm-homepage-hero-slider` | Category banners horizontal slider |
| `homepage-products-section.html` | `fhm-homepage-products` | "Fresh finds" product grid section |
| `homepage-outdoor-banner.html` | `fhm-outdoor-banner` | Full-width outdoor living banner |
| `homepage-cookware-promo.html` | `fhm-cookware-promo` | Split banner (image + colored panel) |
| `homepage-brands-section.html` | `fhm-brands-section` | "Discover the brands" section |
| `homepage-about-section.html` | `fhm-about-section` | About section with statistics |
| `homepage-trending-articles.html` | `fhm-trending-articles` | Blog articles grid |
| `homepage-newsletter.html` | `fhm-newsletter` | Newsletter subscription form |
| `homepage-reviews.html` | `fhm-reviews` | Customer reviews grid |
| `homepage-instagram.html` | `fhm-instagram-feed` | Instagram feed section |
| `homepage-company-about.html` | `fhm-company-about` | "This is ForHomeAndMore" 3-column section |

## How to Use

### Method 1: Create CMS Blocks

1. Go to **Admin > Content > Blocks > Add New Block**
2. Set the **Block Title** (e.g., "Homepage Hero Slider")
3. Set the **Identifier** (e.g., `fhm-homepage-hero-slider`)
4. Copy the HTML content from the corresponding file
5. Paste into the **Content** field (use "Show/Hide Editor" to access raw HTML)
6. Save the block

### Method 2: Insert into CMS Page

1. Go to **Admin > Content > Pages > Home Page**
2. Edit the content
3. Use the **Insert Widget** button or add directly:

```html
{{block class="Magento\Cms\Block\Block" block_id="fhm-homepage-hero-slider"}}
```

### Method 3: Insert via Layout XML

Add to your layout file (e.g., `cms_index_index.xml`):

```xml
<referenceContainer name="content">
    <block class="Magento\Cms\Block\Block" name="homepage.hero.slider">
        <arguments>
            <argument name="block_id" xsi:type="string">fhm-homepage-hero-slider</argument>
        </arguments>
    </block>
</referenceContainer>
```

## Homepage Order

For the full homepage based on Figma design, use blocks in this order:

1. `fhm-homepage-hero-slider` - Hero category slider
2. `fhm-homepage-products` - Fresh finds products (replace with widget for dynamic products)
3. `fhm-outdoor-banner` - Outdoor living banner
4. `fhm-cookware-promo` - Cookware set promotion
5. `fhm-brands-section` - Discover the brands
6. `fhm-about-section` - About with statistics
7. `fhm-trending-articles` - Blog articles
8. `fhm-newsletter` - Newsletter subscription
9. `fhm-reviews` - Customer reviews
10. `fhm-instagram-feed` - Instagram feed
11. `fhm-company-about` - Company about section

## Media Files Required

Upload the following images to **Content > Media Gallery > wysiwyg/**:

### Banners (`wysiwyg/banners/`)
- `category-kitchen.jpg`
- `category-dinnerware.jpg`
- `category-glassware.jpg`
- `category-decor.jpg`
- `category-furniture.jpg`
- `outdoor-living.jpg`
- `cookware-set.jpg`

### Brands (`wysiwyg/brands/`)
- `iittala.png`
- `arabia.png`
- `artek.png`
- `marimekko.png`
- `hay.png`
- `muuto.png`
- `ferm-living.png`
- `alessi.png`
- `gubi.png`

### About (`wysiwyg/about/`)
- `logo-graphic.svg`
- `about-image.jpg`

### Articles (`wysiwyg/articles/`)
- `article-summer-home.jpg`
- `article-studio-aalto.jpg`
- `article-moomin.jpg`
- `article-family-villa.jpg`

### Newsletter (`wysiwyg/newsletter/`)
- `ampersand-logo.png`
- `more-text.png`

### Instagram (`wysiwyg/instagram/`)
- `ig-1.jpg` through `ig-6.jpg`

### Products (`wysiwyg/products/`)
- `product-1.jpg` through `product-4.jpg`

## Dynamic Products Widget

For the products section, replace the static HTML with a Magento widget:

```html
{{widget type="Magento\CatalogWidget\Block\Product\ProductsList"
  title="Fresh finds for the summer and beyond"
  products_count="4"
  template="Magento_CatalogWidget::product/widget/content/grid.phtml"
  conditions_encoded="^[`1`:^[`type`:`Magento||CatalogWidget||Model||Rule||Condition||Combine`,`aggregator`:`all`,`value`:`1`,`new_child`:``^]^]"}}
```

## Responsive Design

All blocks are built with responsive design:
- Desktop: Full layout as designed
- Tablet (768-1024px): 2-column grids
- Mobile (<768px): Single column, stacked layout

The CSS classes used match the theme's `theme.css` file.
