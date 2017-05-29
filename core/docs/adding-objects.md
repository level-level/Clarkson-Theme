---
layout: docs
title: Documentation
type: core
---
# Adding your own objects

## How to load your own WordPress Objects
The beauty about the use of WordPress Objects is that you can extend them and create custom objects for your Custom Post Types, Custom Taxonomies or User. Loading your own [objects](https://github.com/level-level/Clarkson-Core/tree/master/wordpress-objects){:target="_blank"} can be done in several ways:

- **Prefered:** Place a class in your theme's `wordpress-objects` directory, so it gets autoloaded by Clarkson Core.
- Per complete directory by adding it via the filter `clarkson_available_objects_paths`.
- Per single object / class file via `clarkson_available_objects`.

Read more about [adding custom objects](/core/docs/custom-objects.html)