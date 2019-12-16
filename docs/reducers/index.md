# Reducers

> yarn add @redux-tools/reducers

The package provides a redux store enhancer for asynchronous injection of 
reducers and adds a possibility to attach a reducer with individual namespaces.

## Usage example

The snippet shows the most simple usage of the package. Several reducers are asynchronously
injected and called with `store.getState()` to show their behavior with namespaced functionality. 
Note that:

- All reducers are called in the same order as they were injected.
- If we define action namespace, the order persists, but reducers with different namespaces are ignored.

```js
import { createStore } from 'redux';
import { makeEnhancer } from '@redux-tools/reducers';

const initialReducer = (state = {}) => state;
const reducerA = (state = { name: 'a' }) => state;
const reducerB = (state = { name: 'b' }) => state;

const store = createStore(initialReducer, makeEnhancer());

// Injects reducer with namespace `nsA` under namespaces node
store.injectReducers({ a: reducerA }, { namespace: 'nsA' });
store.getState();
//	{
//		namespaces: {
//			nsA: { a: { name: 'a' } },
//		},
//	}

// Injects reducer with namespace `nsA` under custom overwritten node (`namespaces` by default)
store.injectReducers({ a: reducerA }, { namespace: 'nsA', feature: 'customNamespaces' });
store.getState();
//	{
//		customNamespaces: {
//			nsA: { a: { name: 'a' } },
//		},
//	}

// Injects reducers with different namespaces `nsA` and `nsB`
store.injectReducers({ a: reducerA }, { namespace: 'nsA' });
store.injectReducers({ b: reducerB }, { namespace: 'nsB' });
store.getState();
//	{
//		namespaces: {
//			nsA: { a: { name: 'a' } },
//			nsB: { b: { name: 'b' } },
//		},
//	}

// Ejecting of reducerA does not touch state of other reducers
store.ejectReducers({ a: reducerA }, { namespace: 'nsA' });
store.getState();
//	{
//		namespaces: {
//			nsB: { b: { name: 'b' } },
//		},
//	}
```

!> TODO: Example link

## API Reference

### makeEnhancer()

A method for creating of redux enhancer (see an example above). Adds new methods to redux store:

#### store.injectReducers()

This function will store passed reducers internally and replace the existing reducer with a fresh one.

**Arguments**

1. `reducers` ( _Object_ ): Reducers to inject
2. `options` ( _Object_ ): Injection options. The following keys are supported:
   - [`namespace`] ( _string_ ): Namespace to inject the reducer under. If passed, the reducer will not handle actions from other namespaces and will store its state in `state.namespaces[namespace]` instead of in the root.
   - [`feature`] ( _string_ ): This string will be used instead of the default `namespaces` key to store the reducer state, allowing you to use @redux-tools for feature-based store structure (similar to Redux Form, e.g. `state.form.contact.values`).

#### store.ejectReducers()

Opposite to `store.injectReducers`. This function will remove the injected reducers. Make sure that you pass the correct namespace and epics (keys and values), otherwise the reducers will not be removed.

**Arguments**

1. `reducers` ( _Object_ ): Reducers to eject. Make sure that both the keys and values match the injected ones.
2. `options` ( _Object_ ): Ejection options. The following keys are supported:
   - [`namespace`] \( _string_ ): Namespace the reducers were injected under
   - [`feature`] \( _string_ ): This string will be used instead of the default `namespaces` key to store the reducer state, allowing you to use @redux-tools for feature-based store structure (similar to Redux Form, e.g. `state.form.contact.values`).

### storeInterface()

Provides entries data of reducers. See [injectors](/injectors/index.md).

### getStateByAction()

Returns Redux state by action namespace.

**Arguments**

1. `action` ( _Object_ ): Action with an optionally defined meta.namespace and meta.feature property
2. `state` ( _Object_ ): Redux state

**Returns**
1. ( _Object_ ): Namespaced Redux state

**Example**
``` js
import { getStateByAction } from '@redux-tools/reducers';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'bar' },
	},
};

getStateByAction({ meta: { feature: DEFAULT_FEATURE, namespace: 'foo' } }, state);
//	{
//		value: 'bar',
//	}
```

### getStateByNamespace()

Returns Redux state by namespace. Returns undefined if a namespace is undefined.

**Arguments**

1. `feature` ( _string_ ): Optional feature name
2. `namespace` ( _string_ ): Optional namespace
3. `state` ( _Object_ ): Redux state

**Returns**
1. ( _Object_ ): Namespaced Redux state

**Example**
``` js
import { getSateByNamespace } from '@redux-tools/reducers';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'bar' },
	},
};

getStateByNamespace(DEFAULT_FEATURE, 'foo', state);
//	{
//		value: 'bar',
//	}
```

### composeReducers()

!> TODO: composeReducers

**Arguments**

**Example**
