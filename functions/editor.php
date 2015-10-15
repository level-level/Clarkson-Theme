<?php
namespace Clarkson\WPADMIN\Editor;

/***
 *
 * Configure the editor within wp-admin
 *
 **/

class Editor
{
    protected $instance = null;

    public static function get_instance()
    {
        static $instance = null;
        if (null === $instance) {
            $instance = new Editor();
        }

        return $instance;
    }

    protected function __construct(){

        add_filter( 'tiny_mce_before_init', array($this, 'block_formats' ) );

        add_filter( 'post_thumbnail_html',  array($this, 'remove_thumbnail_dimensions' ), 10 );
        add_filter( 'image_send_to_editor',  array($this, 'remove_thumbnail_dimensions' ), 10 );
    }

    /**
     * Remove H1 from block drop-down
     */
    function block_formats( $init ){
        $init['block_formats'] = "Paragraph=p; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6;";
        return $init;
    }

    // Remove width and height attributes from inserted images
    function remove_thumbnail_dimensions( $html ) {
        $html = preg_replace( '/(width|height)=\"\d*\"\s/', "", $html );
        return $html;
    }


}

Editor::get_instance();