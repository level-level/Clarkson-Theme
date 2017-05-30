<?php
namespace Clarkson\Theme;

/**
 * Theme support
 */
class Support {
    public function __construct(){
        // Enable features from Soil when plugin is activated.
        // You should really use this plugin https://roots.io/plugins/soil/
        add_theme_support('soil-clean-up');
        add_theme_support('soil-disable-trackbacks');
        add_theme_support('soil-js-to-footer');
        add_theme_support('soil-nav-walker');
        add_theme_support('soil-relative-urls');

        // Enable plugins to manage the document title
        // http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
        add_theme_support('title-tag');

        // Enable post thumbnails
        // http://codex.wordpress.org/Post_Thumbnails
        // http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
        // http://codex.wordpress.org/Function_Reference/add_image_size
        add_theme_support('post-thumbnails');
        // Enable HTML5 markup support
        // http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
        add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);
    }
}