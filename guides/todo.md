---
layout: project-docs
title: To do
type: guides
---

# These subjects still need to be describe in the docs or guide.

- Document how to render Gutenberg blocks with Clarkson
- Document Tips to work with WooCommerce. - https://github.com/level-level/Clarkson-Core/issues/131
- Custom call to Twig / Clarkson Render
- Transform WP_Query or get_posts to Clarkson WordPress Objects
- Twig concatinate (dynamic twig include ) - https://timber.github.io/docs/guides/cookbook-twig/
- Twig template caching
- Internationalization - https://github.com/level-level/clarkson-wp-cli-twig-translations / https://timber.github.io/docs/guides/internationalization/
- Clarkson Theme instead of Clarkson Theme Light
- Default available variables provided by Clarkson Core
- Custom template with a custom WP_Query and with possible custom navigation.
- Optimize autoloader 
> Zet tijdens development define( 'WP_DEBUG', true); in wp-config.php. Maar het kan zijn dat je local site erg langzaam wordt. Wil je debug (tijdelijk) uitzetten (define( 'WP_DEBUG', false);), zorg ervoor dat je composer met --optimize-autoloader uitgevoert.
```
composer install --optimize-autoloader
```
Anders komen er foutmeldingen zoals Uncaught Twig_Error_Syntax: Unknown "functie-naam" function, zie
