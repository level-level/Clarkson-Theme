#!/bin/bash

# Build script to release a clarkson-core.zip file
# Ignores .git files and removes docs and tests from libs that were installed via 

# 1. Needed setup:
# - Directory with fully installed in "clarkson/Clarkson-Core"
# - Directory with branch "github-pages" in clarkson/Clarkson-Theme
#
# 2. Run build.sh from clarkson/Clarkson-Theme/bin/
# 3. Commit changes to GitHub pages

path=${PWD##*/}
#printf '%s\n' "${PWD##*/}"
# Get the absolute path of this executable
ORIGDIR="$(pwd)"
SELF_PATH="$(cd -P -- "$(dirname -- "$0")" && pwd -P)" && SELF_PATH="$SELF_PATH/$(basename -- "$0")"
# Resolve symlinks - this is the equivalent of "readlink -f", but also works with non-standard OS X readlink.
while [ -h "$SELF_PATH" ]; do
	# 1) cd to directory of the symlink
	# 2) cd to the directory of where the symlink points
	# 3) Get the pwd
	# 4) Append the basename
	DIR="$(dirname -- "$SELF_PATH")"
	SYM="$(readlink "$SELF_PATH")"
	SELF_PATH="$(cd "$DIR" && cd "$(dirname -- "$SYM")" && pwd)/$(basename -- "$SYM")"
done
echo "Running from $ORIGDIR"

# Go to root of Clarkson-Theme
cd "../" 

# Clean up possible extractions of clarkson-core
rm -rfv builds/zip/Clarkson-Core

# Go to root clarkson folder
cd "../"

echo "$(pwd)"

zip -r clarkson-core.zip clarkson-core -x "*.git*"
mv clarkson-core.zip Clarkson-Theme/builds/zip/


cd Clarkson-Core/
echo "$(pwd)"

# With vendors
VENDOR="$(pwd)/vendor"

# composer
cd $VENDOR/composer && rm -rf installed.json

# Twig
cd $VENDOR/twig/twig && rm -rf phpunit.xml.dist test doc README.rst CHANGELOG .editorconfig .travis.xml composer.json
cd $VENDOR/twig/extensions && rm -rf phpunit.xml.dist test doc README.rst .travis.yml composer.json

# Symfony translation
cd $VENDOR/symfony/translation && rm -rf phpunit.xml.dist Tests README.md CHANGELOG.md composer.json
