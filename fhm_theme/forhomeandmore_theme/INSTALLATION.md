# ForHomeAndMore Theme - Installation Guide

## Prerequisites

Before installing the theme, ensure you have:

- Magento 2.4.x installed and running
- PHP 8.1, 8.2, or 8.3
- Composer installed
- SSH/terminal access to your server
- Admin access to Magento backend

## Installation Methods

### Method 1: Manual Installation (Recommended)

#### Step 1: Copy Theme Files

Copy the theme directory to your Magento installation:

```bash
# Navigate to your Magento root directory
cd /path/to/magento

# Copy theme to the correct location
cp -r /path/to/forhomeandmore_theme app/design/frontend/ForHomeAndMore/default

# Set proper permissions
chmod -R 755 app/design/frontend/ForHomeAndMore/default
```

#### Step 2: Clear Cache

```bash
# Clear all caches
php bin/magento cache:clean
php bin/magento cache:flush
```

#### Step 3: Deploy Static Content

```bash
# Deploy static content (use -f flag to force deployment)
php bin/magento setup:static-content:deploy -f

# For specific languages/locales, add them:
php bin/magento setup:static-content:deploy -f en_US
```

#### Step 4: Compile (Production Mode Only)

If you're in production mode:

```bash
php bin/magento setup:di:compile
```

#### Step 5: Activate Theme

1. Log in to **Magento Admin Panel**
2. Navigate to **Content > Design > Configuration**
3. Find your store view and click **Edit**
4. Under **Applied Theme**, select **ForHomeAndMore/default** from dropdown
5. Click **Save Configuration**

#### Step 6: Final Cache Clear

```bash
php bin/magento cache:flush
```

#### Step 7: Verify Installation

1. Visit your storefront
2. The new theme should be active
3. Check browser console for any errors
4. Test responsive breakpoints

---

### Method 2: Composer Installation (Alternative)

If your theme is in a Git repository or Composer package:

#### Step 1: Add Repository to composer.json

```bash
cd /path/to/magento

# Edit composer.json and add repository
composer config repositories.forhomeandmore-theme vcs https://github.com/yourusername/forhomeandmore-theme
```

#### Step 2: Require Theme Package

```bash
composer require forhomeandmore/theme-default:^1.0
```

#### Step 3: Enable and Deploy

```bash
php bin/magento module:enable --all
php bin/magento setup:upgrade
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
```

---

## Post-Installation Configuration

### 1. Configure Store Information

**Admin Panel > Stores > Configuration > General > General**

- Store Name
- Store Contact Information
- Store Hours

### 2. Upload Logo

**Admin Panel > Content > Design > Configuration**

- Click **Edit** for your store view
- Under **Header** section:
  - Upload logo image
  - Set logo width/height
  - Set logo alt text

### 3. Configure Colors (Optional)

Edit CSS variables in:
```
app/design/frontend/ForHomeAndMore/default/web/css/styles/variables.css
```

Change primary colors:
```css
:root {
    --color-primary: #2c5f2d;      /* Your brand color */
    --color-primary-dark: #1e4620; /* Darker shade */
    --color-primary-light: #3d7a3e;/* Lighter shade */
}
```

After editing, redeploy:
```bash
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
```

---

## Troubleshooting

### Theme Not Appearing in Admin

**Solution:**
```bash
# Clear var directories
rm -rf var/cache/* var/page_cache/* var/view_preprocessed/*

# Redeploy
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
```

### CSS/Styles Not Loading

**Solution:**
```bash
# Clear static content and redeploy
rm -rf pub/static/frontend/* var/view_preprocessed/*
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
```

### Permission Errors

**Solution:**
```bash
# Set proper ownership (replace www-data with your web server user)
chown -R www-data:www-data app/design/frontend/ForHomeAndMore

# Set proper permissions
find app/design/frontend/ForHomeAndMore -type d -exec chmod 755 {} \;
find app/design/frontend/ForHomeAndMore -type f -exec chmod 644 {} \;
```

### Layout/Template Not Working

**Solution:**
```bash
# Clear generated files
rm -rf generated/code/* generated/metadata/*

# In production mode, recompile
php bin/magento setup:di:compile

# Redeploy and clear cache
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
```

### JavaScript Not Loading

**Solution:**
```bash
# Clear RequireJS cache
rm -rf pub/static/_requirejs/*

# Redeploy
php bin/magento setup:static-content:deploy -f
php bin/magento cache:flush
```

---

## Development Mode Setup

For faster development (no need to redeploy after every change):

```bash
# Enable developer mode
php bin/magento deploy:mode:set developer

# Disable cache (optional)
php bin/magento cache:disable layout block_html full_page
```

**Note:** Never use developer mode in production!

---

## Production Deployment Checklist

Before deploying to production:

1. **Test thoroughly in staging environment**
2. **Backup your database and files**
3. **Enable maintenance mode:**
   ```bash
   php bin/magento maintenance:enable
   ```

4. **Deploy theme:**
   ```bash
   php bin/magento setup:upgrade
   php bin/magento setup:di:compile
   php bin/magento setup:static-content:deploy -f
   php bin/magento cache:flush
   ```

5. **Enable production mode:**
   ```bash
   php bin/magento deploy:mode:set production
   ```

6. **Disable maintenance mode:**
   ```bash
   php bin/magento maintenance:disable
   ```

7. **Test all functionality:**
   - Homepage
   - Category pages
   - Product pages
   - Cart/Checkout
   - Customer account
   - Search
   - Mobile responsiveness

---

## Uninstallation

To remove the theme:

1. **Switch to another theme in Admin Panel**
2. **Clear cache:**
   ```bash
   php bin/magento cache:flush
   ```

3. **Remove theme files:**
   ```bash
   rm -rf app/design/frontend/ForHomeAndMore/default
   ```

4. **Clear static content:**
   ```bash
   rm -rf pub/static/frontend/ForHomeAndMore
   php bin/magento setup:static-content:deploy -f
   php bin/magento cache:flush
   ```

---

## Support & Resources

### Magento Documentation
- [Magento DevDocs](https://devdocs.magento.com/)
- [Frontend Developer Guide](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/bk-frontend-dev-guide.html)

### Theme Documentation
- [README.md](./README.md) - Theme overview and features
- [CSS Variables Reference](./web/css/styles/variables.css) - All design tokens

### Getting Help

If you encounter issues:
1. Check the Troubleshooting section above
2. Review Magento system logs: `var/log/system.log` and `var/log/exception.log`
3. Check browser console for JavaScript errors
4. Enable Magento developer mode for detailed error messages

---

## Version History

### 1.0.0 (2026-01-23)
- Initial release
- Modern CSS architecture
- Mobile-first responsive design
- Green/natural color scheme
- Full Magento 2.4.x compatibility
