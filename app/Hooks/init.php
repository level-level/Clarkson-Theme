<?php
namespace Hooks;

use Clarkson\Theme\Cleanup;
use Clarkson\Theme\Rewrites;
use Clarkson\WPadmin\Editor;
use Clarkson\Hooks\iHook;

class init implements iHook {

    public static function register_hooks( $name ){
        new Rewrites();
        new Editor();
        new Cleanup();
        new \Clarkson\Footer\Controller();
    }
}
