# Epics (React Bindings)

> yarn add @redux-tools/epics-react

This package provides React bindings for the [@redux-tools/epics](/packages/epics) package.

## Usage Example

```js
import React from 'react';
import { withEpics } from '@redux-tools/epics-react';
import someEpic from './someEpic';

const Container = () => null;

export default withEpics({ someEpic })(Container);
```

## API Reference

### withEpics()

Creates a component decorator which handles the lifecycle of passed epics, injecting and ejecting them automatically. The namespace of the epics is determined based on React context.

**Arguments**

1. `epics` ( _Object_ ): The epics to use
2. `options` ( _Object_ ): Options for the decorator
   - [`isGlobal`] \( _boolean_ ): Pass `true` if the epics shouldn't be namespaced
   - [`isNamespaced`] \( _boolean_ ): Pass `true` if the epics must be namespaced
   - [`isPersistent`] \( _boolean_ ): Whether the epic should be automatically ejected after the component is unmounted
   - [`namespace`] \( _string_ ): Namespace to inject the epics under. If passed, the epics
     will not handle actions from other namespaces.
   - [`feature`] \( _string_ ): Feature to resolve the namespace by (if using namespace providers)

**Returns**

( _Function_ ): A component decorator.
