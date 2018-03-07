---
layout: docs
title: Documentation
type: theme
---
# Using Gulp

## Available Gulp commands

Gulp is installed via NPM so it's available via `node_modules/gulp/bin/gulp.js` directory. So there is really no need 
to install it globally.

From the command line in the `/development` directory:

* `node_modules/.bin/gulp` — Compile and optimize the files in your assets directory
* `node_modules/.bin/gulp --production` — Compile assets for production (no source maps).
* `node_modules/.bin/gulp watch` — Compile assets when file changes are made

To just run one task, for example the `styles` task run `node_modules/.bin/gulp styles`.