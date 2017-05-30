<?php
namespace Hooks;

use Clarkson\Hooks\iHook;
use Clarkson\Theme\Assets;


class wp_enqueue_scripts implements iHook {

    public static function register_hooks( $name ){
        new Assets();
    }

}
