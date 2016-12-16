# Clarkson Websites

## Contributing to the documentation site

### Installation
1. Checkout this repository
2. Install Bundler with `gem install bundler`
3. Install all Gems with `bundle install`
4. Start Jekyll serve with `jekyll serve`

### Editing front-end

1. Just edit SASS and refresh :)

### Editing pages
All content is stored in `/core` or `/theme` folders.

### Adding pages to Documentation
Go to `_data/docs/` and select the respective YAML file you want to edit.

## Release steps
After releasing a new version one should build a version of Clarkson Core that will be available on the installation page of Clarkson Core.

### Building the quick download .zip

There is a build script located in `bin/build.sh` to release a `clarkson-core.zip` file located in `/builds/zip`.
It ignores Git files and directories & removes documentation- and testfiles from libraries that were installed via Composer.

1. Needed setup:  
\- Directory with fully installed in `clarkson/Clarkson-Core`.  
\- Directory with branch `github-pages` in `clarkson/Clarkson-Theme`.

1. Rename current `clarkson-core.zip` with a suffix of that zip's version.
1. Run build.sh from clarkson/Clarkson-Theme/bin/
1. Commit changes to GitHub pages