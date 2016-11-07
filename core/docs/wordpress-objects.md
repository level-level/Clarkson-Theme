---
layout: docs
title: WordPress objects - Documentation
type: core
---
# WordPress objects
Clarkson ships with a set of PHP classes that represent the available WordPress data types:  

The main Clarkson [Object](https://github.com/level-level/Clarkson-Core/blob/master/post-objects/Clarkson_Object.php){:target="_blank"} class represents `WP_Post` and has the `post_type` : `post`. This class represent the `WP_Post` but with some more handy stuff.

Then there is the Clarkson [Term](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_Term.php){:target="_blank"} class which represents `WP_Term`.

And a Clarkson [User](https://github.com/level-level/Clarkson-Core/blob/master/wordpress-objects/Clarkson_User.php){:target="_blank"} class that represent `WP_User`.

# Loading priority
Right now it's alpabetic...

# Props
We would like to thank HumanMade for the initial code of the [WordPress objects](https://github.com/humanmade/WordPress-Objects){:target="_blank"}.