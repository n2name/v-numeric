# v-numeric

[![bundlephobia minified size](https://badgen.net/bundlephobia/min/v-numeric)](https://bundlephobia.com/result?p=v-numeric)
[![npm package version](https://badgen.net/npm/v/v-numeric)](https://npm.im/v-numeric)
[![github license](https://badgen.net/github/license/n2name/v-numeric)](https://github.com/n2name/v-numeric/blob/master/LICENSE)
[![js standard style](https://badgen.net/badge/code%20style/standard/pink)](https://standardjs.com)

Vue 2.x directive for numeric value restriction of input element.

## Install

```bash
$ npm i --save v-numeric
```
## Note

- Support oneway update from an input element to a model.

## Usage

```javascript
import Vue from 'vue'
const numeric = require('v-numeric').default;

Vue.use(numeric)
```

```vue
<template>
  <input v-numeric="{ min: 0, max: 100, decimal: 2, bind: 'myData.somedata' }" />
</template>

<script>
...

  myData = {
    somedata = '';
  }

...
</script>
```
