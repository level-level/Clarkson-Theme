---
layout: project-docs
title: Themeing
type: guides
project: 
---

# Themeing

So let's get to know Clarkson

## Template Hierarchy
All the templates can be found within the `templates` directory. That way we are keeping the root of the project clean.

Clarkson Core respects the internal [Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/){:target="_blank"} so `index.php` will become `index.twig`, `archive-company.php` becomes `archive-company.twig` and `singular.php` becomes `singular.twig`.

Now you know where to look for all the template files ;).


## The Loop

Open your project and find `themes/{clarkson-theme-light}/templates/index.twig`. Within that template look for the `objects` variable. This `objects` variable contains all the posts that on that current page. If you are on an Archive page, then all the post from The Loop are loaded into `objects`. This variable `objects` is created and made available by Clarkson Core. It's a generic name for Posts, Pages and other Custom Post Types.

So if you alter the loop via [`pre_get_posts`](https://codex.wordpress.org/Plugin_API/Action_Reference/pre_get_posts) filter then the items in `objects` changes with it. Easy does it, just like WordPress!
 
### templates/index.twig
{: .code-label}
~~~twig
{% raw %}{% extends "layouts/2-column.twig" %}

{% block content %}
    {% for object in objects %}
        {% include 'partials/teaser.twig' %}
    {% endfor %}
{% endblock %}{% endraw %}
~~~


## Calling WordPress functions

As you can see, we are missing the pagination here, so let's add it!

Let's create a file `templates/partials/pagination.twig` and include it underneath the `{% raw %}{% endfor %}{% endraw %}` Twig tag.

### templates/partials/pagination.twig
{: .code-label}
~~~twig
{% raw %}{% extends "layouts/2-column.twig" %}

{% block content %}
    {% for object in objects %}
        {% include 'partials/teaser.twig' %}
    {% endfor %}
    {% include 'partials/pagination.twig' %}
{% endblock %}{% endraw %}
~~~


Add `{% raw %}{{ paginate_links()|raw }}{% endraw %}` to this new `pagination.twig` and save it. Now reload your homepage.

### Escaping HTML in Twig
If you don't add the `|raw` filter after calling the function it will display the escaped `HTML`. Twig escapes everthing by default. Try removing and adding it for fun ;)

Here you can find more information about Twig and [escaping](https://twig.symfony.com/doc/2.x/filters/escape.html) and the [raw filter](https://twig.symfony.com/doc/2.x/filters/raw.html).

## Custom (plugin) functions

Sometimes you want to call a custom PHP function which you wrote yourself or a function from a Plugin you installed. 
In this case, we want to add a more advanced pagination and for that we always suggest [WP Pagenavi](https://nl.wordpress.org/plugins/wp-pagenavi/). So go ahead and install it.

We have now installed the new WP PageNavi plugin and we want to Register the `wp_pagenavi` function so it becomes available within our Twig templates. Open up `themes/{clarkson-core-light}/functions.php` and add `wp_pagenavi` to the `$extra` Array.

### functions.php
{: .code-label}
~~~php
{% raw %}function ct_twig_functions( $functions ) {
    $extra = array(
        'wp_pagenavi'
    );
    $functions = array_merge( $functions, $extra );
    return $functions;
}
add_filter( 'clarkson_twig_functions', 'ct_twig_functions' );{% endraw %}
~~~

Then go back to the `partials/pagination.twig` file and replace `paginate_links` with `wp_pagenavi()` and refresh the homepage.

### templates/partials/paginatin.twig
{: .code-label}
~~~php
{% raw %}{{ wp_pagenavi()|raw }}{% endraw %}
~~~


## Adding a Menu

Clarkson support default WordPress functions so registering a menu and displaying it in your site can be done like you normaly would do it.

### functions.php
{: .code-label}
```php
/**
 * Tell WordPress to register a nav menu.
 */
function ct_after_setup_theme(){
    register_nav_menus([
        'primary_navigation' => 'Primary Navigation'
    ]);
}
add_action( 'after_setup_theme', 'ct_after_setup_theme' );
```

And we add this after our site name:
### templates/defaults/header.twig
{: .code-label}
```php
{% raw %}<nav class="nav primary-nav">
    {% if ( has_nav_menu('primary_navigation') )  %}
        {{ wp_nav_menu( { 'theme_location': 'primary_navigation', 'menu_class': 'menu primary-menu' } ) }}
    {% endif %}
</nav>{% endraw %}
```

Yupp, all default WordPress functions. Nothing fancy, nothing new.

## Add custom variables to Twig template
Imagine your want to add a Copyright notice in your footer. You want this, but where do you start?

~~~
Copyright 2018 by Level Level. All Rights Reserved
~~~

The Twig render engine has the ability to register variables that will be made available throughout all of your temolates withing your site. We will register a `footer` variable with the key `copyright`.

### functions.php
{: .code-label}
~~~php
/**
 * Add a context argument to be made available while rendering Twig templates
 */
function ct_footer_add_context_args( $context ) {
    $year = date('Y'); // Dynamic Year
    $name = get_bloginfo('name'); // Current site name
    $text = 'Copyright %d by %s. All Rights Reserved.'; // The text

    $context['footer']['copyright'] = sprintf( $text, $year, $name ); // Replace the variables with the values

    return $context;
}
add_filter( 'clarkson_context_args' , 'ct_footer_add_context_args' );
~~~


This `$text` could also be a option which the client can fill through the WordPress Dashboard
~~~php
$text = get_option('ct_footer_copyright');
~~~

At this point the `footer` variable can be called within the footer of the site. Notice the way you call the `copyright` key. Via the dot notation. If you have an key with a `-` character, use `{% raw %}{{ attribute(footer, 'copy-right') }}{% endraw %}` or just don't do that ;).

### templates/footer.twig
{: .code-label}
~~~twig
{% raw %}<footer class="contentinfo">
        <p>{{ footer.copyright }}</p>
    </footer>
    {{ wp_footer() }}
    </body>
</html>{% endraw %}
~~~

Find out more about [Twig variables](https://twig.symfony.com/doc/2.x/templates.html#variables) on the Twig site.

You are now ready to get into Twig templating!