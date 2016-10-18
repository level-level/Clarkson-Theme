---
layout: docs
title: Documentation
type: core
---
# Installation
We suggest to put the plugin in your `mu-plugins` directory.

There are 3 posiblities to install Clarkson Core and as with all Must Use plugins, you need to [load it manually *](#loading-clarkson-core-as-a-must-use-plugin).

## Quick download
[Download](http://wp-clarkson.com/builds/zip/clarkson-core.zip) the `.zip` and place it within your `mu-plugins` directory.

<!-- This package is build via "clarkson-theme/bin/build.sh" -->

## Manually git clone  

1\. Clone the repository `git clone git@github.com:level-level/clarkson-core.git`  
2\. Run `composer install` in the new `clarkson-core` directory.

## Automatic via Composer  

1\. Add the Git repository to your `composer.json` file as a independent repository

~~~
"repositories": [
  {
    "type": "git",
    "url":"https://github.com/level-level/clarkson-core"
  }
]
~~~

2\. Require it on a specific tag number  

~~~
"require": {
  "composer/installers": "1.0.12",
  "johnpbloch/wordpress" : ">=4.6",
  "level-level/clarkson-core": "0.1.*"
},
~~~

3\. Adjust to install path to install in the `mu-plugins` directory  

~~~
"extra": {
  "installer-paths": {
    "web/app/wp-content/mu-plugins/{$name}/": ["type:wordpress-muplugin"]
  },
  "wordpress-install-dir": "web/wp"
}
~~~

4\. Now run `composer install` for your project's Composer file.

> Keep in mind that this example is based on Roots Bedrock. You could also point the `mu-plugins` installer-paths to something as `web/wp/wp-content`.


## * Loading Clarkson-Core as a Must Use plugin

> As with all Must Use plugins in the `wp-content/mu-plugins/` directory one needs to load them manually. 
    
~~~PHP
<?php // wp-content/mu-plugins/load.php
require WPMU_PLUGIN_DIR.'/clarkson-core/clarkson-core.php';
~~~

Now go and have fun &#127881;
