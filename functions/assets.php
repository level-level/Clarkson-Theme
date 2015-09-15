<?php

function clarkson_add_editor_style(){
	add_editor_style( get_template_directory_uri() . '/dist/styles/editor-style.css' );
}

function clarkson_add_assets(){
	wp_enqueue_style('clarkson_main', get_template_directory_uri() . '/dist/styles/main.css', array(), '1.0.0', false );
	wp_enqueue_script('clarkson_main', get_template_directory_uri() . '/dist/scripts/main.js', array(), '1.0.0', true);
}

add_action( 'admin_init', 		  'clarkson_add_editor_style', 100 );
add_action( 'wp_enqueue_scripts', 'clarkson_add_assets'		 , 100 );
