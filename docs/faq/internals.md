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
		value: someEpic,
		path: ['someEpic'],
		namespace: 'foo',
		feature: 'bar',
	},
	{
		value: anotherEpic,
		path: ['anotherEpic'],
		namespace: 'foo',
		feature: 'bar',
	},
];
```

These entries are added to the `store.entries.epics` array, including duplicates. This is to allow having multiple decorators injecting the same entries – if one of the decorators unmounts, we want the other entries to be preserved.

New entries are processed differently based on the type of the injectable.

- Epics: the root epic consumes a stream of epics. [Sounds crazy?](https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html)
- Reducers: the root reducer is assembled from `store.entries.reducers` directly.
- Middleware: the root middleware essentially iterates over current `store.entries.middleware` per each action.

The `path` property is mainly useful for reducers, allowing deep reducer injection for a [view-based state structure](/tutorial/04-view-state-management). Additionally, Redux Tools allow us to inject epics and middleware as functions or within an array.

```js
store.injectEpics([someEpic, anotherEpic]);
store.injectEpics(someEpic);
```

The calls above will result in 3 entries being stored:

```js
const entries = [
	{ value: someEpic, path: [] },
	{ value: anotherEpic, path: [] },
	{ value: someEpic, path: [] },
];
```

Because the `path` of both `someEpic` entries is the same, the epic will only be run once. However, in order to fully eject `someEpic`, `store.ejectEpics(someEpic)` has to be called twice.
