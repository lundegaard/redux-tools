# Redux-Tools

![](https://img.shields.io/github/stars/lundegaard/redux-tools)
![](https://img.shields.io/github/issues/lundegaard/redux-tools?color=bada55)
![](https://img.shields.io/badge/licence-MIT-ff69b4)

!> Usage of these tools assumes some basic knowledge of [Redux](https://redux.js.org/) library.

-  Redux-Tools is a collection of enhancers/middleware/utils for asynchronous injecting and ejecting
   of reducers, middleware and epics after store creation. It could be used independently or with
   [React](https://github.com/facebook/react/) (see `@react-tools/*-react` packages).

-  In case of usage with React injection/ejection could be done automatically during React Component
   lifecycle (via HOC or Hooks, e.g. inject during mounting, eject after unmounting).

-  Redux-Tools also provides a possibility to divide Redux store into logical parts - global space,
   namespace groups and namespaces.

-  Different namespace groups and namespaces could be used as a changeable source of data for some
   GUI, e.g. for React Components (context), i.e. a component could easily change its namespace (with
   the same logic structure) and display different data.

-  It's suitable to use with SPA-in-CMS solutions, such as
   [React-Union](https://github.com/lundegaard/react-union).

## List of Tools

-  [actions](/actions/index.md) – functions for creating [FSA-compliant](https://github.com/redux-utilities/flux-standard-action) action creators and reducers
-  [reducers](/reducers/index.md) – Redux store enhancer for asynchronous injection of reducers
-  [reducers-react](/reducers-react/index.md) – React bindings for the reducers package
-  [epics](/epics/index.md) – Redux store enhancer for asynchronous injection of epics
-  [epics-react](/epics-react/index.md) – React bindings for the epics package
-  [stream-creators](/stream-creators/index.md) – collection of stream creators for the epics package
-  [middleware](/middleware/index.md) – Redux store enhancer for asynchronous injection of middleware
-  [middleware-react](/middleware-react/index.md) – React bindings for the middleware package
-  [thunk](/thunk/index.md) – adapted Redux Thunk library for usage with namespaces

The following packages are used internally and are not meant to be used directly in your application code. You might want to use them for some custom features or more advanced integration, though.

-  [namespaces](/namespaces/index.md) – logic for associating Redux actions with a namespace
-  [injectors](/injectors/index.md) – internal reusable logic for the injection mechanism itself
-  [injectors-react](/injectors-react/index.md) – core React injector functionality
-  [utils](/utils/index.md) – utility functions not tied to the @redux-tools domain
-  [utils-react](/utils-react/index.md) – React-specific utility functions not tied to the @redux-tools domain

## Introduction

Let's take a simple theoretical example how could redux store look like with `redux-tools` integration
and how we can use it:

```javascript
const store = {
   // Global store (reducers without namespace with `isGlobal: true` option)
   someGlobalReducer: { x: 2 },

   // Default namespace group (reducers with specified `namespace`, but without `feature` option)
   namespaces: {
      someNamespaceNameA: {
         // Reducer with {namespace: 'someNamespaceNameA'}
         someCounterReducer: { x: 3 },
      },
      someNamespaceNameB: {
         // Reducer with {namespace: 'someNamespaceNameB'}
         someCounterReducer: { x: 5 },
      },
   },

   // Named group of namespaces (reducers with specified `namespace` and `feature` option)
   namedNamespaceGroup: {
      someNamespaceNameA: {
         // Reducer with {namespace: 'someNamespaceNameA', feature: 'namedNamespaceGroup'}
         someCounterReducer: { x: 7 },
      },
      someNamespaceNameB: {
         // Reducer with {namespace: 'someNamespaceNameB', feature: 'namedNamespaceGroup'}
         someCounterReducer: { x: 11 },
      },
   },
};
```

This store provides us a few similar structures (namespace groups - default and namedNamespaceGroup)
with namespaces and a reducer (note that namespaces and reducers have same names).

We can imagine that two namespace groups are web-pages that have a few form steps (namespaces) that
stores a number. And we have a GUI that can visualize number `x` from `someCounterReducer` (e.g. it
could be a React Component `<Counter />`) and provides a button that increments number `x`.

This GUI element is universal - it can take arbitrary namespace group + namespace pair, visualize
data and apply increment action within elected part of the store. Change of the namespace group or
namespace could be provided via some routing library or something similar.

Moreover, we can use asynchronously add new pages (`namespace groups`), form step (`namespaces`)
anytime we want. This inject/eject lifecycle is more described at [Injectors](/injectors/index.md) page.

## Simple React + Redux-Tools example

_**duck.js**_

-  a duck file (see [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux))
-  exports reducer and action creator

```js
// duck.js
import { makeActionTypes, makeConstantActionCreator, makeReducer } from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('duck', ['INCREMENT']);
export const increment = makeConstantActionCreator(ActionTypes.INCREMENT);

export default makeReducer([[ActionTypes.INCREMENT, count => count + 1]], 0);
```

_**Counter.js**_

-  a universal component for visualizing number "count" from specified namespace and
   calling an increment action

```js
// Counter.js
import React from 'react';
import { o } from 'ramda';
import { withReducers, namespacedConnect } from '@redux-tools/reducers-react';

import countReducer, { increment } from './duck';

const Counter = ({ count, increment }) => <button onClick={increment}>{count}</button>;

const mapStateToProps = namespacedState => ({ count: namespacedState.count });
const mapDispatchToProps = { increment };

const enhance = o(
   // This handles the asynchronous reducer injection/ejection
   withReducers({ count: countReducer }),
   // This is just like `connect` from react-redux
   namespacedConnect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Counter);
```

_**index.js**_

-  a root component
-  connects react to redux and defines namespaces for Counters

```js
// index.js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { makeEnhancer as makeReducersEnhancer } from '@redux-tools/reducers';
import { Provider } from '@redux-tools/reducers-react';
import { identity } from 'ramda';

import Counter from './Counter';

// `makeReducersEnhancer()` is an enhancer just like `applyMiddleware()`, so they're composable
const store = createStore(identity, makeReducersEnhancer());

render(
   <Provider store={store}>
      <Counter namespace="foo" />
      <Counter namespace="bar" />
      <Counter namespace="baz" />
   </Provider>,
   document.getElementById('root'),
);
```

The state structure will look like this:

```json
{
   "namespaces": {
      "foo": { "count": 0 },
      "bar": { "count": 0 },
      "baz": { "count": 0 }
   }
}
```

You can find more examples in [our repository]().

!> TODO: Add link

## Resources

-  [Beyond Simplicity: Using Redux in Dynamic Applications](https://medium.com/@wafflepie/beyond-simplicity-using-redux-in-dynamic-applications-ae9e0aea928c) (published 21 Jan 2019)
-  [react-union](https://github.com/lundegaard/react-union)

## Licence

All packages are distributed under MIT licence.
