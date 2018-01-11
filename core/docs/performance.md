---
layout: docs
title: Performance tips
type: core
---
# Performance tips
We all love websites that run fase, so here are some tips to keep in mind when building a website with Clarkson Core.

* [Use `self::get_many()` instead of `new WP_Query`](#getmany)
* [PHP render_twig vs. Twig include](#render-vs-include)


## Use self::get_many() instead of new WP_Query
{:id="getmany"}

The `self::get_many()` methods  and sets `no_found_rows` to true to disable pagination.

A new WP_Query object runs five queries by default, including calculating pagination and priming the term and meta caches. Each of the following arguments will remove a query:

* `'no_found_rows' => true`: useful when pagination is not needed.
* `'update_post_meta_cache' => false`: useful when post meta will not be utilized.
* `'update_post_term_cache' => false`: useful when taxonomy terms will not be utilized.

Finally it returns an Array of the same WordPress Object Class (hence the `self`).

Source: [10up](https://10up.github.io/Engineering-Best-Practices/php/#performance){:target="_blank"}

## PHP render_twig vs. Twig include
{:id="render-vs-include"}

Using `clarkson_template::render_twig` in a PHP foreach is a lot more expensive than including a partial in a twig template, which is the most common use-case.

```php
class Post {
    public static function getRecentPublished(){
      return self::get_many( array( 'posts_per_page' => 10 ) );
    }
}
```


```twig
{% raw %}{% for item in object.getRecentPublished() %}
  {% include 'teaser.twig' with { 'post': item } %}
{% endfor %}{% endraw %}
```

[Related GitHub thread](https://github.com/level-level/Clarkson-Core/pull/49)
