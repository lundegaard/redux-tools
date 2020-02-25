# Reducers

> yarn add @redux-tools/reducers

This package provides a store enhancer for injecting reducers into a Redux store after the store is created.

## Usage Example

```js
import { createStore } from 'redux';
import { makeEnhancer } from '@redux-tools/reducers';
import { someReducer } from './reducers';

const store = createStore(state => state, makeEnhancer());

store.injectReducers({ some: someReducer });
```

## API Reference

### makeEnhancer()

A function which creates an enhancer to pass to `createStore()`.

#### store.injectReducers()

This function will store passed reducers internally and replace the existing reducer with a fresh one.

**Arguments**

1. `reducers` ( _Object_ ): Reducers to inject
2. `options` ( _Object_ ): Injection options. The following keys are supported:
   - [`namespace`] \( _string_ ): Namespace to inject the reducer under. If passed, the reducer will not handle actions from other namespaces and will store its state in `state.namespaces[namespace]` instead of in the root.
   - [`feature`] \( _string_ ): This string will be used instead of the default `namespaces` key to store the reducer state, allowing you to use Redux Tools for feature-based store structure (similar to Redux Form, e.g. `state.form.contact.values`).

#### store.ejectReducers()

Opposite to `store.injectReducers`. This function will remove the injected reducers. Make sure that you pass the correct namespace and reducers (keys and values), otherwise the reducers will not be removed.

**Arguments**

1. `reducers` ( _Object_ ): Reducers to eject. Make sure that both the keys and values match the injected ones.
2. `options` ( _Object_ ): Ejection options. The following keys are supported:
   - [`namespace`] \( _string_ ): Namespace the reducers were injected under.
   - [`feature`] \( _string_ ): Namespace the reducers were injected under.

### getStateByAction()

Returns Redux state by action namespace.

**Arguments**

1. `action` ( _Object_ ): Action with an optionally defined meta.namespace and meta.feature property.
2. `state` ( _Object_ ): Redux state.

**Returns**

1. ( _Object_ ): Namespaced Redux state.

**Example**

```js
import { getStateByAction } from '@redux-tools/reducers';

const state = {
	namespaces: {
		foo: { value: 'bar' },
	},
};

const action = {
	meta: {
		feature: 'namespaces',
		namespace: 'foo',
	},
};

getStateByAction(action, state); // { value: 'bar' }
```

### getStateByNamespace()

Returns Redux state by namespace. Returns undefined if the namespace is undefined.

**Arguments**

1. [`feature`] \( _string_ ): Optional feature name.
2. [`namespace`] \( _string_ ): Optional namespace.
3. [`state`] \( _Object_ ): Redux state.

**Returns**

1. ( _Object_ ): Namespaced Redux state.

**Example**

```js
import { getStateByNamespace } from '@redux-tools/reducers';

const state = {
	namespaces: {
		foo: { value: 'bar' },
	},
};

getStateByNamespace('namespaces', 'foo', state); // { value: 'bar' }
```
