<?php
namespace Clarkson\Theme;

class Assets {
	private $version = false;

	public function __construct(){

		if ( $theme = wp_get_theme() ) {
			$this->version = $theme->get( 'Version' );
		}

		$this->enqueue();
	}

	public function enqueue(){
		wp_enqueue_style('clarkson_main', get_template_directory_uri() . '/dist/styles/main.css', array(), $this->version, false );
		wp_enqueue_script('clarkson_main', get_template_directory_uri() . '/dist/scripts/main.js', array('jquery'), $this->version, true);
	}
}