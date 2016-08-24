---
layout: docs
title: Documentation
type: core
---
# Adding your own objects
Loading your own [objects](https://github.com/level-level/Clarkson-Core/blob/master/lib/clarkson-core-objects.php#L67) can be done in serval ways:
A. Per complete directory by adding it via the filter `clarkson_available_objects_paths`.
B. Per single object / class file via `clarkson_available_objects`.
C. Place it in the themes `post-objects` folder so it gets autloaded by Clarkson Core.

Our advice is you extend your new class with `Clarkson_Object`.
