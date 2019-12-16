# Reducers-react

> yarn add @redux-tools/reducers-react

React HOC and wrappers for the `@redux-tools/reducers` package. Simplifies usage of redux-tools
with react.

## Usage example

The snippet below shows the most simple usage of the package. `withReducers()` function defines
a set of reducers with options that will be injected during component mount phase and ejected during
unmount phase.

```js
import React from 'react';
import { withReducers } from '@redux-tools/reducers-react';
import { reducerA } from './reducers';

const Application = () => null;

export default withReducers({
    // Reducers
    reducerA,
}, {
   // Global bool needs to be true if we don't provide namespace
   isGlobal: true,
   // Injected reducers persist even after unmount (could be removed explicitly via ejectMiddleware)
   isPersistent: false,
})(Application);
```

!> TODO: Example link

## API Reference

### withReducers()

Creates a component decorator which handles the lifecycle of passed reducers, mounting and unmounting them automatically. The namespace of the reducers is determined based on React context.

**Arguments**

1. `reducers` ( _Object_ ): The reducers to use
2. [`options`] \( _Object_ ): Options for the decorator
    - [`isGlobal`] ( _boolean_ ): Should be `true` if no namespace is provided
    - [`isPersistent`] ( _boolean_ ): Define whether reducer should be auto-ejected after unmount
    - [`feature`] ( _string_ ): A name of the namespace group (`namespaces` by default)
    - [`namespace`] ( _string_ ): Namespace the reducers were injected under

**Returns**

( _Function_ ): A component decorator

### useReducers()

A hook for namespaced reducers usage.

!> TODO: useReducers

**Arguments**

**Example**

### namespacedConnect()

Works just like `connect()` from react-redux, except it accesses namespaced state based on React context and automatically adds the correct namespace to dispatched actions.

Passes global state as the third argument to `mapStateToProps`.

See [react-redux docs](https://react-redux.js.org/docs/api) for more info.

!> TODO: Example

### Provider

A component that provides injection mechanism to nested components. See
[injectors-react](/injectors-react/index.md) for more info.
