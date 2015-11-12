---
layout: docs
title: Documentation
type: core
---
# Adding your own objects
Loading your own [objects](https://github.com/level-level/Clarkson-Core/blob/master/lib/clarkson-core-objects.php#L67) can be done in two ways:
1. Per complete directory by adding it via the filter clarkson_available_objects_paths.
2. Per single object / class file via clarkson_available_objects.
Our advice is you extend your new class with Clarkson_Object.