<?php
/**
 * ForHomeAndMore Theme Registration
 *
 * @category  ForHomeAndMore
 * @package   ForHomeAndMore_Theme
 * @author    ForHomeAndMore
 * @copyright Copyright (c) 2026 ForHomeAndMore
 */

use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(
    ComponentRegistrar::THEME,
    'frontend/ForHomeAndMore/default',
    __DIR__
);
