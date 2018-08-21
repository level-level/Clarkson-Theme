---
layout: project-docs
title: WordPress Objects
type: guides
---

# Working with Custom Post Type, Taxonomies & Users objects

Clarkson Core provides a solution for working with Object Oriented Model which are autoloaded from the `/themes/{clarkson-theme-light}/wordpress-objects/` directory. Clarkson itself contains a set of PHP classes that represent the available WordPress data types:  

The main [Clarkson Object](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_Object.php){:target="_blank"} class represents `WP_Post` and has the `post_type` : `post`. This class looks like `WP_Post`, but with some more handy stuff and is extendable unlike the WP_Post class.

Then there is the [Clarkson Term](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_Term.php){:target="_blank"} class which represents `WP_Term`.

And a [Clarkson User](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_User.php){:target="_blank"} class that represent `WP_User`.


## Creating a Custom Post Type

Let's create a CPT like you are used to do.

functions.php
{: .code-label}
```php
/**
 * Register Company Custom Post Type
 */
function ct_create_company_post_type() {
    $args = array(
        'public'        => true,
        'label'         => __( 'Company', 'clarkon-theme-light' ),
		'labels'        => array(
                            'name' => _x( 'Companies', 'Post Type General Name', 'clarkon-theme-light' ),
                            'singular_name' => _x( 'Company', 'Post Type Singular Name', 'clarkon-theme-light' ),
                        ),
		'taxonomies'    => array( 'category' ),
        'has_archive'   => 'companies',
        'rewrite'       => array( 'slug' => 'company' )
    );
    register_post_type( 'ct_company', $args );
}
add_action( 'init', 'ct_create_company_post_type' );
```

## Add your custom PHP WordPress Object class
For this situation we will create a PHP Class which holds our Company model. This company has an address which we want to retreive and put in the sidebar of page. This can be done by create a file within the `wordpress-objects` folder.

`{clarkson-theme-light}/wordpress-objects/ct_company.php`:

wordpress-objects/ct_company.php
{: .code-label}
~~~php
<?php

class ll_company extends Clarkson_Post {

}
~~~

Keep in mind that there is a naming convention which [can be found here](/core/docs/wordpress-objects.html#filenaming-convention).

> Please flush rewrite rules / save your permalinks before proceding the guide.

## Extending your new custom Company object.

Let us first create a bunch of new Companies via the WordPress Dashboard and then visit the Company archive page on https://{your-test-domain.test}/companies. That page will now display a list of companies.

For the next situation we want to prefix all the company names. So open up the `ct_company.php` file overwrite the `get_title()` function. This is basic OOP PHP programming functionality.

wordpress-objects/ct_company.php
{: .code-label}
~~~php
<?php

class ct_company extends Clarkson_Object {

    public function get_title() {
        return 'Prefix ' . parent::get_title();
    }
}
~~~

Clarkson initializes all companies from this `ll_company` PHP class, so calling `object.get_title()` on a company archive or detail post will call the overwritten method instead of the basic `Clarkson_Object` class. Just refresh the company archive page and click on any company link.

## Calling a custom method on your WordPress Object.

Because we wanted to display a custom address we will add a new method `get_address()`. For the sake up simplicity, we are hardcoding this data, but you can call get_post_meta of Advanced Custom Fields `get_field()` within this method.

wordpress-objects/ct_company.php
{: .code-label}
~~~php
<?php

class ct_company extends Clarkson_Object {

    public function get_title() {
        return 'Prefix: ' . parent::get_title();
    }

    public function get_address() {
        return 'Clarksonroad 101<br/>Rotterdam, The Netherlands';
    }
}
~~~

After that, create a new company Twig template that extends the `2-column.twig` layout. We only needs to overwrite the sidebar block for this specific template.

> At this moment there is little quirk that make you retreive the first item from the `objects`. This will be fixed in Clarkson Core 0.3.2.

templates/single-ct_company.twig
{: .code-label}
~~~twig
{% raw %}{% extends "layouts/2-column.twig" %}

{% block sidebar %}
    {# This will be fixed in 0.3.2  #}
    {% set object = objects|first %}

    {% set address = object.get_address() %}
    {% if address %}
        <p>{{ address|raw }}</p>
    {% endif %}
{% endblock %}{% endraw %}
~~~

## Working with Term objects.

In the upcomming example we want to list the selected category term underneath the company address. Each category term has a random background color.

If you watched closely you noticed that we registered the default Taxonomy `category` to the `ct_company` CPT. Besides CPT's one can also extend or overwrite default WordPress items. Let's create a PHP Class for category. And because we don't want to register a whole new Custom Taxonomy but reuse the build in one, we make it available for our `ct_company` CPT.

wordpress-objects/category.php
{: .code-label}
~~~php
<?php

class category extends Clarkson_Term {

    /**
     * Generate a color for this category. Could of course be a term meta value via ACF or so.
    */
    function get_color() {
        return '#' . str_pad( dechex( mt_rand( 0, 0xFFFFFF ) ), 6, '0', STR_PAD_LEFT );
    }
}
~~~

Add this to your `ct_company` WordPress Object.

wordpress-objects/ct_company.php
{: .code-label}
~~~php
    /**
     * Retreive all attached category terms.
     */
    public function get_categories() {

        $terms = $this->get_terms( 'category' );
        if( is_wp_error( $terms ) ) {
            $terms = array();
        }

        return $terms;
    }
~~~


templates/single-ct_company.twig
{: .code-label}
~~~twig
    {% raw %}{% set categories = object.get_categories() %}
    {% if categories %}
        <ul>
        {% for category in categories %}
            <li style="background: {{ esc_attr( category.get_color() ) }};">{{ category.get_name }}</li>
        {% endfor %}
        </ul>
    {% endif %}{% endraw %}
~~~

Now refresh the company detail page.

## A small footnote about reusing the category taxonomy
If assign the category taxonomy to a Custom Post Type then you need to adjust the Category Archive page via the `pre_get_posts` filter and add that CPT to the `wp_query`.

functions.php
{: .code-label}
~~~php
/**
 * Make ct_company CPT available on the Category Archive page
 */
function ct_pre_get_posts( $query ) {
    if( is_category() ) {
        $post_type = (array) get_query_var( 'post_type' ); // Just cast, incase empty string
        $post_type = array_merge( $post_type, array( 'nav_menu_item', 'post', 'ct_company' ) ); // Don't forget nav_menu_item to allow menus to work!
        $query->set( 'post_type', $post_type );
    }
    return $query;
}
add_filter( 'pre_get_posts', 'ct_pre_get_posts' );
~~~

Assign a new term to one of your companies and checkout that Category Archive page. For example https://{your-test-domain.test}/category/development/

## Detailed documentation

If you want to read more detailed documentation about WordPress Objects and their internal workings, head over to one of the documentation pages, but first check out the last part of this Guide ["The videos"](/guides/videos.html).

- [WordPress Objects](/core/docs/wordpress-objects.html)
- [Adding objects](/core/docs/adding-objects.html)
- [Your custom objects](/core/docs/custom-objects.html)