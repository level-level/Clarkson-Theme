---
layout: home
title: Clarkson Theme
pagetitle: Clarkson Theme
color: green
type: theme

hero-header: "Clarkson Theme is a starter theme with modern tools to bring you up to speed with your development." 

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
We didn't want to include something like Bootstrap or another CSS Framework.

## Gulp
Gulp compiles Less, checks for JavaScript errors, optimizes images, concatenates and minifies files.

## BrowserSync
Keeping multiple browsers and devices synchronized, along with injecting updated CSS and JS in your browser.

## NPM as Front-end package management
Front-end package management that just installs the right versions of the packages you need and their dependencies. *
Since NPM 5.0 a `package.lock` is supported so we don't need Yarn for this.


> \* Yupp, we borrowed the Gulp file of Roots Sage 8.5. Thank you! Just go to the `development` folder where all the tooling files are.
