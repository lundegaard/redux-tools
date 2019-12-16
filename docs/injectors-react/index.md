# Injectors (React Extension)

> yarn add @redux-tools/injectors-react

This package contains additional methods for integration with React applications.

## API Reference

### Provider

> The same component is exported from:
> - `@redux-tools/reducers-react`
> - `@redux-tools/epics-react`
> - `@redux-tools/middleware-react`

The `<Provider />` React component is an adapted version of `<Provider />` from [React-Redux](https://github.com/reduxjs/react-redux). 
It makes the injection mechanism (`withReducers`, etc.) accessible to nested components. There are 
essentially three approaches to using this component:

1. You do not need to handle namespacing at all.
   - Just use react-redux's `<Provider />`. You don't need to use the @redux-tools `<Provider />`.
2. You are able to access the current namespace using React context from anywhere inside a widget and you are using a single virtual DOM for all widgets.
   - You can wrap the entire application in a single `<Provider useNamespace={useNamespace}>` component and you are done!
3. You are not using a single virtual DOM or you cannot reliably access the namespace from a nested component.
   - You should resort to wrapping each widget separately by using `<Provider namespace={namespace}>` instead.

This component is also a drop-in replacement for react-redux's `<Provider />`.

**Props**

- [`store`] ( _Store_ ): The Redux store.
- [`useNamespace`] ( _Function_ ): A function or a hook which returns the correct namespace (probably by using React context).
- [`namespace`] ( _string_ ): A namespace to use for all nested components. Has priority over `useNamespace`.
- [`feature`] ( _string_ ): Feature to set the namespace for. Allows arbitrary nesting.

**Example**

```javascript
import React from 'react';
import {createStore} from 'redux';
import {Provider} from '@redux-tools/reducers-react';

const reducer = (state = {}) => state;
const store = createStore(reducer);

const App = () => (
   <Provider store={store}>
      <Provider namespace="namespaceA" feature="namespaceGroupA">
         <div />
      </Provider>
      {/* other providers */}
   </Provider>
);

export default App;
```

`<Provider />` is used in many examples - see `Examples` section for more information.

### useNamespace()

A hook for namespace change.

!> TODO: useNamespace

**Arguments**

**Example**

### makeDecorator()

!> TODO: makeDecorator

**Arguments**

**Example**

### makeHook()

!> TODO: makeHook

**Arguments**

**Example**
