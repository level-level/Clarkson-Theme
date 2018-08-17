---
layout: project-frontpage
title: Clarkson Core
pagetitle: Clarkson Core
project: core

hero-header: "A plugin to write Object-Oriented code in combination with the Twig templating engine while keeping the WordPress Way of working in mind."

---

## What is Clarkson Core?
Clarkson Core is an plugin that enables you to use the Twig templating engine inside your Theme and Plugins. It also delivers base classes for the WordPress data types which encourage you to write more Object-Orientated code. This results in cleaner code and a better workflow.

## What is Twig and why we use it?

Twig is a (HTML) templating engine that makes it easier for both front-end and back-end developers to work on your project. It helps you separate logic from templates files and allows you to write modular, more efficient and easier to maintain code. 
Clarkson is build so that the default WordPress Theming hierarchy is respected. If you want to see an basis example of a theme with Twig, then view our starter theme [Clarkson Theme](/theme/). Just like Rails, Drupal, Laravel and other platforms do.

Here is an example of a Twig file used in Clarkson Theme.

### single.twig
{: .code-label}
~~~twig
{% raw %}{% extends "layouts/full-width.twig" %}

{% block content %}
    {% for object in objects %}
        {% include 'partials/content.twig' %}
    {% endfor %}
{% endblock %}{% endraw %}
~~~

### partials/content.twig
{: .code-label}

~~~twig
{% raw %}{%  set object = objects|first %}

<article {{ post_class( object.get_ID() ) }}>
    <header>
        <h1 class="entry-title">{{ object.get_title() | raw }}</h1>
    </header>
    <div class="entry-content">
        {{ object.get_content() | raw }}
    </div>
</article>{% endraw %}
~~~

## Object Oriented WordPress Objects like Posts and Terms

Clarkson contains default classes that, for example, common WordPress objects that represent `WP_Post`, `WP_Term` and `WP_User` and can be extended and customized for your own Custom Post Types, Taxonomies or Users. We also call them [WordPres Objects](http://wp-clarkson.com/core/docs/wordpress-objects.html).

> Do you remember how to retreive a post thumbnail?

### The old way
{: .code-label}

~~~php
$thumb_id = get_post_thumbnail_id( $post->ID );
$url = wp_get_attachment_url( $thumb_id );
<img src="<?php echo esc_url( $url ); ?>" alt="Thumbnail for <?php echo $post->post_title; ?>" />
~~~

### The Clarkson way
{: .code-label}

~~~twig
{% raw %}{{ object.get_thumbnail() }}{% endraw %}
~~~

## Why not plugin or Framework XYZ?
The combination of loading the WordPress objects and removing the need of duplicating `.php` (Timber) left use with building Clarkson. We also wanted that all the post that were available in `The Loop` became one global variable which led us to the `objects` variable within the Twig templates. There was also no need for any fancy new routing logic because there already are alternatives for that like HM Rewrite.

## Easy installation
Can be installed via [Composer](/core/docs#composer) or a [zip download](/core/docs#quick-download).

## Start Theming with Clarkson Theme
You can start your own theme from scratch, but we have also build a very basis starter theme for you to have a heads-start:  view it at [Clarkson Theme](/theme/).
