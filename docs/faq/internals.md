# FAQ: Internals {docsify-ignore-all}

## What happens under the hood when we inject something?

The lifecycle of all injectables (i.e. reducers, middleware, and epics) is
always the same. Let's assume that we've got a new store with an epics enhancer (always exported as
`makeEnhancer` from the appropriate package). The enhancer has added two methods to our store:

- `injectEpics()`
- `ejectEpics()`

This enhancer also defines a `store.entries.epics` array, storing all the injected epics.

```json
{
	"entries": {
		"epics": []
	}
}
```

The object above is the same structure where the functions like `dispatch` and `getState` are – the Redux store. Remember that the Redux store is [just an object](https://redux.js.org/api/store), meaning that we can safely add any additional properties we desire. This makes it possible to see all the injected epics just by examining the store.

If we inject a bunch of epics, they will get converted into entries first.

```js
store.injectEpics({ someEpic, anotherEpic }, { namespace: 'foo', feature: 'bar' });
```

This call will create the following entries under the hood:

```js
const entries = [
	{
		feature: 'bar',
		namespace: 'foo',
		key: 'someEpic',
		value: someEpic, // The epic itself.
	},
	{
		feature: 'bar',
		namespace: 'foo',
		key: 'anotherEpic',
		value: anotherEpic, // The epic itself.
	},
];
```

These entries are added to the `store.entries.epics` array, including duplicates. This is to allow having multiple decorators injecting the same entries – if one of the decorators unmounts, we want the other entries to be preserved.

New entries are processed differently based on the type of the injectable.

- Epics: the root epic consumes a stream of epics. [Sounds crazy?](https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html)
- Reducers: the root reducer is assembled from `store.entries.reducers` directly.
- Middleware: the root middleware essentially iterates over current `store.entries.middleware` per each action.

Here is a visual representation as well.

![](lifecycle.png)
