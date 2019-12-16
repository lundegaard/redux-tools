# Utils

> yarn add @redux-tools/utils

Various utility functions used throughout the packages, not explicitly tied to a domain.

## API Reference

### prefixedValueMirror()

Works just like `valueMirror` from ramda-extension, but adds a prefix to each value. Very useful for creating action types.

**Arguments**

1. `prefix` ( _string_ ): Prefix to add to each value.
2. `xs` ( _Array_ ): Values to mirror and prefix.

**Returns**

( _Object_ ): Object with keys matching the passed values.

**Example**

```js
import { prefixedValueMirror } from '@redux-tools/utils';

const ActionTypes = prefixedValueMirror('duck', ['INCREMENT']);

ActionTypes.INCREMENT; // "duck/INCREMENT"
```


### includesTimes()

Returns whether an element is included exactly N times in an array.

**Arguments**
1. `times`, ( _number_ )  How many times the element must be included.
2. `x`, ( _Object_ ) An element to search for.
3. `xs`, ( _Array_ ) An array to search through.

**Returns**

( _boolean_ ): Whether the element is included exactly N times.

**Example**

```javascript
import includesTimes from './includesTimes';

const entries = [
	{ key: 'foo', value: 'bar', namespace: 'ns' },
	{ key: 'foo', value: 'bar', namespace: 'ns' },
	{ key: 'bar', value: 'baz', namespace: 'ns' },
];

includesTimes(
   2,
   { key: 'foo', value: 'bar', namespace: 'ns' },
   entries
);
// true
```

### withoutOnce()

Searches for values from the provided array and removes their first occurrence in the array.

**Arguments**
2. `x`, ( _Array_ ) An array of elements to search for.
3. `xs`, ( _Array_ ) An array to search through.

**Returns**

( _Array_ ): An array without the first occurrence of provided elements.

**Example**

```javascript
import { withoutOnce } from '@redux-tools/utils';

const a = { a: 1 };
const b = { b: 1 };
const c = { c: 1 };

withoutOnce([a, b, c], [a, b, c, a, b, c, a, b, c]);
// [a, b, c, a, b, c]
```
