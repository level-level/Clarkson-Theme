---
layout: project-docs
title: Setup Clarkson
type: guides
---
# Setup

## Setup Clarkson Core

For a quick setup <a href="//wp-clarkson.com/builds/zip/clarkson-core.zip">download the Clarkson Core</a> and install it as a mu-plugin.

> As with all Must Use plugins in the `wp-content/mu-plugins/` directory one needs to load them manually or use a [mu-plugin autoloader](https://github.com/level-level/ll-plugin-autoloader/){:target="_blank"}. For now we load them manually by using the snippet below:

### wp-content/mu-plugins/load.php
{: .code-label}
```php
<?php
require WPMU_PLUGIN_DIR.'/clarkson-core/clarkson-core.php';
```

For more detailed information or alternative methodes about installing Clarkson view the [Installation docs](http://wp-clarkson.com/core/docs/index.html). 

## Setup Clarkson Theme

**Clarkson Theme Light** is a empty theme which is used in this "Gettings Started Guide". It's lightweigth, free from tooling and frameworks theme. [Download](https://github.com/level-level/clarkson-theme-light/archive/master.zip) this theme from it's repository on [GitHub](https://github.com/level-level/clarkson-theme-light).

**Clarkson Theme** [starter theme](https://github.com/level-level/Clarkson-Theme) is modern day theme which includes tools like  Gulp, BrowserSync and NPM to help you develop modern day themes. So if you do want to kickstart your theme project then head over to our. Read more about [installing Clarkson Theme](/theme/docs/installation.html)

You can also use Clarkson Core in an existing theme.

> Remember, we are using Clarkson Theme Light in this Guide!