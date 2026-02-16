<?php
/**
 * ForH0omeAndMore Theme Registration
 *
 * @category  ForH0omeAndMore
 * @package   ForH0omeAndMore_Theme
 * @author    Frontend Team
 * @copyright Copyright (c) 2026
 */
use \Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(
    ComponentRegistrar::THEME,
    'frontend/FHM/fhm_theme',
    __DIR__
);