---
layout: docs
title: Documentation
type: core
---
# Twig templating  

## Template Hierarchy
Uses the internal [Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/){:target="_blank"}
so `index.php` will become `index.twig` or `archive-company.php` with `archive-company.twig`, and still have all Posts or Custom Post Types available in `objects` variable a.k.a. __"all the posts from The Loop"__.

## Custom templates
If you would like to create a custum page template then create a file that is prefixed with `page-`, so it will become `page-about.twig`. This template can be selected through the regular template dropdown.
