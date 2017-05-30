<?php
namespace Clarkson\Theme;

class Rewrites {
	public function __construct(){
		add_rewrite_endpoint( 'json', EP_PERMALINK | EP_PAGES | EP_AUTHORS );
	}
}