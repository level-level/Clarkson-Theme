---
layout: docs
title: Documentation
type: core
---
# Custom objects  

## Autoloader
Clarkson Core autoloads all registered Custom Post Types and Taxonomies from the `wordpress-objects` directory within your active theme.  

Clarkon Core is _Child Theme_ compatible. So when your have a `post.php` in both your parent theme as your child theme, then the child theme class gets loaded instead of the parent one. 🎉 
 
_You can create a Mother class which the Post class Extends from, but you should load this class by manually._

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

When you register a Custom Post Type `ll_company` your custom class `ll_company` gets loaded in the `objects`  variable within the loop. For example: When visiting the archive of this CPT like [`archive-company.twig`](https://github.com/level-level/Clarkson-Theme/blob/master/templates/index.twig#L4-L6){:target="_blank"} then all these posts are of the class `ll_company`

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


