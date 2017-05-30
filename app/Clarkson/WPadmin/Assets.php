<?php
namespace Clarkson\WPadmin;

class Assets {
    function __construct(){
        $this->add_editor_style();
    }

    function add_editor_style(){
        add_editor_style( get_template_directory_uri() . '/dist/styles/editor-style.css' );
    }
}