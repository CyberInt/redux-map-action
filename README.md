# redux-map-action
Higher-order Redux reducer to map actions before passing to a reducer.

## Usage

### Install via NPM

```
npm install redux-map-action --save
```

### Import

```javascript
import mapAction from 'redux-map-action';
// or
var mapAction = require('redux-map-action');
```

#### If you need ES6 module
```javascript
import mapAction from 'redux-map-action/es6';
```
Use this if you are using [rollup.js](http://rollupjs.org/) or
[webpack 2](http://webpack.github.io/docs/changelog.html#2-1-x-beta), or any
ES2015 modules-compatible bundler which can eliminate unused library code with
[tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html).

It is recommended to import the library from `redux-map-action/es6` instead of
`redux-map-action/src` because the source code depends on experimental presets from
babel (stage 1-3) and may be incompatible with your bundler or settings.

### Other environments

Use the Universal Module Definition (UMD)

- [mapState.js](dist/mapAction.js)
- [mapState.min.js](dist/mapAction.min.js) (minified)

## API

### `mapAction()`

```js
 mapAction(
   actionMapper: (action: Object) => newAction: Object,
   actionTypes: ?Array<string>
 ): (reducer) => reducer
```

Creates a higher-order reducer which map actions before passing to a reducer.
Specify a list of action types to whitelist actions for mapping.

Useful when you want reuse a reducer on actions with different payloads.

#### Example

Lets say we have a `itemListReducer` which handles the state for a list of
items, and we want to store items with different priorities in separate lists.
In this case we can use `mapAction()` to filter items in actions by priority
before passing to respective reducers.

*./items-reducer.js*
```js
import { combineReducers } from 'redux';
import mapAction from 'redux-map-action';
import itemListReudcer from './item-list-reducer';
import { FETCH, UPDATE } from './constants/action-types';
import { URGENT, NORMAL } from './constants/priority';

const mapPriority = (priority) => mapAction(
  (action) => ({
    ...action,
    payload: action.payload.filter((item) => item.priority === priority)
  }),
  [FETCH, UPDATE]
);

const itemsReducer = combineReducers({
  urgent: mapPriority(URGENT)(itemListReducer),
  normal: mapPriority(NORMAL)(itemListReducer),
});

export default itemsReducer;
```
