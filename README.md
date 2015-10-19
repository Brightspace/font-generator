# font-generator
[![Build status][ci-image]][ci-url]

Library which generates cross-browser CSS for Brightspace web fonts ([Oxygen](https://www.google.com/fonts/specimen/Oxygen) and [Merriweather](https://www.google.com/fonts/specimen/Merriweather)).

Includes support for `WOFF2`, `WOFF` and `TTF` font assets, which cover: Chrome 3.5+, Safari 3+, Firefox 3.5+, IE 9+, Android 2.2+ and iOS 4.3+.

## Generation

Clone the repo and install dependencies via NPM:

```shell
npm install
```

To generate CSS:

```shell
npm run build
```

This will generate a `fonts.css` and minified `fonts.min.css` file in the `dist` directory, and also copy all the fonts from `assets`.

## Publishing

To publish the font CSS and assets to the Brightspace CDN, update the version in `package.json` (following [semantic versioning](http://semver.org/)) and tag the commit with the same version, prefixed with a "v".

The contents of the `dist` directory will be published to: `https://s.brightspace.com/lib/fonts/{version}/`

## Contributing
Contributions are welcome, please submit a pull request!

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) and [eslint](http://eslint.org/) rules and contributions should make use of them.

[ci-url]: https://travis-ci.org/Brightspace/font-generator
[ci-image]: https://img.shields.io/travis/Brightspace/font-generator.svg
