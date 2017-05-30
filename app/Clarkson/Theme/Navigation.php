<?php
namespace Clarkson\Theme;

/**
 * Register the navigations menus
 */
class Navigation {

    function __construct(){

        // Register wp_nav_menu() menus
        // http://codex.wordpress.org/Function_Reference/register_nav_menus
        register_nav_menus([
            'primary_navigation' => __('Primary Navigation', 'clarkson-theme')
        ]);
    }
}