---
layout: project-docs
title: Background infomation
type: docs
project: theme
---
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
