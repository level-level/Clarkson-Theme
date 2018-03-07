---
layout: docs
title: Tips
type: theme
---
# Tips while using Clarkson

## The Loop and global WordPress function
While looping the `objects` variable, keep in mind that there you are not officially using `The Loop` to when using a default and global WordPress function, pass the post ID to this function.

{% raw %}
```
<article {{ post_class( object.get_ID() ) }}>
```
{% endraw %}