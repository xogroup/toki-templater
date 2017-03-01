# toki-templater <!-- Repo Name -->
> A powerful intelligent templater wrapper with support for validation <!-- Repo Brief Description -->

<!-- Long Description -->
This is a templater which also provides validation. It's aware of toki standards regarding context layout, as well as Joi aware. It will gladly handle both JSON strings and objects, returning back in whatever form you provided.

<!-- Maintainer (Hint, probably you) -->
Lead Maintainer: [Derrick Hinkle](https://github.com/dhinklexo)

<!-- Badges Go Here -->

<!-- Badge from https://badge.fury.io/ -->
[![npm version](https://badge.fury.io/js/toki-templater.svg)](https://badge.fury.io/js/toki-templater)
<!-- Build Status from Travis -->
[![build status](https://travis-ci.org/xogroup/toki-templater.svg?branch=master)](https://travis-ci.org/xogroup/toki-templater.svg?branch=master)
<!-- Security Scan from Snyk.io -->
[![Known Vulnerabilities](https://snyk.io/test/github/xogroup/toki-templater/badge.svg)](https://snyk.io/test/github/xogroup/toki-templater)
<!-- Security Scan from NSP -->

<!-- End Badges -->
<!-- Quick Example -->
## Example
```Javascript
const Templater = require('toki-templater');

Templater(this.action).then( (hydratedConfig) => {
    ...
});
```
<!-- Customize this if needed -->
More examples can be found in [the examples document](Example.md) and the full api in the [API documentation](API.md).

<!-- Anything Else (Sponsors, Links, Etc) -->
