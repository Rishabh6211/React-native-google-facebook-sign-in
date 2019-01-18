#!/usr/bin/env node

'use strict';

// Detect if run by NPM and fail

if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.log(`
    =============================================
    DO NOT USE NPM TO INSTALL PACKAGES! Use Yarn.
    =============================================

    Basics:
      $ see yarnpkg.com for installation of yarn
      $ yarn install

    To install a new package (also adds to package.json):
      $ yarn add [packagename]

    To upgrade a package:
      $ yarn upgrade [packagename]

    For more help, see https://yarnpkg.com/en/docs/usage.

    Reasons for this change:
    - yarn uses a dependency lockfile by default, allowing for a fully reproducible build
    - yarn is faster to install dependencies from scratch
    - yarn has more secure checksum matching, ensuring package contents are consistent

  `);
  process.exit(1);
}
