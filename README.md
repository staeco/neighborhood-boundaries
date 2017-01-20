# neighborhood-boundaries [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Downloads and converts Zillow neighborhood data for the United States.

You define the processing logic, so you can put it into any DB you like.

## Install

```
npm install neighborhood-boundaries
```

## Example

```js
import import from 'neighborhood-boundaries'

import({
  // this function is called every time a record is parsed
  onBoundary: (doc, cb) => {
    cb() // make sure to call the cb
  },

  // this function is called when all records are parsed and processed
  onFinish: (err) => {

  }
})
```

[downloads-image]: http://img.shields.io/npm/dm/neighborhood-boundaries.svg
[npm-url]: https://npmjs.org/package/neighborhood-boundaries
[npm-image]: http://img.shields.io/npm/v/neighborhood-boundaries.svg
