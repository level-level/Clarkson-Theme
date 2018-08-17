---
layout: project-docs
title: Installation
type: docs
project: theme
---

# Installation

## 1. Download the theme
[Download](https://github.com/level-level/Clarkson-Theme/archive/master.zip) the zip and rename it to your project's name.
It's also possible to [install Clarkson Core via Composer](/core/docs/#composer) but that all depends on your own workflow.

~~~
/wp-content/themes/twentyeleven
                  /twentytwelve
                  /clarkson-theme
~~~

## 2. Composer install

If you don't have a `vendor` directory in your theme then run `composer install` in your theme folder.

If you don't have composer then install [composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx){:target="_blank"}. About [installing](https://www.abeautifulsite.net/installing-composer-on-os-x){:target="_blank"} on OS X.

## 3. Activate the theme
Go to your Appearance > Themes and activate your Clarkson Theme.


## 4. Optional - Install front-end dependencies

Like we said, the start theme includes Gulp, Browsersync and loads your front-end dependencies via NPM. To install these follow this command:

1. Run `npm install`

You now have all the necessary dependencies to [run the build process via Gulp](/theme/docs/usage.html).