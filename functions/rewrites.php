<?php

function clarkson_add_endpoints(){
	add_rewrite_endpoint( 'json', EP_PERMALINK | EP_PAGES | EP_AUTHORS );
}

add_action( 'init', 'clarkson_add_endpoints' );