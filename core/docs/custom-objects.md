---
layout: project-docs
title: Documentation
type: docs
project: core
---
# Custom objects

## Autoloader
Clarkson Core autoloads all registered Custom Post Types, Taxonomies and Users from the `wordpress-objects` directory within your active theme. 

Clarkon Core is _Child Theme_compatible. So when your have a `post.php` in both your parent theme as your child theme, then the child theme class gets loaded instead of the parent one. 🎉 

You can create a Base class which the Post class Extends from, but you should load this class by manually._

## Custom Post Types
It's possible to extend the Clarkson Object to your own Custom Post Type by creating classes that represent the Custom Post Types.  

**1\. Register your CPT**
Just register your CPT like you always do via:

~~~
<?php register_post_type( 'll-company', $args );
~~~

**2\. Add your custom class**
Add a custom WordPress object class to the `wordpress-objects` directory within your current active theme via `clarkson-theme/wordpress-objects/ll-company.php`:

~~~
class ll_company extends Clarkson_Post {
    public function get_website(){
        return get_post_meta( $this->get_id(), 'll-website');
    }
}
~~~

When you register a Custom Post Type `ll_company` your custom class `ll_company` gets loaded in the `objects` variable within the loop. For example: When visiting the archive of this CPT like [`archive-company.twig`](https://github.com/level-level/Clarkson-Theme/blob/master/templates/index.twig#L4-L6){:target="_blank"} then all these posts are of the class `ll_company`

## Custom Terms
In the same way as you extend a CPT, you can register a Custom Taxonomy, create a class for it and extend the basic [Clarkson_Term](https://github.com/level-level/Clarkson-Core/blob/master/post-objects/Clarkson_Term.php){:target="_blank"} class.

This means when you have a Custom Taxonomy named `company-category`:

~~~
<?php register_taxonomy( 'll-company-category, 'll-company, $args );
~~~

a custom WordPress Term:

~~~
class ll_company_category extends Clarkson_Term {
    // custom code
}
~~~


Which will result in some magic so that when you want to retreive all terms via `$company->get_terms('ll-company-category')` an `array` of terms based on the class `ll_company_category` will be returned:

~~~
$company = new ll_company( $post );
$company_catergories = $company->get_terms('ll-company-category');
~~~

## Template objects <small><ins>Since 0.3.0</ins></small>

When using a custom template Clarkson Core automaticly loads a corresponding custom WordPress Object. So if your template is called `template-headquarter.twig` then within it will load `wordpress-objects/template_headquarter.php` into the `object` variable instead of the default Clarkson Object.

~~~
class template_headquarter extends Clarkson_Object {
}
~~~

## User role base objects <small><ins>Since 0.3.0</ins></small>
When Clarkson retreives a User object, it will check if there is a custom WordPress Object available based on the current `user_role` of the current User.
So if you are logged in as an Administrator it will use the `wordpress-objects/user_administrator.php` class when calling `object->get_author();`.

~~~
class user_administrator extends Clarkson_User {
}
~~~

## Loading order
The loading order of which object Class Clarkson will use is as following, where a higher number will overrule a lower number.

Custom Post Types:
1. Default `Clarkson_Object`.
2. Custom `wordpress-object/page.php` or an other Custom Post Type.
3. Custom `wordpress-object/template_headquarter.php`.


Users:
1. Default `User_Object`.
2. Custom `wordpress-object/user_administrator.php` or an other User role name.
