---
layout: docs
title: Documentation
type: theme
---
# Usage

## Available gulp commands
* `gulp` - Compile and optimize the files in your asset directory.
* `gulp watch` - Compile assets when file changes are made.
* `gulp --production` - Compile assets for production (no source maps).

## Using BrowserSync
To use BrowserSync during `gulp watch` you need to update `devUrl` at the bottom of `source/manifest.json` to reflect your local development hostname.

For example, if your local development URL is `http://project-name.dev` you would update the file to read:

    ...
    "config": {
        "devUrl": "http://project-name.dev"
    }
    ...

If your local development URL looks like `http://localhost:8888/project-name` you would update the file to read:

    ...
    "config": {
        "devUrl": "http://localhost:8888/project-name/"
    }
    ...