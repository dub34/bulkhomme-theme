import * as fs from 'node:fs';
import * as path from 'node:path';

// Parse command line arguments (works with both Node.js and Deno)
function parseArgs() {
    // Deno uses Deno.args, Node uses process.argv.slice(2)
    const args = typeof Deno !== 'undefined' ? Deno.args : process.argv.slice(2);
    let sourceDir = './scrape_home';
    let outputCsv = './magento_import.csv';
    let outputImages = './magento_import_images';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--source' || args[i] === '-s') {
            sourceDir = args[++i];
        } else if (args[i] === '--output' || args[i] === '-o') {
            outputCsv = args[++i];
        } else if (args[i] === '--images' || args[i] === '-i') {
            outputImages = args[++i];
        } else if (args[i] === '--help' || args[i] === '-h') {
            console.log('Usage: node generate_import_csv.js [options]');
            console.log('');
            console.log('Options:');
            console.log('  -s, --source <dir>   Source directory with product folders (default: ./scrape_home)');
            console.log('  -o, --output <file>  Output CSV file path (default: ./magento_import.csv)');
            console.log('  -i, --images <dir>   Output images directory (default: ./magento_import_images)');
            console.log('  -h, --help           Show this help message');
            console.log('');
            console.log('Example:');
            console.log('  deno run --allow-read --allow-write generate_import_csv.js --source ./products');
            console.log('  node generate_import_csv.js --source ./products --output ./import.csv');
            typeof Deno !== 'undefined' ? Deno.exit(0) : process.exit(0);
        } else if (!args[i].startsWith('-')) {
            // Positional argument - treat as source directory
            sourceDir = args[i];
        }
    }

    return { sourceDir, outputCsv, outputImages };
}

// Configuration from arguments
const config = parseArgs();
const scrapeHomeDir = config.sourceDir;
const outputCsvFile = config.outputCsv;
const outputImagesDir = config.outputImages;

// CSV headers based on Magento 2 catalog_product import
const csvHeaders = [
    'sku',
    'store_view_code',
    'attribute_set_code',
    'product_type',
    'categories',
    'product_websites',
    'name',
    'description',
    'short_description',
    'weight',
    'product_online',
    'tax_class_name',
    'visibility',
    'price',
    'special_price',
    'special_price_from_date',
    'special_price_to_date',
    'url_key',
    'save_rewrites_history',
    'meta_title',
    'meta_keywords',
    'meta_description',
    'created_at',
    'updated_at',
    'new_from_date',
    'new_to_date',
    'display_product_options_in',
    'map_price',
    'msrp_price',
    'map_enabled',
    'gift_message_available',
    'custom_design',
    'custom_design_from',
    'custom_design_to',
    'custom_layout_update',
    'page_layout',
    'product_options_container',
    'msrp_display_actual_price_type',
    'country_of_manufacture',
    'additional_attributes',
    'qty',
    'out_of_stock_qty',
    'use_config_min_qty',
    'is_qty_decimal',
    'allow_backorders',
    'use_config_backorders',
    'min_cart_qty',
    'use_config_min_sale_qty',
    'max_cart_qty',
    'use_config_max_sale_qty',
    'is_in_stock',
    'notify_on_stock_below',
    'use_config_notify_stock_qty',
    'manage_stock',
    'use_config_manage_stock',
    'use_config_qty_increments',
    'qty_increments',
    'use_config_enable_qty_inc',
    'enable_qty_increments',
    'is_decimal_divided',
    'website_id',
    'deferred_stock_update',
    'use_config_deferred_stock_update',
    'related_skus',
    'crosssell_skus',
    'upsell_skus',
    'hide_from_product_page',
    'custom_options',
    'bundle_price_type',
    'bundle_sku_type',
    'bundle_price_view',
    'bundle_weight_type',
    'bundle_values',
    'associated_skus',
    'base_image',
    'small_image',
    'thumbnail_image',
    'additional_images'
];

// Escape CSV field
function escapeCsvField(field) {
    if (field === null || field === undefined) {
        return '';
    }
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

// Generate URL key from product name and SKU to ensure uniqueness
function generateUrlKey(name, sku) {
    const nameKey = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return `${nameKey}-${sku}`.toLowerCase();
}

// Parse price string to number (handles "€123.45", "123,45 €", etc.)
function parsePrice(priceStr) {
    if (!priceStr) return '0.00';
    // Remove currency symbols and whitespace, replace comma with dot
    const cleaned = priceStr
        .replace(/[€$£¥]/g, '')
        .replace(/\s/g, '')
        .replace(',', '.');
    const price = parseFloat(cleaned);
    return isNaN(price) ? '0.00' : price.toFixed(2);
}

// Extract weight from specifications
function extractWeight(specifications) {
    if (!specifications) return '1';

    // Look for weight-related keys
    const weightKeys = ['Weight', 'weight', 'Вес', 'вес', 'Net Weight', 'Gross Weight'];
    for (const key of weightKeys) {
        if (specifications[key]) {
            // Extract numeric value (e.g., "2.5 kg" -> "2.5")
            const match = specifications[key].match(/[\d.]+/);
            if (match) {
                return match[0];
            }
        }
    }
    return '1';
}

// Build additional_attributes from specifications
function buildAdditionalAttributes(specifications) {
    if (!specifications || Object.keys(specifications).length === 0) {
        return 'quantity_and_stock_status=In Stock';
    }

    const attrs = ['quantity_and_stock_status=In Stock'];

    // Add EAN if present
    if (specifications.EAN) {
        attrs.push(`ean=${specifications.EAN}`);
    }

    return attrs.join(',');
}

// Find and categorize images in product folder
function findProductImages(folderPath, sku) {
    const files = fs.readdirSync(folderPath);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    let mainImage = null;
    const additionalImages = [];

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!imageExtensions.includes(ext)) continue;

        const fileLower = file.toLowerCase();
        const skuLower = sku.toLowerCase();

        // Check if it's a main image: {sku}_main.jpg or just {sku}.jpg
        if (fileLower.includes('_main') || fileLower === `${skuLower}${ext}`) {
            mainImage = file;
        } else if (fileLower.startsWith(skuLower)) {
            // Additional images: {sku}_{idx}.jpg, {sku}_1.jpg, etc.
            additionalImages.push(file);
        }
    }

    // Sort additional images by index
    additionalImages.sort((a, b) => {
        const numA = parseInt(a.match(/_(\d+)\./)?.[1] || '999');
        const numB = parseInt(b.match(/_(\d+)\./)?.[1] || '999');
        return numA - numB;
    });

    // If no main image found but we have additional images, use first one as main
    if (!mainImage && additionalImages.length > 0) {
        mainImage = additionalImages.shift();
    }

    return { mainImage, additionalImages };
}

// Copy image to output directory and return the import path
function copyImageForImport(sourcePath, filename, imagesOutputDir) {
    const destPath = path.join(imagesOutputDir, filename);

    try {
        fs.copyFileSync(sourcePath, destPath);
        // Return path relative to Magento import folder
        // Magento expects paths like: /path/to/image.jpg (relative to pub/media/import/)
        return filename;
    } catch (error) {
        console.error(`  Error copying image ${filename}:`, error.message);
        return null;
    }
}

// Ensure output directory exists
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Process all products
function processProducts() {
    const products = [];

    // Create images output directory
    ensureDir(outputImagesDir);
    console.log(`Images will be copied to: ${outputImagesDir}\n`);

    const folders = fs.readdirSync(scrapeHomeDir);

    for (const folder of folders) {
        const folderPath = path.join(scrapeHomeDir, folder);

        if (!fs.statSync(folderPath).isDirectory()) {
            continue;
        }

        const infoJsonPath = path.join(folderPath, 'info.json');

        if (!fs.existsSync(infoJsonPath)) {
            console.log(`Skipping ${folder}: info.json not found`);
            continue;
        }

        try {
            const infoData = JSON.parse(fs.readFileSync(infoJsonPath, 'utf8'));
            const sku = infoData.sku;

            if (!sku) {
                console.log(`Skipping ${folder}: SKU not found in info.json`);
                continue;
            }

            // Find images in folder
            const { mainImage, additionalImages } = findProductImages(folderPath, sku);

            // Copy images and build paths
            let baseImagePath = '';
            let additionalImagePaths = [];

            if (mainImage) {
                const sourcePath = path.join(folderPath, mainImage);
                const copied = copyImageForImport(sourcePath, mainImage, outputImagesDir);
                if (copied) {
                    baseImagePath = copied;
                    console.log(`  Main image: ${mainImage}`);
                }
            }

            for (const addImg of additionalImages) {
                const sourcePath = path.join(folderPath, addImg);
                const copied = copyImageForImport(sourcePath, addImg, outputImagesDir);
                if (copied) {
                    additionalImagePaths.push(copied);
                }
            }

            if (additionalImagePaths.length > 0) {
                console.log(`  Additional images: ${additionalImagePaths.length}`);
            }

            // Clean description - remove "No description found." or similar
            const description = infoData.description &&
                !infoData.description.toLowerCase().includes('no description')
                ? infoData.description
                : '';

            // Handle categories - can be string (categories_path) or array (categories)
            let categories = '';
            if (infoData.categories_path) {
                categories = infoData.categories_path;
            } else if (Array.isArray(infoData.categories)) {
                categories = infoData.categories.join(',');
            }

            // Prepare product data
            const product = {
                sku: sku,
                store_view_code: '',
                attribute_set_code: 'Default',
                product_type: 'simple',
                categories: categories,
                product_websites: 'base',
                name: infoData.name,
                description: description,
                short_description: '',
                weight: extractWeight(infoData.specifications),
                product_online: '1',
                tax_class_name: 'Taxable Goods',
                visibility: 'Catalog, Search',
                price: parsePrice(infoData.price),
                special_price: '',
                special_price_from_date: '',
                special_price_to_date: '',
                url_key: generateUrlKey(infoData.name, sku),
                save_rewrites_history: '1',
                meta_title: infoData.name,
                meta_keywords: '',
                meta_description: infoData.name,
                created_at: '',
                updated_at: '',
                new_from_date: '',
                new_to_date: '',
                display_product_options_in: 'Block after Info Column',
                map_price: '',
                msrp_price: '',
                map_enabled: '',
                gift_message_available: '',
                custom_design: '',
                custom_design_from: '',
                custom_design_to: '',
                custom_layout_update: '',
                page_layout: '',
                product_options_container: '',
                msrp_display_actual_price_type: '',
                country_of_manufacture: '',
                additional_attributes: buildAdditionalAttributes(infoData.specifications),
                qty: '100',
                out_of_stock_qty: '0',
                use_config_min_qty: '1',
                is_qty_decimal: '0',
                allow_backorders: '0',
                use_config_backorders: '1',
                min_cart_qty: '1',
                use_config_min_sale_qty: '0',
                max_cart_qty: '0',
                use_config_max_sale_qty: '1',
                is_in_stock: '1',
                notify_on_stock_below: '',
                use_config_notify_stock_qty: '1',
                manage_stock: '0',
                use_config_manage_stock: '1',
                use_config_qty_increments: '1',
                qty_increments: '0',
                use_config_enable_qty_inc: '1',
                enable_qty_increments: '0',
                is_decimal_divided: '0',
                website_id: '1',
                deferred_stock_update: '0',
                use_config_deferred_stock_update: '1',
                related_skus: '',
                crosssell_skus: '',
                upsell_skus: '',
                hide_from_product_page: '',
                custom_options: '',
                bundle_price_type: '',
                bundle_sku_type: '',
                bundle_price_view: '',
                bundle_weight_type: '',
                bundle_values: '',
                associated_skus: '',
                // Image columns
                base_image: baseImagePath,
                small_image: baseImagePath,
                thumbnail_image: baseImagePath,
                additional_images: additionalImagePaths.join(',')
            };

            products.push(product);
            console.log(`Processed: ${sku} - ${infoData.name}`);

        } catch (error) {
            console.error(`Error processing ${folder}:`, error.message);
        }
    }

    return products;
}

// Write CSV
function writeCsv(products) {
    const lines = [];

    // Add header
    lines.push(csvHeaders.join(','));

    // Add products
    for (const product of products) {
        const row = csvHeaders.map(header => escapeCsvField(product[header]));
        lines.push(row.join(','));
    }

    fs.writeFileSync(outputCsvFile, lines.join('\n'), 'utf8');
    console.log(`\nCSV file generated: ${outputCsvFile}`);
    console.log(`Total products: ${products.length}`);
}

// Print summary
function printSummary() {
    console.log('\n=== MAGENTO IMPORT INSTRUCTIONS ===');
    console.log('1. Copy images folder to Magento:');
    console.log(`   cp -r ${outputImagesDir}/* <magento_root>/pub/media/import/`);
    console.log('\n2. Import CSV via Admin Panel:');
    console.log('   System > Data Transfer > Import');
    console.log('   Entity Type: Products');
    console.log('   Import Behavior: Add/Update');
    console.log('   Images File Directory: pub/media/import');
    console.log('\n3. After import, reindex and clear cache:');
    console.log('   php bin/magento indexer:reindex');
    console.log('   php bin/magento cache:flush');
}

// Main execution
console.log('Starting product import CSV generation...\n');
console.log(`Source directory: ${scrapeHomeDir}`);
console.log(`Output CSV: ${outputCsvFile}`);
console.log(`Output images: ${outputImagesDir}\n`);

const products = processProducts();
writeCsv(products);
printSummary();
console.log('\nDone!');