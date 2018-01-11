---
layout: home
title: Clarkson Theme
pagetitle: Clarkson Theme
color: green
type: theme

hero-header: "Clarkson Theme is a modern set of tools to take WordPress theme development back to 21st century without losing touch with WordPress." 

---

## Twig based starter theme
Thanks to [Clarkson Core](http://wp-clarkson.com/core).

## Clean theme folder
We try to keep the theme folder as clean as possible by:  

- Keeping all of the Twig template files in the `templates` directory.  
No need for extra `single.php` files.  
- Ignoring the generated assets from Gulp thanks to a `dist` and `src` workflow via Gulp.  
- Centralize all tooling code in one `development` folder.

## Be free of CSS Frameworks
We didn't want to include something like Bootstrap or another Framework.

## Gulp
Gulp compiles Less, checks for JavaScript errors, optimizes images, concatenates and minifies files.

## BrowserSync
Keeping multiple browsers and devices synchronized, along with injecting updated CSS and JS in your browser.

## Bower
Front-end package management that just installs the right versions of the packages you need and their dependencies. *

Currently Roots Sage 9.0 theme already uses an `npm` and Yarn only setup, but it's up to you to swap this out. Our next `0.3.0` release will drop Bower for a NPM 5.0 only package installation because that version supports a `.lock` file.

## asset-builder
For the JSON file based asset pipeline. *

  

> \* Yupp, we borrowed the Gulp file of Roots Sage. Thank you! Just go to the `development` folder where all the tooling files are.
