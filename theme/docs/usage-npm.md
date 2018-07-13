---
layout: project-docs
title: Documentation
type: theme
---
# Using NPM

Clarkson Theme uses NPM to manage front-end packages. An extended explanation about how to use NPM to install packages 
can be found [here on the NPM website](https://docs.npmjs.com/getting-started/installing-npm-packages-locally){:target="_blank"}

Here's a quick example of install step of Headroom.js:

## 1\. Install package  

```
# from the /development directory
npm install headroom.js --save
```

Now it will be available within `development/node_modules/headroom.js/`.

<img src="/images/npm-headroom.png" alt="Overview of node_modules directory of Headroom.js" />

## 2\. Add to manifest.json

We choose to manually add this to the `source/manifest.json` instead of using an automated assets-builder which was another thing 
to learn.  This way Gulp will pick it up while combining all the JavaScript files.

So look up your `/source/manifest.json` and find the `"type": "js"` index and add the path to the Headroom.js file you 
want to include. Now re-start your gulp command.

```
{
    "type": "js",
    "name": "main.js",
    "globs": [
      "../source/scripts/main.js",
      "node_modules/headroom.js/dist/jQuery.headroom.min.js"
    ]
},
```
 