---
layout: docs
title: Upgrading
type: core
---
# Upgrading from 0.1.0 to 0.2.0

- Removal of loading theme specific directory via `glob`.
- Autoloading Core and Theme `wordpress-objects`.
- No more `symfony/translations` dependencies.

In 0.2.0. we implemented autoloading (spl_autoload_register) on the `wordpress-objects` directory within the Clarkson Core plugin and your Clarkson Theme. One should also do this within your own theme, so we highly suggest using Composer or another autoloading in your theme.  

One breaking change is that the old glob'ing method of all your themes (`functions`, `post-types` and `taxonomies` directory) by Clarkson Core is removed. 
We've build-in a quick-fix to maintain backwards compatiblity, but it's disabled by default. To enable it add this in a file within your `mu-plugins` directory:  

`wp-content/mu-plugins/clarkson-core-deprecated-theme-loading.php`

## A. Enable via theme autoload filter  

~~~
<?php
add_filter('clarkson_core_autoload_theme_pre_020', '__return_true');
~~~

This will trigger a deprecated warning. If you want a solution without a warning then checkout [#B](#custom-theme-loading-code)

## B. Custom theme loading code

Copy this [Autoload theme Gist](#https://gist.github.com/jmslbam/2ea10c9c56e8eb5906bcbd7e18c33b1e){:target="_blank"} into you mu-plugins directory: 

<script src="https://gist.github.com/jmslbam/2ea10c9c56e8eb5906bcbd7e18c33b1e.js"></script>