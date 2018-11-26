# @redux-tools/utils

Various utility functions used throughout the packages, not explicitly tied to a domain.

## API Reference

## `prefixedValueMirror`

Works just like `valueMirror` from ramda-extension, but adds a prefix to each value. Very useful for creating action types.

### Arguments

1. `prefix` (_string_): Prefix to add to each value.
2. `xs` (_Array_): Values to mirror and prefix.

### Returns

(_Object_): Object with keys matching the passed values.

### Example

```js
import { prefixedValueMirror } from '@redux-tools/utils';

export const ActionTypes = prefixedValueMirror('duck', ['INCREMENT']);

ActionTypes.INCREMENT; // "duck/INCREMENT"
```

## `getDisplayName`

Extracts the display name of a React component.

### Arguments

1. `Component` (_React.Component_): React component to get the display name of.

### Returns

(_string_): Display name of the component
