<?php

/**
 * Load Composer autoloader
 * 
 * You don't need to use Composer and use somthing like Sage's loader, then just remove this code.
 * https://github.com/roots/sage/blob/8.5.1/functions.php
 */
$autoloader_path = get_template_directory() . '/vendor/autoload.php';
if( file_exists( $autoloader_path ) ){
    include_once( $autoloader_path );
} else {
    trigger_error(" Don't forget to run composer install.", E_USER_ERROR );
}