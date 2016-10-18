---
layout: home
title: Clarkson Core
pagetitle: Clarkson Core
type: core

hero-header: "A plugin to write Object-Oriented code in combination with the Twig templating engine while keeping the WordPress Way of working in mind."

---


## What is Clarkson Core?
Clarkson Core is an plugin that enables you to use the Twig templating engine inside your Theme and Plugins. It also delivers base classes for the WordPress data types which encourage you to write more Object-Orientated code. This results in cleaner code and a better workflow.

## What is Twig and why we use it?

Twig is a templating engine that makes it easier for both front-end and back-end developers to work on your project. It helps you separate logic from templates files and allows you to write modular, more efficient and easier to maintain code.
Clarkson is build so that the default WordPress Theming hierarchy is respected.

## Object Oriented WordPress Objects like Posts and Terms 

Contains default classes that for example represent `WP_Post`, `WP_Term` and `WP_User` and can be extended to customize them for your own Custom Post Types, Taxonomies or Users.

## Why not plugin XYZ?
The combination of loading the WordPress objects and removing the need of duplicating `.php` left use with building Clarkson. We also wanted that all the post that were available in `The Loop` became one global variable which led us to the `objects` variable.

## Easy installation


Can be installed via [Composer](/core/docs#composer) or a [zip download](/core/docs#quick-download).
