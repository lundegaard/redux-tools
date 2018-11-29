# @redux-tools/reducers-react

React bindings for the @redux-tools/reducers package.

## API Reference

### `withReducers`

Creates a component decorator which handles the lifecycle of passed reducers, mounting and unmounting them automatically. The namespace of the reducers is determined based on React context.

#### Arguments

1. `reducers` (_Object_): The reducers to use.

#### Returns

(_Function_): A component decorator.

#### Example

```js
import React from 'react';
import { withReducers } from '@redux-tools/reducers-react';

import countReducer from './duck';

const Container = () => null;

export default withReducers({ count: countReducer })(Container);
```

### `namespacedConnect`

Works just like `connect()` from react-redux, except it accesses namespaced state based on React context and automatically adds the correct namespace to dispatched actions.

Passes global state as the third argument to `mapStateToProps`.

See [react-redux docs](https://react-redux.js.org/docs/api) for more info.

### `<Provider />`

See [injectors-react](../injectors-react/README.md) for more info.
