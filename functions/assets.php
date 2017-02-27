<?php
namespace Clarkson\Assets;

function clarkson_add_editor_style(){
	add_editor_style( get_template_directory_uri() . '/dist/styles/editor-style.css' );
}
add_filter( 'admin_init', __NAMESPACE__ . '\\clarkson_add_editor_style', 100 );

function clarkson_add_assets(){
	wp_enqueue_style('clarkson_main', get_template_directory_uri() . '/dist/styles/main.css', array(), '1.0.0', false );
	wp_enqueue_script('clarkson_main', get_template_directory_uri() . '/dist/scripts/main.js', array('jquery'), '1.0.0', true);
}
add_filter( 'wp_enqueue_scripts', __NAMESPACE__ . '\\clarkson_add_assets', 100 );