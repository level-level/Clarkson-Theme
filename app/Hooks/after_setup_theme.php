<?php
namespace Hooks;

use Clarkson\Hooks\iHook;
use Clarkson\Theme\Navigation;
use Clarkson\Theme\Support;


class after_setup_theme implements iHook {

    public static function register_hooks( $name ){
        new Support();
        new Navigation();
    }
}
