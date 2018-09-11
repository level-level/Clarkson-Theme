---
layout: project-docs
title: Twig templating
type: guides
---

# Twig templating

The Twig template is a powerfull tool to create your theme with. In this part we will describe some basics with which you can build your custom site! Twig has a lot of functions, but you really don't need to know them all to create decent sites!

## Twig Template extends

At this point we are ready to to create a Custom Post Type with a new template. Twig is a templating engine that helps you create re-usable  templates and smaller partials. So you Don't have to Repeat Yourself ;).

Do you still have `themes/{clarkson-core-light}/templates/index.twig` open right? Look up this part:

~~~
{% raw %}{% extends "layouts/2-column.twig" %}
~~~

This means that `index.twig` is using `2-column.twig` as its parent template. All the surrounding HTML are located in that parent template. It contains those site-wide elementents. You can create any number of base templates to extend from but you can only have on extends tag called per rendering.

## Twig Blocks

So our `layouts/2-column.twig` parent template contains this Twig `block`.

```
{% raw %}{% block content %}
    {% include 'partials/content.twig' %}
{% endblock %}{% endraw %}
```

Every child template that extends `2-column.twig` can overwrite this "content" `block`. In this case, `index.twig` contains The Loop over each object and displays a teaser with a title and the excerpt. `singular.twig` calls a partials template which display the full content of a Post.

A parent block can contain a default value if the child template doesn't overwrite that specific block.

## Passing additional variables to your include statement.

You can add additional variables by passing them after the `with` keyword:
```
{% raw %}{% include 'template.twig' with { 'foo': 'bar' } %}{% endraw %}
```


Check out the Twig website [about template extends and block](https://twig.symfony.com/doc/2.x/tags/extends.html) if you want to know more about this subject.