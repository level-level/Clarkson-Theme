---
layout: project-docs
title: Documentation
type: core
---
# Installation
There are 3 posiblities to install Clarkson Core into your `mu-plugins`.

* [Quick download](#download)
* [Composer](#composer)

> Remember as with all Must Use plugins, you still need to [load Clarkson](#loading-clarkson-core-as-a-must-use-plugin)  yourself.

## Quick download
{:id="download"}
[Download](http://wp-clarkson.com/builds/zip/clarkson-core.zip){:.btn}{:target="_blank"}  &nbsp; the latest stable `.zip` and place it within your `mu-plugins` directory.

<!-- This package is build via "clarkson-theme/bin/build.sh" -->

## Install via Composer
{:id="composer"}

Clarkson is available on [Packagist](https://packagist.org/packages/level-level/){:target="_blank"}.

1\. Require `composer/installers`
```bash
composer require composer/installers
```

2\. Require Clarkson Core

```bash
composer require level-level/clarkson-core
```

It's labeled as a `mu-plugin` so it will be installed there.


> Keep in mind that there a multiple ways of user Composer and WordPress.

If you want to learn more about using Composer with WordPress then please check out this website [http://composer.rarst.net](http://composer.rarst.net/){:target="_blank"} or [https://roots.io/bedrock/docs/composer/](https://roots.io/bedrock/docs/composer/){:target="_blank"}


## * Loading Clarkson-Core as a Must Use plugin
{: id="loading"}

> As with all Must Use plugins in the `wp-content/mu-plugins/` directory one needs to load them manually or use a [mu-plugin autoloader](https://github.com/level-level/ll-plugin-autoloader/){:target="_blank"}.
    
```php
<?php // wp-content/mu-plugins/load.php
require WPMU_PLUGIN_DIR.'/clarkson-core/clarkson-core.php';
```

Now go and have fun &#127881;
