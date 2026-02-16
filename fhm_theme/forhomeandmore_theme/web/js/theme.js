/**
 * ForHomeAndMore Theme - Main JavaScript
 *
 * @category  ForHomeAndMore
 * @package   ForHomeAndMore_Theme
 * @author    ForHomeAndMore
 * @copyright Copyright (c) 2026 ForHomeAndMore
 */

define([
    'jquery',
    'domReady!'
], function($) {
    'use strict';

    /**
     * Initialize theme functionality
     */
    var ForHomeAndMore = {
        /**
         * Initialize all components
         */
        init: function() {
            this.initMobileMenu();
            this.initHeaderScroll();
            this.initProductGrid();
            console.log('ForHomeAndMore theme initialized');
        },

        /**
         * Mobile menu toggle
         */
        initMobileMenu: function() {
            var $menuToggle = $('.nav-toggle');
            var $menu = $('.navigation-menu');

            $menuToggle.on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('active');
                $menu.toggleClass('active');
            });

            // Close menu when clicking outside
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.navigation').length) {
                    $menuToggle.removeClass('active');
                    $menu.removeClass('active');
                }
            });
        },

        /**
         * Header scroll effect
         */
        initHeaderScroll: function() {
            var $header = $('.page-header');
            var lastScroll = 0;

            $(window).on('scroll', function() {
                var currentScroll = $(this).scrollTop();

                if (currentScroll > 100) {
                    $header.addClass('scrolled');
                } else {
                    $header.removeClass('scrolled');
                }

                // Hide header on scroll down, show on scroll up
                if (currentScroll > lastScroll && currentScroll > 200) {
                    $header.addClass('header-hidden');
                } else {
                    $header.removeClass('header-hidden');
                }

                lastScroll = currentScroll;
            });
        },

        /**
         * Product grid enhancements
         */
        initProductGrid: function() {
            // Add hover effects
            $('.product-item').on('mouseenter', function() {
                $(this).addClass('hovered');
            }).on('mouseleave', function() {
                $(this).removeClass('hovered');
            });

            // Quick view functionality (if needed)
            $('.product-item-quick-view').on('click', function(e) {
                e.preventDefault();
                var productUrl = $(this).data('product-url');
                // Implement quick view modal here
                console.log('Quick view for:', productUrl);
            });
        }
    };

    /**
     * Initialize on DOM ready
     */
    ForHomeAndMore.init();

    return ForHomeAndMore;
});
