<?php
namespace Hooks;

use Clarkson\Hooks\iHook;
use Clarkson\WPadmin\Assets;

class admin_init implements iHook {

    public static function register_hooks( $name ){
        new Assets();
    }

}
