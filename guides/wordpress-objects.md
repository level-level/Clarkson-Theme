---
layout: project-docs
title: WordPress Objects
type: guides
---

# Working with Custom Post Type, Taxonomies & Users objects

Clarkson Core provides a solution for working with Object Oriented Model which are autoloaded from the `/themes/{clarkson-theme-light}/wordpress-objects/` directory. Clarkson itself contains a set of PHP classes that represent the available WordPress data types:  

The main [Clarkson Object](https://github.com/level-level/Clarkson-Core/blob/master/post-objects/Clarkson_Object.php){:target="_blank"} class represents `WP_Post` and has the `post_type` : `post`. This class looks like `WP_Post`, but with some more handy stuff and is extendable unlike the WP_Post class.

Then there is the [Clarkson Term](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_Term.php){:target="_blank"} class which represents `WP_Term`.

And a [Clarkson User](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_User.php){:target="_blank"} class that represent `WP_User`.


## Creating a Custom Post Type

Let's create a CPT like you are use to do.

```
/**
 * Register Company Custom Post Type
 */

function ct_create_post_type() {
    register_post_type( 'ct_company',
        array(
        'labels' => array(
            'name' => __( 'Company' ),
            'singular_name' => __( 'Company' )
        ),
        'public' => true,
        'has_archive' => true,
        )
    );
}
add_action( 'init', 'create_post_type' );
```

## ....


## Detailed documentation

If you want to read more detailed documentation about WordPress Objects and their internal workings, head over to 

- [WordPress Objects](/core/docs/wordpress-objects.html)
- [Adding objects](/core/docs/adding-objects.html)
- [Your custom objects](/core/docs/custom-objects.html)