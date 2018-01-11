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
If you would like to create a custom page template then create a file that is prefixed with `template-`, so it will become `template-headquater.twig`. This template can be selected through the regular Page template dropdown.

### Register a custom template for Custom Post Types <small><ins>Since 0.2.1</ins></small> 
If you would like to make a custom template available for a Custom Post Type (WP 4.7) then you will have to register this specific post type via the  `clarkson_core_templates_types_for_%TEMPLATE_NAME.twig%`.

~~~php
<?php
add_filter('clarkson_core_templates_types_for_template-headquarter.twig', function( $post_types ){
    $post_types[] = 'company';
    return $post_types;
});
~~~

### Deprecated `page-xyz.twig`
 When having `WP_DEBUG` enable this will trigger a deprecated warning. To disable this warning use to following filter:

 ```php
 add_filter('clarkson_core_deprecated_warning_page_template', '__return_false');
 ```