---
layout: home
title: Clarkson Theme
pagetitle: Clarkson Theme
color: green
type: theme

hero-header: "Clarkson Theme is a modern set of tools to take WordPress theme development back to 21st century without losing touch with WordPress." 

---

## Twig based starter theme
Thanks to Clarkson Core

## Clean theme folder
We try to keep the theme folder as clean as possible by:  

- Keeping all of the Twig template files in the `templates` directory.  
No need for extra `single.php` files.  
- Ignoring the generated assets from Gulp thanks to a `dist` and `src` workflow via Gulp.  
- Centralize all tooling code in one `development` folder.

## Be free of CSS Frameworks
We didn't want to include something like Bootstrap or another Framework.
 
## Gulp
Gulp compiles Less, checks for JavaScript errors, optimizes images, concatenates and minifies files. *


## BrowserSync
Keeping multiple browsers and devices synchronized, along with injecting updated CSS and JS in your browser. *
      
Currently Roots already uses an `npm` only setup, but this is  up to you to swap this out. Because everybody already wants to use Yarn, right :)

## Bower
Front-end package management that just installs the right versions of the packages you need and their dependencies. *

## asset-builder
For the JSON file based asset pipeline. *

  

> \* Yupp, we borrowed the Gulp file of Sage. Thank you! Just go to the `development` folder where all the tooling files are.