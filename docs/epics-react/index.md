# Epics-react

> yarn add @redux-tools/epics-react

This package provides React bindings for the @redux-tools/epics package.

## Usage example

```js
import React from 'react';
import { withEpics } from '@redux-tools/epics-react';

import { epic } from './duck';

const Container = () => null;

export default withEpics({ someEpic: epic })(Container);
```

!> TODO: Example link

## API Reference

### withEpics()

Creates a component decorator which handles the lifecycle of passed epics, mounting and unmounting them automatically. The namespace of the epics is determined based on React context.

**Arguments**

1. `epics` ( _Object_ ): The epics to use
2. `options` ( _Object_ ): Options for the decorator
    - [`isGlobal`] ( _boolean_ ): Should be `true` if no namespace is provided
    - [`isPersistent`] ( _boolean_ ): Define whether epic should be auto-ejected after unmount
    - [`feature`] ( _string_ ): A name of the namespace group (`namespaces` by default)
    - [`namespace`] ( _string_ ): Namespace the epics were injected under
    
**Returns**

( _Function_ ): A component decorator

### Provider

A component that provides injection mechanism to nested components. See
[injectors-react](/injectors-react/index.md) for more info.
