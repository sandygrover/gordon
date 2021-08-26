# stats

Default Performance Monitor @ Jam3

## Installation

```
npm install @jam3/stats
```

## Usage

The module is exporting a function, therefore after importing it, call that function. You will have the stats monitor running immediately in your browser.

```
const stats = require('@jam3/stats');

stats();
```

It's recommended to use this library only in development, a common way to use it at Jam3 is:

```
if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) require('./util/stats')();

```
