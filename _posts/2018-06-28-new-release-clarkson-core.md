---
layout: post
title:  "Clarkson Core 0.3.0 released"
date:   2018-07-12 12:00:00 -0000
categories: core releases
author: Jaime Martínez
authorUsername: jmslbam
---

Yes, Clarkson Core 0.3.0 has been released! 0.3.0 contains new functionality and some small bugfixes.
These are the two new features that landed in this release:

## Custom Template Objects

When using a custom template Clarkson Core automaticly loads a corresponding custom WordPress Object. So if your template is called `template-headquarter.twig` then within it will load `wordpress-objects/template_headquarter.php` into the `object` variable instead of the default Clarkson Object.

~~~
class template_headquarter extends Clarkson_Object {
}
~~~

## WordPress Object per User role

When Clarkson retreives a User object, it will check if there is a custom WordPress Object available based on the current `user_role` of the current User.
So if you are logged in as an Administrator it will use the `wordpress-objects/user_administrator.php` class when calling `object->get_author();`.

~~~
class user_administrator extends Clarkson_User {
}
~~~

## Bugfixes

- You can now load a custom user object from a child-them. [#106](https://github.com/level-level/Clarkson-Core/issues/106).
- Made `get_home_url`, `single_post_title`, `esc_html__`, `esc_html_x`, `esc_html_e`, `esc_attr_x`, `translate_nooped_plural`, `_nx_noop`, `_n_noop`, `_ngettext` WordPress functions available from Twig template [#87](https://github.com/level-level/Clarkson-Core/issues/87).
- Add extra check if Clarkson_Core_Autoloader exists [#111](https://github.com/level-level/Clarkson-Core/issues/111).
- Custom template object [#101](https://github.com/level-level/Clarkson-Core/issues/101).
- Don't use deprecated object creation internaly in Clarkson Core [#91](https://github.com/level-level/Clarkson-Core/issues/92).
- Return proper custom Term Object when custom taxonomy is defined with dashes [#109](https://github.com/level-level/Clarkson-Core/issues/109).

See all the closed issues on Github [consult the list of changes](https://github.com/level-level/Clarkson-Core/milestone/4).