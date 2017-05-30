<?php
namespace Clarkson\Footer;

class Controller {

    public function __construct(){
        add_filter( 'clarkson_context_args' , [ $this, 'add_context_args'] );
    }

    public function add_context_args( $context ){
        $context['footer']['text'] = Model::get_text();
        return $context;
    }
}