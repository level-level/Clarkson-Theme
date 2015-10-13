<?php
namespace Clarkson\Navigation\Main;

/**
 * Register the main navigation
 *
 * @param $location
 * @param $description
 */
function register_primary_nav() {
    register_nav_menu( 'primary-navigation', 'Primary navigation' );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\\register_primary_nav' );