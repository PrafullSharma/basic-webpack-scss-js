# Webpack with ES6 and Sass

A sample setup for Webpack with ES6 and Sass

## Environment setup

```sh
  $ yarn
```

## Development

Start the Webpack server:

```sh
  $ yarn start
```

Open [http://localhost:3001](http://localhost:3001) in a browser. `./app.js` is the entry point.

## Sass linting

[Stylelint](http://stylelint.io/) is used to enforce consistent conventions and avoid errors in stylesheets.

I've edited the options of each rule to my liking, based mostly on [stylelint example config](http://stylelint.io/user-guide/example-config/) and [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard).
For more info, see [stylelint rules documentation](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md).

## Bundling

```sh
  $ yarn bundle
```

It will minify css and js

## Credits

- https://github.com/rauschma/webpack-es6-demo
- https://github.com/srn/react-webpack-boilerplate
- https://css-tricks.com/stylelint/
- ...and many others too
