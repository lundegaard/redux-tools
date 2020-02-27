# Stream Creators

> yarn add @redux-tools/stream-creators

The [@redux-tools/epics](/packages/epics) enhancer accepts an optional `streamCreator` option, allowing you to add an additional argument to all epics. This package is a collection of various useful stream creators.

## Usage

```js
import { namespacedState$ } from '@redux-tools/stream-creators';
import { makeEnhancer as makeEpicsEnhancer } from '@redux-tools/epics';
import { identity, compose } from 'ramda';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
	identity,
	compose(
		makeEpicsEnhancer({ epicMiddleware, streamCreator: namespacedState$ }),
		applyMiddleware(epicMiddleware)
	)
);
```

If you want to pass multiple stream creators, you can use the `applySpec` function from Ramda (or any other equivalent).

```js
const store = createStore(
	identity,
	compose(
		makeEpicsEnhancer({
			epicMiddleware,
			streamCreator: applySpec({ namespacedState$, globalAction$ }),
		}),
		applyMiddleware(epicMiddleware)
	)
);
```

```js
const epic = (action$, state$, { namespacedState$, globalAction$ }) =>
	action$.pipe(ignoreElements());
```

## API Reference

### namespacedState\$

A stream creator for namespaced state. Similar to `state$`, except it will always be the state
associated with the epic. Therefore, if you have an epic injected under the `foo` namespace,
`namespacedState$` will use `state.namespaces.foo`.

**Arguments**

1. `bag` ( _Object_ ): Provided by the enhancer. Contains `namespace`, `feature`, `action$`, `globalAction$`, and `state$`.

**Returns**

( _Observable_ ): An observable similar to `state$` in redux-observable, except using the namespaced state.

### globalAction\$

A stream creator for global actions. By default, every injected epic only accepts actions matching its namespace (see [@redux-tools/namespaces](/packages/namespaces) for more info). This stream creator allows you to react to actions from other namespaces if you need to.

**Arguments**

1. `bag` ( _Object_ ): Provided by the enhancer. Contains `namespace`, `feature`, `action$`, `globalAction$`, and `state$`.

**Returns**

( _Observable_ ): The original unfiltered `action$` passed to the epic.
