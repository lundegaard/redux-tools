# @redux-tools/utils

Various utility functions used throughout the packages, not explicitly tied to a domain.

## `prefixedValueMirror`

Very useful for creating action types.

```js
import { prefixedValueMirror } from '@redux-tools/utils';

export const ActionTypes = prefixedValueMirror('duck', ['INCREMENT']);
```

## `getDisplayName`

For extracting the display name of a React component.
