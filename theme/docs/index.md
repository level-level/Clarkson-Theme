---
layout: project-docs
title: Installation
type: theme
---
# Installation

Clarkson Theme is a modern set of tools to take WordPress theme developement back to 21st century without loosing touch with WordPress.

## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| PHP >= 5.4.x    | `php -v`     | [php.net](http://php.net/manual/en/install.php) |
| Node.js 5.0.x   | `node -v`    | [nodejs.org](http://nodejs.org/) |
| Clarkson Core 0.2.x  |              | [github.com](https://github.com/level-level/Clarkson-Core) |

## Whats does What?

Clarkson Theme uses [Gulp](http://gulpjs.com/){:target="_blank"} as its build system and [NPM](https://docs.npmjs.com/getting-started/installing-npm-packages-locally){:target="_blank"} to manage front-end packages.

* [Gulp](http://gulpjs.com/) build script that compiles ~~both Sass and~~ Less, checks for JavaScript errors, optimizes images, and concatenates and minifies files to `dist` directory
* [BrowserSync](http://www.browsersync.io/){:target="_blank"} for keeping multiple browsers and devices synchronized while testing, along with injecting updated CSS and JS into your browser while you're developing
* No Framework, roll your own!
* [Twig Templating via Clarkson Core](http://twig.sensiolabs.org/){:target="_blank"}

## Installation

### Default
Clone the repository or [download](https://github.com/level-level/Clarkson-Theme/archive/master.zip) the zip and rename it to your project's name.
`git clone git@github.com:level-level/Clarkson-Theme.git`

### Composer
If you don't have a `vendor` directory in your theme then follow the next steps:
1. Install [composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx){:target="_blank"} / [short info](https://www.abeautifulsite.net/installing-composer-on-os-x){:target="_blank"}
2. Run `composer install` in this theme folder.

### Install Dependencies

1. Run `npm install`

You now have all the necessary dependencies to [run the build process via Gulp](/theme/docs/usage.html).