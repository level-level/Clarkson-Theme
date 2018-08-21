---
layout: project-docs
title: WordPress objects - Documentation
type: docs
project: core
---
# WordPress objects
Clarkson ships with a set of PHP classes that represent the available WordPress data types:  

The main [Clarkson Object](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_Object.php){:target="_blank"} class represents `WP_Post` and has the `post_type` : `post`. This class looks like `WP_Post`, but with some more handy stuff.

Then there is the [Clarkson Term](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_Term.php){:target="_blank"} class which represents `WP_Term`.

And a [Clarkson User](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_User.php){:target="_blank"} class that represent `WP_User`.

## Implementing your own custom WordPress objects
You can implement and overwrite all classes with your own [custom objects](/core/docs/custom-objects.html)

## Filenaming convention

Because we can't initialize a PHP class that has a minus within it's name, we have to sanitize the class names:

- non-alpha and non-numeric characters become underscores `_`.
- String to lowercase is require by WordPress post-type [naming convention](https://codex.wordpress.org/Function_Reference/register_post_type#post_type){:target="_blank"}
- Minus `-` becomes underscores `_`


> CPT `ll-company` becomes => `wordpress-objects/ll_company.php` and internaly gets initialized like `new ll_company();`.

## Loading priority
- Version 0.2.0 = SPL Autoloaded via Composer.
- Version 0.1.0 = Alpabetic via `glob`.


## Props
We would like to thank HumanMade for the initial code of the [WordPress objects](https://github.com/humanmade/WordPress-Objects){:target="_blank"}.