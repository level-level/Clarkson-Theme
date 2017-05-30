<?php

// Load Composer autoloader
$autoloader_path = get_template_directory() . '/vendor/autoload.php';
if( file_exists( $autoloader_path ) ){
    include_once( $autoloader_path );
} else {
    trigger_error(" Don't forget to run composer install.", E_USER_ERROR );
}