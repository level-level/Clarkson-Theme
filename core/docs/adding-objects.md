---
layout: docs
title: Documentation
type: core
---
# Adding your own objects
The beauty about the use of WordPress Objects is that you can extend them and create custom objects for your Custom Post Types or Custom Taxonomies.

# How to load your own WordPress Objects
Loading your own [objects](https://github.com/level-level/Clarkson-Core/blob/master/lib/clarkson-core-objects.php#L67) can be done in several ways:

- Place it in the theme's `wordpress-objects` folder so it gets autoloaded by Clarkson Core.
- Per complete directory by adding it via the filter `clarkson_available_objects_paths`.
- Per single object / class file via `clarkson_available_objects`.

## Load via the `wordpress-objects` directory

The following directory `wp-content/themes/clarkson-theme/wordpress-objects` is loaded by Clarkson Core. 
