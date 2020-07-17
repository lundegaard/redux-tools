# Reducers (React Bindings)

> yarn add @redux-tools/reducers-react

This package provides React bindings for the [@redux-tools/reducers](/packages/reducers) package.

## Usage Example

```js
import React from 'react';
import { withReducers } from '@redux-tools/reducers-react';
import someReducer from './someReducer';

const Container = () => null;

export default withReducers({ someReducer })(Container);
```

## API Reference

### withReducers()

Creates a component decorator which handles the lifecycle of passed reducers, mounting and unmounting them automatically. The namespace of the reducers is determined based on React context.

**Arguments**

1. `reducers` ( _Function|Array|Object_ ): The reducers to use.
2. [`options`] \( _Object_ ): Options for the decorator.
   - [`isGlobal`] \( _boolean_ ): Pass `true` if the reducers shouldn't be namespaced.
   - [`isNamespaced`] \( _boolean_ ): Pass `true` if the reducers must be namespaced.
   - [`isPersistent`] \( _boolean_ ): Define whether reducer should be auto-ejected after unmount.
   - [`feature`] \( _string_ ): Namespace to inject the reducer under. If passed, the reducer
     will not handle actions from other namespaces.
   - [`namespace`] \( _string_ ): Namespace the reducers were injected under.

**Returns**

( _Function_ ): A component decorator.
