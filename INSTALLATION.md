# Clarkson

Clarkson Theme is a modern set of tools to take WordPress theme developement back to 21st century without loosing touch with WordPress.

## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| PHP >= 5.4.x    | `php -v`     | [php.net](http://php.net/manual/en/install.php) |
| Node.js 0.12.x  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10  | `gulp -v`    | `npm install -g gulp` |
| Clarkson Core   |              | [github.com](https://github.com/level-level/Clarkson-Core) |

## Whats does What?

Clarkson Theme uses [gulp](http://gulpjs.com/) as its build system and [Bower](http://bower.io/) to manage front-end packages.

* [gulp](http://gulpjs.com/) build script that compiles both ~~Sass and~~ Less, checks for JavaScript errors, optimizes images, and concatenates and minifies files to `dist` directory
* [BrowserSync](http://www.browsersync.io/) for keeping multiple browsers and devices synchronized while testing, along with injecting updated CSS and JS into your browser while you're developing
* No Framework, roll your own!
* [Twig Templating via Clarkson Core](http://twig.sensiolabs.org/)

## Installation

### Default
Clone repository or download zip and rename to your project's name.

### Install composer
1. Install [composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx) / [short info](https://www.abeautifulsite.net/installing-composer-on-os-x)
2. Run `composer install` in this theme folder.

### Install Gulp

Building the theme requires [node.js](http://nodejs.org/download/). We recommend you update to the latest version of npm: `npm install -g npm@latest`.

From the command line in the `/development` directory:

1. Install [gulp](http://gulpjs.com) globally with `npm install -g gulp`
2. Navigate to the development folder in the theme directory
3. Run `npm install`

You now have all the necessary dependencies to run the build process.

## Usage

### Available gulp commands

From the command line in the `/development` directory:

* `gulp` — Compile and optimize the files in your assets directory
* `gulp watch` — Compile assets when file changes are made  
* `gulp --production` — Compile assets for production (no source maps).

### Using BrowserSync

To use BrowserSync during `gulp watch` you need to update `devUrl` at the bottom of `source/manifest.json` to reflect your local development hostname.

For example, if your local development URL is `http://project-name.dev` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://project-name.dev"
  }
...
```
If your local development URL looks like `http://localhost:8888/project-name/` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://localhost:8888/project-name/"
  }
...
```
