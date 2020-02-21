# Namespacing

Let's assume that we've got a Component. This Component can be used many times
on the page, but it needs to visualize different data (from a group of reducers)
and cannot change internal implementation.

A namespace is a structure (a group of reducers) that wraps a Component and
provides some specific context.

## Provider component

> The same component is exported from:
>
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

- [`store`](_Store_): The Redux store.
- [`useNamespace`](_Function_): A function or a hook which returns the correct namespace (probably by using React context).
- [`namespace`](_string_): A namespace to use for all nested components. Has priority over `useNamespace`.
- [`feature`](_string_): Feature to set the namespace for. Allows arbitrary nesting.

**Example**

```javascript
import React from 'react';
import { createStore } from 'redux';
import { Provider } from '@redux-tools/reducers-react';

const reducer = (state = {}) => state;
const store = createStore(reducer);

const App = () => (
	<Provider store={store}>
		<Provider namespace="namespaceA" feature="featureA">
			<div />
		</Provider>
		{/* other providers */}
	</Provider>
);

export default App;
```

`<Provider />` is used in many examples - see `Examples` section for more information.

## Redux store and a flow

Let's take a simple theoretical example how could Redux store look like with Redux Tools integration
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
	featureA: {
		someNamespaceNameA: {
			// Reducer with {namespace: 'someNamespaceNameA', feature: 'featureA'}
			someCounterReducer: { x: 7 },
		},
		someNamespaceNameB: {
			// Reducer with {namespace: 'someNamespaceNameB', feature: 'featureA'}
			someCounterReducer: { x: 11 },
		},
	},
};
```

This store provides us a few similar structures (features - default and featureA)
with namespaces and a reducer (note that namespaces and reducers have same names).

We can imagine that two features are web-pages that have a few form steps (namespaces) that
stores a number. And we have a GUI that can visualize number `x` from `someCounterReducer` (e.g. it
could be a React Component `<Counter />`) and provides a button that increments number `x`.

This GUI element is universal - it can take arbitrary feature + namespace pair, visualize
data and apply increment action within elected part of the store. Change of the feature or
namespace could be provided via some routing library or something similar.

Moreover, we can use asynchronously add new pages (`features`), form step (`namespaces`)
anytime we want. This inject/eject lifecycle is more described at [Injectors](/injectors/index.md) page.
