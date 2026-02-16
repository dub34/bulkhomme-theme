<?php
/**
 * BULK HOMME Theme Registration
 *
 * @category  BulkHomme
 * @package   BulkHomme_Theme
 * @author    Frontend Team
 * @copyright Copyright (c) 2025
 */

use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(
    ComponentRegistrar::THEME,
    'frontend/FHM/default',
    __DIR__
);
