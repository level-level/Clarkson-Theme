---
layout: docs
title: Documentation
type: core
---
# Custom Post Types
It's possible to extend the Clarkson Object to your own Custom Post Type by creating classes that represent the Custom Post Types.

When you register a Custom Post Type `ll_company` your custom class `ll_company` gets loaded in the objects variable within the loop of
`archive-company.twig`.

# Custom Terms
In the same way as you extend a CPT you can register a custom taxonomy and create a class for it and extend the basic [Clarkson_Term](https://github.com/level-level/Clarkson-Core/blob/master/post-objects/Clarkson_Term.php){:target="_blank"} class.