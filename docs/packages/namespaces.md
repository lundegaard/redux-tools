# Namespaces

> yarn add @redux-tools/namespaces

This package provides the main logic for associating Redux actions with a namespace.

## API Reference

### isActionFromNamespace()

A function that checks if a Redux action is from a certain namespace. Returns `false` when both namespaces are defined and **not** equal, otherwise returns `true`.

There are essentially two edge cases:

- If the action has no namespace, it is a global action and therefore affects **all** namespaces.
- If the tested namespace is undefined, it is a global namespace and is therefore affected by **all** actions.
  - This allows easier usage of other packages (notably using `namespacedConnect` for dispatching
    actions affecting global reducers and epics, instead of having to use `connect` separately).

**Arguments**

1. [`namespace`] \(_string_): The namespace to check against.
2. `action` ( _Action_ ): The Redux action to check. Should have a `meta.namespace` property.

**Returns**

( _boolean_ ): Whether the Redux action is from the specified namespace.

### getNamespaceByAction()

Returns the namespace of an action.

**Arguments**

1. `action` ( _Action_ ): The Redux action to get the namespace of. Should have a `meta.namespace` property.

**Returns**

( _any_ ): The value of the `meta.namespace` property.

### attachNamespace()

Associates an action with a namespace, overwriting any previous namespace.

**Arguments**

1. [`namespace`] \(_string_): The namespace to attach.
2. `action` ( _Action_ ): Action to attach the namespace to.

**Returns**

( _Action_ ): A new Redux action with a `meta.namespace` property.

### defaultNamespace()

Associates an action with a namespace unless it is already associated with some namespace.

**Arguments**

1. [`namespace`] \(_string_): The namespace to default to.
2. `action` ( _Action_ ): Action to default the namespace of.

**Returns**

( _Action_ ): A new Redux action with a `meta.namespace` property.

### getStateByAction()

Returns Redux state by action namespace.

**Arguments**

1. `action` ( _Object_ ): Action with an optionally defined meta.namespace and meta.feature property.
2. `state` ( _Object_ ): Redux state.

**Returns**

1. ( _Object_ ): Namespaced Redux state.

**Example**

```js
import { getStateByAction } from '@redux-tools/namespaces';

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
import { getStateByNamespace } from '@redux-tools/namespaces';

const state = {
	namespaces: {
		foo: { value: 'bar' },
	},
};

getStateByNamespace('namespaces', 'foo', state); // { value: 'bar' }
```
