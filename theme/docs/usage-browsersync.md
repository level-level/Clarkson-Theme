---
layout: project-docs
title: Documentation
type: theme
---
# Using BrowserSync

To use BrowserSync during `gulp watch` you need to update `browsersyncUrl` at the bottom of `source/manifest.json` to reflect your local development hostname.

For example, if your local development URL is `http://project-name.example` you would update the file to read:
```json
  "config": {
      "browsersyncUrl": "http://project-name.example"
  }
```
If your local development URL looks like `http://localhost:8888/project-name/` you would update the file to read:
```json
  "config": {
      "browsersyncUrl": "http://localhost:8888/project-name/"
  }
```

## Custom browsersyncUrl
If you have a different development url from the rest of your team then create a file `source/browsersync.json` with the following config:
```
{
    "url": "http://local.wordpress.example"
}
```