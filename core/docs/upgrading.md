---
layout: docs
title: Upgrading
type: core
---

Alle release can be found on [GitHub](https://github.com/level-level/Clarkson-Core/releases)

# Upgrading from 0.2.0 to 0.2.1
In this version, a more generic custom template functionality has been introduced. This deprecated the `page-xyz.twig` for `template-xyz.twig`. More information about this new template feature can be found [here](http://wp-clarkson.com/core/docs/templates.html#custom-templates).

[View release notes on GitHub](https://github.com/level-level/Clarkson-Core/releases/tag/0.2.1){:.btn }{:target="_blank"}


# Upgrading from 0.1.0 to 0.2.0

Important note when upgrading to 0.2.0

- Removal of loading theme specific directory via `glob`.
- Autoloading Core and Theme `wordpress-objects`.
- No more `symfony/translations` dependencies.

In 0.2.0. we implemented autoloading (spl_autoload_register) on the `wordpress-objects` directory within the Clarkson Core plugin and your Clarkson Theme. One should also do this within your own theme, so we highly suggest using Composer or another autoloading in your theme.  

One breaking change is that the old glob'ing method of all your themes (`functions`, `post-types` and `taxonomies` directory) by Clarkson Core is removed. 
We've build-in a quick-fix to maintain backwards compatiblity, but it's disabled by default. To enable it add this in a file within your `mu-plugins` directory:  

`wp-content/mu-plugins/clarkson-core-deprecated.php`

## Enable via theme autoload filter  

~~~php
<?php
// Add to mu-plugins/clarkson-core-deprecated.php 
add_filter('clarkson_core_autoload_theme_pre_020', '__return_true');
~~~

[View release notes on GitHub](https://github.com/level-level/Clarkson-Core/releases/tag/0.2.0){:.btn }{:target="_blank"}