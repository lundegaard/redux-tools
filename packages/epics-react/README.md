# @redux-tools/epics-react

React bindings for the @redux-tools/epics package.

## API Reference

### `withEpics`

Creates a component decorator which handles the lifecycle of passed epics, mounting and unmounting them automatically. The namespace of the epics is determined based on React context.

#### Arguments

1. `epics` (_Object_): The epics to use.
2. [`options`] \(_Object_): Options for the decorator. Possible options: `isGlobal: boolean`, `isPersistent: boolean`, `feature: string`, and `namespace: string`.

#### Returns

(_Function_): A component decorator.

#### Example

```js
import React from 'react';
import { withEpics } from '@redux-tools/epics-react';

import { epic } from './duck';

const Container = () => null;

export default withEpics({ someEpic: epic })(Container);
```

### `<Provider />`

See [injectors-react](../injectors-react/README.md) for more info.
